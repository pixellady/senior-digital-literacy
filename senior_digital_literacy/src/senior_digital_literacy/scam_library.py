from __future__ import annotations

import json
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any

_LIBRARY_PATH = (
    Path(__file__).resolve().parents[2] / "knowledge" / "scam_library.json"
)


@dataclass(frozen=True)
class LibraryHit:
    pattern_id: str
    title: str
    risk_level: str
    guidance: str
    sample_text: str
    resource_links: list[dict[str, str]]


def _project_library_path() -> Path:
    return _LIBRARY_PATH


@lru_cache(maxsize=1)
def load_library() -> dict[str, Any]:
    return json.loads(_project_library_path().read_text(encoding="utf-8"))


def catalog_links() -> list[dict[str, str]]:
    data = load_library()
    links = data.get("catalog_links") or []
    return [link for link in links if isinstance(link, dict) and link.get("url")]


def allowed_urls() -> set[str]:
    return {str(link["url"]) for link in catalog_links()}


def _links_for_pattern(pattern: dict[str, Any]) -> list[dict[str, str]]:
    wanted = set(pattern.get("resource_link_ids") or [])
    return [link for link in catalog_links() if link.get("url") in wanted]


def match_scam_library(message: str) -> LibraryHit | None:
    """Best local pattern whose markers appear in the pasted text. No web."""
    blob = (message or "").strip().lower()
    if not blob:
        return None

    best: tuple[int, dict[str, Any]] | None = None
    for pattern in load_library().get("patterns") or []:
        markers = [str(m).lower() for m in (pattern.get("markers") or [])]
        score = sum(1 for marker in markers if marker and marker in blob)
        if score <= 0:
            continue
        if best is None or score > best[0]:
            best = (score, pattern)

    if best is None:
        return None

    pattern = best[1]
    return LibraryHit(
        pattern_id=str(pattern.get("id") or ""),
        title=str(pattern.get("title") or ""),
        risk_level=str(pattern.get("risk_level") or "suspicious"),
        guidance=str(pattern.get("guidance") or ""),
        sample_text=str(pattern.get("sample_text") or ""),
        resource_links=_links_for_pattern(pattern),
    )


def filter_links_to_catalog(links: Any) -> list[dict[str, str]]:
    allowed = allowed_urls()
    catalog = {link["url"]: link for link in catalog_links()}
    cleaned: list[dict[str, str]] = []
    if not isinstance(links, list):
        return cleaned
    for item in links:
        if not isinstance(item, dict):
            continue
        url = str(item.get("url") or "")
        if url in allowed:
            cleaned.append(catalog.get(url) or {"label": str(item.get("label") or url), "url": url})
    return cleaned
