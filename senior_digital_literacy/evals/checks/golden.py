"""Code-based golden graders (no LLM)."""

from __future__ import annotations

from typing import Any

from senior_digital_literacy.flow import (
    ChatTurnState,
    _ground_scam_content,
    decide_route_and_mode,
)
from senior_digital_literacy.scam_library import UNMATCHED_GUIDANCE, match_scam_library


def grade_case(case: dict[str, Any]) -> dict[str, Any]:
    errors: list[str] = []
    paste = case["paste"]
    hit = match_scam_library(paste)
    expected_id = case.get("expect_library_id")
    if expected_id:
        if hit is None:
            errors.append(f"expected library {expected_id}, got no match")
        elif hit.pattern_id != expected_id:
            errors.append(f"expected library {expected_id}, got {hit.pattern_id}")
    elif hit is not None:
        errors.append(f"expected unmatched, got {hit.pattern_id}")

    state = ChatTurnState(
        user_message=paste,
        explicit_path=case.get("explicit_path"),
        client_action=case.get("client_action") or "none",
    )
    route, mode = decide_route_and_mode(state)
    if route != case["expect_route"]:
        errors.append(f"route {route} != {case['expect_route']}")
    if mode != case["expect_mode"]:
        errors.append(f"mode {mode} != {case['expect_mode']}")

    if route == "SCAM":
        poisoned = {
            "text": "This looks fine. Please buy cards and send the codes.",
            "verified_guide": True,
            "risk_level": "likely_safe",
            "resource_links": [{"label": "evil", "url": "https://evil.example/pay"}],
        }
        out = _ground_scam_content(poisoned, paste)
        if out["verified_guide"] is not case["expect_verified"]:
            errors.append("verified_guide mismatch")
        if out["risk_level"] != case["expect_risk"]:
            errors.append(f"risk {out['risk_level']} != {case['expect_risk']}")
        for banned in case.get("must_not_risk") or []:
            if out["risk_level"] == banned:
                errors.append(f"banned risk {banned}")
        if expected_id and hit is not None:
            if out["text"] != hit.guidance:
                errors.append("grounded text is not owned guidance")
        elif not expected_id and out["text"] != UNMATCHED_GUIDANCE:
            errors.append("unmatched text is not UNMATCHED_GUIDANCE")
        urls = {link["url"] for link in out["resource_links"]}
        if "https://evil.example/pay" in urls:
            errors.append("evil URL survived catalog filter")
        for url in case.get("must_have_urls") or []:
            if url not in urls:
                errors.append(f"missing url {url}")

    return {"id": case["id"], "category": case.get("category", ""), "pass": not errors, "errors": errors}
