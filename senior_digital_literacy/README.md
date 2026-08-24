# Senior Digital Literacy — CrewAI backend

CrewAI **Flow** for the Senior Digital Literacy MVP: Intent Router → Tutor **or** Scam Detector, then a SAD chat JSON envelope. FastAPI exposes that turn as `POST /api/v1/chat`.

This is the product backend, not the stock researcher/reporting-analyst sample.

## Setup

Python >=3.10 and <3.14. [uv](https://docs.astral.sh/uv/) for installs.

```bash
cd senior_digital_literacy
uv sync
```

Copy secrets into a gitignored `.env` in this folder. Required names:

- `ANTHROPIC_API_KEY`
- `MODEL` (Anthropic model id used by the agents)

Optional: `SERPER_API_KEY`, `CORS_ORIGIN` (default `http://localhost:3000`), `PORT` (default `8000`).

Do not commit `.env`.

## Run the API

```bash
uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000
```

- `GET /health` → `{"status":"ok"}`
- `POST /api/v1/chat` — SAD `ChatRequest` → Flow kickoff → chat envelope

Point the PWA at it with `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` in `frontend/.env.local`.

## Run one Flow turn from the CLI

```bash
uv run kickoff
```

Default CLI inputs are a **tutor** demo (“help me send an email”). Scam checks from the PWA send `explicit_path: "scam"`.

Plot (HTML, gitignored): `uv run plot` or `crewai flow plot`.

## Layout

| Path | Role |
|------|------|
| `src/senior_digital_literacy/flow.py` | Start → route → one crew → JSON |
| `src/senior_digital_literacy/crew.py` | `tutor_crew()` / `scam_crew()` |
| `src/senior_digital_literacy/config/agents.yaml` | Tutor and Scam checker |
| `src/senior_digital_literacy/config/tasks.yaml` | One task each, with guardrails |
| `src/senior_digital_literacy/api.py` | FastAPI |

Agents: `allow_delegation: false`. Crews: sequential, `memory=False`. See `project-context/2.build/backend.md`.
