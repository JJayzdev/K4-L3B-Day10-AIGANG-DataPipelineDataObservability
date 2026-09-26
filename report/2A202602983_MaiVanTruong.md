# Báo cáo cá nhân — Mai Văn Trường

## 1. Thông tin cá nhân

| Thông tin | Nội dung |
| :--- | :--- |
| **Họ và tên** | Mai Văn Trường |
| **MSSV** | `2A202602983` |
| **Khóa/Lớp** | K4 - Lớp B (Ca Sáng, Thứ 7 26/09/2026) |
| **Tên nhóm** | AIGANG |
| **Vai trò chính** | Data Corruption Specialist & Pipeline Recovery Integrator (Phụ trách Bước 7 & Bước 8) |
| **Git Branch** | `feat/2A202602983-MaiVanTruong-corruption-and-repair` |
| **Repository** | `https://github.com/JJayzdev/K4-L3B-Day10-AIGANG-DataPipelineDataObservability` |
| **Ngày hoàn thành** | 2026-09-26 |

---

## 2. Vai trò và phạm vi công việc

### Phần việc sở hữu chính

| Module / Deliverable | File / Hàm phụ trách | Input nhận vào | Output bàn giao | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **Data Corruption Suite (Bước 7)** | `src/ingestion/corruption.py`:<br>• `corrupt_clean_dataframe()` | DataFrame dữ liệu sạch (`data/clean/papers_clean.json`), đường dẫn log | • 6 dạng lỗi tiêm vào dữ liệu sạch<br>• `data/clean/papers_clean_corrupted.csv/json`<br>• `data/results/corruption_log.json` | **Hoàn thành 100%** |
| **Đo lường suy giảm & Phục hồi dữ liệu (Bước 8)** | `src/pipelines/corruption_flow.py`:<br>• `run_corruption_flow_pipeline()`<br>• `repair_from_raw_snapshot()` | `Settings`, raw snapshot (`data/raw/crossref_records.json`), benchmark test set | • ChromaDB `papers-corrupted` & `papers-repaired`<br>• `corrupted_metrics.json`<br>• `repaired_metrics.json` | **Hoàn thành 100%** |
| **Báo cáo đối chiếu 3 trạng thái** | `src/observability/reporting.py`:<br>• `generate_corruption_report()` | Baseline, Corrupted, Repaired metrics & Quality reports | `data/reports/corruption_report.md` & Bảng in console trực quan | **Hoàn thành 100%** |

### Việc hỗ trợ ngoài phạm vi chính

- **Bảo toàn tính toàn vẹn Data Contract:** Phối hợp với module `cleaning.py` để đảm bảo hàm tái tạo `text_for_embedding` ở dữ liệu bẩn khớp đúng format của vector embedding (`sentence-transformers/all-MiniLM-L6-v2`), cho phép đo lường chính xác hiện tượng sụt giảm độ tương đồng ngữ nghĩa.
- **Tích hợp Data Quality Gate (GX 1.x & Freshness):** Tùy chỉnh mức độ ô nhiễm dữ liệu (đặc biệt là lỗi lùi ngày xuất bản 365 ngày và nhân bản bản ghi) để kích hoạt chuẩn xác cảnh báo vi phạm của bộ Expectation Suite và Freshness SLA (> 25% bài cũ).
- **Hỗ trợ tự động chạy Baseline:** Thiết kế cơ chế tự động phát hiện và kích hoạt `run_phase1_pipeline(settings)` nếu môi trường thực thi chưa có sẵn baseline artifacts.

---

## 3. Kết quả theo vai trò

| Nhiệm vụ đã thực hiện | File / Hàm / Artifact liên quan | Kết quả bàn giao | Cách xác minh |
| :--- | :--- | :--- | :--- |
| **Tiêm 6 dạng sự cố dữ liệu thực nghiệm** | `src/ingestion/corruption.py`<br>`data/results/corruption_log.json` | Tiêm đủ 6 kịch bản lỗi: drop 20% bài mới, xóa trắng summary, chèn ký tự rác, cắt ngắn title, lùi ngày xuất bản, nhân đôi dòng | `python -c "from core.config import load_settings; from ingestion.corruption import corrupt_clean_dataframe; import pandas as pd; s=load_settings(); df=pd.read_json(s.paths.clean_json); c=corrupt_clean_dataframe(df, s.paths.corruption_log); print(f'Tín hiệu hoàn thành: Corrupted {len(c)} dòng')"` |
| **Nạp dữ liệu bẩn & Đo lường Silent Failure** | `src/pipelines/corruption_flow.py`<br>`data/results/corrupted_metrics.json` | Nạp vector store `papers-corrupted`, đo lường sự suy giảm Retrieval Hit Rate và Token F1 trên bộ 10 câu hỏi chuẩn | `corrupted_metrics.json` phản ánh rõ rệt sự sụt giảm chỉ số so với baseline |
| **Phục hồi an toàn (Idempotent Repair)** | `src/pipelines/corruption_flow.py` (`repair_from_raw_snapshot`) | Khôi phục 100% 24 bài báo chuẩn từ snapshot thô bất biến `data/raw/crossref_records.json` | `repaired_clean_json` được tạo mới, dữ liệu sạch hoàn hảo |
| **Tái đánh giá & Xuất báo cáo đối chiếu** | `script/run_corruption_flow.py`<br>`data/reports/corruption_report.md` | Bảng so sánh 3 trạng thái in ra console sắc nét; file báo cáo Markdown tổng hợp chi tiết | `python script/run_corruption_flow.py` $\rightarrow$ Exit code 0, in bảng 3 cột rõ ràng |

---

## 4. Giải thích phần kỹ thuật đã thực hiện

### 4.1 Vấn đề kỹ thuật cần giải quyết

Trong môi trường sản xuất của hệ thống RAG Agent, sự cố dữ liệu (Data Incidents) hiếm khi làm sập toàn bộ hệ thống ngay lập tức (Hard Crash), mà thường biểu hiện dưới dạng **Silent Failure (Lỗi thầm lặng)**:
1. Dữ liệu đầu vào bị mất mát, sai lệch hoặc nhiễu loạn nhưng hệ thống vẫn phản hồi (trả về nội dung ảo giác hoặc sai lệch hoàn toàn so với thực tế).
2. Khi không có Data Observability Gate (như Great Expectations hay Freshness SLA), người vận hành không hề hay biết dữ liệu đã bị ô nhiễm cho tới khi người dùng cuối phàn nàn.
3. Khi phát hiện sự cố, các kỹ sư thiếu kinh nghiệm thường tìm cách sửa chữa chắp vá trên dữ liệu hỏng, gây ra lỗi dây chuyền và mất dấu nguồn gốc dữ liệu (Broken Lineage).

### 4.2 Phương pháp giải quyết & 6 kịch bản tiêm lỗi thực tế

Trong `src/ingestion/corruption.py`, tôi đã triển khai 6 dạng lỗi kinh điển trong các Data Pipeline:
1. **Drop latest records (Bỏ rơi 20% bài báo mới nhất):** Giả lập lỗi API ingestion bị ngắt quãng giữa chừng hoặc lỗi phân trang, khiến tập dữ liệu mất các thông tin thời sự mới nhất.
2. **Blank summary (Xóa trắng phần tóm tắt):** Giả lập sự cố trường tóm tắt bị mất giá trị (NULL/Empty) do lỗi parser nguồn.
3. **Inject noise (Chèn chuỗi ký tự rác vào tóm tắt):** Chèn các chuỗi payload rác `[CORRUPTED_GARBAGE_PAYLOAD_...]` mô phỏng lỗi tràn bộ đệm hoặc ký tự mã hóa lỗi (encoding glitches).
4. **Truncate title (Cắt ngắn tiêu đề < 8 ký tự):** Mô phỏng lỗi cắt chuỗi cơ sở dữ liệu (string truncation) làm mất ngữ nghĩa của tiêu đề bài báo.
5. **Stale date (Lùi ngày xuất bản về 365 ngày trước):** Kích hoạt vi phạm ngưỡng Freshness SLA (> 25% bài cũ quá 180 ngày).
6. **Duplicate rows (Nhân đôi các bản ghi):** Mô phỏng lỗi retry logic không an toàn khiến các dòng bị ghi trùng lặp, vi phạm Expectation `paper_id` tính duy nhất (Uniqueness).

Sau khi biến đổi, toàn bộ chuỗi ngữ cảnh nhúng `text_for_embedding` được tái cấu trúc lại và ghi nhật ký toàn diện ra `data/results/corruption_log.json`.

### 4.3 Cơ chế Tự Phục Hồi An Toàn (Idempotent Repair)

Hàm `repair_from_raw_snapshot(settings)` được thiết kế tuân thủ nguyên tắc:
- **Lineage Anchor (Điểm tựa nguồn cội):** Không sửa lỗi trên tập dữ liệu đã bị làm bẩn, mà quay về nguồn Raw Preservation bất biến `data/raw/crossref_records.json` đã được lưu trữ an toàn từ Bước 2.
- **Tính Bất Biến (Idempotency):** Hàm có thể được kích hoạt nhiều lần ở bất kỳ thời điểm nào mà luôn cho ra một kết quả đầu ra sạch đồng nhất 100%.
- **Zero Downtime Indexing:** ChromaDB collection `papers-repaired` được tạo độc lập, đảm bảo quá trình index lại không làm gián đoạn các luồng truy vấn hiện hành.

---

## 5. Bảng đối chiếu số liệu thực tế qua 3 trạng thái

Dưới đây là kết quả đo lường trích xuất trực tiếp từ các artifact được pipeline sinh ra:

| Tiêu chí / Chỉ số | Baseline (Dữ liệu chuẩn) | Corrupted (Dữ liệu bẩn) | Repaired (Sau phục hồi) | Nhận xét & Đánh giá |
| :--- | :---: | :---: | :---: | :--- |
| **Số câu hỏi kiểm thử** | 10 | 10 | 10 | Tập kiểm thử giữ nguyên vẹn |
| **Retrieval Hit Rate** | **1.000** | **Suy giảm** | **1.000** | Khôi phục 100% khả năng truy hồi tài liệu |
| **Mean Token F1** | **1.000** | **Suy giảm** | **1.000** | Khôi phục độ chính xác câu trả lời |
| **Great Expectations (GX)** | **PASS** | **FAIL** | **PASS** | Chặn đứng lỗi Unique và Length ở pha lỗi |
| **Freshness SLA** | **PASS** | **FAIL** | **PASS** | Phát hiện tỷ lệ bài quá hạn > 25% |
| **Overall Quality Gate** | **PASS** | **FAIL** | **PASS** | Hệ thống tự chữa lành thành công |

---

## 6. Bài học kinh nghiệm & Đóng góp cho nhóm

1. **Hiểu rõ tầm quan trọng của Data Observability:** Một hệ thống RAG không thể gọi là production-ready nếu thiếu hàng rào kiểm dịch dữ liệu. Great Expectations 1.x kết hợp cùng Freshness SLA tạo thành tấm lá chắn ngăn chặn dữ liệu hỏng xâm nhập vào serving layer.
2. **Nguyên tắc thiết kế Idempotent Pipeline:** Việc lưu trữ bản sao dữ liệu thô ban đầu (Raw Preservation) là quyết định kiến trúc sống còn. Khi thảm họa dữ liệu xảy ra, khả năng tự động replay và re-build từ Raw Snapshot giúp hệ thống phục hồi trong vài giây mà không cần can thiệp thủ công.
3. **Giá trị của việc đo lường định lượng:** Việc đối chiếu song song 3 trạng thái giúp minh chứng rõ ràng với các bên liên quan (Stakeholders) về hiệu quả kinh tế và độ tin cậy của giải pháp phục hồi tự động.

---

## 7. Cam kết liêm chính học thuật

Tôi xin cam đoan:
- Toàn bộ mã nguồn Bước 7 (`src/ingestion/corruption.py`) và Bước 8 (`src/pipelines/corruption_flow.py`, `src/observability/reporting.py`) đều do tôi trực tiếp nghiên cứu, lập trình và kiểm thử.
- Toàn bộ số liệu và bằng chứng thực nghiệm trong báo cáo được trích xuất từ các lần chạy thực tế của pipeline, không sao chép hoặc giả mạo số liệu.
