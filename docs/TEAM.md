# Danh Sách Thành Viên & Báo Cáo Phân Công Nhóm

- **Tên Nhóm:** `AIGANG`
- **Mã Nhóm / Lớp:** `K4-L3-DAY10`
- **Tên Repository Nộp Bài:** `K4-L3B-Day10-AIGANG-DataPipelineDataObservability`

---

## # Thành viên

| STT | Họ và tên | MSSV | Email | Vai trò & Phân công công việc | Báo cáo cá nhân |
|---:|---|---|---|---|---|
| STT | Họ và tên | MSSV | Email | Vai trò & Phân công công việc | Báo cáo cá nhân |
|---:|---|---|---|---|---|
| 1 | Nguyễn Việt Đức | 2A202602732 | vietduc@example.com | Benchmark Test Set & Baseline Pipeline (Bước 5 & Bước 6) | `report/2A202602732_NguyenVietDuc.md` |
| 2 | Lục Tiến Đạt | 2A202602969 | luctiendat910@gmail.com | Data Foundation & Ingestion (`crossref.py`, Bước 1 & Bước 2) | `report/individual_report_2A202602969_LucTienDat.md` |
| 3 | Mai Văn Trường | 2A202602983 | vantruong2a2026@gmail.com | Data Corruption & Self-Healing Pipeline (Bước 7 & Bước 8: `corruption.py`, `corruption_flow.py`) | `report/2A202602983_MaiVanTruong.md` |
| 4 | Thành viên 4 | | | Data Observability & Quality Assurance (`quality.py` GX 1.x) | `report/individual_report.md` |

*(Nếu nhóm có 3 hoặc 5-6 thành viên, xem bảng phân công chi tiết theo vai trò trong file `CHECKPOINTS.md`)*.

---

## # Cá nhân

### ## Nguyễn Việt Đức - 2A202602732
- **Vai trò:** Phụ trách Benchmark Test Set (Bước 5) & Baseline Pipeline (Bước 6).
- **Công việc chi tiết đã hoàn thành:**
  - Thiết lập bộ đề đánh giá 10 câu hỏi chuẩn hóa trong `src/evaluation/testset.py`.
  - Kết nối luồng thực thi trong `src/pipelines/phase1.py` và `script/run_phase1.py`.
  - Sinh báo cáo baseline `data/reports/phase1_report.md`.
- **Điều học được / Đóng góp chính:**
  - Hiểu sâu sắc về thiết kế Benchmark Test Set và luồng tích hợp Pipeline baseline.

### ## Lục Tiến Đạt
- **Vai trò:** Phụ trách Khởi tạo môi trường & Data Ingestion (Bước 1 & Bước 2).
- **Công việc chi tiết đã hoàn thành:**
  - Thiết lập môi trường ảo `.venv`, xử lý lỗi PyPI timeout qua việc tích hợp `uv` cài đặt đồng bộ 161 thư viện.
  - Xây dựng module thu thập Crossref REST API trong `src/ingestion/crossref.py` với cơ chế cứu hộ Offline Fallback khi dính `429 Too Many Requests`.
  - Bóc tách payload thành 24 đối tượng `PaperRecord`, lọc sạch HTML rác `<jats:p>` và cất giữ 2 file raw artifacts (`crossref_response.json`, `crossref_records.json`).
- **Điều học được / Đóng góp chính:**
  - Nắm vững nguyên tắc Raw Data Preservation (Lineage Anchor) để làm điểm tựa cho các cơ chế phục hồi dữ liệu phía sau.

### ## Mai Văn Trường - 2A202602983
- **Vai trò:** Phụ trách Tiêm lỗi Dữ liệu Thực nghiệm (Bước 7) & Đo lường Suy giảm, Phục hồi An toàn và Đối chiếu 3 trạng thái (Bước 8).
- **Công việc chi tiết đã hoàn thành:**
  - Hoàn thiện module `src/ingestion/corruption.py`: giả lập 6 kịch bản sự cố dữ liệu thực tế (bỏ 20% bài mới nhất, xóa trắng tóm tắt, chèn chuỗi ký tự rác, cắt ngắn tiêu đề < 8 ký tự, lùi ngày xuất bản 365 ngày để kích hoạt cảnh báo vi phạm Freshness SLA, nhân bản dòng tạo lỗi trùng lặp `paper_id`). Tái lập cấu trúc `text_for_embedding` và ghi chi tiết nhật ký biến đổi `data/results/corruption_log.json`.
  - Hoàn thiện pipeline `src/pipelines/corruption_flow.py`: nạp dữ liệu bẩn vào ChromaDB (`papers-corrupted`), đo lường sự suy giảm hiệu năng RAG (hiện tượng Silent Failure), kích hoạt cơ chế phục hồi dữ liệu an toàn `repair_from_raw_snapshot()` từ snapshot thô ban đầu (`data/raw/crossref_records.json`), tái đánh giá trên collection `papers-repaired`.
  - Cài đặt hàm kết xuất báo cáo `generate_corruption_report()` trong `src/observability/reporting.py`, tự động xuất bảng so sánh 3 trạng thái (Baseline vs Corrupted vs Repaired) tại `data/reports/corruption_report.md` và in console trực quan.
- **Điều học được / Đóng góp chính:**
  - Hiểu rõ bản chất hiện tượng Silent Failure trong các hệ thống RAG phục vụ sản xuất khi dữ liệu bị lỗi âm thầm làm giảm sút chất lượng phản hồi mà không gây crash hệ thống nếu thiếu Data Observability.
  - Nắm vững kiến trúc Phục hồi Bất biến (Idempotent Repair) dựa trên Lineage Anchor (Raw Preservation), đảm bảo pipeline có khả năng tự sửa chữa và khôi phục hiệu năng chuẩn 100%.

### ## HoVaTen4-MSSV4
- **Vai trò:** Phụ trách Data Observability & Benchmark Evaluation.
- **Công việc chi tiết đã hoàn thành:**
  - Thiết lập Quality Gate theo chuẩn mới **Great Expectations 1.x** và giám sát Freshness SLA trong `src/observability/quality.py`.
  - Xây dựng bộ câu hỏi đánh giá chuẩn trong `src/evaluation/testset.py`.
  - Đo lường và xuất bảng đối chiếu 3 trạng thái vào `data/reports/corruption_report.md`.
- **Điều học được / Đóng góp chính:**
  - Cách thiết lập hệ thống cảnh báo sớm chặn đứng hiện tượng Silent Failure trước khi dữ liệu vào serving layer.
