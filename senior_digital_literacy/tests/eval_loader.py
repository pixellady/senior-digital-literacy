"""Load the golden eval pack from evals/dataset/*.jsonl (no LLM)."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

_DATASET = Path(__file__).resolve().parents[1] / "evals" / "dataset"


def eval_cases() -> list[dict[str, Any]]:
    cases: list[dict[str, Any]] = []
    for path in sorted(_DATASET.glob("*.jsonl")):
        for line in path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                cases.append(json.loads(line))
    if not cases:
        raise AssertionError(f"No eval cases in {_DATASET}")
    return cases


def live_eval_cases() -> list[dict[str, Any]]:
    return [case for case in eval_cases() if case.get("live")]
