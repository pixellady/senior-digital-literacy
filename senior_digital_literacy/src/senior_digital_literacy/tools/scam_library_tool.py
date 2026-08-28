from __future__ import annotations

import json
from typing import Type

from crewai.tools import BaseTool
from pydantic import BaseModel, Field

from senior_digital_literacy.scam_library import lookup_payload


class SearchScamLibraryInput(BaseModel):
    message: str = Field(
        ...,
        description="The pasted text or call description to look up in the local scam library.",
    )


class SearchScamLibraryTool(BaseTool):
    """Read-only lookup in our owned scam-pattern library. Never searches the web."""

    name: str = "search_scam_library"
    description: str = (
        "Search the local Senior Digital Literacy scam library only. "
        "Returns a known gift-card/jail pattern, a maybe-scam pattern, or no match. "
        "Do not use the open web."
    )
    args_schema: Type[BaseModel] = SearchScamLibraryInput

    def _run(self, message: str) -> str:
        return json.dumps(lookup_payload(message))
