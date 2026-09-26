# Member Role Report — Day 10: Data Pipeline & Data Observability

> **Báo cáo cá nhân thành viên:** Lục Tiến Đạt  
> **Phần việc phụ trách chính:** Bước 1 (Khởi Tạo Môi Trường & Cấu Hình) & Bước 2 (Thu Thập Dữ Liệu & Cất Giữ Bản Gốc Raw Preservation)

---

## 1. Thông tin cá nhân

| Thông tin | Nội dung |
| :--- | :--- |
| **Họ và tên** | Lục Tiến Đạt |
| **MSSV** | `2A202602969` |
| **Khóa/Lớp** | K4 - Lớp B (Ca Sáng, Thứ 7 26/09/2026) |
| **Tên nhóm** | AIGANG |
| **Vai trò chính** | Data Foundation & Ingestion Specialist (Phụ trách Bước 1 & Bước 2) |
| **Repository** | `https://github.com/JJayzdev/K4-L3B-Day10-AIGANG-DataPipelineDataObservability` |
| **Ngày hoàn thành** | 2026-09-26 |

---

## 2. Vai trò và phạm vi công việc

### Phần việc sở hữu chính

| Module / Deliverable | File / Hàm phụ trách | Input nhận vào | Output bàn giao | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **Khởi tạo môi trường (Bước 1)** | `.venv`, `.env`, `pyproject.toml`, `requirements.txt` | Python 3.11, file cấu hình mẫu `.env.example` | Môi trường ảo hoàn thiện với 161 thư viện, file `.env` chuẩn | **Hoàn thành 100%** |
| **Thu thập dữ liệu Crossref API (Bước 2)** | `src/ingestion/crossref.py`:<br>• `parse_crossref_payload()`<br>• `fetch_source_records()`<br>• `load_raw_records()` | Cấu hình `Settings` (`source_query`, `source_filter`, `max_results=24`) | • 24 đối tượng `PaperRecord`<br>• `data/raw/crossref_response.json`<br>• `data/raw/crossref_records.json` | **Hoàn thành 100%** |

### Việc hỗ trợ ngoài phạm vi chính

| Hoạt động | Thành viên / Module được hỗ trợ | Kết quả và bằng chứng |
| :--- | :--- | :--- |
| **Tích hợp Data Cleaning** | Bước 3 (`src/ingestion/cleaning.py`) | Đảm bảo cấu trúc `PaperRecord` khớp 100% các trường cần thiết (`paper_id`, `title`, `summary`, `authors`, `categories`, `published`) để Bước 3 tính `age_days` và ghép `text_for_embedding` mượt mà. |
| **Cơ chế Cứu hộ Phục hồi (Idempotent Repair)** | Bước 8 (`src/pipelines/corruption_flow.py`) | Đảm bảo file `data/raw/crossref_records.json` được bảo toàn nguyên vẹn làm điểm tựa phục hồi (Lineage Anchor), giúp hàm `repair_from_raw_snapshot()` khôi phục lại 24 bài sạch khi dữ liệu bị tiêm lỗi. |

---

## 3. Kết quả theo vai trò

| Nhiệm vụ đã thực hiện | File / Hàm / Artifact liên quan | Kết quả bàn giao | Cách xác minh |
| :--- | :--- | :--- | :--- |
| **Cài đặt & Fix lỗi môi trường** | `.venv/`, `pyproject.toml` | Cài đặt trọn vẹn 161 packages gồm Torch, ChromaDB, Great Expectations 1.x, Transformers | `python -c "import chromadb, great_expectations, sentence_transformers; print('Environment Ready!')"` $\rightarrow$ In ra `Environment Ready!` |
| **Bóc tách Crossref Payload** | `src/ingestion/crossref.py` (`parse_crossref_payload`) | Chuẩn hóa DOI, lọc bỏ thẻ HTML rác `<jats:p>`, bóc tách authors, categories và ngày xuất bản dạng `YYYY-MM-DD` | Parse thành công 24 đối tượng `PaperRecord` hợp lệ |
| **Thu thập API & Cứu hộ Offline** | `src/ingestion/crossref.py` (`fetch_source_records`) | Kết nối REST API `https://api.crossref.org/works`, cơ chế Fallback snapshot khi mạng lag/429 | `python -c "from core.config import load_settings; from ingestion.crossref import fetch_source_records; s=load_settings(); r=fetch_source_records(s); print(f'Tín hiệu hoàn thành: Đã tải {len(r)} bài báo')"` $\rightarrow$ In ra `Tín hiệu hoàn thành: Đã tải 24 bài báo` |
| **Bảo tồn Raw Artifacts** | `data/raw/crossref_response.json`<br>`data/raw/crossref_records.json` | Cất giữ nguyên vẹn bản thô API (228 KB) và danh sách records đã trích xuất (58 KB) | Hai file tồn tại đầy đủ trong thư mục `data/raw/` |

**Output cụ thể chứng minh phần việc:**
- Artifact thô `data/raw/crossref_response.json` (228,168 bytes, 24 items nguyên bản từ Crossref API).
- Artifact bóc tách `data/raw/crossref_records.json` (58,841 bytes, 24 records với đầy đủ schema chuẩn).
- Tín hiệu console xác nhận: `Tín hiệu hoàn thành: Đã tải 24 bài báo`.

---

## 4. Giải thích phần kỹ thuật đã thực hiện

### Vấn đề cần giải quyết
1. **Dữ liệu từ môi trường ngoài không ổn định:** REST API công khai của Crossref có thể trả về lỗi `429 Too Many Requests`, timeout hoặc ngắt kết nối do giới hạn băng thông. Nếu không có cơ chế xử lý ngoại lệ và lưu bản sao tĩnh, toàn bộ pipeline phía sau (Cleaning, Indexing, Observability, QA) sẽ bị sụp đổ ngay từ khâu đầu tiên.
2. **Dữ liệu thô chứa nhiều rác và cấu trúc phức tạp:** Trường tóm tắt bài báo (`abstract`) chứa các thẻ XML/HTML rác như `<jats:p>`, `<jats:title>`; ngày xuất bản nằm sâu trong mảng lồng `date-parts: [[2026, 5, 20]]`; tên tác giả phân tách thành `given` và `family`. Cần phải chuẩn hóa thành một Data Contract thống nhất.
3. **Data Lineage & Raw Preservation:** Theo nguyên tắc Data Observability, dữ liệu cào về bắt buộc phải được giữ nguyên vẹn (Immutable Raw Layer) để làm điểm neo truy vết nguồn gốc và phục vụ việc tự phục hồi (Self-healing).

### Cách triển khai
- **Xây dựng Data Contract `PaperRecord`:** Sử dụng Python `@dataclass(frozen=True)` để đảm bảo tính bất biến (immutability) của bản ghi sau khi trích xuất.
- **Làm sạch định dạng tóm tắt:** Sử dụng biểu thức chính quy `re.sub(r"<[^>]+>", " ", abstract)` để loại bỏ hoàn toàn các thẻ HTML/XML, đồng thời chuẩn hóa khoảng trắng thừa.
- **Chuẩn hóa ngày xuất bản:** Bóc tách mảng `date-parts` và ép về định dạng ISO `YYYY-MM-DD` (`f"{year:04d}-{month:02d}-{day:02d}"`), có fallback về ngày tạo (`created`) nếu thiếu.
- **Cơ chế Fallback thông minh:** Trong hàm `fetch_source_records()`, bọc khối gọi API trong `try...except` với `timeout=10s`. Nếu gặp lỗi kết nối hoặc HTTP status $\ne 200$, hệ thống tự động fallback đọc snapshot cục bộ tại `data/raw/crossref_response.json` mà không làm dừng tiến trình.

### Input, output và contract

| Thành phần | Mô tả |
| :--- | :--- |
| **Input** | Tham số cấu hình `Settings`: `source_query` ("agentic retrieval augmented generation large language model"), `source_filter`, `max_results=24`. |
| **Output** | `list[PaperRecord]` (24 bản ghi), file `crossref_response.json` và `crossref_records.json`. |
| **Module phụ thuộc** | `core.config.Settings`, thư viện `requests`, `json`, `dataclasses`. |
| **Module sử dụng output** | `src/ingestion/cleaning.py` (hàm `build_clean_dataframe`). |
| **Điều kiện lỗi xử lý** | Mạng rớt, timeout, API Crossref báo lỗi HTTP 429/503 $\rightarrow$ Chuyển sang đọc snapshot mẫu `data/raw/crossref_response.json`. |

### Cách xác minh
```powershell
$env:PYTHONIOENCODING="utf-8"
$env:PYTHONPATH="src"
python -c "from core.config import load_settings; from ingestion.crossref import fetch_source_records; s=load_settings(); r=fetch_source_records(s); print(f'Tín hiệu hoàn thành: Đã tải {len(r)} bài báo')"
```
- **Kết quả mong đợi:** In ra dòng `Tín hiệu hoàn thành: Đã tải 24 bài báo`.
- **Kết quả thực tế:**
  ```text
  Tín hiệu hoàn thành: Đã tải 24 bài báo
  ```
- **Artifact kiểm chứng:** `data/raw/crossref_response.json` và `data/raw/crossref_records.json`.

---

## 5. Một quyết định kỹ thuật quan trọng

- **Bối cảnh:** Khi xây dựng hàm `fetch_source_records()`, cần quyết định cách ứng xử khi gọi Crossref REST API công khai gặp sự cố mạng hoặc dính `429 Too Many Requests`.
- **Các phương án đã cân nhắc:**
  - *Phương án 1 (Strict Live Fetching):* Bắt buộc phải gọi thành công API ngoài, nếu lỗi thì retry vô hạn với exponential backoff.
  - *Phương án 2 (Offline Snapshot Fallback):* Thử gọi API ngoài một lần với timeout hợp lý; nếu không thành công hoặc trả về mã lỗi, tự động kích hoạt cơ chế fallback đọc từ snapshot offline `data/raw/crossref_response.json` đã được lưu trữ sẵn trong repo.
- **Phương án đã chọn:** **Phương án 2 (Offline Snapshot Fallback).**
- **Lý do lựa chọn:** 
  1. *Tính sẵn sàng (High Availability):* Đảm bảo luồng thực thi của nhóm không bị tắc nghẽn giữa chừng do yếu tố ngoại cảnh (mạng phòng lab hoặc server Crossref quá tải).
  2. *Tính tái lặp (Reproducibility):* Giúp toàn bộ nhóm và giảng viên khi chấm bài có thể chạy lại quy trình một cách nhất quán (deterministic).
  3. *Nguyên tắc thiết kế hệ thống dữ liệu hiện đại:* Tách biệt giữa khâu thu nhận (Ingestion) và xử lý hạ tầng, luôn có kịch bản dự phòng cho external dependencies.
- **Bằng chứng:** Khi chạy thực tế, hệ thống vẫn đảm bảo nạp đúng và đủ 24 bài báo học thuật chuẩn để cung cấp cho các bước Cleaning và Vector Indexing tiếp theo.

---

## 6. Một lỗi hoặc blocker đã xử lý (Critical Blocker)

- **Triệu chứng / Lỗi nguyên văn:**
  Khi bắt đầu bài lab, chạy lệnh cài đặt `python -m pip install -e .` thì gặp lỗi:
  ```text
  WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ReadTimeoutError("HTTPSConnectionPool(host='pypi.org', port=443): Read timed out. (read timeout=15)")': /simple/pandas/
  ERROR: Could not find a version that satisfies the requirement pandas>=2.2.2 (from day10-data-observability-lab-student) (from versions: none)
  ERROR: No matching distribution found for pandas>=2.2.2
  ```
  Sau đó khi thử kiểm tra import:
  ```text
  ModuleNotFoundError: No module named 'chromadb'
  ```
- **Nguyên nhân gốc:**
  1. Môi trường ảo `.venv` ban đầu chứa phiên bản pip quá cũ (`pip 22.3` đi kèm Python 3.11 từ năm 2022), cơ chế timeout mặc định chỉ có 15 giây và thuật toán phân giải gói đơn luồng rất chậm.
  2. Mạng quốc tế tới máy chủ PyPI bị nghẽn trong quá trình tải các gói khoa học dữ liệu lớn (`torch`, `pandas`, `chromadb`, `scipy`), dẫn đến việc pip hết thời gian chờ và hiểu nhầm là không tìm thấy gói phân phối.
- **Cách xử lý:**
  1. Nâng cấp pip lên phiên bản mới nhất:
     ```powershell
     python -m pip install --upgrade pip
     ```
     (Nâng cấp thành công lên `pip 26.2.1`).
  2. Cài đặt công cụ package manager thế hệ mới **`uv`** (viết bằng Rust) vào môi trường:
     ```powershell
     python -m pip install uv
     ```
  3. Sử dụng `uv` để tải song song đa luồng và đồng bộ toàn bộ 161 thư viện:
     ```powershell
     uv pip install -e .
     ```
- **Cách xác minh sau khi sửa:**
  Chạy lệnh kiểm tra môi trường:
  ```powershell
  python -c "import chromadb, great_expectations, sentence_transformers; print('Environment Ready!')"
  ```
  Kết quả in ra chuẩn xác:
  ```text
  Environment Ready!
  ```
- **Điều học được:** Khi làm việc với các stack AI/Data nặng (Torch, Transformers, ChromaDB, Great Expectations), các công cụ quản lý gói truyền thống đơn luồng rất dễ bị lỗi mạng cục bộ. Việc ứng dụng các công cụ hiện đại như `uv` giúp tối ưu hóa thời gian thiết lập môi trường từ hàng chục phút xuống dưới 1 phút và đảm bảo tính ổn định tuyệt đối.

---

## 7. Hiểu biết về luồng end-to-end

1. **Dữ liệu đi từ Crossref đến vector index như thế nào?**
   - Dữ liệu metadata thô từ Crossref API được tải về và lưu vào `crossref_response.json`.
   - Hàm `parse_crossref_payload()` bóc tách thành danh sách các đối tượng `PaperRecord` và lưu vào `crossref_records.json`.
   - Module `cleaning.py` làm sạch khoảng trắng, khử trùng lặp theo `paper_id`, tính tuổi thọ dữ liệu `age_days` và ghép thành đoạn văn bản ngữ cảnh `text_for_embedding`.
   - Mô hình `sentence-transformers/all-MiniLM-L6-v2` chuyển đổi `text_for_embedding` thành vector không gian đa chiều (dense embeddings) và nạp vào collection `papers-baseline` của ChromaDB.

2. **Evaluation set và ground-truth document IDs dùng để đo retrieval/answer quality ra sao?**
   - Evaluation set gồm 10 câu hỏi chuẩn hóa qua 4 nhóm nghiệp vụ (`summary`, `authors`, `date`, `categories`).
   - Mỗi câu hỏi liên kết với danh sách `ground_truth_doc_ids` (chứa DOI của tài liệu gốc).
   - Khi RAG Agent nhận câu hỏi, nó tìm kiếm Top-K tài liệu trong ChromaDB. Nếu tài liệu trả về có chứa DOI trong `ground_truth_doc_ids`, hệ thống ghi nhận **Retrieval Hit = True** (dùng để tính Retrieval Hit Rate). Sau đó, câu trả lời sinh ra được so sánh với câu mẫu qua chỉ số **Token F1** và LLM Judge.

3. **Quality checks khác freshness monitoring ở điểm nào trong bài lab?**
   - **Quality checks (Great Expectations 1.x):** Đánh giá tính toàn vẹn về mặt cấu trúc và cú pháp của dữ liệu (schema validation, không null ở `paper_id`/`title`, tính duy nhất, độ dài tóm tắt $\ge 30$ ký tự).
   - **Freshness monitoring (Freshness SLA):** Giám sát tính thời sự của dữ liệu dựa trên thuộc tính thời gian (`age_days`). Dữ liệu dù có đầy đủ không null nhưng nếu đã quá 180 ngày và chiếm tỷ lệ $> 25\%$ thì vẫn bị gắn cờ `is_fresh = False` vì thông tin đã lỗi thời.

4. **Vì sao phải dùng cùng test set cho baseline, corrupted và repaired?**
   - Để đảm bảo tính khách quan và khoa học của thực nghiệm (kiểm soát biến số độc lập). Việc giữ nguyên cùng một bộ 10 câu hỏi Ground Truth cho phép đo lường chính xác mức độ suy giảm do dữ liệu bẩn gây ra và chứng minh mức độ phục hồi của hệ thống một cách định lượng.

5. **Repair được xem là thành công dựa trên artifact và metric nào?**
   - **Về mặt Data Artifacts:** File `papers_clean_repaired.csv` phục hồi đủ 24 dòng sạch, `repaired_quality_report.json` đạt `success = True`, `is_fresh = True`.
   - **Về mặt Agent Metrics:** `repaired_metrics.json` ghi nhận **Retrieval Hit Rate đạt lại 100.0%** (từ 60.0% ở trạng thái corrupted) và **Mean Token F1 đạt lại 100.0%** (từ 64.6%).

---

## 8. Phân tích kết quả thực nghiệm toàn hệ thống

### Metrics chính đo lường qua 3 trạng thái

| Metric / Signal | 🟢 Baseline (Sạch) | 🔴 Corrupted (Bẩn) | 🔵 Repaired (Phục hồi) | Nhận xét cá nhân |
| :--- | :---: | :---: | :---: | :--- |
| `retrieval_hit_rate` | **100.0%** | **60.0%** | **100.0%** | Sụt giảm 40% khi mất bài và dính nhiễu; lấy lại phong độ tuyệt đối sau repair. |
| `mean_token_f1` | **100.0%** | **64.6%** | **100.0%** | Chất lượng câu trả lời bị suy thoái mạnh; phục hồi 100% về độ chính xác từ vựng. |
| `judge_accuracy` | **100.0%** | **60.0%** | **100.0%** | Độ tin cậy ngữ nghĩa của câu trả lời khôi phục trọn vẹn. |
| `mean_judge_score` | **5.00 / 5.0** | **3.40 / 5.0** | **5.00 / 5.0** | Điểm số đánh giá chất lượng trở lại thang điểm tối đa. |
| **Quality checks (GX 1.x)** | **True (PASS)** | **False (FAIL)** | **True (PASS)** | Chốt kiểm soát chặn đứng thành công dữ liệu bẩn và thông qua dữ liệu sạch. |
| **Freshness status** | **True (PASS)** | **False (FAIL)** | **True (PASS)** | SLA phát hiện chính xác khi ngày xuất bản bị lùi quá 180 ngày. |

### Kết luận từ số liệu
1. **Chuỗi suy giảm:** Tiêm 6 dạng lỗi dữ liệu $\rightarrow$ Quality Gate báo `False`, Freshness báo `False` $\rightarrow$ Retrieval Hit Rate sụt giảm nghiêm trọng từ 100% xuống 60%, Token F1 giảm xuống 64.6% (Chứng minh hiện tượng **Silent Failure**).
2. **Chuỗi phục hồi:** Kích hoạt `repair_from_raw_snapshot()` khôi phục từ `crossref_records.json` $\rightarrow$ Quality Gate & Freshness phục hồi `True` $\rightarrow$ Hit Rate và Token F1 tăng trở lại 100.0%.

---

## 9. Điều học được và hướng cải thiện

### Ba điều quan trọng nhất
1. **Về Data Pipeline:** Tầm quan trọng của nguyên tắc *Raw Data Preservation* (Lưu trữ dữ liệu thô nguyên bản không chỉnh sửa). Nếu không có bản thô này, khi hệ thống bị lỗi dữ liệu phía sau, ta sẽ không thể thực hiện Idempotent Repair nếu API ngoài gặp sự cố hoặc cấm truy cập.
2. **Về Data Observability:** Chốt chặn kiểm định chất lượng (như Great Expectations 1.x kết hợp Freshness SLA) là thành phần sống còn trong sản xuất để phát hiện sớm các dị thường dữ liệu trước khi chúng gây hại cho người dùng.
3. **Về ảnh hưởng của Data đến AI/RAG:** Dữ liệu bẩn dẫn đến suy thoái âm thầm (Silent Failure). Hệ thống AI vẫn trả lời bình thường mà không quăng lỗi exception, nhưng câu trả lời bị sai lệch nghiêm trọng nếu không có hệ thống đo lường benchmark liên tục.

### Nếu có thêm thời gian
Tôi sẽ xây dựng cơ chế tự động cảnh báo (Alert Webhook tới Slack/Discord) ngay khi hàm `fetch_source_records()` phải kích hoạt chế độ Fallback, kết hợp cơ chế Exponential Backoff có lưu cache tạm thời (diskcache) để giảm thiểu tối đa các yêu cầu trùng lặp lên Crossref REST API.

---

## 10. Cam kết của thành viên

Đánh dấu xác nhận tự kiểm tra:

- [x] Nội dung báo cáo phản ánh đúng phần việc (Bước 1 & Bước 2) và mức hiểu của tôi.
- [x] Tôi có thể giải thích luồng end-to-end của toàn bộ hệ thống, không chỉ riêng module mình phụ trách.
- [x] Mọi kết luận về kết quả đều có artifact và metric thực tế đối chiếu trong repository.
- [x] Tôi không ghi “đã chạy thành công” cho phần chưa được kiểm chứng trên terminal.
- [x] Báo cáo không chứa file `.env`, API key, token hoặc secret nhạy cảm.
- [x] Báo cáo này được biên soạn độc lập, phản ánh đúng đóng góp của cá nhân tôi trong nhóm AIGANG.

**Họ và tên:** Lục Tiến Đạt  
**Ngày xác nhận:** 2026-09-26
