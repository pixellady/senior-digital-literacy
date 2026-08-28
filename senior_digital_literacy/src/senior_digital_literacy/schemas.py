from __future__ import annotations

import json
import re
from typing import Any, Literal

from pydantic import BaseModel, Field


def parse_json_object(raw: str) -> dict[str, Any]:
    """Parse a JSON object, including markdown-fenced model output."""
    text = (raw or "").strip()
    fenced = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    if fenced:
        text = fenced.group(1).strip()
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("JSON payload must be an object")
    return data

RiskLevel = Literal["likely_scam", "suspicious", "likely_safe", "critical"]
TutorMode = Literal["normal", "patient"]
ScamMode = Literal["normal", "priority"]


class ResourceLinkForm(BaseModel):
    """Official help link from our library (label + URL)."""

    label: str
    url: str


class StepCardForm(BaseModel):
    illustration_url: str = ""
    alt_text: str = ""
    caption: str = ""


class ScamContentForm(BaseModel):
    """Fields the Results screen needs on a scam check."""

    text: str
    verified_guide: bool
    step_card: StepCardForm | None = None
    risk_level: RiskLevel
    resource_links: list[ResourceLinkForm] = Field(default_factory=list)


class TutorContentForm(BaseModel):
    text: str
    verified_guide: bool = False
    step_card: StepCardForm | None = None
    risk_level: None = None
    resource_links: list[ResourceLinkForm] = Field(default_factory=list)


class InterruptForm(BaseModel):
    active: bool = False
    label: str = "Scam checker tip"


class UiForm(BaseModel):
    actions: list[str] = Field(
        default_factory=lambda: [
            "pause",
            "explain_simpler",
            "repeat_step",
            "start_over",
            "get_extra_help",
        ]
    )
    clarifying_question: bool = False


class ScamTurnForm(BaseModel):
    """Named form for one Scam checker turn (SAD content fields)."""

    agent_id: Literal["scam_detector"] = "scam_detector"
    agent_display_name: Literal["Scam checker"] = "Scam checker"
    mode: ScamMode
    ai_disclosure: bool
    content: ScamContentForm
    interrupt: InterruptForm = Field(default_factory=InterruptForm)
    ui: UiForm = Field(default_factory=UiForm)


class TutorTurnForm(BaseModel):
    """Named form for one Tutor turn (SAD content fields)."""

    agent_id: Literal["step_by_step_tutor"] = "step_by_step_tutor"
    agent_display_name: Literal["Your tutor"] = "Your tutor"
    mode: TutorMode
    ai_disclosure: bool
    content: TutorContentForm
    interrupt: InterruptForm = Field(default_factory=InterruptForm)
    ui: UiForm = Field(default_factory=UiForm)
