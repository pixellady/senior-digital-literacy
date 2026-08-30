# Backend Build Log — Senior Digital Literacy

**Persona:** `@backend.eng`  
**Action:** `*develop-be` / `*define-agents` / `*document-backend`  
**Slice:** CrewAI Flow + FastAPI chat; owned scam library; named output forms

## Status

Implemented the MVP backend under `senior_digital_literacy/` as a CrewAI **Flow**. One HTTP turn: ingest → Intent Router → **Tutor or** Scam Detector → SAD chat envelope.

**This increment (demo trust):**
- Scam checker uses a **local pattern library** only (`knowledge/scam_library.json`). `SerperDevTool` / open-web search is **off**.
- `content.verified_guide` is **true only** when Flow matches that library. Links and risk on a match come from the library, not the web.
- Tutor and Scam tasks fill named Pydantic forms (`TutorTurnForm`, `ScamTurnForm`) via `Task.output_pydantic`.
- Deleted unused CrewAI starter `tools/custom_tool.py` and `knowledge/user_preference.txt`. Gift-card safety markers in `flow.py` are unchanged. `activeScamNow` was **not** added.

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
| `src/senior_digital_literacy/flow.py` | Ingest, route, one crew, emit JSON; library grounding; gift-card safety markers |
| `src/senior_digital_literacy/crew.py` | `tutor_crew()` / `scam_crew()`; `output_pydantic` forms |
| `src/senior_digital_literacy/schemas.py` | `TutorTurnForm`, `ScamTurnForm` (risk, text, links, verified_guide) |
| `src/senior_digital_literacy/scam_library.py` | Load and match owned patterns |
| `src/senior_digital_literacy/tools/scam_library_tool.py` | `search_scam_library` (no web) |
| `knowledge/scam_library.json` | Gift-card/jail sample; maybe-scam sample; FTC/AARP/IC3 catalog |
| `src/senior_digital_literacy/config/agents.yaml` | `step_by_step_tutor`, `scam_detector` |
| `src/senior_digital_literacy/config/tasks.yaml` | Playbooks; named-form expected_output |
| `src/senior_digital_literacy/api.py` | `GET /health`, `POST /api/v1/chat` |
| `src/senior_digital_literacy/main.py` | CLI Flow kickoff |

## Agents (SAD §2)

Intent Router is a **Flow `@router`**, not an agent. Progress remains a stub object on the envelope.

| Agent | UI name | Crew | Tools now |
|-------|---------|------|-----------|
| `step_by_step_tutor` | Your tutor | `tutor_crew` — one task | none |
| `scam_detector` | Scam checker | `scam_crew` — one task | `search_scam_library` only |

`allow_delegation` stays **false**. Extra help is Patient/Priority Mode in task YAML. US-020 interrupt is not implemented.

## Owned scam library

Eight operator-owned samples (not live search). US-003 drill types plus all three product personas (Margaret, Carmen, David):

| Pattern id | Personas | Sample | `risk_level` |
|------------|----------|--------|--------------|
| `gift_card_jail` | Margaret | Grandson in jail / buy gift cards | `likely_scam` |
| `account_closed_maybe` | Margaret | Account closed unless you tap a link | `suspicious` |
| `tech_support_lock` | Margaret | Microsoft pop-up / AnyDesk | `likely_scam` |
| `irs_tax_warrant` | Margaret | IRS tax warrant / same-day wire | `likely_scam` |
| `housing_benefits_fee` | Carmen | Section 8 / SNAP recertification fee | `likely_scam` |
| `romance_ticket_money` | Margaret | Overseas ticket via Western Union | `likely_scam` |
| `recovery_get_money_back` | Margaret, Carmen | Pay a fee to recover lost money | `likely_scam` |
| `caregiver_remote_setup` | David | Stranger will set up mom's banking | `suspicious` |

Flow `_ground_scam_content` **overwrites** `verified_guide`, matched `risk_level`, and `resource_links` from this file. Unmatched pastes: `verified_guide` false; any agent links filtered to the catalog allowlist.

Gift-card **safety markers** in `_SCAM_SAFETY_MARKERS` (including `"gift card"`) still force SCAM route and Priority Mode. That is separate from the badge.

## Named output forms

`Task.output_pydantic` is `TutorTurnForm` / `ScamTurnForm`. Required screen fields: `content.risk_level`, `content.text`, `content.resource_links`, `content.verified_guide`. YAML `expected_output` is not the contract; the Pydantic class is.

Tutor path: Flow forces `verified_guide` false until tutorial RAG exists.

## Intent Router (SAD AD-8, partial)

1. `explicit_path` `scam` \| `tutor` wins.
2. Else safety override → `SCAM` (keyword markers and/or `suspicious_content`).
3. Else `TUTOR`.

NL `classify_intent` and US-020 are **not** implemented. `activeScamNow` is **not** a request field (deferred).

## API

**`GET /health`** → `{"status":"ok"}`

**`POST /api/v1/chat`** — SAD ChatRequest in, ChatResponse-shaped dict out. Local/dev: no auth.

Response still includes stubbed `caps` and `progress_hint` (zeros). Frontend should hide weekly limits until they are real (`@frontend.eng`).

## How to run

Secrets live in `senior_digital_literacy/.env` (gitignored). Required names: `ANTHROPIC_API_KEY`, `MODEL`. Optional: `CORS_ORIGIN`, `PORT`. `SERPER_API_KEY` is unused.

```bash
cd senior_digital_literacy
uv sync
uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000
```

Restart uvicorn after this change. PWA: `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` in `frontend/.env.local`.

## Gaps (visible, not fake-complete)

- Tutorial RAG still absent; tutor `verified_guide` is always false.
- Caps and progress are still zeros/false stubs (do not show in the demo UI).
- CrewAI `AGENTS.md` and CLI train/replay/test remain scaffold leftovers (ignored for the demo).
- Haiku router vs Sonnet conversational agents — still deferred.

## Sources

- `project-context/1.define/prd.md` v2.3 — agent defs, F1/F7
- `project-context/1.define/sad.md` v1.0 §2, §4, AD-5, AD-8
- `project-context/2.build/setup.md` (catch-up)
- User stories US-002, US-007, US-014, US-021
- `.cursor/agents/backend-eng.md`
- `.cursor/rules/adapter-crewai.mdc`
- Operator 2026-08-25: owned library, named forms, no Serper, no `activeScamNow`

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- Local/dev API is unauthenticated; CORS locked to the Next origin by default.
- Patient/Priority playbooks live in tasks; backstory holds identity + hard limits only.
- Catalog URLs (FTC, AARP, IC3) are curated in-repo, not fetched at runtime.
- Integration live `fetch` already committed (`7c42dc1`); this increment does not change the PWA.

## Open Questions

1. Grow past these eight patterns before beta (US-003 asks for ≥10 drills)?
2. Haiku for the router vs Sonnet for conversational agents — still deferred.

*Resolved:* `activeScamNow` is not added this week. Open-web search is off for the demo.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-24T18:05:00Z |
| Persona id | `backend-eng` |
| Action | `develop-be` — CrewAI Flow, YAML agents/tasks, FastAPI `/api/v1/chat` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `senior_digital_literacy/`; `project-context/2.build/backend.md` |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — no production prompt write; runtime prompts live in YAML |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-25T23:30:00Z |
| Persona id | `backend-eng` |
| Action | `define-agents` — local scam library, `output_pydantic` forms, remove Serper, delete starters |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `scam_library.json`; `schemas.py`; `scam_library.py`; `scam_library_tool.py`; `crew.py`; `flow.py`; `tasks.yaml`; this file |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — implementation; library and forms are the contract |
| Tools used | Read/Grep/Write/Delete; uv run matcher check |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-30T00:00:00Z |
| Persona id | `backend-eng` |
| Action | `define-agents` — expand owned library to 8 patterns across Margaret, Carmen, David |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `knowledge/scam_library.json`; this file |
| Prompt Trace | Omitted — owned sample texts from PRD personas / US-003 types |
