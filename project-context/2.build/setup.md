# Project Setup — Senior Digital Literacy MVP

**Persona:** `@project.mgr`  
**Action:** `*document-setup` (catch-up — **no scaffolding**)  
**Status:** Documents what **already exists** in the repository. Does **not** create or replace application code.

## Catch-up constraint

This artifact was written **after** Build-phase work began. The following are **already present** and must **not** be recreated by `@project.mgr` or any setup command:

| Path | Status | Do not |
|------|--------|--------|
| `senior_digital_literacy/` | CrewAI Flow + FastAPI backend | Run `crewai create` again; duplicate package |
| `frontend/` | Next.js App Router PWA (single route `/`) | Run `create-next-app` again; scaffold a second frontend |
| `project-context/2.build/backend.md` | Backend build log | Treat as superseded without reading |
| `project-context/2.build/frontend.md` | Frontend build log | Treat as superseded without reading |
| `project-context/2.build/integration.md` | Integration build log | Treat as superseded without reading |
| `project-context/2.build/frontend-funcional-spec.md` | Frontend functional spec | Recreate from templates |

**Prohibited for `@project.mgr` on this project:** application logic, agent YAML edits, API handlers, React components, CI/CD, or new top-level app folders.

---

## Product context (Define → Build handoff)

| Item | Value |
|------|-------|
| PRD | `project-context/1.define/prd.md` v2.3 Final |
| SAD | `project-context/1.define/sad.md` v1.0 |
| User stories | `project-context/1.define/user-stories/` (US-001–US-021) |
| Resolved runtime | `crewai` (`AAMAD_TARGET_RUNTIME` unset → default per adapter registry) |
| Architecture | Intent Router (Flow) → **Tutor** or **Scam Detector**; Progress as backend service (stub) |

---

## Repository layout (implementation)

```
Senior Digital Literacy/
├── senior_digital_literacy/          # Backend — CrewAI Flow + FastAPI (@backend.eng)
│   ├── pyproject.toml                # [tool.crewai] type = "flow"
│   ├── uv.lock
│   ├── README.md                     # Backend run instructions
│   ├── knowledge/
│   │   └── user_preference.txt       # CrewAI scaffold placeholder
│   └── src/senior_digital_literacy/
│       ├── flow.py                   # SeniorDigitalLiteracyFlow (intent router + crews)
│       ├── crew.py                   # tutor_crew() / scam_crew()
│       ├── api.py                    # GET /health, POST /api/v1/chat
│       ├── main.py                   # CLI kickoff / plot / train hooks
│       └── config/
│           ├── agents.yaml           # step_by_step_tutor, scam_detector
│           └── tasks.yaml            # tutor_turn_task, scam_check_task
├── frontend/                         # PWA — Next.js 15 (@frontend.eng)
│   ├── package.json
│   ├── app/page.tsx                  # Single route /
│   ├── components/                   # CriticalResearchWorkflow slice
│   ├── scripts/
│   │   └── clickthrough.mjs          # Local smoke script
│   └── lib/
│       ├── services/chatService.ts   # Live fetch when API base set; else fixtures
│       ├── fixtures/chatFixtures.ts
│       └── types/chat.ts             # SAD ChatRequest / ChatResponse
└── project-context/
    ├── 1.define/                     # PRD, SAD, user stories
    └── 2.build/                      # setup.md (this file) + persona build logs
```

**Framework / methodology (not runtime):** `.cursor/agents/`, `.cursor/rules/`, `.cursor/templates/`, root `AGENTS.md`, optional `aamad.config.example.yml` (no committed `aamad.config.yml` yet).

---

## Prerequisites

| Tool | Version / notes |
|------|-----------------|
| **Python** | `>=3.10, <3.14` (per `senior_digital_literacy/pyproject.toml`) |
| **uv** | Recommended for backend deps (`uv sync`) — [https://docs.astral.sh/uv/](https://docs.astral.sh/uv/) |
| **Node.js** | LTS compatible with Next.js 15 (frontend uses npm) |
| **npm** | Installs `frontend/` dependencies |

Optional: CrewAI CLI (`crewai run`, `crewai flow plot`) via uv project scripts.

---

## Backend — install and run

**Working directory:** `senior_digital_literacy/`

### Install

```bash
cd senior_digital_literacy
uv sync
```

### Environment (names only — do not commit values)

Create a **gitignored** `.env` file in `senior_digital_literacy/` (see `.gitignore`). Documented names from backend README and `api.py`:

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | **Yes** (live LLM turns) | Anthropic Claude API authentication |
| `MODEL` | **Yes** (live LLM turns) | Anthropic model id for agents (README documents usage) |
| `SERPER_API_KEY` | No | SerperDevTool on Scam Detector (when tool is used) |
| `CORS_ORIGIN` | No | Allowed browser origin(s); default `http://localhost:3000` |
| `PORT` | No | Uvicorn listen port; default `8000` |

No committed `.env.example` in the repo at catch-up time — operators follow `senior_digital_literacy/README.md`.

### Run API (local dev)

```bash
cd senior_digital_literacy
uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000
```

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Liveness — expect `{"status":"ok"}` |
| `/api/v1/chat` | POST | One Flow turn; SAD `ChatRequest` → chat envelope |

Alternative entry points (CLI, not required for PWA):

```bash
uv run kickoff          # Single Flow turn from CLI (default tutor demo)
uv run plot             # Flow diagram HTML (gitignored output)
```

### Backend pointers for `@backend.eng`

- **Primary tree:** `senior_digital_literacy/src/senior_digital_literacy/`
- **Build log:** `project-context/2.build/backend.md`
- **Do not** scaffold a second CrewAI project at repo root.

---

## Frontend — install and run

**Working directory:** `frontend/`

### Install

```bash
cd frontend
npm install
```

### Environment (names only — do not commit values)

Create a **gitignored** `frontend/.env.local` (Next.js convention; `frontend/.gitignore` ignores `.env*`).

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | No | When set (e.g. `http://127.0.0.1:8000`), `chatService.ts` calls live `POST /api/v1/chat`. When unset, **named fixtures** only. |

### Run dev server

```bash
cd frontend
npm run dev
```

Open **http://localhost:3000** — single route `/` (Critical Research Workflow).

Other scripts:

```bash
npm run build    # Production build
npm run start    # Production server (after build)
npm run lint     # ESLint
```

### Frontend pointers for `@frontend.eng`

- **Primary tree:** `frontend/`
- **Functional spec:** `project-context/2.build/frontend-funcional-spec.md`
- **Build log:** `project-context/2.build/frontend.md`
- **Do not** run `create-next-app` again.

---

## Run both sides together (local integration)

Documented in `project-context/2.build/integration.md`. Minimal operator sequence:

1. **Terminal A — backend**
   ```bash
   cd senior_digital_literacy
   uv sync
   uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000
   ```
2. **Terminal B — frontend**  
   Set `NEXT_PUBLIC_API_BASE_URL` in gitignored `frontend/.env.local`, then:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open http://localhost:3000 → paste suspicious text → **Run** → expect live Scam checker response (slower than stub).

**CORS:** Backend defaults to allowing `http://localhost:3000`. Override with `CORS_ORIGIN` if the dev URL differs.

**Offline / no API key:** Omit `NEXT_PUBLIC_API_BASE_URL` — frontend uses Path A/B fixtures with no network call.

---

## Framework / operator environment (optional)

| Variable | Default | Purpose |
|----------|---------|---------|
| `AAMAD_TARGET_RUNTIME` | `crewai` | AAMAD adapter selection for Build personas (unset in current logs) |
| `CREWAI_TRACING_ENABLED` | off | Optional CrewAI trace collection (`true` for one run) |

---

## Current implementation snapshot (catch-up)

| Area | Shipped | Not yet / stub |
|------|---------|----------------|
| Backend Flow | Intent router (explicit path + safety override); Tutor and Scam crews; FastAPI chat | NL classify_intent; US-020 cross-path interrupt; RAG; caps; progress persistence |
| Frontend | Single scam-check slice on `/`; SAD envelope types; Pause (client); fixtures | Full onboarding/learn routes; Tutor UI; auth; caregiver |
| Integration | `fetch` when `NEXT_PUBLIC_API_BASE_URL` set | Tutor path on `/`; `activeScamNow` on live API |

Detail lives in persona build logs — **do not duplicate implementation specs here**.

---

## Downstream agent handoff

| Persona | Command | Work in | Read first |
|---------|---------|---------|------------|
| `@system.arch` | `*create-sfs` | `project-context/1.define/sfs/` | `sad.md`, relevant user story |
| `@backend.eng` | `*develop-be` | `senior_digital_literacy/` | `backend.md`, `sad.md` §2–§4 |
| `@frontend.eng` | `*develop-fe` | `frontend/` | `frontend.md`, `frontend-funcional-spec.md` |
| `@integration.eng` | `*integrate-api` | `frontend/lib/services/`, API contract | `integration.md`, `sad.md` §4 |
| `@qa.eng` | `*qa` | tests + `project-context/2.build/qa.md` | user stories, `integration.md` |
| `@security.eng` | `*assess-security` | `project-context/2.build/security.md` | PRD §5, SAD security view |
| `@devops.eng` | `*prepare-release` | `project-context/3.deliver/` | `qa.md` (+ `security.md` if present) |

**Next recommended Build steps (operator order):**

1. `@qa.eng` — unit/integration against existing API + chat envelope  
2. `@security.eng` — assessment before Deliver (PRD recommends; no `aamad.config.yml` gate yet)  
3. `@frontend.eng` — Tutor step on `/` after Integration stabilizes scam path  
4. `@backend.eng` — RAG, caps, progress service (stubs today)  
5. `@devops.eng` — only after `qa.md` exists per delivery-workflow rule  

---

## Sources

- `project-context/1.define/prd.md` v2.3 Final  
- `project-context/1.define/sad.md` v1.0  
- `project-context/2.build/backend.md`  
- `project-context/2.build/frontend.md`  
- `project-context/2.build/integration.md`  
- `senior_digital_literacy/README.md`  
- `frontend/README.md`  
- `senior_digital_literacy/pyproject.toml`  
- `frontend/package.json`  
- `.cursor/agents/project-mgr.md`  

---

## Assumptions

- Backend and frontend were scaffolded by `@backend.eng`, `@frontend.eng`, and `@integration.eng` before this catch-up `setup.md` existed (noted in their build logs).
- Operators manage secrets locally in gitignored env files; this document lists **names only**.
- Default local ports: API **8000**, Next dev **3000**.
- `aamad.config.yml` is not present; `aamad.config.example.yml` at repo root is reference only.
- Python tooling uses **uv** in backend docs; pip/venv may work but is not the documented path.

---

## Open Questions

1. Should `@project.mgr` add committed `.env.example` files (names only, no values) under `senior_digital_literacy/` and `frontend/` via `*configure-env`?
2. Should `setup.md` be re-run after `@devops.eng` adds deploy/CI env matrix to `deploy.md`?
3. Pin Node.js version in `frontend/package.json` `engines` or document in SAD only?

---

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-24T18:50:00Z |
| Persona id | `project-mgr` |
| Action | `*document-setup` — catch-up only (no scaffold) |
| Resolved runtime | `crewai` (env unset) |
| Outputs | `project-context/2.build/setup.md` |
| Prohibited actions honored | No app code; no folder recreation; no `.env` reads |
| Model | Composer |
| Prompt Trace | Omitted — documentation catch-up from existing tree and build logs |
