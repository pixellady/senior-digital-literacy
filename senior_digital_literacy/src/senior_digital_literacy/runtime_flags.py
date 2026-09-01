from __future__ import annotations

import os


def tracing_enabled() -> bool:
    """AMP tracing is off unless CREWAI_TRACING_ENABLED is true/1/yes."""
    return os.getenv("CREWAI_TRACING_ENABLED", "").strip().lower() in {
        "1",
        "true",
        "yes",
    }
