import json
from pathlib import Path
from typing import Any

import pandas as pd


def _first_sentence(text: str) -> str:
    if not text:
        return ""
    # Split by period followed by space or newline
    parts = text.split(". ")
    if parts:
        first = parts[0].strip()
        if not first.endswith("."):
            first += "."
        return first
    return text.strip()


def build_test_set(df: pd.DataFrame, output_path: str | Path) -> list[dict[str, Any]]:
    """Tao bo evaluation set gom 10 cau hoi tu cleaned dataframe.

    Phan bo 4 dang cau hoi:
    1. summary (3 cau)
    2. authors (3 cau)
    3. date (2 cau)
    4. categories (2 cau)
    """
    if len(df) < 10:
        raise ValueError(f"Need at least 10 documents to generate test set, got {len(df)}")

    target_path = Path(output_path)
    target_path.parent.mkdir(parents=True, exist_ok=True)

    # 10 records for 10 distinct questions
    sample_df = df.iloc[:10].reset_index(drop=True)

    # Distribution: 3 summary, 3 authors, 2 date, 2 categories
    question_types = [
        "summary", "summary", "summary",
        "authors", "authors", "authors",
        "date", "date",
        "categories", "categories"
    ]

    test_set: list[dict[str, Any]] = []

    for i, q_type in enumerate(question_types):
        row = sample_df.iloc[i]
        q_id = f"eval_{i + 1:03d}"
        paper_id = str(row["paper_id"])
        title = str(row["title"])
        authors = str(row.get("authors_joined") or ", ".join(row.get("authors", [])))
        published = str(row.get("published", ""))
        categories = str(row.get("categories_joined") or ", ".join(row.get("categories", [])))
        summary = str(row.get("summary", ""))

        if q_type == "summary":
            question = f"What is the summary of the paper '{title}'?"
            ground_truth = _first_sentence(summary) or summary
        elif q_type == "authors":
            question = f"Who are the authors of the paper '{title}'?"
            ground_truth = authors
        elif q_type == "date":
            question = f"When was the paper '{title}' published?"
            ground_truth = published
        elif q_type == "categories":
            question = f"What are the research categories of the paper '{title}'?"
            ground_truth = categories
        else:
            question = f"What is the main topic of '{title}'?"
            ground_truth = summary

        test_set.append({
            "id": q_id,
            "question_type": q_type,
            "question": question,
            "ground_truth": ground_truth,
            "ground_truth_doc_ids": [paper_id],
        })

    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(test_set, f, ensure_ascii=False, indent=2)

    return test_set

