"""Live API on :8000. Skipped unless LIVE_API=1 (avoids surprise LLM cost)."""

import os

import httpx
import pytest

pytestmark = pytest.mark.skipif(
    os.getenv("LIVE_API") != "1",
    reason="Set LIVE_API=1 to hit the local Flow API (LLM turn)",
)

_BASE = "http://127.0.0.1:8000"
_GIFT_CARD = (
    "A text says my grandson is in jail and I must buy Apple gift cards "
    "and send the codes to keep him from staying overnight."
)


def test_live_health():
    response = httpx.get(f"{_BASE}/health", timeout=5.0)
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_live_scam_gift_card_envelope():
    response = httpx.post(
        f"{_BASE}/api/v1/chat",
        json={
            "session_id": None,
            "message": _GIFT_CARD,
            "explicit_path": "scam",
            "client_action": "none",
            "track_override": None,
        },
        timeout=120.0,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["route_intent"] == "SCAM"
    assert body["agent_id"] == "scam_detector"
    assert body["agent_display_name"] == "Scam checker"
    assert body["mode"] == "priority"
    assert body["ai_disclosure"] is True
    assert body["content"]["verified_guide"] is True
    assert body["content"]["risk_level"] == "likely_scam"
    assert body["content"]["text"].strip()
    urls = {link["url"] for link in body["content"]["resource_links"]}
    assert "https://consumer.ftc.gov/articles/how-avoid-gift-card-scam" in urls
    assert "https://www.aarp.org/money/scams-fraud/" in urls
    assert body["session_id"] != "11111111-1111-4111-8111-111111111111"
