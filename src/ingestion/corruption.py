import json
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

import pandas as pd


def corrupt_clean_dataframe(df: pd.DataFrame, output_log_path: str | Path) -> pd.DataFrame:
    """Gia lap 6 dang su co du lieu thuc te tren clean dataframe.

    1. Drop latest records (bo 20% ban ghi moi nhat).
    2. Blank summary (xoa trang tom tat o 2 dong).
    3. Inject noise (chen ky tu rac vao tom tat).
    4. Truncate title (cat ngan tieu de < 8 ky tu).
    5. Stale date (lui ngay xuat ban ve 365 ngay truoc de pha Freshness SLA).
    6. Duplicate rows (nhan ban dong tao duplicate paper_id).
    7. Rebuild text_for_embedding.
    8. Ghi log chi tiet vao output_log_path.
    """
    if df.empty:
        return df

    target_log_path = Path(output_log_path)
    target_log_path.parent.mkdir(parents=True, exist_ok=True)

    corrupted_df = df.copy()
    logs: list[dict[str, Any]] = []

    # 1. Drop latest records (20% newest records)
    drop_count = max(1, int(len(corrupted_df) * 0.20))
    dropped_records = corrupted_df.iloc[:drop_count]
    dropped_ids = dropped_records["paper_id"].tolist()
    corrupted_df = corrupted_df.iloc[drop_count:].reset_index(drop=True)
    logs.append({
        "scenario": "drop_latest_records",
        "count": drop_count,
        "description": f"Dropped {drop_count} newest records (20% of corpus)",
        "affected_paper_ids": dropped_ids,
    })

    # 2. Blank summary (remove summary on 2 records)
    blank_indices = [0, 1] if len(corrupted_df) >= 2 else [0]
    blank_ids = []
    for idx in blank_indices:
        corrupted_df.at[idx, "summary"] = ""
        corrupted_df.at[idx, "summary_chars"] = 0
        blank_ids.append(corrupted_df.at[idx, "paper_id"])
    logs.append({
        "scenario": "blank_summary",
        "count": len(blank_ids),
        "description": "Blanked out summary fields",
        "affected_paper_ids": blank_ids,
    })

    # 3. Inject noise (inject junk tokens into summary on 2 records)
    noise_indices = [2, 3] if len(corrupted_df) >= 4 else []
    noise_ids = []
    noise_str = "###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD " * 3
    for idx in noise_indices:
        old_sum = str(corrupted_df.at[idx, "summary"])
        corrupted_df.at[idx, "summary"] = noise_str + old_sum
        corrupted_df.at[idx, "summary_chars"] = len(corrupted_df.at[idx, "summary"])
        noise_ids.append(corrupted_df.at[idx, "paper_id"])
    logs.append({
        "scenario": "inject_noise",
        "count": len(noise_ids),
        "description": "Injected synthetic noise strings into summaries",
        "affected_paper_ids": noise_ids,
    })

    # 4. Truncate title (truncate title to < 8 chars on 2 records)
    truncate_indices = [4, 5] if len(corrupted_df) >= 6 else []
    truncate_ids = []
    for idx in truncate_indices:
        old_title = str(corrupted_df.at[idx, "title"])
        corrupted_df.at[idx, "title"] = old_title[:6]
        truncate_ids.append(corrupted_df.at[idx, "paper_id"])
    logs.append({
        "scenario": "truncate_title",
        "count": len(truncate_ids),
        "description": "Truncated titles to fewer than 8 characters",
        "affected_paper_ids": truncate_ids,
    })

    # 5. Stale date (shift published date back by 365 days on multiple rows to violate Freshness SLA)
    stale_count = min(8, len(corrupted_df))
    stale_indices = list(range(6, min(6 + stale_count, len(corrupted_df))))
    stale_ids = []
    for idx in stale_indices:
        current_pub = str(corrupted_df.at[idx, "published"])
        try:
            pub_dt = datetime.strptime(current_pub, "%Y-%m-%d")
            stale_dt = pub_dt - timedelta(days=365)
            stale_str = stale_dt.strftime("%Y-%m-%d")
        except Exception:
            stale_str = "2024-01-01"
        corrupted_df.at[idx, "published"] = stale_str
        corrupted_df.at[idx, "age_days"] = corrupted_df.at[idx, "age_days"] + 365
        stale_ids.append(corrupted_df.at[idx, "paper_id"])
    logs.append({
        "scenario": "stale_date",
        "count": len(stale_ids),
        "description": "Shifted publication date back by 365 days to simulate stale data",
        "affected_paper_ids": stale_ids,
    })

    # 6. Duplicate rows (duplicate 2 rows)
    dup_indices = [0, 1] if len(corrupted_df) >= 2 else [0]
    dup_rows = corrupted_df.iloc[dup_indices].copy()
    dup_ids = dup_rows["paper_id"].tolist()
    corrupted_df = pd.concat([corrupted_df, dup_rows], ignore_index=True)
    logs.append({
        "scenario": "duplicate_rows",
        "count": len(dup_ids),
        "description": "Duplicated rows to create duplicate paper_ids",
        "affected_paper_ids": dup_ids,
    })

    # 7. Rebuild text_for_embedding
    corrupted_df["text_for_embedding"] = (
        "Title: " + corrupted_df["title"].astype(str) + "\n"
        "Authors: " + corrupted_df["authors_joined"].astype(str) + "\n"
        "Published: " + corrupted_df["published"].astype(str) + "\n"
        "Categories: " + corrupted_df["categories_joined"].astype(str) + "\n"
        "Summary: " + corrupted_df["summary"].astype(str)
    )

    # 8. Write corruption log
    log_payload = {
        "timestamp": datetime.now().isoformat(),
        "total_scenarios": len(logs),
        "initial_rows": len(df),
        "corrupted_rows": len(corrupted_df),
        "scenarios": logs,
    }
    with open(target_log_path, "w", encoding="utf-8") as f:
        json.dump(log_payload, f, ensure_ascii=False, indent=2)

    return corrupted_df

