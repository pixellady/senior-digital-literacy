# Backend Build Log — Senior Digital Literacy

**Persona:** `@backend.eng`  
**Action:** `*develop-be` / `*define-agents` / `*implement-endpoint` / `*document-backend`  
**Slice:** CrewAI Flow + FastAPI chat

## Status

Implemented the MVP backend under `senior_digital_literacy/` as a CrewAI **Flow** (not a two-agent sequential crew). One HTTP turn: ingest → Intent Router → **Tutor or** Scam Detector → SAD chat envelope.

Live locally: `GET /health` and `POST /api/v1/chat`. A gift-card scam paste on the PWA returned a live Scam checker envelope (not the frontend fixture).

## Runtime

| Item | Value |
|------|-------|
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; SAD default) |
| Package | `senior_digital_literacy/` (`[tool.crewai] type = "flow"`) |
| LLM | Anthropic Claude Sonnet (`anthropic/claude-sonnet-4-5-20250929`) via env `MODEL` |
| Process | Sequential one-task crews; `memory=False`; `allow_delegation: false` |
| HTTP | FastAPI, CORS default `http://localhost:3000` |

## Application map

| Path | Role |
|------|------|
| `src/senior_digital_literacy/flow.py` | `SeniorDigitalLiteracyFlow`: ingest, route, one crew, emit JSON |
| `src/senior_digital_literacy/crew.py` | `tutor_crew()` / `scam_crew()`; YAML-backed agents and tasks |
| `src/senior_digital_literacy/config/agents.yaml` | `step_by_step_tutor`, `scam_detector` |
| `src/senior_digital_literacy/config/tasks.yaml` | `tutor_turn_task`, `scam_check_task` (playbooks + JSON guardrails) |
| `src/senior_digital_literacy/api.py` | `GET /health`, `POST /api/v1/chat` |
| `src/senior_digital_literacy/main.py` | CLI Flow kickoff (`crewai run` / `kickoff`) |

## Agents (SAD §2)

Intent Router is a **Flow `@router`**, not an agent. Progress is a stub object on the envelope, not an agent.

| Agent | UI name | Crew | Tools now |
|-------|---------|------|-----------|
| `step_by_step_tutor` | Your tutor | `tutor_crew` — one task | none (RAG later) |
| `scam_detector` | Scam checker | `scam_crew` — one task | `SerperDevTool` |

`allow_delegation` stays **false**. Extra help is Patient/Priority Mode in task YAML, not CrewAI human-feedback or delegation. US-020 tutor→scam interrupt is not implemented.

## Intent Router (SAD AD-8, partial)

1. `explicit_path` `scam` \| `tutor` wins.
2. Else safety override → `SCAM` (keyword markers and/or `suspicious_content`).
3. Else `TUTOR`.

Natural-language `classify_intent` with confidence 0.65 is **not** implemented. Cross-path interrupt (US-020) is **not** implemented.

If the route is `SCAM` and safety override fires, Flow sets `mode` to `priority`. Gift-card wording matches a safety marker, so a gift-card paste often returns Priority even when the UI checkbox is off. `activeScamNow` is not a `ChatRequest` field.

## API

**`GET /health`** → `{"status":"ok"}`

**`POST /api/v1/chat`** — SAD ChatRequest in, ChatResponse-shaped dict out. Local/dev: no auth.

Request fields: `session_id`, `message`, `explicit_path` (`tutor` \| `scam` \| omitted), `client_action`, `track_override`.

Response includes `session_id`, `route_intent`, `agent_id`, `agent_display_name`, `mode`, `ai_disclosure`, `content` (text, risk_level, resource_links, …), `interrupt`, `ui`, plus **stubbed** `caps` and `progress_hint`.

Not implemented (404 / not in this app): magic-link, `/me`, progress, caregiver, survey, print.

## How to run

Secrets live in `senior_digital_literacy/.env` (gitignored). Required names: `ANTHROPIC_API_KEY`, `MODEL`. Optional: `SERPER_API_KEY`, `CORS_ORIGIN`, `PORT`.

```bash
cd senior_digital_literacy
uv sync
uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000
```

PWA optional: `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` in `frontend/.env.local`. Without it, the frontend still uses named fixtures.

## Gaps (visible, not fake-complete)

- RAG / `verified_guide` grounding is not wired; the model may still set the flag.
- Caps and progress are zeros/false stubs.
- Scaffold leftovers: `tools/custom_tool.py`, CLI train/replay/test, CrewAI `AGENTS.md`.
- `setup.md` still missing.
- Frontend live `fetch` in `chatService.ts` is a local Integration change; it is **not** in this backend commit.

## Sources

- `project-context/1.define/prd.md` v2.3 — agent defs, F1/F7
- `project-context/1.define/sad.md` v1.0 §2, §4, AD-5, AD-8
- User stories US-002, US-007, US-014, US-020
- `.cursor/agents/backend-eng.md`
- `.cursor/rules/adapter-crewai.mdc`

## Assumptions

- `setup.md` missing; backend lives in `senior_digital_literacy/` via `crewai create crew --classic`, then Flow + FastAPI were added in-repo (no second `crewai create flow` folder).
- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- Local/dev API is unauthenticated; CORS locked to the Next origin by default.
- Serper is bound on Scam Detector only; Tutor stays tool-free until RAG.
- Patient/Priority playbooks live in tasks; backstory holds identity + hard limits only.

## Open Questions

1. Should `activeScamNow` become a request field so Priority Mode is UI-driven rather than keyword-driven?
2. When does Integration commit the PWA `fetch` and `integration.md`?
3. Haiku for the router vs Sonnet for conversational agents — still deferred.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-24T18:05:00Z |
| Persona id | `backend-eng` |
| Action | `develop-be` — CrewAI Flow, YAML agents/tasks, FastAPI `/api/v1/chat` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `senior_digital_literacy/`; `project-context/2.build/backend.md` |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — implementation/docs, not a CrewAI artifact-generation kickoff |
| Prompt Trace | Omitted — no production prompt write; runtime prompts live in YAML |
| Tools used | Read/Glob/Grep; Write; uv/uvicorn; local health + chat click-through |
