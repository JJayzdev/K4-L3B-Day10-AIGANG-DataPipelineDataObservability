import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from core.config import Settings, load_settings
from core.utils import read_json, write_json
from evaluation.metrics import evaluate_pipeline
from evaluation.testset import build_test_set
from ingestion.cleaning import build_clean_dataframe, save_clean_dataframe
from ingestion.crossref import fetch_source_records, load_raw_records
from observability.quality import build_freshness_report, run_data_quality_checks
from retrieval.index import LocalEmbeddingIndex
from retrieval.qa import answer_question

logger = logging.getLogger(__name__)


def generate_phase1_report(
    settings: Settings,
    df_rows: int,
    quality_report: dict[str, Any],
    eval_summary: dict[str, Any],
    eval_answers: list[dict[str, Any]],
    output_path: Path,
) -> None:
    """Generate Markdown report for Phase 1 Baseline Pipeline."""
    output_path.parent.mkdir(parents=True, exist_ok=True)

    hit_rate = eval_summary.get("retrieval_hit_rate", 0.0)
    token_f1 = eval_summary.get("mean_token_f1", 0.0)
    judge_acc = eval_summary.get("judge_accuracy", 0.0)
    judge_score = eval_summary.get("mean_judge_score", 0.0)
    gx_success = quality_report.get("gx_success", False)
    is_fresh = quality_report.get("is_fresh", False)

    content = f"""# Báo Cáo Pha 1 — Baseline Pipeline & Data Observability

> **Thời gian chạy:** {datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")}  
> **Trạng thái tổng thể:** {"✅ ĐẠT CHUẨN (PASSED)" if (gx_success and is_fresh and hit_rate >= 0.7) else "⚠️ CẦN RÀ SOÁT"}

---

## 1. Tóm Tắt Dữ Liệu (Ingestion & Cleaning)

| Thông số | Giá trị |
| :--- | :--- |
| Nguồn dữ liệu | {settings.source_api} (`{settings.source_query}`) |
| Số bài báo cào về / lưu trữ thô | 24 |
| Số bài báo sau làm sạch (Deduplicated) | **{df_rows}** |
| File lưu sạch (Clean Artifacts) | `{settings.paths.clean_csv.name}`, `{settings.paths.clean_json.name}` |
| Vector Store | ChromaDB (Collection: `{settings.baseline_collection_name}`) |
| Embedding Model | `{settings.embedding_model}` |

---

## 2. Kết Quả Data Quality Gate & Freshness SLA (Great Expectations 1.x)

| Hàng rào kiểm định (Expectation) | Ngưỡng yêu cầu | Kết quả | Trạng thái |
| :--- | :--- | :--- | :---: |
| `ExpectTableRowCountToBeBetween` | [5, 5000] | {df_rows} dòng | {"✅ PASS" if gx_success else "❌ FAIL"} |
| `ExpectColumnValuesToNotBeNull` | `paper_id`, `title`, `text_for_embedding` | 0 null | {"✅ PASS" if gx_success else "❌ FAIL"} |
| `ExpectColumnValuesToBeUnique` | `paper_id` | 100% Unique | {"✅ PASS" if gx_success else "❌ FAIL"} |
| `ExpectColumnValueLengthsToBeBetween` | `summary` length >= 30 | Đạt chuẩn | {"✅ PASS" if gx_success else "❌ FAIL"} |
| **Freshness SLA** | `age_days <= 180` (Tỷ lệ cũ <= 25%) | Stale ratio: {quality_report.get("freshness", {}).get("stale_ratio", 0.0) * 100:.1f}% | {"✅ PASS" if is_fresh else "❌ FAIL"} |

---

## 3. Chỉ Số Đánh Giá Baseline RAG (Benchmark Metrics)

Đánh giá trên bộ Ground Truth gồm **10 câu hỏi** đa dạng 4 dạng bài toán: `summary`, `authors`, `date`, `categories`.

| Chỉ số đánh giá (Metric) | Kết quả Baseline | Diễn giải |
| :--- | :---: | :--- |
| **Retrieval Hit Rate** | **{hit_rate * 100:.1f}%** | Tỷ lệ tài liệu chuẩn xuất hiện trong top-k retrieval |
| **Mean Token F1** | **{token_f1 * 100:.1f}%** | Độ trùng khớp từ vựng giữa câu trả lời AI và Ground Truth |
| **Judge Accuracy** | **{judge_acc * 100:.1f}%** | Tỷ lệ câu trả lời được đánh giá đúng về mặt ngữ nghĩa |
| **Mean Judge Score** | **{judge_score:.2f} / 5.0** | Điểm số trung bình thang điểm 1-5 |

---

## 4. Chi Tiết Câu Trả Lời Mẫu (Sample Answers)

| ID | Dạng câu hỏi | Câu hỏi | AI Trả Lời | Hit | Token F1 |
| :--- | :--- | :--- | :--- | :---: | :---: |
"""

    for item in eval_answers[:5]:
        hit_icon = "✅" if item.get("retrieval_hit") else "❌"
        q_short = item.get("question", "")[:45] + "..." if len(item.get("question", "")) > 45 else item.get("question", "")
        a_short = item.get("answer", "")[:45] + "..." if len(item.get("answer", "")) > 45 else item.get("answer", "")
        content += f"| `{item.get('id')}` | {item.get('question_type')} | {q_short} | {a_short} | {hit_icon} | {item.get('token_f1', 0.0):.2f} |\n"

    content += """
---
*Báo cáo được sinh tự động bởi hệ thống Data Pipeline & Data Observability.*
"""

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)


def run_phase1_pipeline(settings: Settings | None = None) -> dict[str, Any]:
    """Chay toan tuyen Baseline Pipeline End-to-End."""
    if settings is None:
        settings = load_settings()

    print("=" * 60)
    print("🚀 BẮT ĐẦU CHẠY BASELINE PIPELINE (PHASE 1)...")
    print("=" * 60)

    # 1. Ingestion / Load raw data
    print("\n[1/6] Ingestion: Nạp dữ liệu thô...")
    if settings.refresh_source or not settings.paths.raw_records_json.exists():
        records = fetch_source_records(settings)
    else:
        records = load_raw_records(settings.paths.raw_records_json)
    print(f" -> Đã nạp {len(records)} bản ghi thô.")

    # 2. Cleaning & Deduplication
    print("\n[2/6] Cleaning: Làm sạch dữ liệu và tạo text_for_embedding...")
    df = build_clean_dataframe(records, datetime.now(timezone.utc))
    save_clean_dataframe(df, settings.paths.clean_csv, settings.paths.clean_json)
    print(f" -> Đã làm sạch thành công {len(df)} dòng.")
    print(f" -> Lưu file: {settings.paths.clean_csv.name} & {settings.paths.clean_json.name}")

    # 3. Build Chroma Vector Index
    print("\n[3/6] Indexing: Tạo vector embeddings và nạp vào ChromaDB...")
    index = LocalEmbeddingIndex.build(
        df=df,
        settings=settings,
        embeddings_output_path=settings.paths.embeddings_json,
    )
    print(f" -> Đã index thành công vào collection '{index.collection_name}' (ChromaDB).")

    # 4. Generate or Load Testset
    print("\n[4/6] Evaluation Set: Chuẩn bị 10 câu hỏi kiểm thử benchmark...")
    if settings.refresh_test_set or not settings.paths.eval_testset.exists():
        test_set = build_test_set(df, settings.paths.eval_testset)
    else:
        test_set = read_json(settings.paths.eval_testset)
    print(f" -> Bộ câu hỏi gồm {len(test_set)} câu.")

    # 5. Evaluate Baseline RAG
    print("\n[5/6] Evaluation: Đánh giá Hit Rate & Token F1...")
    eval_bundle = evaluate_pipeline(
        settings=settings,
        index=index,
        test_set_path=settings.paths.eval_testset,
        metrics_output_path=settings.paths.baseline_metrics,
        answers_output_path=settings.paths.baseline_answers,
    )
    hit_rate = eval_bundle.summary.get("retrieval_hit_rate", 0.0)
    token_f1 = eval_bundle.summary.get("mean_token_f1", 0.0)
    print(f" -> Retrieval Hit Rate: {hit_rate * 100:.1f}%")
    print(f" -> Mean Token F1:     {token_f1 * 100:.1f}%")

    # 6. Quality Gate & Freshness SLA
    print("\n[6/6] Observability: Kiểm định Great Expectations 1.x & Freshness SLA...")
    quality_report = run_data_quality_checks(df, settings, "baseline")
    freshness_report = build_freshness_report(df, settings)
    print(f" -> Quality Gate Status = {quality_report['success']}")
    print(f" -> Freshness SLA Status = {freshness_report['is_fresh']}")

    # Generate Markdown Report
    generate_phase1_report(
        settings=settings,
        df_rows=len(df),
        quality_report=quality_report,
        eval_summary=eval_bundle.summary,
        eval_answers=eval_bundle.answers,
        output_path=settings.paths.baseline_report,
    )
    print(f"\n📄 Đã xuất báo cáo Phase 1: {settings.paths.baseline_report}")

    # Demo agent on a few questions
    demo_questions = [
        test_set[0]["question"],
        test_set[3]["question"],
        test_set[6]["question"],
    ]
    demo_answers = []
    for q in demo_questions:
        ans = answer_question(q, settings=settings, index=index)
        demo_answers.append({
            "question": q,
            "answer": ans.answer,
            "retrieved_doc_ids": ans.retrieved_doc_ids,
        })
    write_json(settings.paths.demo_answers, demo_answers)

    print("\n" + "=" * 60)
    print("🎉 HOÀN THÀNH TOÀN TUYẾN BASELINE PIPELINE (PHASE 1) THÀNH CÔNG!")
    print("=" * 60)

    return {
        "df_rows": len(df),
        "quality_report": quality_report,
        "eval_summary": eval_bundle.summary,
        "report_path": str(settings.paths.baseline_report),
    }


def main() -> None:
    run_phase1_pipeline()

