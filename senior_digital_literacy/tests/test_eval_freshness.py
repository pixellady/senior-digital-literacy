"""Library freshness without the open web: catalog HTTPS and pattern link IDs."""

from senior_digital_literacy.scam_library import allowed_urls, catalog_links, load_library


def test_catalog_urls_are_https() -> None:
    links = catalog_links()
    assert links
    for link in links:
        url = link["url"]
        assert url.startswith("https://"), url


def test_every_pattern_link_id_is_in_catalog() -> None:
    allowed = allowed_urls()
    patterns = load_library().get("patterns") or []
    assert len(patterns) >= 8
    for pattern in patterns:
        ids = pattern.get("resource_link_ids") or []
        assert ids, pattern.get("id")
        missing = [url for url in ids if url not in allowed]
        assert missing == [], f"{pattern.get('id')} links not in catalog: {missing}"


def test_eval_pack_covers_every_pattern() -> None:
    from tests.eval_loader import eval_cases

    pattern_ids = {p["id"] for p in load_library().get("patterns") or []}
    covered = {
        case["expect_library_id"]
        for case in eval_cases()
        if case.get("expect_library_id")
    }
    assert pattern_ids <= covered, f"eval pack missing patterns: {sorted(pattern_ids - covered)}"
