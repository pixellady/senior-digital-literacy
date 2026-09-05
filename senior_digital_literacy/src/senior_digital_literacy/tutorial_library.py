from __future__ import annotations

import json
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
from typing import Any

_LIBRARY_PATH = (
    Path(__file__).resolve().parents[2] / "knowledge" / "tutorial_library.json"
)

UNMATCHED_TUTOR_GUIDANCE = (
    "I do not have a verified step for that task in our library yet, so I "
    "will not guess. Pick one of the tasks listed, or come back when we add "
    "more guides."
)


@dataclass(frozen=True)
class TutorialHit:
    goal_id: str
    title: str
    step_text: str
    resource_links: list[dict[str, str]]


@lru_cache(maxsize=1)
def load_library() -> dict[str, Any]:
    return json.loads(_LIBRARY_PATH.read_text(encoding="utf-8"))


def catalog_links() -> list[dict[str, str]]:
    data = load_library()
    links = data.get("catalog_links") or []
    return [link for link in links if isinstance(link, dict) and link.get("url")]


def allowed_urls() -> set[str]:
    return {str(link["url"]) for link in catalog_links()}


def _links_for_goal(goal: dict[str, Any]) -> list[dict[str, str]]:
    wanted = set(goal.get("resource_link_ids") or [])
    return [link for link in catalog_links() if link.get("url") in wanted]


def match_tutorial_library(message: str) -> TutorialHit | None:
    """Match by exact picker title (case-insensitive) or goal id."""
    blob = (message or "").strip()
    if not blob:
        return None
    lowered = blob.lower()
    for goal in load_library().get("goals") or []:
        title = str(goal.get("title") or "")
        goal_id = str(goal.get("id") or "")
        if lowered == title.lower() or lowered == goal_id.lower():
            return TutorialHit(
                goal_id=goal_id,
                title=title,
                step_text=str(goal.get("step_text") or ""),
                resource_links=_links_for_goal(goal),
            )
    return None


def lookup_tutorial_payload(message: str) -> dict[str, Any]:
    hit = match_tutorial_library(message)
    if hit is None:
        return {
            "matched": False,
            "verified_guide": False,
            "goal_id": None,
            "title": "",
            "step_text": "",
            "resource_links": [],
        }
    return {
        "matched": True,
        "verified_guide": True,
        "goal_id": hit.goal_id,
        "title": hit.title,
        "step_text": hit.step_text,
        "resource_links": hit.resource_links,
    }
