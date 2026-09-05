"""Offline golden eval via evals/checks (no Anthropic)."""

import pytest

from evals.checks.golden import grade_case
from tests.eval_loader import eval_cases


@pytest.mark.parametrize("case", eval_cases(), ids=lambda c: c["id"])
def test_golden_eval_case(case: dict) -> None:
    result = grade_case(case)
    assert result["pass"], f"{case['id']}: {result['errors']}"
