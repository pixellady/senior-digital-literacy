from __future__ import annotations

import json
from typing import Type

from crewai.tools import BaseTool
from pydantic import BaseModel, Field

from senior_digital_literacy.tutorial_library import lookup_tutorial_payload


class SearchTutorialLibraryInput(BaseModel):
    message: str = Field(
        ...,
        description="The learner's chosen task title or goal id from the pick-a-task UI.",
    )


class SearchTutorialLibraryTool(BaseTool):
    """Read-only lookup in our owned tutorial step library. Never searches the web."""

    name: str = "search_tutorial_library"
    description: str = (
        "Search the local Senior Digital Literacy tutorial library only. "
        "Returns a verified step for a supported Partial User task, or no match. "
        "Do not use the open web."
    )
    args_schema: Type[BaseModel] = SearchTutorialLibraryInput

    def _run(self, message: str) -> str:
        return json.dumps(lookup_tutorial_payload(message))
