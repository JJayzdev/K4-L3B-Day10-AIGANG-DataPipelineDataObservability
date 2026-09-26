# Group Report — Day 10: Data Pipeline & Data Observability

## 1. Thông tin bài nộp

| Thông tin | Nội dung |
| --- | --- |
| Khóa/Lớp | K4 — L3B — Day 10 |
| Tên nhóm | AIGANG |
| Repository | `https://github.com/JJayzdev/K4-L3B-Day10-AIGANG-DataPipelineDataObservability` |
| Ngày hoàn thành | 2026-09-26 |

### Thành viên và phân công

| STT | Họ và tên | MSSV | Vai trò chính | Module/deliverable sở hữu |
| --: | --- | --- | --- | --- |
| 1 | Dương Văn Thành | 2A202602368 | Data Observability & Quality Assurance | `src/observability/quality.py`: GX 1.x quality gate, Freshness SLA, quality artifacts |
| 2 | Hồ Ngọc Mai | 2A202602509 | Data Cleaning & Embedding Preparation | `src/ingestion/cleaning.py`: chuẩn hóa, deduplicate, `age_days`, `text_for_embedding` |
| 3 | Nguyễn Việt Đức | 2A202602732 | Benchmark & Baseline Integration | `src/evaluation/testset.py`, `src/pipelines/phase1.py`, baseline report |
| 4 | Lục Tiến Đạt | 2A202602969 | Data Foundation & Ingestion | Môi trường; `src/ingestion/crossref.py`; raw snapshots |
| 5 | Mai Văn Trường | 2A202602983 | Data Corruption & Recovery Integration | `src/ingestion/corruption.py`, `src/pipelines/corruption_flow.py`, comparison report |

## 2. Tóm tắt kết quả

Nhóm đã hoàn thiện luồng dữ liệu RAG từ thu thập metadata Crossref, bảo toàn raw snapshot, làm sạch 24 bản ghi, tạo văn bản embedding và ChromaDB index, đến benchmark 10 câu hỏi, Great Expectations 1.x và Freshness SLA. Baseline tạo các artifact raw/clean, test set, embedding/index, metrics, answers, quality/freshness JSON và báo cáo Phase 1. Trên cùng test set, baseline đạt retrieval hit rate 1,000, mean token F1 1,000, judge accuracy 1,000 và quality gate pass.

Corruption flow tiêm sáu dạng lỗi. Việc bỏ bốn bài mới nhất và làm hỏng nội dung/title ảnh hưởng trực tiếp đến retrieval/answer quality; duplicate và blank summary làm GX fail, còn tám ngày xuất bản bị lùi 365 ngày đẩy stale ratio lên 36,36%, vượt SLA 25%. Retrieval hit rate giảm còn 0,600 và mean token F1 còn 0,646. Repair không vá dữ liệu bẩn mà replay raw snapshot, chạy lại cleaning/indexing và phục hồi 24 dòng, quality/freshness pass cùng toàn bộ metric về baseline. Giới hạn chính là Crossref client mới có timeout và fallback, chưa có retry/backoff; một lượt LLM judge baseline từng dùng fallback heuristic do Gemini trả 429. Ngoài ra, artifact corruption/repaired hiện được kiểm chứng ở commit `e243cea` nhưng không hiện diện trong working tree chính do quy tắc ignore `data/`.

## 3. Kiến trúc và luồng dữ liệu

### Luồng end-to-end

```text
Crossref REST API
    -> data/raw/crossref_response.json
    -> parse thành PaperRecord và lưu crossref_records.json
    -> cleaning, normalize, deduplicate, tính age_days
    -> tạo text_for_embedding
    -> MiniLM embedding + ChromaDB collection papers-baseline
    -> benchmark 10 câu hỏi + baseline metrics
    -> GX 1.x quality report + Freshness SLA
    -> tiêm 6 corruption và build papers-corrupted
    -> đánh giá lại trên cùng test set
    -> replay raw snapshot, clean và build papers-repaired
    -> comparison report Baseline vs Corrupted vs Repaired
```

### Trách nhiệm của từng khối

| Khối | Input | Xử lý chính | Output/artifact | Owner |
| --- | --- | --- | --- | --- |
| Ingestion | Crossref REST API hoặc snapshot | Request timeout 10 giây, parse DOI/metadata, fallback snapshot | `data/raw/crossref_response.json`, `crossref_records.json` | Lục Tiến Đạt |
| Cleaning | `list[PaperRecord]` | Normalize text/date, lọc ID/title rỗng, deduplicate, tính helper fields | `data/clean/papers_clean.csv/json` | Hồ Ngọc Mai |
| Embedding/index | `text_for_embedding` | `all-MiniLM-L6-v2`, build Chroma collection theo stage | Embedding manifest, `papers-baseline/corrupted/repaired` | Nguyễn Việt Đức tích hợp qua pipeline; module index là nền starter |
| Evaluation | Clean data/index và test set | Retrieval top-4, QA, Token F1, LLM/fallback judge | `data/eval/test_set.json`, `data/results/*metrics.json`, `*answers.json` | Nguyễn Việt Đức |
| Observability | DataFrame của từng stage | 6 GX expectations, stale ratio và overall gate | `data/quality/*quality_report.json`, freshness reports | Dương Văn Thành |
| Corruption/repair | Baseline clean data và raw snapshot | Tiêm 6 lỗi; repair bằng replay nguồn raw | Corrupted/repaired datasets, corruption log | Mai Văn Trường |
| Orchestration | `Settings` và các module | Chạy đúng thứ tự, lưu metrics và sinh Markdown | `phase1_report.md`, `corruption_report.md` | Nguyễn Việt Đức (baseline), Mai Văn Trường (corruption flow) |

## 4. Cách tái hiện kết quả

### Cấu hình không chứa secret

| Biến/cấu hình | Giá trị sử dụng |
| --- | --- |
| `LLM_PROVIDER` | `gemini` (mặc định; có thể ghi đè bằng biến môi trường) |
| `LLM_MODEL` | `gemini-2.5-flash` |
| Embedding model | `sentence-transformers/all-MiniLM-L6-v2` |
| Số lượng Crossref records | 24 |
| Retrieval `top_k` | 4 |
| Freshness threshold | 180 ngày; stale ratio tối đa 25% |
| Random seed | N/A; test set và corruption chọn vị trí xác định, không dùng random |

API key chỉ được đặt trong `.env` cục bộ và không xuất hiện trong source/report.

### Lệnh cài đặt

```bash
uv sync
```

Hoặc trong virtual environment:

```bash
uv pip install -e .
```

### Lệnh chạy

```bash
uv run python script/run_phase1.py
uv run python script/run_corruption_flow.py
```

Nếu đã kích hoạt môi trường cài bằng pip/uv:

```bash
python script/run_phase1.py
python script/run_corruption_flow.py
```

### Kết quả tái hiện

| Lệnh | Trạng thái ghi nhận | Thời điểm chạy | Bằng chứng |
| --- | --- | --- | --- |
| Baseline pipeline | Thành công, exit code 0 | 2026-09-26 03:26:28 UTC | `phase1_report.md`, `baseline_metrics.json`, quality artifacts trong commit `e243cea` |
| Corruption flow | Thành công, exit code 0 | 2026-09-26 03:33:24 UTC | `corruption_report.md`, corruption log và metrics trong commit `e243cea` |

Các mốc trên là thời gian được ghi trong artifact đã commit, không phải xác nhận rằng pipeline đã được chạy lại trong lần biên soạn báo cáo này.

## 5. Ingestion, cleaning và data contract

### Nguồn dữ liệu

| Thuộc tính | Giá trị |
| --- | --- |
| Source | Crossref REST API: `https://api.crossref.org/works` |
| Query/filter | Query `agentic retrieval augmented generation large language model`; `from-pub-date` = ngày chạy trừ 180 ngày; `has-abstract:true`; `rows=24` |
| Thời điểm lấy/chạy artifact | 2026-09-26; baseline report lúc 03:26:28 UTC |
| Số record nhận được | 24 raw, 24 sau cleaning |
| Cơ chế retry/backoff | Chưa có retry/backoff; một request timeout 10 giây, sau đó fallback sang raw snapshot nếu lỗi/non-200 |

### Raw và clean schema

| Trường | Kiểu dữ liệu | Bắt buộc? | Ý nghĩa | Xử lý khi thiếu/sai |
| --- | --- | --- | --- | --- |
| `paper_id` | string | Có | DOI/định danh tài liệu | Parser fallback sang title; cleaning loại dòng nếu vẫn rỗng |
| `title` | string | Có | Tiêu đề bài báo | Chuẩn hóa whitespace; cleaning loại dòng rỗng |
| `summary` | string | Có cho quality gate | Abstract/tóm tắt | Bỏ thẻ HTML/JATS; fallback subtitle/title; GX yêu cầu dài ≥ 30 |
| `authors` | list[string] | Không | Danh sách tác giả | Fallback `Unknown Author`; cleaning tạo `authors_joined` |
| `categories` | list[string] | Không | Chủ đề Crossref | Fallback `Computer Science`/`General` |
| `published`, `updated` | ISO date string | Có cho freshness | Ngày xuất bản/cập nhật | Parse ISO; ngày sai thành rỗng; `updated` fallback `published` |
| `age_days` | nullable integer | Có cho freshness | Tuổi dữ liệu tại thời điểm chạy | Ngày thiếu/sai thành `pd.NA`, khiến freshness gate fail |
| `text_for_embedding` | string | Có | Văn bản chuẩn bị cho vector hóa | Tạo lại từ năm trường đã chuẩn hóa |

### Quy tắc cleaning

| Quy tắc | Quality dimension | Số record bị tác động | Cách xác minh |
| --- | --- | ---: | --- |
| Chuẩn hóa whitespace/text/date và helper columns | Consistency/Validity | 24 record được xử lý | `papers_clean.csv` có 16 cột và 24 dòng |
| Lọc dòng thiếu `paper_id` hoặc `title` | Completeness | 0 dòng bị loại trên snapshot hiện tại | Raw 24 → clean 24 |
| Deduplicate theo `paper_id`, giữ dòng đầu | Uniqueness | 0 dòng bị loại trên snapshot hiện tại | 24/24 ID duy nhất |
| Chuẩn hóa author/category fallback | Completeness | Áp dụng khi danh sách rỗng | Kiểm tra `authors_joined`, `categories_joined` |
| Chuẩn hóa ngày và tính `age_days` | Validity/Freshness | 24 dòng; 0 giá trị thiếu trong baseline | Quality/freshness report |

`paper_id` dùng DOI do Crossref cung cấp. `text_for_embedding` gồm năm dòng `Title`, `Authors`, `Published`, `Categories`, `Summary`. `age_days` bằng ngày chạy trừ ngày xuất bản; kiểu Pandas `Int64` cho phép biểu diễn giá trị thiếu. Cleaning không sửa raw snapshot.

## 6. Evaluation setup

| Thành phần | Cấu hình thực tế |
| --- | --- |
| Số câu hỏi | 10 |
| Các `question_type` | 3 `summary`, 3 `authors`, 2 `date`, 2 `categories` |
| Ground-truth document ID | DOI của record nguồn trong `ground_truth_doc_ids`; 10 DOI riêng biệt |
| Embedding model | `sentence-transformers/all-MiniLM-L6-v2` |
| Vector store/collection | ChromaDB: `papers-baseline`, `papers-corrupted`, `papers-repaired` |
| Retrieval `top_k` | 4 |
| LLM provider/model | Gemini / `gemini-2.5-flash`; judge có fallback heuristic khi API lỗi |
| Test set dùng chung | `data/eval/test_set.json` |

Test set được giữ nguyên cho ba trạng thái để kiểm soát biến độc lập. Nếu đổi câu hỏi, DOI chuẩn hoặc cách chấm giữa các lần chạy, chênh lệch metric có thể do benchmark thay đổi chứ không phải do corruption/repair. Cùng test set, model, top-k và định nghĩa metric giúp phép so sánh có ý nghĩa nhân quả.

## 7. Kết quả baseline

### Artifact checklist

| Artifact | Đường dẫn thực tế | Trạng thái | Ghi chú |
| --- | --- | --- | --- |
| Raw response/records | `data/raw/crossref_response.json`, `crossref_records.json` | Có | 24 records |
| Cleaned dataset | `data/clean/papers_clean.csv/json` | Có | 24 dòng, 16 cột |
| Embedding manifest/index | `data/embeddings/`, `data/chroma/` | Có trong lần chạy artifact | Runtime artifact bị ignore trên main |
| Evaluation set | `data/eval/test_set.json` | Có | 10 câu, 4 loại |
| Baseline metrics | `data/results/baseline_metrics.json` | Có trong commit `e243cea` | Không hiện diện ở working tree hiện tại |
| Quality/freshness | `data/quality/baseline_quality_report.json`, `freshness_report.json` | Có | 6/6 GX, fresh |
| Baseline report | `data/reports/phase1_report.md` | Có trong commit `e243cea` | Báo cáo sinh tự động |

### Baseline metrics

| Metric | Giá trị | Diễn giải |
| --- | ---: | --- |
| `retrieval_hit_rate` | 1.000 | 10/10 câu có DOI chuẩn trong top-k |
| `mean_token_f1` | 1.000 | Câu trả lời khớp token với ground truth trong lần chạy |
| `judge_accuracy` | 1.000 | Tất cả mẫu được chấm đúng; 1/10 lượt từng dùng fallback heuristic do 429 |
| `mean_judge_score` | 5.000 | Điểm trung bình tối đa trên thang 1–5 |
| Ragas | N/A | Đã skip; chỉ chạy khi bật `RUN_RAGAS` để tránh thêm thời gian/chi phí API |

Baseline 1,000 cần được hiểu trong bối cảnh câu hỏi chứa đúng tiêu đề bài báo và QA có nhánh exact-title lookup; kết quả chưa đại diện cho mọi truy vấn paraphrase ngoài benchmark.

## 8. Data quality và freshness

### Quality checks

| Check | Quality dimension | Ngưỡng/kỳ vọng | Kết quả baseline | Bằng chứng |
| --- | --- | --- | --- | --- |
| Row count | Volume | 5–5000 | Pass: 24 | `baseline_quality_report.json` |
| `paper_id` not null | Completeness | 0 null | Pass: 0 unexpected | Cùng artifact |
| `title` not null | Completeness | 0 null | Pass: 0 unexpected | Cùng artifact |
| `text_for_embedding` not null | Completeness | 0 null | Pass: 0 unexpected | Cùng artifact |
| `paper_id` unique | Uniqueness | 100% unique | Pass: 24 ID duy nhất | Cùng artifact |
| `summary` length | Validity | Tối thiểu 30 ký tự | Pass: 0 unexpected | Cùng artifact |

### Freshness

| Thuộc tính | Giá trị |
| --- | --- |
| Freshness được đo tại | Clean DataFrame bằng cột `age_days`; lưu trong quality/freshness JSON |
| Ngày xuất bản mới nhất | 2026-09-15 |
| Ngày xuất bản cũ nhất | 2026-04-01 |
| Ngưỡng freshness | Một dòng stale khi `age_days > 180`; toàn bộ dataset fail khi stale ratio > 25% |
| Trạng thái baseline | Fresh — 0/24 stale, ratio 0% |
| Lý do | Không có `age_days` invalid và tỷ lệ stale không vượt SLA |

## 9. Corruption scenarios và repair

| Corruption | Cách tạo | Record tác động | Quality signal kỳ vọng/thực tế | Tác động thực tế | Cách repair |
| --- | --- | ---: | --- | --- | --- |
| `drop_latest_records` | Bỏ 20% record mới nhất | 4 | Row count giảm nhưng vẫn trong ngưỡng | Có ground-truth document biến mất; retrieval giảm | Replay raw snapshot |
| `blank_summary` | Xóa summary hai dòng đầu còn lại | 2 | Summary length fail | Mất nội dung trả lời/embedding | Re-clean từ raw |
| `inject_noise` | Chèn payload rác vào summary | 2 | Không bị current GX bắt trực tiếp | Semantic drift, góp phần giảm answer quality | Re-clean từ raw |
| `truncate_title` | Cắt title còn tối đa 6 ký tự | 2 | Không có title-length expectation | Exact-title matching suy giảm | Re-clean từ raw |
| `stale_date` | Lùi ngày 365 ngày | 8 | Freshness fail: 8/22 = 36,36% > 25% | Corpus bị đánh dấu stale | Khôi phục ngày từ raw |
| `duplicate_rows` | Nhân đôi hai dòng | 2 | Uniqueness fail | Corrupted dataset kết thúc với 22 dòng | Re-clean và deduplicate từ raw |

Corruption log ở `data/results/corruption_log.json` có trong commit `e243cea`, ghi đủ sáu loại, số lượng và các `paper_id` bị tác động.

Repair dùng `repair_from_raw_snapshot()` đọc lại `data/raw/crossref_records.json`, gọi cùng `build_clean_dataframe()`, ghi clean repaired artifact và build collection `papers-repaired`. Vì không vá trực tiếp các dòng bẩn và luôn replay cùng lineage anchor, thao tác có tính idempotent: chạy lại trên cùng raw snapshot cho cùng tập 24 ID sạch.

## 10. So sánh baseline, corrupted và repaired

| Metric/signal | Baseline | Corrupted | Repaired | Thay đổi do corruption | Mức phục hồi | Nhận xét |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| `retrieval_hit_rate` | 1.000 | 0.600 | 1.000 | −0.400 | 100% khoảng suy giảm | 4/10 câu mất hit ở pha lỗi |
| `mean_token_f1` | 1.000 | 0.646 | 1.000 | −0.354 | 100% khoảng suy giảm | Nội dung bẩn làm answer kém khớp |
| `judge_accuracy` | 1.000 | 0.600 | 1.000 | −0.400 | 100% khoảng suy giảm | Phục hồi về baseline |
| `mean_judge_score` | 5.000 | 3.400 | 5.000 | −1.600 | 100% khoảng suy giảm | Phục hồi điểm tối đa |
| Quality checks | Pass | Fail: 2 expectation | Pass | Pass → Fail | Phục hồi hoàn toàn | Fail uniqueness và summary length |
| Freshness status | Fresh: 0% | Stale: 36,36% | Fresh: 0% | +36,36 điểm % | Phục hồi hoàn toàn | Trở lại dưới ngưỡng 25% |

1. Bỏ bốn record mới nhất, làm rỗng/nhiễu nội dung và biến đổi title → GX phát hiện summary/uniqueness, freshness phát hiện 8 dòng stale → retrieval hit rate giảm 1,000 xuống 0,600 và mean token F1 giảm còn 0,646.
2. Replay raw snapshot, chạy lại cleaning và re-index → 24 ID duy nhất, GX/Freshness trở lại pass → toàn bộ bốn agent metric trở về baseline.

Không thể quy toàn bộ mức giảm cho riêng một corruption vì sáu lỗi được tiêm đồng thời. Dựa trên cơ chế, `drop_latest_records` có quan hệ trực tiếp nhất với retrieval miss; blank/noise/title ảnh hưởng nội dung và matching; stale/duplicate là tín hiệu observability rõ nhất.

## 11. Vấn đề tích hợp quan trọng

- **Triệu chứng:** Lần chạy baseline gặp `429 RESOURCE_EXHAUSTED` tạm thời ở Gemini judge; nếu xem mọi judge score là kết quả LLM trực tiếp thì báo cáo sẽ thiếu chính xác.
- **Nguyên nhân:** Quota/rate limit của API ngoài, không phải lỗi retrieval hoặc dữ liệu.
- **Cách xử lý:** Luồng đánh giá retry theo thư viện và dùng fallback heuristic cho lượt chấm không nhận được judge response; answers/metrics vẫn được lưu. Console encoding cũng được cố định bằng `PYTHONIOENCODING=utf-8` để tránh `UnicodeEncodeError` khi in tiếng Việt.
- **Cách xác minh:** `baseline_answers.json` ghi nguồn chấm; pipeline kết thúc exit code 0 và `baseline_metrics.json` có đủ 10 samples. Báo cáo ghi rõ 1/10 lượt dùng fallback, không trình bày toàn bộ judge accuracy như kết quả API thuần túy.

## 12. Giới hạn và hướng cải thiện

| Giới hạn hiện tại | Ảnh hưởng | Hướng cải thiện có thể kiểm chứng |
| --- | --- | --- |
| Crossref chưa retry/backoff, chỉ timeout rồi fallback | Sự cố mạng ngắn hạn lập tức dùng snapshot cũ | Thêm exponential backoff cho 429/503; test bằng mock response và xác nhận số lần retry |
| Benchmark chứa exact title | Metric 1,000 có thể đánh giá quá lạc quan semantic retrieval | Thêm tập paraphrase không chứa title; so sánh hit rate exact-title và semantic-only |
| Sáu corruption chạy đồng thời | Không tách được effect size của từng loại lỗi | Chạy ablation: mỗi corruption một lần trên cùng test set và báo cáo delta metric |
| Judge phụ thuộc API/quota, có fallback | `judge_accuracy` không hoàn toàn đồng nhất về nguồn chấm | Cache judge response, retry có backoff và báo cáo tỷ lệ fallback; yêu cầu 0 fallback cho run chính thức |
| Runtime artifacts bị ignore và một số chỉ tồn tại ở commit nhánh | Main checkout không chứa trọn bộ bằng chứng | Chọn lọc commit artifact nhỏ cần nộp hoặc phát hành release artifact; kiểm tra đường dẫn trong CI |
| Chưa có test tự động đầy đủ cho boundary của freshness | Dễ bỏ sót lỗi ở ngưỡng đúng 25%, dữ liệu rỗng/sai kiểu | Thêm unit tests và branch coverage cho các case biên |

## 13. Checklist trước khi nộp

- [x] Thông tin nhóm và repository chính xác.
- [x] Phân công khớp với module, artifact và commit thực tế.
- [x] Lệnh tái hiện và kết quả chạy gần nhất được ghi rõ theo artifact.
- [x] Baseline, corrupted và repaired dùng cùng evaluation set.
- [x] Bảng metrics ưu tiên số liệu JSON trong commit `e243cea`.
- [x] Quality/freshness conclusions khớp với quality artifacts.
- [x] Đường dẫn và commit chứa artifact đã được chỉ rõ.
- [x] Cả 5 thành viên đã có báo cáo cá nhân.
- [x] Báo cáo không chứa `.env`, API key, token hoặc secret.
