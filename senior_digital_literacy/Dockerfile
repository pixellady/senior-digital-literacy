# CrewAI Flow + FastAPI (AAMAD_TARGET_RUNTIME=crewai). Laptop image; not a public host.
FROM python:3.12-slim-bookworm

COPY --from=ghcr.io/astral-sh/uv:0.12.5 /uv /usr/local/bin/uv

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PROJECT_ENVIRONMENT=/app/.venv \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/src \
    CREWAI_TRACING_ENABLED=false

COPY pyproject.toml uv.lock ./
COPY src ./src
COPY knowledge ./knowledge

RUN uv sync --frozen --no-dev

RUN useradd --create-home --uid 10001 appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Bind all interfaces *inside* the container. Host publish must stay 127.0.0.1.
CMD ["uv", "run", "--no-sync", "uvicorn", "senior_digital_literacy.api:app", "--host", "0.0.0.0", "--port", "8000"]
