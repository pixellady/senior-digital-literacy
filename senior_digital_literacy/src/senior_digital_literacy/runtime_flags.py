from __future__ import annotations

import os

from senior_digital_literacy.rate_limit import SlidingWindowLimiter

# Laptop defaults: stop a runaway POST /api/v1/chat loop from billing Sonnet.
CHAT_RATE_LIMIT_PER_MINUTE = 10
CHAT_RATE_LIMIT_PER_HOUR = 40
CREW_MAX_RPM = 10
LLM_MAX_OUTPUT_TOKENS = 2048
CREW_MAX_EXECUTION_SECONDS = 25


def tracing_enabled() -> bool:
    """AMP tracing is off unless CREWAI_TRACING_ENABLED is true/1/yes."""
    return os.getenv("CREWAI_TRACING_ENABLED", "").strip().lower() in {
        "1",
        "true",
        "yes",
    }


def _env_int(name: str, default: int) -> int:
    raw = os.getenv(name, "").strip()
    if not raw:
        return default
    try:
        value = int(raw)
    except ValueError:
        return default
    return value if value > 0 else default


def chat_rate_limit_per_minute() -> int:
    return _env_int("CHAT_RATE_LIMIT_PER_MINUTE", CHAT_RATE_LIMIT_PER_MINUTE)


def chat_rate_limit_per_hour() -> int:
    return _env_int("CHAT_RATE_LIMIT_PER_HOUR", CHAT_RATE_LIMIT_PER_HOUR)


def crew_max_rpm() -> int:
    return _env_int("CHAT_MAX_RPM", CREW_MAX_RPM)


def llm_max_output_tokens() -> int:
    return _env_int("CHAT_MAX_OUTPUT_TOKENS", LLM_MAX_OUTPUT_TOKENS)


def crew_max_execution_seconds() -> int:
    return _env_int("CHAT_MAX_EXECUTION_SECONDS", CREW_MAX_EXECUTION_SECONDS)


chat_limiter = SlidingWindowLimiter(
    per_minute=chat_rate_limit_per_minute(),
    per_hour=chat_rate_limit_per_hour(),
)
