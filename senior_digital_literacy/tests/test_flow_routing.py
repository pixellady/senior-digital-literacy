"""Unit: SAD AD-8 router, safety markers, library grounding (US-002, US-014)."""

from senior_digital_literacy.flow import (
    ChatTurnState,
    _ground_scam_content,
    _parse_agent_payload,
    _safety_override,
    decide_route_and_mode,
)
from senior_digital_literacy.scam_library import UNMATCHED_GUIDANCE


def test_explicit_scam_path_wins_without_markers():
    state = ChatTurnState(explicit_path="scam", user_message="help me send email")
    route, mode = decide_route_and_mode(state)
    assert route == "SCAM"
    assert mode == "normal"


def test_explicit_tutor_wins_even_with_gift_card_in_message():
    state = ChatTurnState(
        explicit_path="tutor",
        user_message="someone asked me for a gift card",
    )
    route, mode = decide_route_and_mode(state)
    assert route == "TUTOR"
    assert mode == "normal"


def test_safety_override_gift_card_forces_scam_priority():
    state = ChatTurnState(user_message="Please buy a gift card for bail")
    assert _safety_override(state) is True
    route, mode = decide_route_and_mode(state)
    assert route == "SCAM"
    assert mode == "priority"


def test_suspicious_content_forces_safety_override():
    state = ChatTurnState(
        user_message="hello",
        suspicious_content="pasted threat text",
    )
    assert _safety_override(state) is True


def test_plain_tutor_message_routes_tutor_normal():
    state = ChatTurnState(user_message="How do I send an email?")
    route, mode = decide_route_and_mode(state)
    assert route == "TUTOR"
    assert mode == "normal"


def test_get_extra_help_on_tutor_sets_patient():
    state = ChatTurnState(
        user_message="How do I send an email?",
        client_action="get_extra_help",
    )
    route, mode = decide_route_and_mode(state)
    assert route == "TUTOR"
    assert mode == "patient"


def test_ground_matched_library_sets_verified_guide():
    content = {
        "text": "agent prose",
        "verified_guide": False,
        "risk_level": "critical",
        "resource_links": [{"label": "web", "url": "https://evil.example"}],
    }
    out = _ground_scam_content(
        content,
        "My grandson is in jail. Buy Apple gift cards.",
    )
    assert out["verified_guide"] is True
    assert out["risk_level"] == "likely_scam"
    assert "agent prose" not in out["text"]
    assert "gift-card bail" in out["text"].lower() or "gift cards" in out["text"].lower()
    urls = {link["url"] for link in out["resource_links"]}
    assert "https://evil.example" not in urls
    assert "https://consumer.ftc.gov/articles/how-avoid-gift-card-scam" in urls


def test_ground_unmatched_clears_verified_and_filters_links():
    content = {
        "text": "This is a phishing scam.",
        "verified_guide": True,
        "risk_level": "critical",
        "resource_links": [
            {"label": "IC3", "url": "https://www.ic3.gov"},
            {"label": "AARP", "url": "https://www.aarp.org/money/scams-fraud/"},
        ],
    }
    out = _ground_scam_content(content, "A shop emailed me about canned peas on sale")
    assert out["verified_guide"] is False
    assert out["risk_level"] == "suspicious"
    assert out["text"] == UNMATCHED_GUIDANCE
    urls = [link["url"] for link in out["resource_links"]]
    assert urls == ["https://www.aarp.org/money/scams-fraud/"]


def test_ground_unmatched_never_keeps_likely_safe():
    content = {
        "text": "This looks fine.",
        "verified_guide": False,
        "risk_level": "likely_safe",
        "resource_links": [],
    }
    out = _ground_scam_content(content, "a neighbor waved hello")
    assert out["risk_level"] == "suspicious"
    assert out["verified_guide"] is False
    assert out["text"] == UNMATCHED_GUIDANCE
    urls = {link["url"] for link in out["resource_links"]}
    assert "https://www.ic3.gov/" in urls
    assert "https://www.aarp.org/money/scams-fraud/" in urls


def test_parse_agent_payload_strips_fences():
    raw = """```json
{"agent_id": "scam_detector", "mode": "priority"}
```"""
    assert _parse_agent_payload(raw)["agent_id"] == "scam_detector"


def test_parse_agent_payload_garbage_is_empty():
    assert _parse_agent_payload("not json") == {}
