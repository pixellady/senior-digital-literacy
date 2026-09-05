"""Unit: owned tutorial library lookup and grounding (Tutor proof slice)."""

from senior_digital_literacy.flow import _ground_tutor_content
from senior_digital_literacy.tutorial_library import (
    UNMATCHED_TUTOR_GUIDANCE,
    lookup_tutorial_payload,
    match_tutorial_library,
)


def test_match_tutorial_by_picker_title():
    hit = match_tutorial_library("Send an email to my daughter")
    assert hit is not None
    assert hit.goal_id == "send_email_daughter"
    assert "Mail app" in hit.step_text


def test_match_tutorial_by_goal_id():
    hit = match_tutorial_library("find_photo_phone")
    assert hit is not None
    assert hit.title == "Find a photo on my phone"


def test_lookup_payload_unmatched():
    payload = lookup_tutorial_payload("Teach me stocks")
    assert payload["matched"] is False
    assert payload["verified_guide"] is False


def test_ground_matched_tutorial_sets_verified_guide():
    content = {
        "text": "agent invented step",
        "verified_guide": False,
        "risk_level": "suspicious",
        "resource_links": [{"label": "web", "url": "https://evil.example"}],
    }
    out = _ground_tutor_content(content, "Join a video call with family")
    assert out["verified_guide"] is True
    assert out["risk_level"] is None
    assert "agent invented step" not in out["text"]
    assert "FaceTime" in out["text"] or "Zoom" in out["text"]


def test_ground_unmatched_tutor_refuses():
    content = {
        "text": "Open Settings and tap Passwords.",
        "verified_guide": True,
        "risk_level": None,
        "resource_links": [],
    }
    out = _ground_tutor_content(content, "Reset my bank password")
    assert out["verified_guide"] is False
    assert out["text"] == UNMATCHED_TUTOR_GUIDANCE
    assert out["resource_links"] == []
