"""Unit: CrewAI adapter controls on YAML (SAD testing)."""

from pathlib import Path

import yaml

_CONFIG = Path(__file__).resolve().parents[1] / "src" / "senior_digital_literacy" / "config"


def test_max_iter_within_prd_caps():
    agents = yaml.safe_load((_CONFIG / "agents.yaml").read_text(encoding="utf-8"))
    assert agents["step_by_step_tutor"]["max_iter"] <= 8
    assert agents["scam_detector"]["max_iter"] <= 8
    assert agents["step_by_step_tutor"]["allow_delegation"] is False
    assert agents["scam_detector"]["allow_delegation"] is False
    for name in ("step_by_step_tutor", "scam_detector"):
        assert agents[name]["max_tokens"] <= 2048
        assert agents[name]["max_execution_time"] <= 25
        assert agents[name]["max_rpm"] <= 10


def test_scam_task_does_not_use_llm_string_guardrail():
    tasks = yaml.safe_load((_CONFIG / "tasks.yaml").read_text(encoding="utf-8"))
    assert "guardrail" not in tasks["scam_check_task"]
    assert "guardrail" not in tasks["tutor_turn_task"]
