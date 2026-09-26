# Danh sách thành viên và phân công nhóm

- **Tên nhóm:** `AIGANG`
- **Mã nhóm/Lớp:** `K4-L3B-DAY10`
- **Repository:** `K4-L3B-Day10-AIGANG-DataPipelineDataObservability`

## Thành viên

| STT | Họ và tên | MSSV | Email Git | Vai trò và phần việc sở hữu | Báo cáo cá nhân |
| --: | --- | --- | --- | --- | --- |
| 1 | Dương Văn Thành | `2A202602368` | `dvthanh.it04@gmail.com` | Data Observability & Quality Assurance — `src/observability/quality.py` | [`2A202602368-DuongVanThanh.md`](../report/2A202602368-DuongVanThanh.md) |
| 2 | Hồ Ngọc Mai | `2A202602509` | `hnm908489@gmail.com` | Data Cleaning & Embedding Preparation — `src/ingestion/cleaning.py` | [`2A202602509_HoNgocMai.md`](../report/2A202602509_HoNgocMai.md) |
| 3 | Nguyễn Việt Đức | `2A202602732` | `ducsmile1111@gmail.com` | Benchmark Test Set & Baseline Integration — `src/evaluation/testset.py`, `src/pipelines/phase1.py` | [`2A202602732_NguyenVietDuc.md`](../report/2A202602732_NguyenVietDuc.md) |
| 4 | Lục Tiến Đạt | `2A202602969` | `luctiendat910@gmail.com` | Environment & Data Ingestion — `src/ingestion/crossref.py` | [`2A202602969-LucTienDat.md`](../report/2A202602969-LucTienDat.md) |
| 5 | Mai Văn Trường | `2A202602983` | `maitruong1312205@gmail.com` | Data Corruption & Recovery Integration — `src/ingestion/corruption.py`, `src/pipelines/corruption_flow.py` | [`2A202602983_MaiVanTruong.md`](../report/2A202602983_MaiVanTruong.md) |

## Cá nhân

### ## Dương Văn Thành-2A202602368

- **Vai trò:** Phụ trách Data Observability & Quality Assurance.
- **Công việc chi tiết đã hoàn thành:**
  - Thiết lập Quality Gate theo chuẩn **Great Expectations 1.x** trong `src/observability/quality.py` với sáu expectations về row count, completeness, uniqueness và độ dài `summary`.
  - Xây dựng Freshness SLA theo `age_days`: một dòng stale khi quá 180 ngày và dataset fail khi stale ratio vượt 25%.
  - Kết hợp GX và freshness thành overall quality gate; ghi quality/freshness report riêng cho từng trạng thái dữ liệu.
  - Xác minh baseline đạt 6/6 expectations, 0/24 dòng stale và quality gate pass.
- **Điều học được / Đóng góp chính:**
  - Hiểu cách kết hợp kiểm tra chất lượng cấu trúc với độ mới dữ liệu để phát hiện Silent Failure trước khi dữ liệu được đưa vào serving layer.
  - Bằng chứng: commit `e9b3625`, `data/quality/baseline_quality_report.json` và `data/quality/freshness_report.json`.

### ## Hồ Ngọc Mai-2A202602509

- **Vai trò:** Phụ trách Data Cleaning & Embedding Preparation.
- **Công việc chi tiết đã hoàn thành:**
  - Hoàn thiện `build_clean_dataframe()` trong `src/ingestion/cleaning.py`.
  - Chuẩn hóa whitespace, tác giả, lĩnh vực và ngày ISO; lọc bản ghi thiếu `paper_id` hoặc `title`.
  - Khử trùng lặp theo `paper_id`; tính `age_days`, `summary_chars`, `authors_joined` và `categories_joined`.
  - Tạo `text_for_embedding` thống nhất từ Title, Authors, Published, Categories và Summary.
  - Kiểm chứng 24 raw records tạo thành 24 dòng sạch, 24 ID duy nhất, 16 cột và không thiếu `age_days`.
- **Điều học được / Đóng góp chính:**
  - Hiểu vai trò của data contract và quá trình chuẩn hóa deterministic đối với chất lượng embedding và khả năng tái lập pipeline.
  - Bằng chứng: commit `4508caf` và `data/clean/papers_clean.csv/json`.

### ## Nguyễn Việt Đức-2A202602732

- **Vai trò:** Phụ trách Benchmark Test Set & Baseline Pipeline Integration.
- **Công việc chi tiết đã hoàn thành:**
  - Hoàn thiện `build_test_set()` trong `src/evaluation/testset.py`.
  - Sinh bộ benchmark 10 câu hỏi gồm 3 `summary`, 3 `authors`, 2 `date`, 2 `categories`, gắn với 10 DOI ground truth riêng biệt.
  - Tích hợp ingestion, cleaning, indexing, evaluation và observability trong `src/pipelines/phase1.py`.
  - Sinh baseline metrics, answers và báo cáo Phase 1 từ artifact thực tế.
  - Xác minh baseline đạt retrieval hit rate `1.000`, mean token F1 `1.000` và quality gate pass.
- **Điều học được / Đóng góp chính:**
  - Hiểu cách thiết kế benchmark có ground truth ổn định và giữ nguyên test set để so sánh công bằng giữa baseline, corrupted và repaired.
  - Bằng chứng: commit `daebcee`, `data/eval/test_set.json` và artifact pipeline tại commit `e243cea`.

### ## Lục Tiến Đạt-2A202602969

- **Vai trò:** Phụ trách Environment & Data Ingestion.
- **Công việc chi tiết đã hoàn thành:**
  - Thiết lập môi trường dự án và cài dependencies bằng `uv`.
  - Hoàn thiện `parse_crossref_payload()`, `fetch_source_records()` và `load_raw_records()` trong `src/ingestion/crossref.py`.
  - Parse DOI, title, abstract, authors, categories, dates và URL thành các đối tượng `PaperRecord`.
  - Loại thẻ HTML/JATS khỏi abstract và fallback sang raw snapshot khi Crossref lỗi hoặc trả non-200.
  - Bảo toàn 24 records tại `crossref_response.json` và `crossref_records.json` để làm lineage anchor cho repair.
- **Điều học được / Đóng góp chính:**
  - Hiểu nguyên tắc Raw Data Preservation và vai trò của nguồn dữ liệu bất biến đối với khả năng replay, phục hồi idempotent.
  - Bằng chứng: commits `d2bb800`, `e243cea` và các artifact trong `data/raw/`.

### ## Mai Văn Trường-2A202602983

- **Vai trò:** Phụ trách Data Corruption & Self-Healing Pipeline.
- **Công việc chi tiết đã hoàn thành:**
  - Triển khai sáu corruption: drop latest records, blank summary, inject noise, truncate title, stale date và duplicate rows trong `src/ingestion/corruption.py`.
  - Ghi `corruption_log.json`, build collection `papers-corrupted` và đánh giá lại trên cùng benchmark.
  - Triển khai `repair_from_raw_snapshot()` để replay raw source, làm sạch và build collection `papers-repaired`.
  - Sinh báo cáo tự động đối chiếu Baseline, Corrupted và Repaired tại `data/reports/corruption_report.md`.
  - Xác minh corrupted quality/freshness fail, hit rate giảm `1.000 → 0.600`, Token F1 giảm `1.000 → 0.646`; repaired phục hồi về baseline.
- **Điều học được / Đóng góp chính:**
  - Hiểu hiện tượng Silent Failure và cách phục hồi idempotent từ lineage anchor thay vì vá trực tiếp dữ liệu đã hỏng.
  - Bằng chứng: commits `d9ddfc1`, `7d8e3af` và artifact thực nghiệm tại commit `e243cea`.
