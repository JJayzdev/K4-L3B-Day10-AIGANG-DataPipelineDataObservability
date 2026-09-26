# Báo cáo cá nhân — Dương Văn Thành

## 1. Thông tin cá nhân

| Thông tin | Nội dung |
| --- | --- |
| Họ và tên | Dương Văn Thành |
| MSSV | `2A202602368` |
| Khóa/Lớp | K4 — L3B |
| Tên nhóm | AIGANG |
| Vai trò chính | Data Observability & Quality Assurance |
| Commit chính | `e9b3625` — `feat(observability): add GX quality gate and freshness SLA` |
| Repository | `https://github.com/JJayzdev/K4-L3B-Day10-AIGANG-DataPipelineDataObservability` |
| Ngày hoàn thành | 2026-09-26 |

## 2. Vai trò và phạm vi công việc

### Phần việc sở hữu

| Module/deliverable | File/hàm phụ trách | Input nhận vào | Output bàn giao | Trạng thái |
| --- | --- | --- | --- | --- |
| Great Expectations Quality Gate | `src/observability/quality.py` — `run_data_quality_checks()` | `pandas.DataFrame`, `Settings`, tên trạng thái dữ liệu | Báo cáo quality JSON và kết quả pass/fail tổng hợp | Hoàn thành |
| Freshness SLA | `src/observability/quality.py` — `build_freshness_report()` | `published`, `age_days`, ngưỡng `freshness_threshold_days` | `freshness_report.json`, stale count/ratio và `is_fresh` | Hoàn thành |
| Chuẩn hóa nội dung kết quả GX | `src/observability/quality.py` — `_expectation_summary()` | Kết quả từng expectation của GX 1.x | Bản tóm tắt JSON dễ đọc | Hoàn thành |
| Điều hướng artifact theo trạng thái | `_quality_report_path()`, `_freshness_report_path()` | `report_name`: `baseline`, `corrupted`, `repaired` | Đường dẫn report tách biệt theo trạng thái | Hoàn thành |

Commit `e9b3625` là bằng chứng chính: thay thế các hàm TODO trong `quality.py` bằng triển khai thực tế, cập nhật thông tin nhóm trong `docs/TEAM.md` và bổ sung quy tắc không đưa dữ liệu runtime vào Git.

### Việc hỗ trợ ngoài phạm vi chính

| Hoạt động | Thành viên/module được hỗ trợ | Kết quả |
| --- | --- | --- |
| Xác lập data contract cho quality/freshness report | `phase1.py`, `corruption_flow.py`, reporting | Pipeline dùng chung `success`, `gx_success`, `freshness_success` và `freshness` |
| Cập nhật metadata nhóm | `docs/TEAM.md` | Điền tên nhóm AIGANG, lớp và tên repository |
| Hạn chế commit nhầm dữ liệu phát sinh | `.gitignore` | Bổ sung quy tắc loại trừ `data/` trong commit chính |

## 3. Kết quả theo vai trò

| Nhiệm vụ đã thực hiện | File/hàm/artifact liên quan | Kết quả bàn giao | Cách xác minh |
| --- | --- | --- | --- |
| Tạo bộ kiểm tra chất lượng bằng GX 1.x | `run_data_quality_checks()` | 6 expectations kiểm tra row count, completeness, uniqueness và độ dài summary | Đọc `baseline_quality_report.json` hoặc chạy pipeline baseline |
| Kết hợp quality và freshness thành một gate | `success = gx_success and freshness["is_fresh"]` | Chỉ pass khi đồng thời đạt data quality và SLA độ mới | Đối chiếu ba trường trạng thái trong JSON |
| Đo mức độ stale | `build_freshness_report()` | Đếm stale rows, ratio, paper IDs stale và `age_days` không hợp lệ | Đọc `freshness_report.json` |
| Tách báo cáo theo stage | Các hàm `_report_path()` | Không ghi đè baseline khi chạy corrupted/repaired | Kiểm tra `data/quality/` sau corruption flow |

Output baseline là `data/quality/baseline_quality_report.json`: 24 dòng, 6/6 expectations thành công, success 100%, không có trường bắt buộc bị thiếu và không có `paper_id` trùng. `data/quality/freshness_report.json` ghi nhận 0/24 dòng stale, stale ratio bằng 0 và `is_fresh=true`.

## 4. Giải thích phần kỹ thuật đã thực hiện

### Vấn đề cần giải quyết

Pipeline RAG vẫn có thể chạy khi dữ liệu thiếu summary, trùng DOI hoặc quá cũ. Đây là silent failure: ứng dụng không crash nhưng retrieval và chất lượng câu trả lời suy giảm. Phần observability cần một quality gate có cấu trúc, lưu được bằng chứng và đủ nhạy để chặn dữ liệu lỗi.

### Cách triển khai

`run_data_quality_checks()` tạo Great Expectations context ở chế độ ephemeral, đăng ký Pandas data source, dataframe asset và whole-dataframe batch definition. Mỗi lần chạy dùng suite gắn với stage để tránh xung đột tên.

Bộ kiểm tra gồm:

1. Số dòng trong khoảng 5–5000.
2. `paper_id` không null.
3. `title` không null.
4. `text_for_embedding` không null.
5. `paper_id` duy nhất.
6. `summary` dài tối thiểu 30 ký tự.

Sau GX, hàm gọi `build_freshness_report()`. Hàm parse `published` theo UTC, ép `age_days` sang số, đánh dấu stale khi `age_days > 180`, rồi tính `stale_ratio`. Dataset chỉ fresh khi có dữ liệu, không có `age_days` không hợp lệ và tỷ lệ stale không vượt 25%. Overall gate dùng điều kiện AND giữa GX và freshness.

Thiết kế cũng xử lý an toàn khi thiếu cột: thiếu `published` được coi là `NaT`; thiếu `age_days` khiến toàn bộ dòng invalid. Gate vì thế fail rõ ràng thay vì âm thầm trả kết quả sai.

### Input, output và contract

| Thành phần | Mô tả |
| --- | --- |
| Input | `pandas.DataFrame`, `Settings`, `report_name` |
| Các cột chính | `paper_id`, `title`, `summary`, `text_for_embedding`, `published`, `age_days` |
| Output | `success`, `gx_success`, `freshness_success`, `statistics`, `expectations`, `freshness` |
| Artifact | `data/quality/baseline_quality_report.json`, `data/quality/freshness_report.json` và report theo stage |
| Module phụ thuộc | `core.config`, `core.utils`, Pandas, Great Expectations 1.x |
| Module dùng output | `src/pipelines/phase1.py`, `src/pipelines/corruption_flow.py`, `src/observability/reporting.py` |
| Điều kiện lỗi | Input sai kiểu; cột ngày/tuổi thiếu hoặc sai; ID trùng; summary ngắn; stale ratio vượt SLA |

### Cách xác minh

```bash
python script/run_phase1.py
python script/run_corruption_flow.py
```

- **Mong đợi:** baseline và repaired pass; corrupted fail đúng quality/freshness signal.
- **Đã ghi nhận:** baseline 24 dòng, 6/6 expectation pass, stale ratio 0%; corrupted 22 dòng, fail uniqueness và summary length, stale ratio 36,36%; repaired 24 dòng, quality/freshness pass trở lại.
- **Artifact:** `data/quality/baseline_quality_report.json`, `data/quality/freshness_report.json`; artifact corrupted/repaired nằm trong kết quả corruption flow đã commit tại `e243cea`.

## 5. Một quyết định kỹ thuật quan trọng

- **Bối cảnh:** Cần quyết định quality gate chỉ dựa trên GX hay kết hợp freshness SLA.
- **Các phương án:** (1) chỉ dùng expectation về schema/completeness; (2) chỉ kiểm tra ngày mới nhất; (3) kết hợp GX với tỷ lệ stale toàn dataset.
- **Phương án chọn:** GX kiểm tra cấu trúc/nội dung; freshness dùng `age_days > 180` và stale ratio tối đa 25%; overall success là phép AND.
- **Lý do:** Một record mới có thể che việc phần lớn corpus đã cũ; freshness tốt cũng không chứng minh dữ liệu không trùng hoặc không thiếu nội dung.
- **Bằng chứng:** Baseline pass. Corrupted có stale ratio 8/22 = 36,36%, đồng thời GX phát hiện ID trùng và summary ngắn. Repair đưa cả hai gate về pass.

## 6. Một lỗi hoặc blocker đã xử lý

- **Triệu chứng:** Scaffold ban đầu để `run_data_quality_checks()` và `build_freshness_report()` ở trạng thái `NotImplementedError`, nên pipeline không sinh được observability artifact.
- **Tái hiện:** gọi `run_data_quality_checks(df, settings, "baseline")` trên phiên bản trước `e9b3625`.
- **Nguyên nhân gốc:** Hàm mới chỉ có pseudo-code, chưa có GX suite, validation definition, freshness rule hoặc logic ghi report.
- **Cách xử lý:** triển khai GX 1.x bằng ephemeral context; thêm sáu expectations; chuẩn hóa kết quả; tính stale rows/ratio; ghi JSON theo stage; ghép GX và freshness thành overall gate.
- **Xác minh:** baseline artifact có `evaluated_expectations=6`, `successful_expectations=6`, `success_percent=100.0`, `is_fresh=true`.
- **Điều học được:** Observability check cần cả tiêu chí định lượng, artifact truy vết được và output để pipeline tiêu thụ tự động.

## 7. Hiểu biết về luồng end-to-end

1. Crossref API hoặc raw snapshot cung cấp record gốc. Cleaning chuẩn hóa text, tác giả, category, ngày tháng; tính `age_days`; tạo `text_for_embedding`; embedding model mã hóa văn bản và ghi vào ChromaDB.
2. Evaluation set có 10 câu hỏi cùng `ground_truth_doc_ids`. Retrieval hit rate kiểm tra tài liệu đúng có trong top-k; answer metrics so sánh câu trả lời với ground truth bằng token F1 và judge score.
3. Quality checks đo tính đầy đủ, duy nhất, hợp lệ; freshness đo độ cũ theo `age_days` và tỷ lệ stale. Hai nhóm tín hiệu gặp nhau ở overall gate.
4. Ba trạng thái phải dùng cùng test set, embedding model, top-k và cấu hình để biến độc lập duy nhất là trạng thái dữ liệu.
5. Repair thành công khi phục hồi 24 ID duy nhất từ raw snapshot, quality/freshness pass và agent metrics trở về gần baseline. Bằng chứng gồm quality reports, metrics JSON, answers và comparison report.

## 8. Phân tích kết quả

### Metrics chính

Số liệu dưới đây được đối chiếu từ artifact baseline hiện có và artifact thực nghiệm đã commit trong `e243cea`:

| Metric/signal | Baseline | Corrupted | Repaired | Nhận xét cá nhân |
| --- | ---: | ---: | ---: | --- |
| `retrieval_hit_rate` | 1.000 | 0.600 | 1.000 | Giảm 40 điểm phần trăm; repair phục hồi hoàn toàn |
| `mean_token_f1` | 1.000 | 0.646 | 1.000 | Nội dung thiếu/nhiễu làm câu trả lời kém khớp |
| `judge_accuracy` | 1.000 | 0.600 | 1.000 | Chất lượng câu trả lời giảm cùng retrieval |
| `mean_judge_score` | 5.000 | 3.400 | 5.000 | Repair đưa điểm judge về baseline |
| Quality checks | Pass (6/6) | Fail (2 expectation) | Pass | Corrupted fail uniqueness và summary length |
| Freshness status | Fresh (0/24) | Stale (8/22; 36,36%) | Fresh (0/24) | Corrupted vượt ngưỡng 25% |

### Kết luận từ số liệu

1. Drop record, blank summary, duplicate và stale-date → GX fail, stale ratio tăng từ 0% lên 36,36% → retrieval hit rate giảm từ 1,0 xuống 0,6 và mean token F1 còn khoảng 0,646.
2. Replay raw snapshot và chạy lại cleaning/indexing → quality và freshness cùng pass → retrieval, token F1, judge accuracy và judge score trở về baseline.

Corruption ảnh hưởng rõ nhất tới agent là bỏ record kết hợp làm hỏng nội dung embedding: ground-truth document có thể biến mất hoặc mất tín hiệu ngữ nghĩa. Với observability, stale-date và duplicate là tín hiệu rõ nhất vì trực tiếp vượt SLA và uniqueness expectation.

Pipeline corrupted vẫn có thể tạo output dù quality gate fail. Kết quả này xác nhận silent failure: chạy được không đồng nghĩa dữ liệu đủ chất lượng. Gate nên là điều kiện promotion sang serving, không chỉ là report tham khảo.

## 9. Điều học được và hướng cải thiện

### Ba điều quan trọng nhất

1. Data pipeline cần contract và artifact ở từng stage; chỉ nhìn exit code không phát hiện sai lệch nội dung.
2. Quality và freshness là hai chiều độc lập: dữ liệu có thể đúng schema nhưng cũ, hoặc mới nhưng trùng/thiếu.
3. Data quality tác động trực tiếp tới retrieval và câu trả lời RAG; quality gate là cơ chế phòng ngừa silent failure.

### Nếu có thêm thời gian

Tôi sẽ bổ sung test tự động cho `quality.py` với các trường hợp thiếu cột, `age_days` sai kiểu, dataset rỗng, đúng/vượt biên 25%, ID trùng và summary ngắn. Tôi cũng sẽ chuyển `_MAX_STALE_RATIO` vào `Settings` và dùng gate trong CI. Hiệu quả được đo bằng branch coverage và việc pipeline chặn publish index khi gate fail.

## 10. Cam kết của thành viên

- [x] Nội dung phản ánh đúng phần việc và mức hiểu của tôi.
- [x] Tôi có thể giải thích luồng end-to-end, không chỉ module mình phụ trách.
- [x] Mọi kết luận đều có artifact, metric hoặc commit để đối chiếu.
- [x] Tôi không ghi “đã chạy thành công” cho phần chưa được kiểm chứng.
- [x] Báo cáo không chứa `.env`, API key, token hoặc secret.
- [x] Báo cáo không sao chép nguyên văn báo cáo nhóm hoặc thành viên khác.

**Họ và tên:** Dương Văn Thành  
**Ngày xác nhận:** 2026-09-26
