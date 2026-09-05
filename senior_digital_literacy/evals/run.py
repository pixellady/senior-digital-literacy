"""Offline eval runner. Writes a redacted summary under project-context/2.build/logs."""

from __future__ import annotations

import json
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
    sys.path.insert(0, str(ROOT / "src"))

from evals.checks.golden import grade_case  # noqa: E402

DATASET = Path(__file__).resolve().parent / "dataset"
LOG_DIR = ROOT.parent / "project-context" / "2.build" / "logs"


def load_cases() -> list[dict]:
    rows: list[dict] = []
    for path in sorted(DATASET.glob("*.jsonl")):
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                rows.append(json.loads(line))
    return rows


def main() -> int:
    cases = load_cases()
    results = [grade_case(case) for case in cases]
    by_cat: Counter[str] = Counter()
    fail_cat: Counter[str] = Counter()
    for row in results:
        cat = row["category"] or "uncategorized"
        by_cat[cat] += 1
        if not row["pass"]:
            fail_cat[cat] += 1
    summary = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "runtime": "crewai",
        "grading": "code-based",
        "total": len(results),
        "passed": sum(1 for r in results if r["pass"]),
        "failed": sum(1 for r in results if not r["pass"]),
        "by_category": {
            cat: {"n": by_cat[cat], "failed": fail_cat[cat]} for cat in sorted(by_cat)
        },
        "failures": [r for r in results if not r["pass"]],
    }
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    out = LOG_DIR / "eval-run-latest.json"
    out.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2))
    return 0 if summary["failed"] == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
