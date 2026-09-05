"""Live eval rows. Skipped unless LIVE_API=1 (LLM cost)."""

import os

import httpx
import pytest

from tests.eval_loader import live_eval_cases

pytestmark = pytest.mark.skipif(
    os.getenv("LIVE_API") != "1",
    reason="Set LIVE_API=1 to hit the local Flow API (LLM turn)",
)

_BASE = "http://127.0.0.1:8000"


@pytest.mark.parametrize("case", live_eval_cases(), ids=lambda c: c["id"])
def test_live_eval_envelope(case: dict) -> None:
    response = httpx.post(
        f"{_BASE}/api/v1/chat",
        json={
            "session_id": None,
            "message": case["paste"],
            "explicit_path": case.get("explicit_path") or "scam",
            "client_action": "none",
            "track_override": None,
        },
        timeout=120.0,
    )
    assert response.status_code == 200
    body = response.json()
    assert body["route_intent"] == case["expect_route"]
    if case["expect_route"] == "SCAM":
        assert body["agent_id"] == "scam_detector"
        assert body["content"]["verified_guide"] is case["expect_verified"]
        assert body["content"]["risk_level"] == case["expect_risk"]
        assert body["content"]["text"].strip()
        urls = {link["url"] for link in body["content"]["resource_links"]}
        for url in case.get("must_have_urls") or []:
            assert url in urls
        for banned in case.get("must_not_risk") or []:
            assert body["content"]["risk_level"] != banned
    assert body["session_id"] != "11111111-1111-4111-8111-111111111111"
