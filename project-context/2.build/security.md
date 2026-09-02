# Security Assessment — Senior Digital Literacy MVP

**Persona:** `@security.eng`  
**Action:** `*assess-security` (includes `*scan-secrets` and `*review-deps`)  
**Slice:** Implemented scam-check on `/` → `POST /api/v1/chat` → CrewAI Flow (local/dev)

## Status

QA gate is present (`project-context/2.build/qa.md`: unit, integration, smoke, verify-flow, print). Security assessment for that shipped slice is **complete**; **SEC-001 bind, SEC-004 length, SEC-002 tracing default, and SEC-003 text grounding** have a **minimum backend patch** (loopback `serve()`, `message` max 4000, tracing off unless `CREWAI_TRACING_ENABLED=true`, library `guidance` on match, unmatched canned `suspicious`). **SEC-001 rate limit (2026-09-02):** `POST /api/v1/chat` is 10/min and 40/hour per IP (429 `RATE_LIMIT` before Flow). Residual SEC-001: no auth; no 8K session token cap; Console monthly spend cap is still an operator action. This laptop can still spend the Anthropic key up to those HTTP and Console stops.

**Deliver handoff:** do **not** invoke `@devops.eng` for a network-facing or partner demo until remaining SEC-001 spend controls (auth/rate limit) are mitigated **or** the operator records them as accepted risks. Local loopback demo (`127.0.0.1` only) may proceed.

No Critical findings for the current **localhost-only** operating mode. Treat SEC-001 as **Critical** if `serve()` / `0.0.0.0` or a public URL is used without auth and rate limits.

## Scope

| In scope | Out of scope (this assessment) |
|----------|--------------------------------|
| Shipped PWA `/`, FastAPI `/health` and `/api/v1/chat`, Flow, YAML agents/tasks, owned scam library, print sheet | Production pen-test, kiosk hardening (P1-3), magic-link auth implementation, caregiver API, Postgres/pgvector, SOC 2 |
| Secrets in git, env handling, CORS, logging/tracing, prompt/tool surface, dependency notes | Changing application or agent business logic (prohibited) |

Config: no `aamad.config.yml`. Preferences taken from `aamad.config.example.yml`: `require_security_assessment: true`, `forbid_committed_secrets: true`, `dependency_audit: true`.

## Findings

Severity: **Critical / High / Medium / Low / Info**. Owner is the persona that should fix or accept; this persona does not patch app logic.

### Critical

None for documented local/dev (`uvicorn --host 127.0.0.1`). See SEC-001 if that bind changes.

### High

| ID | Finding | Evidence | Mitigation (route to owner) |
|----|---------|----------|-----------------------------|
| **SEC-001** | **Unauthenticated chat spends the Anthropic key.** `POST /api/v1/chat` has no auth, no rate limit, no session token cap. SAD §4 requires authenticated chat (except `/health` and auth start), `RATE_LIMIT`, and an 8K token cap. `api.py` `serve()` binds **`0.0.0.0`**, so `uv run serve` exposes the LLM endpoint on the LAN. Documented `uvicorn --host 127.0.0.1` is safer. | `senior_digital_literacy/src/senior_digital_literacy/api.py` (no auth; `host="0.0.0.0"`); SAD §4 / §8; backend.md “Local/dev: no auth” | `@backend.eng`: keep default bind `127.0.0.1`; add `max_length` on `message`; rate-limit; do not listen on all interfaces. `@devops.eng` (when authorized): HTTPS + do not publish this API without auth. Full magic-link (AD-12 / US-019) remains a product slice, not this assessment’s patch. |
| **SEC-002** | **Pasted scam text is sent to CrewAI AMP by default.** Flow and both crews set `tracing=True`. Operator log states traces can include the pasted message, prompts, and tool results; **anyone with a trace link can read them**. UI copy says “This is a private check.” SAD §8 / MRD: minimize pasted scam bodies; no third-party training without opt-in. | `flow.py` `__init__` `setdefault("tracing", True)`; `crew.py` `tracing=True`; `project-context/2.build/logs/crewai-amp-tracing.md`; `frontend/lib/copy/privacyReassurance.ts` | `@backend.eng`: default tracing **off**; enable only via explicit env for operator machines. Redact `user_message` / `suspicious_content` in logs. `@frontend.eng`: do not claim “private check” while AMP tracing is on. |
| **SEC-003** | **Scam guidance text is still generative; library grounding is incomplete.** US-021 / PRD: sensitive scam response is RAG-only, no generative fallback. On a library **match**, Flow overwrites badge, `risk_level`, and links, but **keeps LLM `content.text` when it is non-empty**. A jailbroken or confused model can keep the Verified guide badge while telling the senior to pay or share codes. On **no match**, the model still writes `text` and may set `likely_safe`; only links are catalog-filtered. | `flow.py` `_ground_scam_content`; `tasks.yaml` `scam_check_task` interpolates `{user_message}`; US-021 AC2 | `@backend.eng`: on library match, force `content.text` from owned `guidance` (or a fixed template). On no match, refuse a free-form verdict (`RAG_REFUSAL` / extra-help), do not emit `likely_safe` from the model alone. Keep catalog URL allowlist. |

### Medium

| ID | Finding | Evidence | Mitigation |
|----|---------|----------|------------|
| **SEC-004** | API does not enforce a paste length cap. UI caps at 4000 (`MESSAGE_MAX_LENGTH`); `ChatRequest.message` is only `min_length=1`. Direct API callers can send huge bodies (cost / context stuffing). SAD §8: length limits on pasted scam text. | `api.py` `ChatRequest`; `frontend/lib/validation/runInput.ts` | `@backend.eng`: `max_length=4000` (or SAD-agreed cap) on the request model. |
| **SEC-005** | `verbose=True` on agents and crews prints turn content to stdout (uvicorn terminal). Shared screens or copied logs can leak pastes. | `crew.py`; `agents.yaml` `verbose: true` | `@backend.eng`: verbose off except local debug env. |
| **SEC-006** | CORS: default origin `http://localhost:3000` is tight; `allow_credentials=True` plus `allow_methods=["*"]` / `allow_headers=["*"]` is looser than needed (no cookies today). If `CORS_ORIGIN` is set to `*` later, credentialed CORS becomes a config footgun. | `api.py` CORSMiddleware | `@backend.eng`: methods `GET, POST, OPTIONS`; headers actually used; credentials only when cookies exist. `@devops.eng`: never set `CORS_ORIGIN=*`. |
| **SEC-007** | Next.js **15.4.10** (patched for RSC CVE-2025-66478 / CVE-2025-55182) still reports **3 High** npm advisories via `npm audit --package-lock-only`: `postcss` (CSS stringify XSS / source map file read) and `sharp` (libvips). Suggested bump is `next@15.5.25`, outside the pinned `15.4.10` range. Runtime user paste does not hit PostCSS/sharp image pipelines. | `frontend/package.json`; `frontend.md` Assumptions | `@frontend.eng`: plan a controlled Next patch after checking 15.5.x vs this UI. Do not `npm audit fix --force` blindly. |
| **SEC-008** | Results render `href={link.url}` without a client https allowlist. Backend catalog filter is the real control; if grounding regresses, `javascript:` / `data:` URLs could become clickable. React **does** escape `content.text` (no `dangerouslySetInnerHTML`). | `ResultsSection.tsx`; `scam_library.py` `filter_links_to_catalog`; `schemas.py` `ResourceLinkForm.url: str` | `@frontend.eng`: only render `https:` URLs on the catalog host list. `@backend.eng`: constrain link URLs in the Pydantic form. |

### Low

| ID | Finding | Evidence | Mitigation |
|----|---------|----------|------------|
| **SEC-009** | `crewai[anthropic,tools]` still pulls `crewai-tools` (PyMuPDF, pytube, YouTube transcripts, etc.) even though Serper/open web is off and the only bound tool is `search_scam_library`. Extra supply-chain surface. | `pyproject.toml`; `uv.lock` `crewai-tools` | `@backend.eng`: drop `[tools]` extra if unused; keep lockfile aligned. |
| **SEC-010** | No committed `.env.example` (names only). Operators copy names from README/setup.md. Example config forbids committed **values**; a names-only example is still missing. | setup.md; `frontend/.gitignore` `.env*`; `senior_digital_literacy/.gitignore` `.env` | `@project.mgr`: add `.env.example` files with names only. |
| **SEC-011** | Next `next.config.ts` has no CSP, `X-Frame-Options` / `frame-ancestors`, or HSTS. Acceptable for localhost; required posture for HTTPS deploy (SAD AD-10). | `frontend/next.config.ts` | `@frontend.eng` / `@devops.eng` at Deliver. |
| **SEC-012** | History shows an 80-character **preview** of the paste in React state (not `localStorage`). Shoulder-surfing on a library PC. US-016 shared-device mode is not implemented. Reset does not clear History. | `useCriticalResearchRun.ts`; `HistorySection.tsx`; `previewMessage` | `@frontend.eng`: when US-016 ships, shorter preview or hide on public-computer mode; clear history on leave. |

### Info (controls that work)

| ID | Note |
|----|------|
| **SEC-I1** | No committed secret values found (pattern scan + `git ls-files`). `.env` / `.env.local` gitignored. `NEXT_PUBLIC_API_BASE_URL` is a public origin, not a key. |
| **SEC-I2** | Open-web search is off. Scam Detector tool is local library only. `memory=False`, `allow_delegation: false`, `max_iter: 3`. |
| **SEC-I3** | Unmatched agent links are filtered to catalog URLs in `knowledge/scam_library.json` (https FTC/AARP/IC3/IRS/HUD). |
| **SEC-I4** | Print sheet (`PrintSummary`) omits `session_id` and the pasted message. **Keep it that way** (US-016 AC5, US-017 AC2). Checked date/time and site origin/path are acceptable. |
| **SEC-I5** | No `localStorage` / `sessionStorage` / cookies for the paste. History is visit memory only. |
| **SEC-I6** | API 500 body is generic (“Please try again.”); does not echo exception text to the browser. |
| **SEC-I7** | Frontend 4000-character cap and empty-paste disable are in the UI. CORS default origin is `http://localhost:3000` (QA preflight pass). |

## Secrets scan (`*scan-secrets`)

| Check | Result |
|-------|--------|
| Repo text for `sk-ant-`, `sk-proj-`, GitHub PATs, AWS `AKIA…`, PEM headers | No matches |
| Tracked `.env` / credential files | None |
| Artifact policy | Names only in setup.md / backend.md / this file. No values copied from local env. |
| CrewAI AMP log | Instructs not to paste keys, device codes, or scam bodies into `crewai-amp-tracing.md` |

## Dependency review (`*review-deps`)

| Stack | Pin / version | Notes |
|-------|---------------|--------|
| Next.js / React | `next@15.4.10`, `react@19.1.2` | RSC follow-ups already applied. Remaining npm High: PostCSS and sharp via Next (SEC-007). Exploit path is not the paste→chat path. |
| Python / CrewAI | `crewai 1.15.17`, `fastapi 0.141.1`, `starlette 1.6.0`, `pydantic 2.12.5`, `uvicorn 0.52.4` | Large transitive graph (Chroma, OpenAI client, `crewai-tools`) even though the product LLM is Anthropic and web search is off (SEC-009). No pip-audit run in this pass (no dedicated auditor in the env). |
| Unused product secret | `SERPER_API_KEY` | Documented unused; do not add it to future `.env.example` as required. |

## Print sheet decision (frontend Open Question)

**Do not** add `session_id` or the pasted message to `#print-summary`. Shared printers and Save as PDF are the likely leak path for Carmen (US-016 / US-017). Date/time and website URL may stay.

## SAD / PRD gaps (not defects of this slice)

These controls are specified but **not implemented**. They are not counted as code bugs of `/` + chat, but they **block** treating this MVP as SAD-complete for beta:

- Magic-link auth, HTTPS in deployed environments, idle logout (US-016, AD-12)
- Postgres at-rest, no durable paste in caregiver tables (no caregiver API yet)
- Server-side weekly tutor cap and 8K token cap
- CCPA access/delete process (SAD Open Question)

## Handoff

| Next | Condition |
|------|-----------|
| `@backend.eng` | SEC-001 bind + length + tracing default; SEC-003 text grounding / unmatched refusal |
| `@frontend.eng` | Privacy copy if tracing remains; optional https link allowlist; Next patch plan |
| `@project.mgr` | Optional `.env.example` (names only) |
| `@devops.eng` | Only after High items mitigated **or** operator-accepted in this file’s Assumptions |

## Sources

- `.cursor/agents/security-eng.md`
- `aamad.config.example.yml` security block
- `project-context/1.define/prd.md` v2.3 §3–§5
- `project-context/1.define/sad.md` v1.0 §4, §8, AD-10, AD-12
- `project-context/1.define/user-stories/US-016-public-computer-mode.md`
- `project-context/1.define/user-stories/US-017-printable-step-summary.md`
- `project-context/1.define/user-stories/US-019-senior-owned-account-signup.md`
- `project-context/1.define/user-stories/US-021-verified-guide-responses.md`
- `project-context/2.build/qa.md`
- `project-context/2.build/backend.md`
- `project-context/2.build/frontend.md`
- `project-context/2.build/integration.md`
- `project-context/2.build/setup.md`
- `project-context/2.build/logs/crewai-amp-tracing.md`
- `senior_digital_literacy/src/senior_digital_literacy/api.py`
- `senior_digital_literacy/src/senior_digital_literacy/flow.py`
- `senior_digital_literacy/src/senior_digital_literacy/crew.py`
- `senior_digital_literacy/src/senior_digital_literacy/scam_library.py`
- `senior_digital_literacy/src/senior_digital_literacy/config/tasks.yaml`
- `frontend/lib/services/chatService.ts`
- `frontend/components/ResultsSection.tsx`
- `frontend/components/PrintSummary.tsx`
- `frontend/package.json` / `npm audit --package-lock-only`

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → **`crewai`**.
- No `aamad.config.yml`; example config security prefs apply.
- Intended runtime for this slice is **operator laptop**, API on `127.0.0.1:8000`, PWA on `http://localhost:3000`. Internet or LAN bind is out of that assumption.
- Unauthenticated local API is documented in backend.md / integration.md; it is **not** silently treated as SAD-compliant auth.
- Frontend Open Question on 4000-character paste: **4000 is acceptable** for MVP if the API enforces the same cap (SEC-004).
- Print: session ID and paste stay off the sheet (operator deferred this to `@security.eng`).
- US-016 idle timeout Open Question: recommend **300 seconds (5 minutes)** for public-computer mode when that story is built (stricter than the story’s 15-minute default).
- npm audit from a parent home `package.json` (`pptxgenjs`) is **not** this repo; ignored.

## Open Questions

1. Will the operator **accept SEC-001/002/003** for a closed demo, or must they be fixed before `@devops.eng`?
2. Should CrewAI AMP tracing be banned in any run that handles real senior pastes, including demos?
3. For unmatched pastes, is the product rule “always suspicious + official links only” until the library grows, rather than a model `likely_safe`?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-01T09:30:00Z |
| Persona id | `security-eng` |
| Action | `assess-security` (secrets scan + dependency notes included) |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `project-context/2.build/security.md` only |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — assessment artifact, not CrewAI kickoff |
| Prompt Trace | Omitted — no production prompt write; runtime prompts remain in YAML |
| Tools used | Read, Grep, Glob, Shell (`git ls-files`, `npm audit --package-lock-only`, `uv run python` version print) |
| Prohibited actions honored | No application/agent logic changes; no secret values in this artifact; no production pen-test scope |
