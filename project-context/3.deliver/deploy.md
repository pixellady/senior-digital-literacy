# Deploy Runbook — Senior Digital Literacy MVP

**Persona:** `@devops.eng`  
**Action:** `*document-user-guide` (follows `*document-deploy`)  
**Release version:** `0.1.0`  
**Git ref:** `cb29c31`  
**Slice:** Localhost demo — scam-check + tutor proof on `/`

## Status

**Release readiness: PASS for localhost loopback only.** QA documents an MVP pass with explicitly scoped gaps. Evals and security assessments are present. This version is **not** authorized for a public URL, LAN bind on the host, partner demo, or SAD AD-10 compose stack with Postgres.

**Deploy definition: DONE for loopback Compose.** `docker-compose.yml` runs `web` + `api` with host ports published to `127.0.0.1` only. No `db` service. No live `docker compose up` was executed in this action.

**CI scaffolding: DONE.** `.github/workflows/ci.yml` runs lint/test/build only. No deploy job. Local verification: pytest **77 passed**, 4 skipped; evals **28/28**; Vitest **28 passed**; `next lint` warning-only; `next build` pass after restoring missing `RunPhase` / `RunFsmEvent` type aliases (compile-only; no UI behavior change).

**Runbook: DONE.** Hosting, env-var matrix, access control, promotion, rollback, and local observability are in this file. No live `docker compose up` in this action.

**User guide: DONE.** `project-context/3.deliver/user-guide.md`.

Phase 3 Deliver documentation for `0.1.0` loopback is complete. Optional: `aamad validate --phase deliver`.

---

## Release readiness (`*prepare-release`)

### Gate check

| Gate | Artifact | Result | Notes |
|------|----------|--------|-------|
| QA | `project-context/2.build/qa.md` | **PASS** (scoped gaps) | Re-QA after tutor proof + session print (`2634cff`). Pytest **77 passed**, 4 skipped (live). Vitest **24 passed**. Smoke + verify-flow on `/`. Print CSS ≥16px. |
| Evals | `project-context/2.build/evals.md` | **PASS** (scoped gaps) | Offline runner **28/28**. **EC-008** human sample **pass** (2026-09-11): 8/8 library pastes, 0 critical misses. |
| Security | `project-context/2.build/security.md` | **PRESENT** | Example config `security.require_security_assessment: true`. High items have a **minimum backend patch**. Residual SEC-001 accepted **only** for `127.0.0.1`. |
| Config | `aamad.config.yml` | **Missing** | Preferences taken from `aamad.config.example.yml` (same as QA/Security). |

**Do not block this localhost release on:** EC-005 (p95 ≤5s), EV-017 / QA-EVAL-001 (IC3 trailing slash), QA-SMOKE-001 (stale footer copy). QA and evals explicitly log these as known gaps.

### Security posture for this version

Minimum patches recorded in security.md / backend.md:

- `serve()` default bind **`127.0.0.1`** (`HOST` override only)
- `message` max length **4000**
- `POST /api/v1/chat` rate limit **10/min** and **40/hour** per IP (429 `RATE_LIMIT`)
- CrewAI AMP tracing **off** unless `CREWAI_TRACING_ENABLED=true`
- Library match overwrites `content.text` from owned `guidance`; unmatched stays `suspicious` with canned copy

**Residual (accepted for loopback demo; block public/partner):**

| ID | Residual | Operator action |
|----|----------|-----------------|
| SEC-001 | No magic-link auth; no 8K session token cap | Keep API on `127.0.0.1`. Set an Anthropic **Console monthly spend cap** on a named workspace. Do not publish `/api/v1/chat`. |
| SEC-005 | Crew `verbose=True` can print pastes to stdout | Do not copy uvicorn logs that contain pastes. |
| SEC-007 | npm High on `postcss` / `sharp` via Next 15.4.10 | Exploit path is not paste→chat; defer controlled Next bump. |
| SEC-010 | Names-only `.env.example` added at Deliver | `senior_digital_literacy/.env.example`, `frontend/.env.example`. Values stay in gitignored `.env`. |
| SEC-011 | No CSP / HSTS | Acceptable on localhost; required before HTTPS deploy. |

Treat SEC-001 as **Critical** if `serve()` / `0.0.0.0` or a public URL is used without auth.

### Eval monitoring (folded into Observability)

From evals.md §7. **Do not** enable CrewAI AMP tracing for senior pastes (SEC-002). CI uses offline `evals/run.py` only.

---

## Release notes — `0.1.0`

### What this version is

Operator-laptop demo of the shipped `/` workflow. PWA at `http://localhost:3000`, API at `http://127.0.0.1:8000`. Runtime: CrewAI Flow + FastAPI; Next.js 15 PWA.

### In this version

- **Check a scam** on `/`: paste → `explicit_path: "scam"` → `POST /api/v1/chat` → large-type verdict, Verified guide on library match, catalog links.
- **Learn a skill** proof: three goal titles → `explicit_path: "tutor"` → Step 1 card.
- Owned scam library (8 patterns); grounding overwrites model text on match.
- Client **Pause** / Resume (does not abort in-flight POST).
- **Save or print** / **Print this visit** — no `session_id` or pasted message on the sheet.
- Rate-limited unauthenticated chat on loopback; tracing off by default.

### Explicitly out of this version

Full PRD/SAD MVP is **not** claimed. Deferred or stubbed:

- Magic-link auth, HTTPS, idle logout (US-016 / US-019 / AD-12)
- PostgreSQL + pgvector compose stack (SAD AD-10 / AD-6)
- Progress / caregiver API (US-011 / US-012)
- Extra Guidance as its own control; US-020 interrupt
- Weekly tutor cap enforcement; 8K session token cap
- ≥10 scam drills (library has 8 patterns)
- WCAG CI, speech input, public-computer mode
- Public Docker / partner-facing host

### Scoped known gaps (ship with)

| ID | Severity | Gap |
|----|----------|-----|
| EC-005 | Accepted | Live gift-card turn ~10–13s vs p95 ≤5s. Functional; not a fail gate. |
| QA-EVAL-001 / QA-UNIT-001 | Medium | Unmatched / some library rows can omit IC3 when the model emits `https://www.ic3.gov` (no trailing slash). Offline golden still passes. EC-008: 3/8 missing a catalog link; none instructed payment. |
| QA-SMOKE-001 | Low | Footer still says extra routes wait until “this scam check talks to Flow.” `/` already posts to Flow. Stale copy. |
| EC-006 | Placeholder | No per-request dollar ceiling in PRD; HTTP + Console monthly cap only. |

### How to run (local — names only)

Secrets are operator-provided; **do not commit values**. Copy `senior_digital_literacy/.env.example` → `senior_digital_literacy/.env` and fill `ANTHROPIC_API_KEY` and `MODEL`.

**Docker Compose (this Deliver slice):**

```bash
docker compose up --build
```

Open `http://localhost:3000`. Health: `GET http://127.0.0.1:8000/health` → `{"status":"ok"}`. Stop with `docker compose down`.

Do **not** edit `ports:` to drop `127.0.0.1`. Do **not** set `CORS_ORIGIN=*`. Compose forces `CREWAI_TRACING_ENABLED=false`.

**Without Docker** (unchanged from setup.md):

1. Backend: `cd senior_digital_literacy && uv sync && uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000`
2. Frontend: copy `frontend/.env.example` → `frontend/.env.local`, then `cd frontend && npm run dev`

Required names (live LLM): `ANTHROPIC_API_KEY`, `MODEL`. Optional: `CORS_ORIGIN` (never `*`), `PORT`, `HOST` (keep `127.0.0.1` on the host; Compose sets `0.0.0.0` only inside the container), `CHAT_RATE_LIMIT_PER_MINUTE`, `CHAT_RATE_LIMIT_PER_HOUR`, `CREWAI_TRACING_ENABLED` (keep unset/false), `NEXT_PUBLIC_API_BASE_URL`. Do not treat `SERPER_API_KEY` as required.

---

## Hosting (`*define-deploy`)

| Item | This release (`0.1.0`) | SAD AD-10 (not this slice) |
|------|------------------------|----------------------------|
| Target | Operator laptop, Docker Compose | US single-region Compose + HTTPS |
| Services | `web` (Next.js), `api` (Python + CrewAI Flow) | `web`, `api`, `db` (Postgres + pgvector) |
| Host bind | `127.0.0.1:3000` and `127.0.0.1:8000` | Public HTTPS |
| Health | `GET /health` on API (Compose healthcheck); PWA `/` | Same plus DB |
| Images | `senior_digital_literacy/Dockerfile` (python:3.12-slim + uv 0.12.5); `frontend/Dockerfile` (node:20-alpine) | TBD |
| Start | `uvicorn ... --host 0.0.0.0 --port 8000` in-container; `next start` | TBD |

Inside the API container the process listens on `0.0.0.0:8000` so port publish works. The **host** mapping is loopback-only, which is the SEC-001 control for this demo.

Browser calls `http://127.0.0.1:8000` (`NEXT_PUBLIC_API_BASE_URL` baked at image build). CORS allowlist is `http://localhost:3000` and `http://127.0.0.1:3000`.

## CI/CD (`*configure-cicd`)

GitHub Actions workflow: `.github/workflows/ci.yml`.

| Job | Stages | Notes |
|-----|--------|--------|
| `backend` | `compileall` (syntax), `pytest -q`, `evals/run.py` | Python 3.12, uv 0.12.5. `LIVE_API` unset so live LLM tests skip. Tracing off. No `ANTHROPIC_API_KEY` in CI. |
| `frontend` | `npm run lint`, `npm test`, `npm run build` | Node 20. Build arg `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`. |

Triggers: push and pull_request to `main`. Permissions: `contents: read` only. **No deploy job.** Promotion is manual on the operator laptop (see Promotion below).

There is no dedicated Python linter in setup.md (no Ruff/flake8). Syntax check stands in until one is added. Shame-phrase CI lint is SAD Future Work (Open Question #5). Docker image build is not in CI (slow; operator-local).

## Environment variable matrix

Names only. Values live in gitignored `senior_digital_literacy/.env` (Compose `env_file`) and, for `npm run dev`, `frontend/.env.local`. Examples: `senior_digital_literacy/.env.example`, `frontend/.env.example`.

| Name | Required | Default | Where | Notes |
|------|----------|---------|--------|-------|
| `ANTHROPIC_API_KEY` | Yes for live Claude | none | `senior_digital_literacy/.env` | Named-workspace key. Never commit; never add to GitHub Actions. |
| `MODEL` | Yes for live Claude | `anthropic/claude-sonnet-4-5-20250929` | `.env` (and agents.yaml pin) | Model id, not a secret. |
| `HOST` | No | Host: `127.0.0.1`. Compose: `0.0.0.0` **inside** the container | compose `environment` overrides `.env` | Do not publish host ports without `127.0.0.1`. |
| `PORT` | No | `8000` | compose / uvicorn | |
| `CORS_ORIGIN` | No | `http://localhost:3000`; Compose adds `http://127.0.0.1:3000` | compose `environment` | **Never** `*`. |
| `CREWAI_TRACING_ENABLED` | No | off / Compose `false` | compose `environment` | Keep false for senior pastes (SEC-002). |
| `CHAT_RATE_LIMIT_PER_MINUTE` | No | `10` | `.env` | HTTP 429 before Flow. |
| `CHAT_RATE_LIMIT_PER_HOUR` | No | `40` | `.env` | |
| `NEXT_PUBLIC_API_BASE_URL` | Live PWA | `http://127.0.0.1:8000` | Docker **build-arg**; or `frontend/.env.local` for `npm run dev` | Public origin, not a key. Baked at Next build. |
| `LIVE_API` | No | unset | local pytest only | Must stay unset in CI. |
| `SERPER_API_KEY` | No | unused | do not add as required | Open-web search is off. |

Operator-owned (not env): Anthropic Console **monthly spend limit** on the named workspace; keep auto-reload off unless you intend it.

## Access control

Policy for `0.1.0` loopback only. Enterprise IAM / SSO / network segmentation are Future Work (SAD / PRD).

| Surface | Control |
|---------|---------|
| Chat API | No app auth. Anyone who can reach `POST /api/v1/chat` spends the Anthropic key. Host bind **`127.0.0.1:8000`** is the access boundary. |
| Anthropic key | Operator laptop only, named workspace, gitignored `.env`. Rotate by disabling the key in Console and putting a new value in `.env`. |
| Dollar stop | Console monthly spend cap (operator set non-zero on 2026-09-11). HTTP 10/min and 40/hour per IP. |
| PWA | No cookies, no `localStorage` for pastes. History is visit memory. |
| CORS | Localhost origins only. |
| GitHub Actions | `contents: read`. No repository secrets required. Do not store `ANTHROPIC_API_KEY` in GitHub. |
| Logs | uvicorn / Crew `verbose` may print pastes to stdout (SEC-005). Do not copy or share those logs. |
| Print | Sheet must stay free of `session_id` and pasted message (SEC-I4). |

**Do not:** publish `/api/v1/chat`, change Compose `ports` to `8000:8000`, set `CORS_ORIGIN=*`, or enable AMP tracing for real pastes.

## Promotion (manual)

CI does not promote. Operator laptop only.

1. Push to `main` (or merge a PR). Confirm GitHub Actions **CI** is green (`backend` + `frontend`).
2. Confirm `senior_digital_literacy/.env` has `ANTHROPIC_API_KEY` and `MODEL` (names from `.env.example`). Confirm Console monthly limit is still what you intend.
3. From the repo root: `docker compose up --build`.
4. Probe: `GET http://127.0.0.1:8000/health` → `{"status":"ok"}`. Open `http://localhost:3000`.
5. Optional smoke: paste a library sample, **Run**, wait for **Crew: done**. Live turns take ~10–13s (EC-005).

Stop: `docker compose down`. Without Docker, use the setup.md two-terminal sequence instead of step 3.

## Rollback

No database in this slice, so there is no data restore.

| Situation | Steps |
|-----------|--------|
| Bad image / bad code after `compose up` | `docker compose down`. `git checkout` or `git revert` to the last known-good commit (or previous `0.1.0` SHA). `docker compose up --build`. |
| Need to stop spend immediately | Disable or delete the workspace API key in Anthropic Console. Optionally `docker compose down`. |
| Hit Console monthly cap | API calls fail until the 1st 00:00 UTC or you raise the limit. PWA shows calm retry copy. |
| Key leaked | Disable the key in Console; create a new named-workspace key; replace the value in `.env` only; do not commit it. |
| CI red on `main` | Do not promote. Fix on a branch; do not add a deploy job to “push through.” |

## Observability (localhost)

No APM. Use:

- Compose / uvicorn **stdout** (redact pastes before sharing).
- API health: `GET /health`.
- Anthropic Console **Usage** / **Cost** for the named workspace.
- Offline eval summary: `project-context/2.build/logs/eval-run-latest.json` (no paste bodies).

When a public host exists later (not this release): dashboards for cost/session, p50/p95, library match rate, 429/500, unmatched rate; alerts on p95 > 5s, unmatched rise, any `likely_safe` on unmatched.

## Troubleshooting (operators)

| Symptom | Likely cause | What to try |
|---------|--------------|-------------|
| `web` image build: Cannot find module 'typescript' | `NODE_ENV=production` before `npm ci` skipped TypeScript | Dockerfile now runs `npm ci` with devDependencies; `NODE_ENV=production` only at runtime. |
| Health not `ok` | API not up or bound wrong | `curl http://127.0.0.1:8000/health`. Keep host publish `127.0.0.1:8000`. |
| PWA loads, Run fails immediately | Missing `MODEL` / key, or Console cap | Check `.env` names; Console Usage and monthly limit. |
| Calm retry after a long wait | Flow 500 or timeout (~25s crew cap) | API logs; retry once. Do not paste secrets into logs. |
| HTTP 429 | Rate limit 10/min or 40/hour | Wait; do not raise limits for a demo without recording it. |
| Browser CORS error | Opened a non-allowlisted origin | Use `http://localhost:3000` or `http://127.0.0.1:3000`. |
| Fixture results, not live library | `npm run dev` without `NEXT_PUBLIC_API_BASE_URL` | Copy `frontend/.env.example` → `.env.local`. Docker bakes the URL at build. |

## User documentation (`*document-user-guide`)

`project-context/3.deliver/user-guide.md` — install (Docker or uv/npm), first-run Check a scam / Learn a skill, everyday use, troubleshooting, pointer to this runbook.

## Future Work

- Postgres/pgvector as a Compose `db` service (SAD AD-10) only when Progress needs it, and only after auth/HTTPS or a new operator-accepted risk.
- CSP / HSTS / `CORS_ORIGIN` never `*` (SEC-006, SEC-011).
- Catalog URL slash-insensitive match (QA-EVAL-001).
- p95 ≤5s (Haiku/caching) if EC-005 becomes a CI fail.
- Autoscaling, multi-region, APM, nightly DB backup — Future Work per SAD §5.
- CrewAI AMP hosted deploy is **out of scope** for this product until auth and paste redaction exist (SEC-001 / SEC-002). Do not enable AMP tracing on senior pastes.

---

## Sources

- `.cursor/agents/devops-eng.md`
- `.cursor/rules/delivery-workflow.mdc`
- `aamad.config.example.yml` (no `aamad.config.yml`)
- `project-context/1.define/prd.md` v2.3 Final — MVP
- `project-context/1.define/sad.md` v1.0 §5, AD-10, AD-12
- `project-context/2.build/qa.md`
- `project-context/2.build/evals.md` §6–§7
- `project-context/2.build/security.md`
- `project-context/2.build/backend.md`
- `project-context/2.build/frontend.md`
- `project-context/2.build/integration.md`
- `project-context/2.build/setup.md`
- `frontend/package.json` version `0.1.0`
- `senior_digital_literacy/pyproject.toml` version `0.1.0`
- `docker-compose.yml`
- `senior_digital_literacy/Dockerfile`
- `frontend/Dockerfile`
- `senior_digital_literacy/.env.example`
- `frontend/.env.example`
- `.github/workflows/ci.yml`

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → **`crewai`**.
- No `aamad.config.yml`; example-config prefs apply (`require_security_assessment: true`, `require_user_guide: true`, `forbid_committed_secrets: true`).
- QA “do not block on EC-005 or EV-017” is operator-accepted for this slice (qa.md Handoff; evals.md Deliver line).
- Security handoff: local loopback demo may proceed; network-facing / partner demo may not, unless remaining SEC-001 is mitigated or newly accepted in security.md.
- Release version `0.1.0` matches package versions; git tag is not required for this action.
- Assumed local ports: PWA `3000`, API `8000`. Postgres `5432` remains SAD-only (no `db` service in this Compose file).
- Container `HOST=0.0.0.0` plus host publish `127.0.0.1:8000:8000` is equivalent to the accepted loopback risk, not a LAN bind.
- Operator Console monthly spend cap remains outside the repo (operator set a non-zero monthly limit on 2026-09-11).
- This action does not provision cloud infrastructure, does not run `docker compose up`, and does not change product behavior. `RunPhase` / `RunFsmEvent` were re-exported so CI `next build` can pass.

## Open Questions

1. *(Closed for this slice)* Residual SEC-001 is accepted **only** for `127.0.0.1` Compose/host bind. Operator set a non-zero Anthropic monthly cap (2026-09-11) and continued Deliver. LAN/public ports still need a new accepted-risk decision.
2. *(Closed)* `*define-deploy` stays laptop/loopback Compose without Postgres; full SAD AD-10 `db` + HTTPS waits.
3. *(Closed)* Names-only `.env.example` files added with this action (SEC-010).
4. Will EC-005 become a CI fail after Haiku/caching, or remain an accepted gap for `0.1.x`?

## Audit

AAMAD_TARGET_RUNTIME: crewai

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-11T13:09:27Z |
| Persona id | `devops-eng` |
| Action | `prepare-release` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; adapter registry default) |
| Outputs | `project-context/3.deliver/deploy.md` |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — release-readiness artifact, not CrewAI kickoff |
| Prompt Trace | Omitted — no production prompt write; runtime prompts remain in YAML |
| Tools used | Read, Grep, Glob, Shell (`date`, `git log`, `mkdir`); Write |
| Prohibited actions honored | No application/agent logic changes; no secret values; no live infra or production deploy; hosting not expanded beyond the QA-verified loopback slice |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-11T13:36:35Z |
| Persona id | `devops-eng` |
| Action | `define-deploy` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; adapter registry default) |
| Outputs | `docker-compose.yml`; `senior_digital_literacy/Dockerfile`; `frontend/Dockerfile`; `.env.example` (names only); this file |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — deploy-definition artifact, not CrewAI kickoff |
| Prompt Trace | Omitted — no production prompt write; runtime prompts remain in YAML |
| Tools used | Read, Grep, Glob, Write, StrReplace, Shell (`docker compose config` / optional image build) |
| Prohibited actions honored | No application/agent logic changes; no secret values; no `docker compose up`; no public/LAN port publish; no Postgres service |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-11T13:42:42Z |
| Persona id | `devops-eng` |
| Action | `configure-cicd` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; adapter registry default) |
| Outputs | `.github/workflows/ci.yml`; this file; `frontend/lib/types/run.ts` (`RunPhase` / `RunFsmEvent` aliases only) |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — CI config artifact, not CrewAI kickoff |
| Prompt Trace | Omitted — no production prompt write |
| Tools used | Read, Grep, Write, StrReplace, Shell (`pytest`, `evals/run.py`, `npm run lint`, `npm test`, `npm run build`) |
| Prohibited actions honored | No secrets in workflow; no deploy job; no Anthropic in CI; type restore only so `next build` matches frontend.md FSM |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-11T13:45:59Z |
| Persona id | `devops-eng` |
| Action | `document-deploy` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; adapter registry default) |
| Outputs | `project-context/3.deliver/deploy.md` (env matrix, access, promotion, rollback, observability) |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — runbook artifact, not CrewAI kickoff |
| Prompt Trace | Omitted — no production prompt write |
| Tools used | Read, Grep, StrReplace, Shell (`date`) |
| Prohibited actions honored | No secret values; no `docker compose up`; no app logic changes; no public/LAN promotion |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-11T13:47:14Z |
| Persona id | `devops-eng` |
| Action | `document-user-guide` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; adapter registry default) |
| Outputs | `project-context/3.deliver/user-guide.md`; pointer in this file |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — no production prompt write |
| Tools used | Read, Grep, Write, StrReplace, Shell (`date`) |
| Prohibited actions honored | No invented product capabilities; no secret values; no live deploy |
