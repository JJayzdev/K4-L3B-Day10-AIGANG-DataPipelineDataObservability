# Báo Cáo Pha 1 — Baseline Pipeline & Data Observability

> **Thời gian chạy:** 2026-09-26 03:26:28 UTC  
> **Trạng thái tổng thể:** ✅ ĐẠT CHUẨN (PASSED)

---

## 1. Tóm Tắt Dữ Liệu (Ingestion & Cleaning)

| Thông số | Giá trị |
| :--- | :--- |
| Nguồn dữ liệu | Crossref REST API (`agentic retrieval augmented generation large language model`) |
| Số bài báo cào về / lưu trữ thô | 24 |
| Số bài báo sau làm sạch (Deduplicated) | **24** |
| File lưu sạch (Clean Artifacts) | `papers_clean.csv`, `papers_clean.json` |
| Vector Store | ChromaDB (Collection: `papers-baseline`) |
| Embedding Model | `sentence-transformers/all-MiniLM-L6-v2` |

---

## 2. Kết Quả Data Quality Gate & Freshness SLA (Great Expectations 1.x)

| Hàng rào kiểm định (Expectation) | Ngưỡng yêu cầu | Kết quả | Trạng thái |
| :--- | :--- | :--- | :---: |
| `ExpectTableRowCountToBeBetween` | [5, 5000] | 24 dòng | ✅ PASS |
| `ExpectColumnValuesToNotBeNull` | `paper_id`, `title`, `text_for_embedding` | 0 null | ✅ PASS |
| `ExpectColumnValuesToBeUnique` | `paper_id` | 100% Unique | ✅ PASS |
| `ExpectColumnValueLengthsToBeBetween` | `summary` length >= 30 | Đạt chuẩn | ✅ PASS |
| **Freshness SLA** | `age_days <= 180` (Tỷ lệ cũ <= 25%) | Stale ratio: 0.0% | ✅ PASS |

---

## 3. Chỉ Số Đánh Giá Baseline RAG (Benchmark Metrics)

Đánh giá trên bộ Ground Truth gồm **10 câu hỏi** đa dạng 4 dạng bài toán: `summary`, `authors`, `date`, `categories`.

| Chỉ số đánh giá (Metric) | Kết quả Baseline | Diễn giải |
| :--- | :---: | :--- |
| **Retrieval Hit Rate** | **100.0%** | Tỷ lệ tài liệu chuẩn xuất hiện trong top-k retrieval |
| **Mean Token F1** | **100.0%** | Độ trùng khớp từ vựng giữa câu trả lời AI và Ground Truth |
| **Judge Accuracy** | **100.0%** | Tỷ lệ câu trả lời được đánh giá đúng về mặt ngữ nghĩa |
| **Mean Judge Score** | **5.00 / 5.0** | Điểm số trung bình thang điểm 1-5 |

---

## 4. Chi Tiết Câu Trả Lời Mẫu (Sample Answers)

| ID | Dạng câu hỏi | Câu hỏi | AI Trả Lời | Hit | Token F1 |
| :--- | :--- | :--- | :--- | :---: | :---: |
| `eval_001` | summary | What is the summary of the paper 'DOLPHIN: A ... | Abstract Increasingly, digital forensic inves... | ✅ | 1.00 |
| `eval_002` | summary | What is the summary of the paper 'Retrieval-A... | Large language models have accelerated the de... | ✅ | 1.00 |
| `eval_003` | summary | What is the summary of the paper 'Agentic Ret... | Abstract Urban Cyber-Physical Systems (UCPS) ... | ✅ | 1.00 |
| `eval_004` | authors | Who are the authors of the paper 'Advances in... | Zunlong Hong | ✅ | 1.00 |
| `eval_005` | authors | Who are the authors of the paper 'Intelligent... | Serhii Arefiev, Serhii Hildi | ✅ | 1.00 |

---
*Báo cáo được sinh tự động bởi hệ thống Data Pipeline & Data Observability.*
