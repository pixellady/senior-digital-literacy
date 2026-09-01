"""HTTP contract: FastAPI ↔ SAD envelope. Flow is mocked (no LLM)."""

from unittest.mock import MagicMock, patch
from uuid import uuid4

from fastapi.testclient import TestClient

from senior_digital_literacy.api import app

client = TestClient(app)

_ENVELOPE = {
    "session_id": str(uuid4()),
    "route_intent": "SCAM",
    "agent_id": "scam_detector",
    "agent_display_name": "Scam checker",
    "mode": "priority",
    "ai_disclosure": True,
    "content": {
        "text": "Do not buy gift cards.",
        "verified_guide": True,
        "step_card": None,
        "risk_level": "likely_scam",
        "resource_links": [
            {
                "label": "AARP Fraud Watch",
                "url": "https://www.aarp.org/money/scams-fraud/",
            }
        ],
    },
    "interrupt": {"active": False, "label": "Scam checker tip"},
    "ui": {
        "actions": [
            "pause",
            "explain_simpler",
            "repeat_step",
            "start_over",
            "get_extra_help",
        ],
        "clarifying_question": False,
    },
    "caps": {
        "tutor_sessions_used_this_week": 0,
        "tutor_sessions_limit": 5,
        "tutor_capped": False,
    },
    "progress_hint": {"continue_lesson": False, "continue_drill": False},
}


def test_health_ok():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_chat_empty_message_is_validation_error():
    response = client.post(
        "/api/v1/chat",
        json={
            "session_id": None,
            "message": "",
            "explicit_path": "scam",
            "client_action": "none",
            "track_override": None,
        },
    )
    assert response.status_code == 422


def test_chat_message_over_4000_is_validation_error():
    response = client.post(
        "/api/v1/chat",
        json={
            "message": "x" * 4001,
            "explicit_path": "scam",
            "client_action": "none",
        },
    )
    assert response.status_code == 422


def test_chat_returns_sad_envelope_when_flow_succeeds():
    with patch("senior_digital_literacy.api.SeniorDigitalLiteracyFlow") as flow_cls:
        instance = MagicMock()
        instance.kickoff.return_value = _ENVELOPE
        flow_cls.return_value = instance
        response = client.post(
            "/api/v1/chat",
            json={
                "session_id": None,
                "message": "My grandson is in jail. Buy gift cards.",
                "explicit_path": "scam",
                "client_action": "none",
                "track_override": None,
            },
        )
    assert response.status_code == 200
    body = response.json()
    assert body["route_intent"] == "SCAM"
    assert body["agent_id"] == "scam_detector"
    assert body["agent_display_name"] == "Scam checker"
    assert body["content"]["risk_level"] == "likely_scam"
    assert body["content"]["verified_guide"] is True
    instance.kickoff.assert_called_once()
    inputs = instance.kickoff.call_args.kwargs["inputs"]
    assert inputs["explicit_path"] == "scam"
    assert inputs["user_message"] == "My grandson is in jail. Buy gift cards."
    assert inputs["suspicious_content"] == inputs["user_message"]


def test_chat_flow_exception_returns_retryable_internal_error():
    with patch("senior_digital_literacy.api.SeniorDigitalLiteracyFlow") as flow_cls:
        instance = MagicMock()
        instance.kickoff.side_effect = RuntimeError("crew failed")
        flow_cls.return_value = instance
        response = client.post(
            "/api/v1/chat",
            json={
                "message": "check this",
                "explicit_path": "scam",
                "client_action": "none",
            },
        )
    assert response.status_code == 500
    error = response.json()["detail"]["error"]
    assert error["code"] == "INTERNAL"
    assert error["retryable"] is True
    assert "try again" in error["message"].lower()


def test_chat_invalid_flow_payload_returns_internal_error():
    with patch("senior_digital_literacy.api.SeniorDigitalLiteracyFlow") as flow_cls:
        instance = MagicMock()
        instance.kickoff.return_value = "not-an-envelope"
        flow_cls.return_value = instance
        response = client.post(
            "/api/v1/chat",
            json={"message": "check this", "explicit_path": "scam"},
        )
    assert response.status_code == 500
    assert response.json()["detail"]["error"]["code"] == "INTERNAL"


def test_cors_preflight_allows_localhost_3000():
    response = client.options(
        "/api/v1/chat",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
        },
    )
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"
