# Evaluation Strategy — Senior Digital Literacy MVP

**Persona:** `@qa.eng`  
**Action:** `*run-evals`  
**Slice:** Scam-check path on `/` → `POST /api/v1/chat` → CrewAI Flow + owned scam library  
**Selected runtime:** `crewai`

## Status

Initial eval suite recorded for the shipped scam-check MVP. Code-based grading is implemented and passing; live LLM latency and full scam-miss audit remain accepted gaps documented in `qa.md`.

### 1. Eval Strategy

**In scope**

- Scam library pattern matching (owned corpus, no Serper)
- API request/response contract (`ChatRequest` / `ChatResponse`)
- Frontend FSM, Pause copy, fixture vs live `sendChat` paths
- Verified-guide badge and catalog URL allowlist behavior
- Print/Save-as-PDF readability (≥16px body in print CSS)

**Dimensions**

| Dimension | MVP coverage |
|-----------|----------------|
| Accuracy | Library match + grounding (`_ground_scam_content`); fixture Path A/B |
| Latency | Recorded only; not a pass/fail gate this pass |
| Safety | Shame-term copy lint; priority mode on gift-card markers; no generative `likely_safe` audit matrix |
| Security | Handed to `security.md`; eval does not re-run pen-test |
| Cost | Not instrumented; HTTP rate limit (10/min, 40/h) is backend guardrail only |

**Out of scope (Future Work §8):** Tutor UI on `/`, Progress/caregiver redaction, ≥10-drill corpus, LLM-as-judge calibration, live A/B.

### 2. Success Criteria and Thresholds

| ID | Dimension | Metric | Threshold | Grading Method | Source |
|----|-----------|--------|-----------|----------------|--------|
| EC-001 | Accuracy | Library pattern match for owned `sample_text` / markers | 100% on 8 patterns | Code-based pytest | `tests/test_scam_library.py`; operator scope |
| EC-002 | Accuracy | `_ground_scam_content` sets badge, risk, links on match | Pass on gift-card + account-closed | Code-based pytest | US-021-1; SAD §9 Integration |
| EC-003 | Contract | `POST /api/v1/chat` SAD envelope fields present | Pass mocked kickoff | Code-based pytest | SAD §4; `tests/test_api_http.py` |
| EC-004 | Contract | `explicit_path: "scam"` on wire | Always | Code-based unit | US-001-4; `toChatRequest` tests |
| EC-005 | Safety | Canonical Pause idle copy | Exact string match | Code-based unit | US-009-2; `PAUSE_IDLE` test |
| EC-006 | UX | Print body font-size | ≥16px desktop + phone print CSS | Manual + Chrome `--print-to-pdf` | US-018; `qa.md` print pass |
| EC-007 | Latency | p95 chat response | ≤5s | Not graded this pass | PRD §3; recorded ~13s live — gap accepted |
| EC-008 | Safety audit | 0 critical scam misses on sampled assessments | Not run | Deferred human/LLM judge | PRD §7 / SAD §9 |

### 3. Golden Dataset

| Category | Items | Provenance |
|----------|-------|------------|
| Gift-card bail (`gift_card_jail`) | 1 | Owned `scam_library.json` |
| Account-closed link (`account_closed_maybe`) | 1 | Owned library |
| Tech-support pop-up (`tech_support_lock`) | 1 | Owned library |
| IRS impersonation (`irs_tax_warrant`) | 1 | Owned library |
| Housing/benefits fee (`housing_benefits_fee`) | 1 | Owned library |
| Romance ticket (`romance_ticket_money`) | 1 | Owned library |
| Recovery fee (`recovery_get_money_back`) | 1 | Owned library |
| Caregiver remote setup (`caregiver_remote_setup`) | 1 | Owned library |
| Unmatched paste (First Coastal-style) | 1 | Synthetic negative control |
| Path A / Path B frontend fixtures | 2 | Named stubs in `chatService.ts` |

Adversarial edges: trailing-slash IC3 URL catalog mismatch (QA-UNIT-001); empty paste 422; kickoff exception → 500 INTERNAL.

### 4. Grading Methods

- **Code-based:** `senior_digital_literacy/tests/` (pytest 24 tests); `frontend/lib/**/*.test.ts` (Vitest 13 tests); integration HTTP mocks + optional `LIVE_API=1` gift-card Flow turn.
- **LLM-as-judge:** Not implemented for MVP.
- **Human review:** Smoke/E2E on `/` documented in `qa.md`; print readability spot-check on sample PDF.

### 5. Implementation

| Location | Purpose |
|----------|---------|
| `senior_digital_literacy/tests/test_scam_library.py` | Library match + grounding |
| `senior_digital_literacy/tests/test_api_http.py` | HTTP contract (mocked Flow) |
| `senior_digital_literacy/tests/test_live_chat.py` | Optional live Flow (`LIVE_API=1`) |
| `frontend/lib/services/sendChat.test.ts` | Live vs fixture `sendChat` |
| `frontend/lib/**/*.test.ts` | FSM, copy, validation |
| `project-context/2.build/qa.md` | Full pass/fail log and mappings |

**Re-run**

```bash
cd senior_digital_literacy && uv run pytest -q
cd frontend && npm test
# Optional live (requires API + ANTHROPIC_API_KEY):
cd senior_digital_literacy && LIVE_API=1 uv run pytest -q tests/test_live_chat.py
```

Runtime instrumentation: CrewAI YAML `max_iter`, `allow_delegation: false`; tracing off unless `CREWAI_TRACING_ENABLED=true` (adapter-crewai + security patch).

### 6. Results

| Category | Result | Notes |
|----------|--------|-------|
| Library match (EC-001) | **Pass** | 8 owned patterns + negative control |
| Grounding (EC-002) | **Pass** | Badge/risk/links overwrite on match |
| API contract (EC-003) | **Pass** | Mocked + live health |
| Wire `explicit_path` (EC-004) | **Pass** | Unit tests |
| Pause copy (EC-005) | **Pass** | Canonical string |
| Print CSS (EC-006) | **Pass** | Sample PDF in `logs/` |
| Latency (EC-007) | **Not graded** | ~13s live; does not block Deliver for local MVP |
| Scam-miss audit (EC-008) | **Deferred** | No sampled human/LLM judge matrix yet |

**Deliver gate:** Eval gaps EC-007 and EC-008 are explicitly accepted for localhost MVP; do not expose API without `security.md` mitigations.

### 7. Production Monitoring Recommendations

Handoff to `@devops.eng` when Deliver is authorized:

- **Trace fields:** model id, input/output tokens, latency ms, route (`scam`|`tutor`), library `pattern_id` when matched, HTTP 429/500 counts.
- **Dashboards:** cost per session, p50/p95 latency, match rate vs unmatched, error rate by code.
- **Alerts:** latency p95 > PRD SLO; cost spike >150% 7-day avg; unmatched `likely_safe` rate increase.
- **Business KPI link:** match rate → “felt respected” proxy; latency → “not rushed”; escalation rate → Priority mode frequency.

### 8. Future Work

- LLM-as-judge rubric for unmatched pastes and generative `content.text` drift (SEC-003).
- Expanded golden set to US-003 ≥10 drills with human-labeled miss audit (EC-008).
- Multi-turn Tutor evals when Tutor UI ships on `/`.
- Shadow/A-B for router threshold tuning (SAD §10 iteration #1).

## Sources

- `project-context/1.define/prd.md` (§3 latency, §7 beta metrics)
- `project-context/1.define/sad.md` (§9 Testing & QA)
- `project-context/1.define/user-stories/` (US-001, US-002, US-009, US-014, US-018, US-021)
- `project-context/2.build/qa.md`
- `project-context/2.build/backend.md`
- `project-context/2.build/integration.md`
- `project-context/2.build/security.md`
- `senior_digital_literacy/knowledge/scam_library.json`
- `.cursor/rules/adapter-crewai.mdc`

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → **`crewai`** (adapter registry default).
- EC-007 and EC-008 thresholds deferred per operator acceptance in `qa.md` Open Questions (latency not a functional fail; scam-miss audit not run pre-beta).
- No `aamad.config.yml`; eval scope follows shipped `/` scam-check only.
- Golden dataset uses owned synthetic sample texts aligned to PRD personas (Margaret, Carmen, David).

## Open Questions

1. Operator threshold for EC-008: how many human-labeled pastes before beta (PRD §7 “0 critical scam misses on sampled assessments”)?
2. Should EC-007 become a CI gate once Haiku router or caching lands (SAD §10 #2)?

## Audit

AAMAD_TARGET_RUNTIME: crewai

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-05T12:50:00Z |
| Persona id | `qa-eng` |
| Action | `run-evals` — initial eval strategy + results for shipped scam-check MVP |
| Outputs | `project-context/2.build/evals.md` |
| Model | Cursor |
| Prompt Trace | Omitted — synthesis from qa.md, SAD §9, and existing test suites |
| Tools used | Read; Grep; Write; `aamad validate` gap remediation |
