"""CrewAI AMP tracing is off unless CREWAI_TRACING_ENABLED is set."""

from senior_digital_literacy.runtime_flags import (
    chat_rate_limit_per_hour,
    chat_rate_limit_per_minute,
    tracing_enabled,
)


def test_tracing_off_by_default(monkeypatch):
    monkeypatch.delenv("CREWAI_TRACING_ENABLED", raising=False)
    assert tracing_enabled() is False


def test_tracing_on_when_env_true(monkeypatch):
    monkeypatch.setenv("CREWAI_TRACING_ENABLED", "true")
    assert tracing_enabled() is True


def test_chat_rate_limits_default_to_laptop_caps(monkeypatch):
    monkeypatch.delenv("CHAT_RATE_LIMIT_PER_MINUTE", raising=False)
    monkeypatch.delenv("CHAT_RATE_LIMIT_PER_HOUR", raising=False)
    assert chat_rate_limit_per_minute() == 10
    assert chat_rate_limit_per_hour() == 40
