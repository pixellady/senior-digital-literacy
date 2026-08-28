from __future__ import annotations

from datetime import datetime
import json
from typing import Any, Literal
from uuid import uuid4

from pydantic import BaseModel, Field

from crewai.flow import Flow, listen, or_, router, start

from senior_digital_literacy.crew import SeniorDigitalLiteracy
from senior_digital_literacy.scam_library import (
    filter_links_to_catalog,
    lookup_payload,
    match_scam_library,
)
from senior_digital_literacy.schemas import parse_json_object

# SAD AD-8: explicit UI path wins, then safety override, else TUTOR.
_SCAM_SAFETY_MARKERS = (
    "verify your account",
    "gift card",
    "wire the money",
    "social security",
    "one-time code",
    "remote access",
    "i already paid",
    "they are on the phone",
)


class ChatTurnState(BaseModel):
    """One senior chat turn. Kickoff inputs merge into this state."""

    session_id: str | None = None
    user_message: str = ""
    explicit_path: str | None = None
    client_action: str = "none"
    learning_track: str = "beginner"
    device_context: str = "unknown"
    learner_goal: str = ""
    last_step: str = "none yet"
    suspicious_content: str = ""
    mode: str = "normal"
    current_year: str = Field(default_factory=lambda: str(datetime.now().year))
    route_intent: Literal["TUTOR", "SCAM"] | str = ""
    agent_id: str = ""
    agent_display_name: str = ""
    agent_raw: str = ""
    library_pattern_id: str | None = None
    final_output: dict[str, Any] = Field(default_factory=dict)


class SeniorDigitalLiteracyFlow(Flow[ChatTurnState]):
    """Product turn: start → route → one crew → final JSON output."""

    def __init__(self, **kwargs):
        kwargs.setdefault("tracing", True)
        super().__init__(**kwargs)

    @start()
    def ingest_turn(self) -> str:
        if not self.state.session_id:
            self.state.session_id = str(uuid4())
        if not self.state.current_year:
            self.state.current_year = str(datetime.now().year)
        return "ingested"

    @router(ingest_turn, emit=["TUTOR", "SCAM"])
    def intent_router(self) -> Literal["TUTOR", "SCAM"]:
        route, mode = decide_route_and_mode(self.state)
        self.state.route_intent = route
        self.state.mode = mode
        return self.state.route_intent  # type: ignore[return-value]

    @listen("TUTOR")
    def run_tutor(self) -> str:
        self.state.agent_id = "step_by_step_tutor"
        self.state.agent_display_name = "Your tutor"
        result = SeniorDigitalLiteracy().tutor_crew().kickoff(inputs=_crew_inputs(self.state))
        self.state.agent_raw = _result_payload(result)
        return "tutor_done"

    @listen("SCAM")
    def run_scam(self) -> str:
        self.state.agent_id = "scam_detector"
        self.state.agent_display_name = "Scam checker"
        hit = match_scam_library(self.state.user_message)
        self.state.library_pattern_id = hit.pattern_id if hit else None
        result = SeniorDigitalLiteracy().scam_crew().kickoff(inputs=_crew_inputs(self.state))
        self.state.agent_raw = _result_payload(result)
        return "scam_done"

    @listen(or_(run_tutor, run_scam))
    def emit_final_output(self) -> dict[str, Any]:
        parsed = _parse_agent_payload(self.state.agent_raw)
        content = parsed.get("content")
        if not isinstance(content, dict):
            content = {
                "text": self.state.agent_raw,
                "verified_guide": False,
                "step_card": None,
                "risk_level": None,
                "resource_links": [],
            }

        if self.state.route_intent == "SCAM":
            content = _ground_scam_content(content, self.state.user_message)
        else:
            content["verified_guide"] = False
            content["risk_level"] = None
            content["resource_links"] = []

        interrupt = parsed.get("interrupt") if isinstance(parsed.get("interrupt"), dict) else {
            "active": False,
            "label": "Scam checker tip",
        }
        ui = parsed.get("ui") if isinstance(parsed.get("ui"), dict) else {
            "actions": [
                "pause",
                "explain_simpler",
                "repeat_step",
                "start_over",
                "get_extra_help",
            ],
            "clarifying_question": False,
        }
        self.state.final_output = {
            "session_id": self.state.session_id,
            "route_intent": self.state.route_intent,
            "agent_id": parsed.get("agent_id") or self.state.agent_id,
            "agent_display_name": parsed.get("agent_display_name")
            or self.state.agent_display_name,
            "mode": parsed.get("mode") or self.state.mode,
            "ai_disclosure": bool(
                parsed.get("ai_disclosure", self.state.mode in {"patient", "priority"})
            ),
            "content": content,
            "interrupt": interrupt,
            "ui": ui,
            "caps": {
                "tutor_sessions_used_this_week": 0,
                "tutor_sessions_limit": 5,
                "tutor_capped": False,
            },
            "progress_hint": {
                "continue_lesson": False,
                "continue_drill": False,
            },
        }
        return self.state.final_output


def _result_payload(result: Any) -> str:
    pydantic_out = getattr(result, "pydantic", None)
    if pydantic_out is not None:
        return json.dumps(pydantic_out.model_dump())
    json_out = getattr(result, "json_dict", None)
    if isinstance(json_out, dict):
        return json.dumps(json_out)
    return getattr(result, "raw", "") or ""


def _ground_scam_content(content: dict[str, Any], message: str) -> dict[str, Any]:
    """Badge and links come from the owned library, never the open web."""
    hit = match_scam_library(message)
    text = str(content.get("text") or "").strip()
    if hit:
        content["verified_guide"] = True
        content["risk_level"] = hit.risk_level
        content["resource_links"] = hit.resource_links
        if not text:
            content["text"] = hit.guidance
        return content

    content["verified_guide"] = False
    risk = content.get("risk_level")
    if risk not in {"likely_scam", "suspicious", "likely_safe", "critical"}:
        content["risk_level"] = "suspicious"
    content["resource_links"] = filter_links_to_catalog(content.get("resource_links"))
    return content


def _parse_agent_payload(raw: str) -> dict[str, Any]:
    try:
        return parse_json_object(raw)
    except (json.JSONDecodeError, ValueError):
        return {}


def decide_route_and_mode(state: ChatTurnState) -> tuple[str, str]:
    """SAD AD-8: explicit UI path wins, then safety override, else TUTOR."""
    path = (state.explicit_path or "").strip().lower()
    if path == "scam":
        route = "SCAM"
    elif path == "tutor":
        route = "TUTOR"
    elif _safety_override(state):
        route = "SCAM"
    else:
        route = "TUTOR"

    mode = state.mode if state.mode in {"normal", "patient", "priority"} else "normal"
    if route == "SCAM" and _safety_override(state):
        mode = "priority"
    elif route == "TUTOR" and state.client_action == "get_extra_help":
        mode = "patient"
    return route, mode


def _safety_override(state: ChatTurnState) -> bool:
    blob = f"{state.user_message} {state.suspicious_content}".lower()
    if (state.suspicious_content or "").strip():
        return True
    return any(marker in blob for marker in _SCAM_SAFETY_MARKERS)


def _crew_inputs(state: ChatTurnState) -> dict[str, Any]:
    return {
        "user_message": state.user_message,
        "client_action": state.client_action,
        "mode": state.mode,
        "learning_track": state.learning_track,
        "device_context": state.device_context,
        "learner_goal": state.learner_goal,
        "last_step": state.last_step,
        "suspicious_content": state.suspicious_content,
        "current_year": state.current_year,
        "library_result": json.dumps(lookup_payload(state.user_message)),
    }
