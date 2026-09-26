# Báo Cáo Đối Chiếu 3 Trạng Thái — Baseline vs Corrupted vs Repaired

> **Thời gian thực hiện:** 2026-09-26 03:33:24 UTC  
> **Mục tiêu:** Kiểm chứng hiện tượng suy giảm hiệu năng âm thầm (*Silent Failure*) khi dữ liệu bị tiêm lỗi và năng lực tự phục hồi an toàn (*Idempotent Repair*) từ nguồn Raw Snapshot tin cậy.

---

## 1. Bảng Đối Chiếu Hiệu Năng 3 Trạng Thái (Benchmark Comparison)

| Tiêu chí / Chỉ số đo lường | Trạng thái 1: Baseline (Sạch) | Trạng thái 2: Corrupted (Bẩn) | Trạng thái 3: Repaired (Phục hồi) | Đánh giá phục hồi |
| :--- | :---: | :---: | :---: | :---: |
| **Số lượng bản ghi (Row Count)** | **24** | **22** | **24** | Khôi phục 100% |
| **Great Expectations Quality Gate** | ✅ **True (PASS)** | ❌ **False (FAIL)** | ✅ **True (PASS)** | Chốt kiểm soát phục hồi |
| **Freshness SLA Status** | ✅ **True (PASS)** | ❌ **False (FAIL)** | ✅ **True (PASS)** | SLA đảm bảo độ tươi mới |
| **Tỷ lệ bài cũ (Stale Ratio)** | 0.0% | 36.4% | 0.0% | Khôi phục về mức an toàn |
| **Retrieval Hit Rate** | **100.0%** | **60.0%** | **100.0%** | Tăng lại mức ban đầu |
| **Mean Token F1** | **100.0%** | **64.6%** | **100.0%** | Phục hồi độ chính xác từ vựng |
| **Judge Accuracy** | **100.0%** | **60.0%** | **100.0%** | Đạt độ tin cậy ban đầu |
| **Mean Judge Score** | **5.00 / 5.0** | **3.40 / 5.0** | **5.00 / 5.0** | Đạt phong độ chất lượng cao |

---

## 2. Chi Tiết 6 Kịch Bản Tiêm Lỗi Dữ Liệu (Synthetic Corruption Suite)

Hệ thống đã giả lập 6 sự cố dữ liệu thực tế:

| # | Tên kịch bản | Mô tả chi tiết | Tác động thực tế đến RAG Agent |
| :---: | :--- | :--- | :--- |
| 1 | `drop_latest_records` | Cắt bỏ 20% bản ghi mới nhất | Làm mất ngữ cảnh của các câu hỏi liên quan bài mới |
| 2 | `blank_summary` | Xóa trắng nội dung tóm tắt | Làm suy giảm thông tin embedding, sinh câu trả lời rỗng |
| 3 | `inject_noise` | Chèn chuỗi ký tự rác vào tóm tắt | Làm trôi dạt vector embedding (Semantic Drift) |
| 4 | `truncate_title` | Cắt ngắn tiêu đề xuống < 8 ký tự | Gây khó khăn cho exact keyword lookup và title matching |
| 5 | `stale_date` | Lùi ngày xuất bản về quá khứ 365 ngày | Vi phạm Freshness SLA (tỷ lệ bài cũ vượt 25%) |
| 6 | `duplicate_rows` | Nhân đôi dòng dữ liệu tạo trùng lặp | Vi phạm ràng buộc duy nhất `paper_id` của Quality Gate |

---

## 3. Cơ Chế Phục Hồi Dữ Liệu An Toàn (Idempotent Repair)

1. **Nguyên lý hoạt động:** Khi Data Observability Gate phát hiện vi phạm tính toàn vẹn (Quality Gate = False hoặc Freshness SLA = False), pipeline kích hoạt cơ chế khôi phục từ bản lưu trữ thô nguyên bản (`data/raw/crossref_records.json`).
2. **Tính Idempotent:** Quá trình phục hồi có thể thực thi nhiều lần độc lập mà kết quả cuối cùng không đổi, luôn đưa cơ sở dữ liệu về trạng thái sạch chuẩn xác ban đầu.
3. **Kết luận nghiệm thu:** AI lấy lại phong độ hoàn toàn sau khi sửa chữa dữ liệu, chứng minh vai trò then chốt của Data Quality Gate & Observability trong hệ thống Production RAG.

---
*Báo cáo đối chiếu 3 trạng thái được sinh tự động bởi hệ thống Data Observability Pipeline.*
