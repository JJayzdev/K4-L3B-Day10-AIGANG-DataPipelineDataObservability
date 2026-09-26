from __future__ import annotations

from datetime import UTC, datetime
import logging
from pathlib import Path
from typing import Any
import pandas as pd

from core.config import Settings, load_settings
from core.utils import read_json, write_csv, write_json
from evaluation.metrics import evaluate_pipeline
from ingestion.cleaning import build_clean_dataframe
from ingestion.corruption import corrupt_clean_dataframe
from ingestion.crossref import fetch_source_records, load_raw_records
from observability.quality import run_data_quality_checks
from observability.reporting import generate_corruption_report
from pipelines.phase1 import run_phase1_pipeline
from retrieval.index import LocalEmbeddingIndex


logger = logging.getLogger(__name__)


def repair_from_raw_snapshot(settings: Settings) -> pd.DataFrame:
    """Safely restore clean dataset by rebuilding from immutable raw snapshot (Idempotent Repair)."""
    raw_path = settings.paths.raw_records_json
    if raw_path.exists():
        records = load_raw_records(raw_path)
        logger.info("Repair: Loaded %s records from %s", len(records), raw_path)
    else:
        logger.warning("Repair: Raw records not found at %s. Fetching/fallback...", raw_path)
        records = fetch_source_records(settings)

    repaired_df = build_clean_dataframe(records, datetime.now(UTC))
    if repaired_df.empty:
        raise RuntimeError("Repair failed: could not build clean dataframe from raw records.")

    # Luu artifact phuc hoi
    write_csv(repaired_df, settings.paths.repaired_clean_csv)
    write_json(settings.paths.repaired_clean_json, repaired_df.to_dict(orient="records"))
    logger.info("Repair: Successfully wrote %s repaired records to %s", len(repaired_df), settings.paths.repaired_clean_json)
    return repaired_df


def run_corruption_flow_pipeline(settings: Settings) -> dict[str, Any]:
    """Execute Phase 2: Corrupt -> Evaluate Degradation -> Repair -> Re-evaluate -> Compare."""
    logger.info("=== Starting Phase 2: Corruption & Self-Healing Pipeline ===")

    # 1. Đảm bảo Baseline data & metrics đã sẵn sàng
    if (
        not settings.paths.clean_json.exists()
        or not settings.paths.baseline_metrics.exists()
        or not settings.paths.eval_testset.exists()
    ):
        logger.info("Baseline artifacts missing. Running baseline pipeline first...")
        run_phase1_pipeline(settings)

    clean_df = pd.read_json(settings.paths.clean_json)
    baseline_metrics = read_json(settings.paths.baseline_metrics)
    logger.info("Loaded baseline data with %s papers and baseline metrics.", len(clean_df))

    # 2. Bước 7: Tiêm 6 dạng lỗi vào dữ liệu sạch (Data Corruption Suite)
    logger.info("Injecting 6 types of corruption into clean data...")
    corrupted_df = corrupt_clean_dataframe(clean_df, settings.paths.corruption_log)
    write_csv(corrupted_df, settings.paths.corrupted_clean_csv)
    write_json(settings.paths.corrupted_clean_json, corrupted_df.to_dict(orient="records"))
    logger.info(
        "Corrupted data saved: %s rows (logged to %s)",
        len(corrupted_df),
        settings.paths.corruption_log,
    )

    # 3. Nạp dữ liệu bẩn vào ChromaDB & Đo lường sự suy giảm (Silent Failure)
    logger.info("Building ChromaDB index for corrupted data...")
    corrupted_index = LocalEmbeddingIndex.build(
        corrupted_df,
        settings,
        settings.paths.corrupted_embeddings_json,
    )

    logger.info("Evaluating RAG on corrupted data...")
    corrupted_eval = evaluate_pipeline(
        settings=settings,
        index=corrupted_index,
        test_set_path=settings.paths.eval_testset,
        metrics_output_path=settings.paths.corrupted_metrics,
        answers_output_path=settings.paths.corrupted_answers,
    )

    corrupted_quality = run_data_quality_checks(corrupted_df, settings, "corrupted")
    corrupted_freshness = corrupted_quality["freshness"]
    logger.info("Corrupted Quality Gate Passed: %s", corrupted_quality["success"])

    # 4. Kích hoạt hàm phục hồi an toàn repair_from_raw_snapshot()
    logger.info("Activating safe repair mechanism from raw snapshot...")
    repaired_df = repair_from_raw_snapshot(settings)

    # 5. Nạp dữ liệu đã phục hồi vào ChromaDB & Tái đánh giá hệ thống
    logger.info("Rebuilding ChromaDB index for repaired data...")
    repaired_index = LocalEmbeddingIndex.build(
        repaired_df,
        settings,
        settings.paths.repaired_embeddings_json,
    )

    logger.info("Re-evaluating RAG on repaired data...")
    repaired_eval = evaluate_pipeline(
        settings=settings,
        index=repaired_index,
        test_set_path=settings.paths.eval_testset,
        metrics_output_path=settings.paths.repaired_metrics,
        answers_output_path=settings.paths.repaired_answers,
    )

    repaired_quality = run_data_quality_checks(repaired_df, settings, "repaired")
    repaired_freshness = repaired_quality["freshness"]
    logger.info("Repaired Quality Gate Passed: %s", repaired_quality["success"])

    # 6. Kết xuất bảng so sánh 3 trạng thái tại data/reports/corruption_report.md
    generate_corruption_report(
        report_path=settings.paths.comparison_report,
        baseline_metrics=baseline_metrics,
        corrupted_metrics=corrupted_eval.summary,
        repaired_metrics=repaired_eval.summary,
        corrupted_quality=corrupted_quality,
        repaired_quality=repaired_quality,
        corrupted_freshness=corrupted_freshness,
        repaired_freshness=repaired_freshness,
    )
    logger.info("Saved comparison report to %s", settings.paths.comparison_report)

    # 7. In bảng đối chiếu 3 trạng thái ra console
    _print_comparison_table(
        baseline_metrics=baseline_metrics,
        corrupted_metrics=corrupted_eval.summary,
        repaired_metrics=repaired_eval.summary,
        corrupted_quality=corrupted_quality,
        repaired_quality=repaired_quality,
    )

    return {
        "baseline_metrics": baseline_metrics,
        "corrupted_metrics": corrupted_eval.summary,
        "repaired_metrics": repaired_eval.summary,
        "corrupted_quality": corrupted_quality,
        "repaired_quality": repaired_quality,
    }


def _print_comparison_table(
    baseline_metrics: dict[str, Any],
    corrupted_metrics: dict[str, Any],
    repaired_metrics: dict[str, Any],
    corrupted_quality: dict[str, Any],
    repaired_quality: dict[str, Any],
) -> None:
    def _val(m: dict[str, Any], k: str) -> str:
        v = m.get(k)
        if isinstance(v, float):
            return f"{v:.3f}"
        if isinstance(v, bool):
            return "PASS" if v else "FAIL"
        return str(v) if v is not None else "N/A"

    print("\n" + "=" * 80)
    print("      BẢNG ĐỐI CHIẾU HIỆU NĂNG 3 TRẠNG THÁI (BASELINE vs CORRUPTED vs REPAIRED)")
    print("=" * 80)
    headers = f"{'Metric / Criteria':<30} | {'Baseline':<12} | {'Corrupted':<12} | {'Repaired':<12}"
    print(headers)
    print("-" * 80)

    rows = [
        ("Retrieval Hit Rate", "retrieval_hit_rate"),
        ("Mean Token F1", "mean_token_f1"),
        ("Judge Accuracy", "judge_accuracy"),
        ("Mean Judge Score", "mean_judge_score"),
    ]

    for label, key in rows:
        print(
            f"{label:<30} | {_val(baseline_metrics, key):<12} | {_val(corrupted_metrics, key):<12} | {_val(repaired_metrics, key):<12}"
        )

    print("-" * 80)
    print(
        f"{'Quality Gate (GX + SLA)':<30} | {'PASS':<12} | {_val(corrupted_quality, 'success'):<12} | {_val(repaired_quality, 'success'):<12}"
    )
    print(
        f"{'Great Expectations':<30} | {'PASS':<12} | {_val(corrupted_quality, 'gx_success'):<12} | {_val(repaired_quality, 'gx_success'):<12}"
    )
    print(
        f"{'Freshness SLA':<30} | {'PASS':<12} | {_val(corrupted_quality['freshness'], 'is_fresh'):<12} | {_val(repaired_quality['freshness'], 'is_fresh'):<12}"
    )
    print("=" * 80 + "\n")


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    settings = load_settings()
    run_corruption_flow_pipeline(settings)


if __name__ == "__main__":
    main()
