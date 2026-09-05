# QA Build Log — Senior Digital Literacy

**Persona:** `@qa.eng`  
**Action:** `*test-unit` / `*test-integration` / `*qa` / `*verify-flow` / print after / `*run-evals`  
**Slice:** Unit + integration + smoke / E2E on shipped `/`, plus Save as PDF ≥16px, plus golden eval pack

## Status

Unit stage **pass** (37 tests). Integration stage **pass** (11 automated checks: 6 HTTP mocked, 3 `sendChat`, 2 live Flow). Smoke / verify-flow **pass**. Print / Save as PDF **pass**. Golden eval **pass** (23 offline checks; 2 live rows skipped without `LIVE_API=1`). MVP QA gate for implemented scam-check is complete.

No `AC-*` IDs exist in `system-description.md` (file absent) or user stories. Mapping uses **US-xxx-n** = story ID + numbered acceptance criterion.

## Unit

| Suite | Command | Result |
|-------|---------|--------|
| Backend (pytest 9.1.1) | `cd senior_digital_literacy && uv run pytest -q` | **24 passed** in 1.41s |
| Frontend (Vitest 4.1.11) | `cd frontend && npm test` | **13 passed** in 178ms |

### Mapping (implemented code only)

| Test / module | Story criterion | Result |
|---------------|-----------------|--------|
| `toChatRequest` always `explicit_path: "scam"` | US-002-2, US-001-4 | Pass |
| `validateRunInput` rejects empty paste | US-002-2 | Pass |
| Gift-card jail library match + verified payload | US-002-6, US-021-1 | Pass |
| Account-closed library match (`suspicious`) | US-002-3 | Pass |
| Unmatched First Coastal paste → no library hit | US-021-1 (badge only on match) | Pass |
| `_ground_scam_content` overwrites badge/risk/links on match | US-021-1 | Pass |
| `decide_route_and_mode` explicit `scam` / `tutor` | SAD AD-8 | Pass |
| Gift-card marker → SCAM + **priority** | US-014-1 | Pass |
| `get_extra_help` on tutor → patient | US-013 (mode only; Extra Guidance UI not on `/`) | Pass |
| Path A/B fixtures: `likely_scam` vs `critical`+Priority+disclosure | US-002-3, US-014-2 | Pass |
| `selectStubFixturePath` uses checkbox, not keywords | frontend.md contract | Pass |
| IC3/AARP on Path B fixture (catalog URLs) | US-014-3 | Pass (fixture) |
| Fenced JSON parse + scam/tutor guardrails | CrewAI output contract | Pass |
| YAML `max_iter` ≤ 8, `allow_delegation: false`, no LLM string `guardrail` | SAD runtime gates / PRD caps | Pass |
| `WEEKLY_CAPS_ARE_REAL === false` | US-001 / frontend hide stub caps | Pass |
| `PAUSE_IDLE` canonical string | US-009-2 | Pass |
| Run FSM idle→running→done; Reset while running | US-002 submit / US-009 Pause (client FSM) | Pass |
| Send-error copy “Nothing you did caused this” | US-001-6, US-009-4 | Pass |
| `riskHeading` large-type labels | US-002-3 Results | Pass |

### Unit defect

| ID | Severity | Finding |
|----|----------|---------|
| QA-UNIT-001 | Low | `filter_links_to_catalog` requires an **exact** catalog URL. Agent output `https://www.ic3.gov` (no trailing slash) is dropped; catalog stores `https://www.ic3.gov/`. Unmatched live pastes can lose the IC3 link while AARP (slash-accurate) remains. Covered by `test_filter_links_ic3_requires_catalog_exact_url` (documents current behavior). |

### Not unit-tested (not implemented, or not this stage)

- US-002-5 Progress milestone / caregiver redaction — Progress is a stub envelope.
- US-001-5 p95 ≤5s — performance; Integration already recorded ~13s; this action does not time live LLM turns.
- US-021-3 ≥10 scam drills — library has **2** patterns (gift-card jail, account-closed). Gap, not a unit failure of matching code.
- US-007 tutor step on `/` — Tutor crew exists; UI always sends `explicit_path: "scam"`.
- Pause cancel of in-flight POST — known Integration keep-out.
- Crew `kickoff` / Flow HTTP — covered under Integration.

## Integration

| Suite | Command | Result |
|-------|---------|--------|
| API HTTP (Flow mocked) | `uv run pytest -q tests/test_api_http.py tests/test_live_chat.py` | **6 passed**, 2 skipped (live off) |
| `sendChat` FE↔API contract | `cd frontend && npm test` | **3 passed** (file `sendChat.test.ts`; full Vitest run 16 including unit) |
| Live Flow (`LIVE_API=1`) | `LIVE_API=1 uv run pytest -q tests/test_live_chat.py` | **2 passed** in 10.55s |

API was already running at `http://127.0.0.1:8000` (`GET /health` 200).

### Mapping

| Check | Story / contract | Result |
|-------|------------------|--------|
| `GET /health` | Integration wire | Pass |
| POST empty `message` → 422 | SAD ChatRequest validation | Pass |
| POST mocked kickoff → SAD envelope (`route_intent`, `agent_id`, `verified_guide`) | US-002-3, SAD §4 | Pass |
| Kickoff `inputs` include `explicit_path: scam` and `suspicious_content` | US-001-4, api.py | Pass |
| Flow exception → 500 `{ detail.error.code: INTERNAL, retryable: true }` | SAD error envelope | Pass |
| Invalid kickoff payload → 500 INTERNAL | failure path | Pass |
| CORS preflight Origin `http://localhost:3000` | setup.md / integration.md | Pass |
| `sendChat` fixture when `NEXT_PUBLIC_API_BASE_URL` unset | frontend.md fallback | Pass |
| `sendChat` live `fetch` URL `/api/v1/chat`, no `stubPath` on body | SAD AD-5 | Pass |
| HTTP 500 → calm retry copy; `error.code` not parsed | integration.md keep-out | Pass |
| Live gift-card jail: `SCAM`, `scam_detector`, `priority`, `ai_disclosure`, `verified_guide`, `likely_scam`, FTC+AARP links, live `session_id` | US-002-6, US-014-1, US-021-1 | Pass |

### Latency (recorded, not a fail)

Live gift-card turn **10.55s** vs US-001-5 / SAD p95 **≤5s**. Functionally OK. Same miss class as Integration (~13s). No streaming added.

### Not integration-tested

- Tutor `explicit_path` from UI (UI always sends `scam`).
- Pause cancel of in-flight POST (not implemented).
- Auth, weekly cap enforcement, Progress DB.

## Smoke

Executed 2026-08-28 on `http://localhost:3000/` with API `GET http://127.0.0.1:8000/health` → **200**. Frontend `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`. Method: Cursor browser (Playwright `frontend/scripts/clickthrough.mjs` was not used — `playwright` package is not installed).

| Step | Story / contract | Result |
|------|------------------|--------|
| Document title + h1 “Learn the Signs, Protect Yourself” | US-001 / US-002 | Pass |
| Subtitle: safe to ask | US-001 | Pass |
| Idle SafetyBar: “Pause is always here, waiting for you.” | US-009-2 | Pass |
| Empty paste: Run disabled | US-002-2 | Pass |
| Pause → Resume copy + button swap | US-009 | Pass |
| Paste gift-card jail sample (token `ZQ9M4`); Run enables | US-002-2 | Pass |
| Run → Crew: running (inputs/Run disabled) | US-002 submit | Pass |
| Crew: done → Results: Scam checker, Verified guide, “This looks like a scam”, Mode: priority, AI disclosure, FTC gift-card + AARP links | US-002-3, US-002-6, US-014-1, US-021-1 | Pass |
| History lists this visit’s preview (`ZQ9M4`) | US-002 History | Pass |
| Reset clears message, restores Crew: idle and Results placeholder; History keeps the visit row | clickthrough contract / Inputs copy | Pass |
| Future-work footer visible (Extra Guidance / Tutor / caregiver not working) | PRD deferrals | Pass (copy; see QA-SMOKE-001) |

### Smoke defects

| ID | Severity | Finding |
|----|----------|---------|
| QA-SMOKE-001 | Low | Footer still says extra routes wait until “this scam check talks to Flow.” `/` now posts to Flow. Stale copy; not a functional fail. |

## Verify-flow

End-to-end UI → backend on shipped `/` only.

| Check | Result |
|-------|--------|
| Live API, not Path A/B stub | **Pass.** Results showed **Scam checker**, **Verified guide**, FTC “How to avoid a gift card scam” + AARP. No Path A/B labels, no stub snippet “gift-card bail request”, no stub `session_id` `11111111-1111-4111-8111-111111111111` in the page. Matches live library-grounded gift-card envelope (same class as `LIVE_API=1` integration). |
| `explicit_path` from UI | Not re-probed in the browser (always `"scam"` on `/`; covered by unit `toChatRequest`). |
| Pause during POST | Not tested — Pause does not abort in-flight `fetch` (no `AbortController`). Keep-out. |
| Unmatched paste (First Coastal) | Not run in this browser pass. |
| Tutor / Extra Guidance / caregiver | Not on `/`. Not tested. |

Network body (`session_id`, `route_intent`) was not captured in this browser session (no Playwright request listener). Functional live-vs-stub call is from Results content above, consistent with integration live gift-card turn.

## Eval (`*run-evals`)

Canonical pack is now `senior_digital_literacy/evals/dataset/*.jsonl` (25 cases) plus `evals/run.py` (AAMAD 0.8.0). See `project-context/2.build/evals.md`.

Executed 2026-09-05 offline runner: **25/25**. Pytest golden + freshness: **28 passed**. Live EV-017 still **QA-EVAL-001**.

| Suite | Result |
|-------|--------|
| Golden (library + AD-8 route + grounding; no Anthropic) | **20 passed** |
| Freshness (HTTPS catalog; pattern links in catalog; pack covers all 8 library ids) | **3 passed** |
| Live (`LIVE_API=1`: EV-001 gift-card, EV-017 unmatched First Coastal) | **2 skipped** (live off) |

**23 passed, 2 skipped** in 1.62s.

Offline cases assert: expected `pattern_id` or unmatched; `decide_route_and_mode`; after `_ground_scam_content` a poisoned `likely_safe` / evil URL cannot survive; owned `guidance` or `UNMATCHED_GUIDANCE`; catalog `must_have_urls`.

| Case | Story | Result |
|------|-------|--------|
| EV-001–002 gift-card jail + paraphrase | US-002-6, US-014-1 | Pass |
| EV-003–004 account-closed + `verify your account` → priority | US-002-3 | Pass |
| EV-005–016 tech / IRS / housing / romance / recovery / caregiver (canonical + paraphrase) | US-021-1 | Pass |
| EV-017–018 unmatched (First Coastal, neighbor hello); never `likely_safe` | US-021-1, US-002-3 | Pass |
| EV-019 explicit tutor email | SAD AD-8 | Pass (router only; Tutor UI not on `/`) |
| EV-020 no `explicit_path`, gift-card safety override | US-014-1 | Pass |

**Full re-run 2026-09-05 (Adopting evals checklist):** API `GET /health` 200.

| Suite | Result |
|-------|--------|
| Backend pytest (incl. golden + freshness) | **64 passed**, 4 skipped (live off in default run) |
| Frontend Vitest | **17 passed** |
| `LIVE_API=1` `test_eval_live` + `test_live_chat` | **3 passed**, **1 failed** (EV-017) |

| Live case | Result |
|-----------|--------|
| EV-001 gift-card jail | Pass (verified, `likely_scam`, FTC+AARP) |
| EV-017 unmatched First Coastal | **Fail** — `risk_level`/`verified_guide`/`text` OK; IC3 `https://www.ic3.gov/` missing; only AARP remained. Same class as **QA-UNIT-001** (agent URL without trailing slash is dropped; leftover AARP is truthy so unmatched fallback does not add IC3). |
| `test_live_chat` gift-card + health | Pass |

### Eval defect

| ID | Severity | Finding |
|----|----------|---------|
| QA-EVAL-001 | Medium | Live unmatched (EV-017) can omit IC3 when the model emits `https://www.ic3.gov` (no slash). Offline golden still passes because it grounds from an empty/evil link list and uses `unmatched_resource_links()`. |

## Print / Save as PDF

Executed 2026-08-30 after a live gift-card Results turn (`P16QA`). Control: **Save or print** → `window.print()`; hint tells the user to choose **Save as PDF**. Native OS print dialogs were not completed (automation cannot drive Save as PDF). Measured `@media print` on desktop and iPhone (390×844, DPR 3), then Chrome headless `--print-to-pdf` of the same print stylesheet.

| Check | Story | Result |
|-------|-------|--------|
| Print CSS `html` 16px; body / list / URLs 18px; headings 20–28px. No print-summary node below 16px | US-017-3, US-018-2 | **Pass** (desktop and phone viewport; same rem scale) |
| Phone screen: Save or print 20.25px, hint 18px, `min-h` 49.5px | US-018-2 (control, not print sheet) | Pass |
| Print article has no session UUID; chrome (`no-print`) hidden | US-017-2 | Pass |
| Print body includes do-not-buy / do-not-send-codes | US-017-4 (scam-check adaptation) | Pass |
| Browser print-to-PDF fallback exists | US-017-5 | Pass (hint + Chrome PDF sample) |

Computed print sizes (both viewports): article 16px; `.print-body` / `li` / `.print-url` 18px; h3 20px; h2 24px; h1 28px. Color `#0f172a` on white.

US-017-1 numbered illustrated No-Device steps: **N/A** — shipped print is the scam-check summary, not a tutor step sheet.

Sample PDF (same CSS as `@media print`): `project-context/2.build/logs/qa-save-as-pdf-sample.pdf`.

Physical phone / iOS Share sheet was not used. Phone check is Chrome device metrics + the same print CSS phones would apply.

## Limitations

- No `aamad.config.yml`; testing prefs taken from `aamad.config.example.yml` (`require_unit_tests`, `require_integration_tests`, `map_to_acceptance_criteria`).
- Unit tests do **not** call Anthropic. Live integration (`LIVE_API=1`) does one CrewAI Flow turn.
- Shame-term lint is only the send-error string, not a full UI copy corpus.
- Default `pytest` skips live tests unless `LIVE_API=1`. Golden evals never call Anthropic. Live eval is EV-001 and EV-017 only.
- Smoke used the Cursor browser, not Playwright. `frontend/scripts/clickthrough.mjs` remains the automated recipe if `playwright` is installed later.
- CrewAI AMP tracing (stale uvicorn, declined consent → ephemeral batches, re-login, restart API after login) is operator environment, not a product fail. See `project-context/2.build/logs/crewai-amp-tracing.md`.

## Handoff

QA for implemented MVP scam-check is complete. Next: `@security.eng` (`*assess-security` → `project-context/2.build/security.md`). Example config sets `security.require_security_assessment: true` before Deliver (`@devops.eng`).

## Sources

- `.cursor/agents/qa-eng.md`
- `aamad.config.example.yml` testing block
- `project-context/2.build/frontend.md`
- `project-context/2.build/backend.md`
- `project-context/2.build/integration.md`
- `project-context/1.define/prd.md` v2.3
- `project-context/1.define/sad.md` §9, AD-8
- User stories US-001, US-002, US-009, US-013, US-014, US-017, US-018, US-021
- `senior_digital_literacy/tests/test_api_http.py`
- `senior_digital_literacy/tests/test_live_chat.py`
- `frontend/lib/services/sendChat.test.ts`
- `project-context/2.build/logs/crewai-amp-tracing.md`
- `frontend/app/globals.css` `@media print`
- `project-context/2.build/logs/qa-save-as-pdf-sample.pdf`
- `senior_digital_literacy/evals/cases.json`

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- User-story numbered criteria stand in for missing `AC-*` IDs.
- Extracting `decide_route_and_mode` and `PAUSE_IDLE` does not change product behavior.
- pytest `pythonpath = ["src"]`; Vitest alias `@` → `frontend/`.

## Open Questions

1. Should catalog URL matching ignore a trailing slash so US-014-3 IC3 links survive unmatched pastes?
2. *(Closed for this stage)* Live integration uses one gift-card Flow turn (`LIVE_API=1`); mocked HTTP covers failure paths without Anthropic.

## Audit

AAMAD_TARGET_RUNTIME: crewai

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-28T14:40:00Z |
| Persona id | `qa-eng` |
| Action | `test-unit` — author and run unit suites; map US-xxx-n; log QA-UNIT-001 |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `senior_digital_literacy/tests/`; `frontend/lib/**/*.test.ts`; `vitest.config.ts`; `project-context/2.build/qa.md` |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — unit tests and QA log; no runtime agent prompt write |
| Tools used | Read/Grep/Write; `uv add --dev pytest`; `uv run pytest`; `npm install -D vitest`; `npm test` |
| Prohibited actions honored | No live LLM kickoff; no NFR/load testing; no tests of unimplemented Tutor UI / Progress / ≥10-drill corpus as if they existed |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-28T14:45:00Z |
| Persona id | `qa-eng` |
| Action | `test-integration` — HTTP contract, sendChat live/fixture, one live gift-card Flow turn |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `tests/test_api_http.py`; `tests/test_live_chat.py`; `frontend/lib/services/sendChat.test.ts`; this file |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — live kickoff uses existing YAML tasks; no new production prompt |
| Tools used | Write; `uv run pytest`; `LIVE_API=1 pytest`; `npm test`; curl `/health` |
| Prohibited actions honored | No Tutor UI / Progress / callback tests as if implemented; no load testing; latency miss recorded not used as a functional fail |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-28T15:05:00Z |
| Persona id | `qa-eng` |
| Action | `qa` / `verify-flow` — smoke + E2E on `/` paste → Pause/Resume → Run → Results → History → Reset |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | this file (Smoke + Verify-flow) |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — no runtime agent prompt write |
| Tools used | Cursor browser (lock, snapshot, fill, click); `Runtime.evaluate` poll (placeholder text “Crew: done” is a false match — used snapshot instead); curl `/health` |
| Prohibited actions honored | Did not test Extra Guidance / Tutor / caregiver as working; did not treat Pause-abort or p95 ≤5s as functional fails; did not implement latency/Haiku changes |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-28T15:12:00Z |
| Persona id | `qa-eng` |
| Action | Operator notes — CrewAI AMP tracing log + pointer from this file |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `project-context/2.build/logs/crewai-amp-tracing.md`; Limitations pointer in this file |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — no runtime agent prompt write |
| Tools used | Write; StrReplace |
| Prohibited actions honored | No secrets, device codes, ephemeral access codes, or pasted scam text in the log |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-29T22:20:00Z |
| Persona id | `qa-eng` |
| Action | `qa` after — desktop + phone print; confirm Save as PDF readable ≥16px |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | this file (Print / Save as PDF); `project-context/2.build/logs/qa-save-as-pdf-sample.pdf` |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — no runtime agent prompt write |
| Tools used | Cursor browser (print media, iPhone metrics, computed styles); Chrome `--print-to-pdf` |
| Prohibited actions honored | Did not treat US-017-1 tutor illustrations as implemented; no physical-device claim |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-05T12:24:00Z |
| Persona id | `qa-eng` |
| Action | `run-evals` — author golden pack; run offline library/route/ground + freshness; skip live |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `evals/cases.json`; `tests/test_eval_golden.py`; `tests/test_eval_freshness.py`; `tests/test_eval_live.py`; this file |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — no runtime agent prompt write |
| Tools used | Write; `uv run python -m pytest` |
| Prohibited actions honored | No Anthropic on this run; no LLM-as-judge; Tutor UI still not treated as shipped |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-05T13:10:00Z |
| Persona id | `qa-eng` |
| Action | `run-evals` — CHECKLIST adopting-evals: full offline + live |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | this file; `evals.md`; `CHECKLIST.md` Adopting evals section |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — live uses existing YAML tasks |
| Tools used | full pytest; npm test; `LIVE_API=1` eval + live chat |
| Prohibited actions honored | Did not treat EV-017 IC3 miss as a new product feature; logged QA-EVAL-001 |

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-05T13:22:00Z |
| Persona id | `qa-eng` |
| Action | `run-evals` — pull AAMAD 0.8.0 skill; official suite + SAD backfill + validate |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `.cursor/skills/run-evals/`; `evals/dataset`; `evals.md`; sad.md §9 |
| Prompt Trace | Omitted |
| Tools used | WebFetch 7914d9c; `evals/run.py`; pytest; `uvx aamad validate --phase build` |
