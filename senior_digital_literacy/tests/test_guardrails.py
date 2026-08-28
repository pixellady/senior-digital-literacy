"""Unit: structural guardrails accept fenced JSON (no agent retry)."""

from crewai.tasks.task_output import TaskOutput

from senior_digital_literacy.crew import _validate_scam_form, _validate_tutor_form
from senior_digital_literacy.schemas import ScamTurnForm, TutorTurnForm

_SCAM_JSON = """{
  "agent_id": "scam_detector",
  "agent_display_name": "Scam checker",
  "mode": "priority",
  "ai_disclosure": true,
  "content": {
    "text": "I'm an AI guide, not a person. Do not click the link.",
    "verified_guide": false,
    "step_card": null,
    "risk_level": "critical",
    "resource_links": []
  },
  "interrupt": {"active": false, "label": "Scam checker tip"},
  "ui": {
    "actions": ["pause", "explain_simpler", "repeat_step", "start_over", "get_extra_help"],
    "clarifying_question": false
  }
}"""

_TUTOR_JSON = """{
  "agent_id": "step_by_step_tutor",
  "agent_display_name": "Your tutor",
  "mode": "normal",
  "ai_disclosure": false,
  "content": {
    "text": "Open Mail and tap the compose button.",
    "verified_guide": false,
    "step_card": {"illustration_url": "", "alt_text": "", "caption": ""},
    "risk_level": null,
    "resource_links": []
  },
  "interrupt": {"active": false, "label": "Scam checker tip"},
  "ui": {
    "actions": ["pause", "explain_simpler", "repeat_step", "start_over", "get_extra_help"],
    "clarifying_question": false
  }
}"""


def _output(raw: str) -> TaskOutput:
    return TaskOutput(description="turn", raw=raw, agent="tester")


def test_scam_guardrail_accepts_markdown_fences():
    ok, result = _validate_scam_form(_output(f"```json\n{_SCAM_JSON}\n```"))
    assert ok is True
    assert isinstance(result.pydantic, ScamTurnForm)
    assert result.pydantic.content.risk_level == "critical"


def test_scam_guardrail_rejects_empty_text():
    bad = _SCAM_JSON.replace("I'm an AI guide, not a person. Do not click the link.", "")
    ok, err = _validate_scam_form(_output(bad))
    assert ok is False
    assert "content.text" in str(err)


def test_tutor_guardrail_accepts_valid_form():
    ok, result = _validate_tutor_form(_output(_TUTOR_JSON))
    assert ok is True
    assert isinstance(result.pydantic, TutorTurnForm)
