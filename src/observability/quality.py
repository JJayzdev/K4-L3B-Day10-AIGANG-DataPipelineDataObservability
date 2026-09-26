import json
import logging
from pathlib import Path
from typing import Any

import great_expectations as gx
import great_expectations.expectations as gxe
import pandas as pd

from core.config import Settings

logger = logging.getLogger(__name__)


def evaluate_freshness_sla(df: pd.DataFrame, settings: Settings) -> dict[str, Any]:
    """Danh gia do tuoi moi (Freshness SLA) cua du lieu."""
    total_rows = len(df)
    threshold_days = settings.freshness_threshold_days  # default 180 days

    if total_rows == 0 or "age_days" not in df.columns:
        return {
            "latest_published": "",
            "oldest_published": "",
            "stale_rows": 0,
            "total_rows": total_rows,
            "stale_ratio": 0.0,
            "threshold_days": threshold_days,
            "is_fresh": True,
        }

    stale_rows = int((df["age_days"] > threshold_days).sum())
    stale_ratio = stale_rows / total_rows if total_rows > 0 else 0.0
    # Canh bao is_fresh = False neu ty le bai bao cu > 25% (0.25)
    is_fresh = stale_ratio <= 0.25

    latest_published = str(df["published"].max()) if "published" in df.columns else ""
    oldest_published = str(df["published"].min()) if "published" in df.columns else ""

    return {
        "latest_published": latest_published,
        "oldest_published": oldest_published,
        "stale_rows": stale_rows,
        "total_rows": total_rows,
        "stale_ratio": round(stale_ratio, 4),
        "threshold_days": threshold_days,
        "is_fresh": is_fresh,
    }


def build_freshness_report(df: pd.DataFrame, settings: Settings, report_path: Path | None = None) -> dict[str, Any]:
    """Tong hop va ghi freshness report."""
    target_path = report_path or settings.paths.freshness_report
    target_path.parent.mkdir(parents=True, exist_ok=True)

    report = evaluate_freshness_sla(df, settings)
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    return report


def run_data_quality_checks(df: pd.DataFrame, settings: Settings, report_name: str) -> dict[str, Any]:
    """Chot kiem dinh chat luong du lieu (Quality Gate) su dung Great Expectations 1.x.

    1. ExpectTableRowCountToBeBetween: 5 den 5000 dong.
    2. ExpectColumnValuesToNotBeNull: paper_id, title, text_for_embedding.
    3. ExpectColumnValuesToBeUnique: paper_id.
    4. ExpectColumnValueLengthsToBeBetween: summary toi thieu 30 ky tu.
    5. Evaluate Freshness SLA.
    """
    settings.paths.quality_dir.mkdir(parents=True, exist_ok=True)

    # 1. Khoi tao Ephemeral Context theo chuan GX 1.x
    context = gx.get_context(mode="ephemeral")
    source_name = f"papers_source_{report_name}"
    asset_name = f"papers_asset_{report_name}"
    batch_name = f"papers_batch_{report_name}"

    data_source = context.data_sources.add_pandas(name=source_name)
    data_asset = data_source.add_dataframe_asset(name=asset_name)
    batch_def = data_asset.add_batch_definition_whole_dataframe(batch_name)
    batch = batch_def.get_batch(batch_parameters={"dataframe": df})

    # 2. Thiet lap Suite gom 4 Expectation bat buoc
    suite = gx.ExpectationSuite(name=f"papers_quality_suite_{report_name}")
    suite.add_expectation(gxe.ExpectTableRowCountToBeBetween(min_value=5, max_value=5000))
    suite.add_expectation(gxe.ExpectColumnValuesToNotBeNull(column="paper_id"))
    suite.add_expectation(gxe.ExpectColumnValuesToNotBeNull(column="title"))
    suite.add_expectation(gxe.ExpectColumnValuesToNotBeNull(column="text_for_embedding"))
    suite.add_expectation(gxe.ExpectColumnValuesToBeUnique(column="paper_id"))
    suite.add_expectation(gxe.ExpectColumnValueLengthsToBeBetween(column="summary", min_value=30))

    # 3. Validation
    validation_results = batch.validate(suite)
    gx_success = bool(validation_results.success)

    # 4. Freshness SLA
    freshness = evaluate_freshness_sla(df, settings)
    is_fresh = bool(freshness["is_fresh"])

    overall_success = gx_success and is_fresh

    # 5. Ghi report ra JSON
    if report_name == "baseline":
        report_file = settings.paths.baseline_quality_report
    elif report_name == "corrupted":
        report_file = settings.paths.corrupted_quality_report
    else:
        report_file = settings.paths.quality_dir / f"{report_name}_quality_report.json"

    # Trich xuat tom tat cac expectation that bai neu co
    failed_expectations = []
    for res in getattr(validation_results, "results", []):
        if not res.success:
            failed_expectations.append({
                "expectation_type": res.expectation_config.type if hasattr(res, "expectation_config") else "unknown",
                "kwargs": dict(res.expectation_config.kwargs) if hasattr(res, "expectation_config") else {},
            })

    output_payload = {
        "report_name": report_name,
        "success": overall_success,
        "gx_success": gx_success,
        "is_fresh": is_fresh,
        "row_count": len(df),
        "failed_expectations_count": len(failed_expectations),
        "failed_expectations": failed_expectations,
        "freshness": freshness,
    }

    report_file.parent.mkdir(parents=True, exist_ok=True)
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(output_payload, f, ensure_ascii=False, indent=2)

    # Ghi them freshness report neu la baseline
    if report_name == "baseline" or report_name == "test":
        build_freshness_report(df, settings)

    return output_payload

