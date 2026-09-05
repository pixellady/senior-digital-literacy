# Integration Build Log — Senior Digital Literacy

**Persona:** `@integration.eng`  
**Action:** `*integrate-api` / `*verify-messageflow` / `*log-integration`  
**Slice:** Same `/` screen — paste → `POST /api/v1/chat` → Results (no new app)

## Status

**Confirmed, not rebuilt.** The PWA ↔ Flow wire landed in `7c42dc1` (`sendChat` live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set). `chatService.ts` is unchanged since that commit. This increment does **not** add a second app, route, or API.

Operator constraint honored: same `/` (**Learn the Signs, Protect Yourself**; internal slice Critical Research Workflow) → one non-streaming JSON POST (SAD §4, AD-5, Pattern 1) → Results. `@project.mgr` **not** invoked — `setup.md` already exists and already documents how to run both sides.

Without `NEXT_PUBLIC_API_BASE_URL`, `sendChat` still returns named Path A/B fixtures.

**Handoff:** this slice is enough for `@qa.eng`. Integration will not add Tutor, Extra Guidance, a reviewer-in-the-request, a callback queue, or caregiver UI.

## Wire (unchanged since `7c42dc1`)

| Side | Behavior |
|------|----------|
| Screen | `frontend/app/page.tsx` → `CriticalResearchWorkflow` on `/` only |
| Request | `toChatRequest` sends `explicit_path: "scam"`, `client_action: "none"`, `track_override: null` |
| Transport | `fetch(`${apiBase}/api/v1/chat`)` from `frontend/lib/services/chatService.ts` |
| Auth | None (local/dev, matches backend.md) |
| Response | SAD envelope → `ResultsSection` (`agent_display_name`, `content.risk_level`, `content.text`, `content.resource_links`, `mode`, `ai_disclosure`, `verified_guide`) |
| Fallback | If `NEXT_PUBLIC_API_BASE_URL` is unset, Path A/B fixtures |

`activeScamNow` is still **not** on `ChatRequest` (backend deferred). Live Priority Mode comes from Flow safety markers (for example `"gift card"`), not the checkbox.

Backend `2533793` (owned scam library, named Pydantic forms) did **not** change the HTTP contract. Integration still talks to `POST /api/v1/chat`.

## Interoperability (runtime `crewai`)

| Assumption | Value |
|------------|--------|
| Endpoint | `POST /api/v1/chat` (plus `GET /health`) |
| Payload | SAD `ChatRequest` / `ChatResponse` snake_case JSON |
| Streaming | **No** — one complete JSON body (AD-5) |
| Error envelope | 500 `{ detail: { error: { code, message, retryable } } }`; client shows calm retry copy, does not parse `code` |
| Pattern | REST Pattern 1 (simple POST, wait for body). Not async job/poll. Not a database client. |
| Human-in-the-loop | Senior controls only (Pause). No CrewAI `@human_feedback` in the Flow. No callback control. No caregiver on `/`. |

## How to run both

Documented in `project-context/2.build/setup.md` § “Run both sides together”. Minimal sequence:

1. Backend: `cd senior_digital_literacy && uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000`
2. Frontend: set `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` in gitignored `frontend/.env.local`, then `cd frontend && npm run dev`
3. Open `http://localhost:3000`, paste a message, tap Run, wait for `Crew: done` (live calls take longer than the 900ms stub)

Live path **requires** that env var. Omit it to exercise Path A/B fixtures.

## Verify (`*verify-messageflow`)

Confirm pass (API already running locally):

| Check | Result |
|-------|--------|
| `GET http://127.0.0.1:8000/health` | HTTP 200 `{"status":"ok"}` |
| `POST /api/v1/chat` gift-card jail paste, `explicit_path: "scam"` | HTTP 200 in **~13s** |
| Envelope | `route_intent: SCAM`, `agent_id: scam_detector`, `agent_display_name: Scam checker`, `mode: priority`, `ai_disclosure: true`, `risk_level: likely_scam`, `verified_guide: true`, two resource links, `session_id` is a live UUID (not the stub) |
| `frontend/.env.local` | Present (gitignored; value not recorded) |
| Full UI click-through | Not re-run on the confirm pass; prior Integration pass (2026-08-24) covered paste → Run → Results → History → Reset on `/` |

**Latency vs SLO:** measured ~13s vs SAD / US-001 p95 **≤5s**. Functionally OK. Record the miss; do not stream to fake 5s. Loading copy is already on the PWA.

**Automated tests:** none in CI. No `qa.md`. No pytest / `npm test`. `frontend/scripts/clickthrough.mjs` is a manual Playwright smoke (Playwright is not a `package.json` script). `@qa.eng` owns unit + integration stages.

**Runtime logs:** uvicorn + Crew `verbose=True` on stdout. No files under `project-context/2.build/logs`. Prompt Trace omitted (not a runtime prompt write).

## Keep-outs (already true — QA confirm, do not build this slice)

| Must not | Current |
|----------|---------|
| Hidden reviewer in `kickoff` | No `@human_feedback` in `senior_digital_literacy/src` |
| “Call a person” / callback queue | No such control; Extra Guidance is footer Future Work; scam YAML forbids promising a callback |
| Caregiver on the live check | No `/caregiver` route; footer lists caregiver progress as not working |

MVP HITL on this screen is **Pause** (client freeze; does not cancel the POST). Extra Guidance as a working button is later `@frontend.eng`, still AI, not a person.

## Gaps

- Learn-a-skill / Tutor UI still not on `/` (`explicit_path` is always `"scam"`). That is `@frontend.eng`, then a later Integration `explicit_path` map — not this slice.
- Extra Guidance, Pause-during-flight cancel, auth, tutorial RAG, caps, progress: not in this slice.
- Happening-now checkbox does not change the live request.
- SAD MVP data-flow still lists auth, weekly cap check, and Postgres before kickoff; local/dev Integration does not implement those.
- Live turn missed the 5s p95 SLO (~13s). Client does not parse `error.code`.

## Handoff to QA

Next persona: `@qa.eng` (`*test-unit`, `*test-integration`, `*qa` / `*verify-flow` → `project-context/2.build/qa.md`).

QA should test the shipped scam path (live with env set; fixtures with env unset), record the latency miss, and confirm the keep-outs above. Do not treat Extra Guidance, callback, caregiver, or `@human_feedback` as missing Integration work.

## Sources

- `project-context/2.build/backend.md`
- `project-context/2.build/frontend.md` (live `sendChat` documented `7c8b535`)
- `project-context/2.build/frontend-funcional-spec.md` (Spec Sync last commit `7c8b535`)
- `project-context/2.build/setup.md`
- `project-context/1.define/prd.md` (MVP chat / 2-agent Flow; no human callback MVP)
- `project-context/1.define/sad.md` §4, §6, AD-5, AD-11
- `.cursor/agents/integration-eng.md`
- Git `7c42dc1` — original PWA live `fetch` wire
- Git `ee10e8a` — Integration confirm log
- Operator 2026-08-25: same `/` screen; no new app; `@project.mgr` only if setup how-to missing
- Operator 2026-08-26: current log + close Spec Sync open question; HITL keep-outs not this go-round

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- No `aamad.config.yml` in the repo.
- CORS on the API allows `http://localhost:3000`.
- `.env.local` is gitignored; operators must set the public API base locally.
- `setup.md` how-to is sufficient; `@project.mgr` is not needed for this confirm pass.
- Backend library grounding (`2533793`) is compatible with the existing Results fields.
- Frontend Spec Sync `7c8b535` is the source of truth that live `fetch` is in-scope.

## Open Questions

1. *(Closed)* Should `@frontend.eng` refresh `frontend.md` / Spec Sync now that live fetch has been committed since `7c42dc1`? **Done** — `document-frontend` + Spec Sync S8, last synced commit `7c8b535` (2026-08-26T16:30:00Z). Fixtures remain the offline fallback.
2. *(Closed for this slice)* `activeScamNow` on `ChatRequest` — `@backend.eng` deferred; Integration will not add it.

## Audit

AAMAD_TARGET_RUNTIME: crewai

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T00:14:00Z |
| Persona id | `integration-eng` |
| Action | `integrate-api` + `verify-messageflow` + `log-integration` — confirm `7c42dc1` wire; no new app |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `project-context/2.build/integration.md` only (no application code) |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — contract confirm + docs, not a runtime prompt write |
| Tools used | Read; Grep; git show/diff; curl `GET /health` and `POST /api/v1/chat` |
| Prohibited actions honored | No third-party APIs; no Tutor UI; no second frontend; `@project.mgr` not invoked |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T18:36:00Z |
| Persona id | `integration-eng` |
| Action | `log-integration` — current handoff; close Spec Sync OQ |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `project-context/2.build/integration.md` only |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — docs only |
| Tools used | Read; Write |
| Prohibited actions honored | No application code; no Extra Guidance / callback / caregiver / `@human_feedback` |
