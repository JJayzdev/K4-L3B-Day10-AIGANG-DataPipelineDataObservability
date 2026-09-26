from __future__ import annotations

from datetime import UTC, datetime
from pathlib import Path
import pandas as pd

from core.utils import write_json


def corrupt_clean_dataframe(df: pd.DataFrame, output_log_path) -> pd.DataFrame:
    """Simulate 6 realistic data corruption scenarios on clean dataframe.

    1. Drop latest records: Bỏ rơi 20% các bài báo mới nhất.
    2. Blank summary: Xóa trắng phần tóm tắt ở một số dòng.
    3. Inject noise: Chèn các chuỗi ký tự rác vào tóm tắt.
    4. Truncate title: Cắt ngắn tiêu đề xuống dưới 8 ký tự.
    5. Stale date: Lùi ngày xuất bản về 365 ngày trước (vi phạm Freshness SLA).
    6. Duplicate rows: Nhân đôi các dòng để tạo trùng lặp.
    7. Rebuild `text_for_embedding`.
    8. Ghi corruption log vào output_log_path.
    """
    if df.empty:
        write_json(Path(output_log_path), {"error": "Empty dataframe provided", "corrupted_rows": 0})
        return df.copy()

    # Sắp xếp theo ngày xuất bản mới nhất để xác định rõ 20% bài mới nhất
    working_df = df.copy()
    if "published" in working_df.columns:
        working_df = working_df.sort_values(by="published", ascending=False).reset_index(drop=True)

    total_orig = len(working_df)
    log_entries: dict[str, list] = {
        "drop_latest_records": [],
        "blank_summary": [],
        "inject_noise": [],
        "truncate_title": [],
        "stale_date": [],
        "duplicate_rows": [],
    }

    # 1. Drop latest records: 20% các bài báo mới nhất
    num_drop = max(1, int(round(total_orig * 0.20)))
    dropped_slice = working_df.iloc[:num_drop]
    for _, row in dropped_slice.iterrows():
        log_entries["drop_latest_records"].append({
            "paper_id": str(row.get("paper_id", "")),
            "title": str(row.get("title", "")),
            "published": str(row.get("published", "")),
        })

    corrupted_df = working_df.iloc[num_drop:].copy().reset_index(drop=True)

    n_rem = len(corrupted_df)

    # 2. Blank summary: Xóa trắng phần tóm tắt ở 2 dòng đầu tiên còn lại
    blank_indices = list(range(min(2, n_rem)))
    for idx in blank_indices:
        p_id = str(corrupted_df.loc[idx, "paper_id"])
        orig_summary = str(corrupted_df.loc[idx, "summary"])
        corrupted_df.loc[idx, "summary"] = ""
        log_entries["blank_summary"].append({
            "paper_id": p_id,
            "original_summary_len": len(orig_summary),
        })

    # 3. Inject noise: Chèn các chuỗi ký tự rác vào tóm tắt ở 2 dòng tiếp theo
    noise_indices = [i for i in range(2, min(4, n_rem)) if i not in blank_indices]
    for idx in noise_indices:
        p_id = str(corrupted_df.loc[idx, "paper_id"])
        orig_summary = str(corrupted_df.loc[idx, "summary"])
        garbage_noise = "[CORRUPTED_GARBAGE_PAYLOAD_!@#$%^&*()_SYSTEM_ERROR]"
        corrupted_df.loc[idx, "summary"] = f"### CORRUPTED NOISE ### {garbage_noise} {orig_summary} {garbage_noise}"
        log_entries["inject_noise"].append({
            "paper_id": p_id,
            "noise_injected": garbage_noise,
        })

    # 4. Truncate title: Cắt ngắn tiêu đề xuống dưới 8 ký tự (< 8 ký tự) ở 2 dòng tiếp theo
    truncate_indices = [i for i in range(4, min(6, n_rem)) if i not in blank_indices and i not in noise_indices]
    for idx in truncate_indices:
        p_id = str(corrupted_df.loc[idx, "paper_id"])
        orig_title = str(corrupted_df.loc[idx, "title"])
        truncated_title = orig_title[:6] if len(orig_title) >= 6 else "Bad"
        corrupted_df.loc[idx, "title"] = truncated_title
        log_entries["truncate_title"].append({
            "paper_id": p_id,
            "original_title": orig_title,
            "corrupted_title": truncated_title,
        })

    # 5. Stale date: Lùi ngày xuất bản về 365 ngày trước (ở khoảng 35% các bài còn lại để vi phạm SLA > 25%)
    # Giúp kích hoạt cảnh báo Freshness SLA vi phạm
    stale_count = max(3, int(round(n_rem * 0.35)))
    stale_indices = list(range(min(6, n_rem), min(6 + stale_count, n_rem)))
    for idx in stale_indices:
        p_id = str(corrupted_df.loc[idx, "paper_id"])
        orig_pub = str(corrupted_df.loc[idx, "published"])
        try:
            dt = pd.to_datetime(orig_pub)
            stale_dt = dt - pd.Timedelta(days=365)
            stale_pub_str = stale_dt.strftime("%Y-%m-%d")
        except Exception:
            stale_pub_str = "2024-01-01"
        corrupted_df.loc[idx, "published"] = stale_pub_str
        if "age_days" in corrupted_df.columns:
            corrupted_df.loc[idx, "age_days"] = int(corrupted_df.loc[idx, "age_days"]) + 365
        log_entries["stale_date"].append({
            "paper_id": p_id,
            "original_published": orig_pub,
            "stale_published": stale_pub_str,
        })

    # 6. Duplicate rows: Nhân đôi các dòng để tạo trùng lặp
    dup_sample_size = min(2, len(corrupted_df))
    if dup_sample_size > 0:
        duplicates_to_add = corrupted_df.iloc[:dup_sample_size].copy()
        for _, row in duplicates_to_add.iterrows():
            log_entries["duplicate_rows"].append({
                "paper_id": str(row.get("paper_id", "")),
                "title": str(row.get("title", "")),
            })
        corrupted_df = pd.concat([corrupted_df, duplicates_to_add], ignore_index=True)

    # 7. Rebuild helper columns & text_for_embedding
    summary_chars_list = []
    text_for_embedding_list = []
    for _, row in corrupted_df.iterrows():
        title = str(row.get("title", "")).strip()
        authors = str(row.get("authors_joined", "")).strip()
        published = str(row.get("published", "")).strip()
        categories = str(row.get("categories_joined", "")).strip()
        summary = str(row.get("summary", "")).strip()

        summary_chars_list.append(len(summary))
        text_for_embedding = (
            f"Title: {title}\n"
            f"Authors: {authors}\n"
            f"Published: {published}\n"
            f"Categories: {categories}\n"
            f"Summary: {summary}"
        )
        text_for_embedding_list.append(text_for_embedding)

    corrupted_df["summary_chars"] = summary_chars_list
    corrupted_df["text_for_embedding"] = text_for_embedding_list

    # 8. Ghi corruption log vào output_log_path
    log_payload = {
        "timestamp": datetime.now(UTC).isoformat(),
        "original_rows": total_orig,
        "dropped_rows": num_drop,
        "corrupted_rows": len(corrupted_df),
        "actions_applied": {
            "1_drop_latest_records": {
                "count": len(log_entries["drop_latest_records"]),
                "details": log_entries["drop_latest_records"],
            },
            "2_blank_summary": {
                "count": len(log_entries["blank_summary"]),
                "details": log_entries["blank_summary"],
            },
            "3_inject_noise": {
                "count": len(log_entries["inject_noise"]),
                "details": log_entries["inject_noise"],
            },
            "4_truncate_title": {
                "count": len(log_entries["truncate_title"]),
                "details": log_entries["truncate_title"],
            },
            "5_stale_date": {
                "count": len(log_entries["stale_date"]),
                "details": log_entries["stale_date"],
            },
            "6_duplicate_rows": {
                "count": len(log_entries["duplicate_rows"]),
                "details": log_entries["duplicate_rows"],
            },
        },
    }

    write_json(Path(output_log_path), log_payload)
    return corrupted_df
