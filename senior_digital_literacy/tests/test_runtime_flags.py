"""CrewAI AMP tracing is off unless CREWAI_TRACING_ENABLED is set."""

from senior_digital_literacy.runtime_flags import tracing_enabled


def test_tracing_off_by_default(monkeypatch):
    monkeypatch.delenv("CREWAI_TRACING_ENABLED", raising=False)
    assert tracing_enabled() is False


def test_tracing_on_when_env_true(monkeypatch):
    monkeypatch.setenv("CREWAI_TRACING_ENABLED", "true")
    assert tracing_enabled() is True
