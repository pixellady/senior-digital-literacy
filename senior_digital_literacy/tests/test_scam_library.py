"""Unit: owned scam library (US-002-6, US-021-1)."""

from senior_digital_literacy.scam_library import (
    filter_links_to_catalog,
    lookup_payload,
    match_scam_library,
)


def test_gift_card_jail_matches_library():
    hit = match_scam_library(
        "My grandson is in jail. Buy Apple gift cards and send the codes."
    )
    assert hit is not None
    assert hit.pattern_id == "gift_card_jail"
    assert hit.risk_level == "likely_scam"
    assert hit.resource_links
    payload = lookup_payload(hit.sample_text)
    assert payload["matched"] is True
    assert payload["verified_guide"] is True


def test_account_closed_pattern_matches():
    hit = match_scam_library(
        "Your bank account will be closed today unless you tap this link and confirm your password."
    )
    assert hit is not None
    assert hit.pattern_id == "account_closed_maybe"
    assert hit.risk_level == "suspicious"


def test_unknown_bank_phish_does_not_match_library():
    hit = match_scam_library(
        "First Coastal Bank is warning me of a suspicious sign-in "
        "and pushing me to click a link and enter my login and SSN digits"
    )
    assert hit is None
    payload = lookup_payload(
        "First Coastal Bank is warning me of a suspicious sign-in"
    )
    assert payload["matched"] is False
    assert payload["verified_guide"] is False


def test_filter_links_drops_unknown_urls():
    cleaned = filter_links_to_catalog(
        [
            {"label": "AARP", "url": "https://www.aarp.org/money/scams-fraud/"},
            {"label": "Random", "url": "https://evil.example/steal"},
        ]
    )
    assert cleaned == [
        {
            "label": "AARP Fraud Watch",
            "url": "https://www.aarp.org/money/scams-fraud/",
        }
    ]


def test_filter_links_ic3_requires_catalog_exact_url():
    """Catalog uses a trailing slash; agent often omits it."""
    cleaned = filter_links_to_catalog(
        [{"label": "IC3", "url": "https://www.ic3.gov"}]
    )
    assert cleaned == []
