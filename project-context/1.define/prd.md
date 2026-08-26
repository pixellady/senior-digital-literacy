# Product Requirements Document (PRD)

## Document Metadata

| Field | Value |
|-------|-------|
| Product Name | Senior Digital Literacy Platform |
| Version | **2.3 (Final — MVP)** |
| Status | **Final — Define phase complete** |
| Primary Input | `project-context/1.define/mrd.md` (incl. §6 low-cost gap analysis) |
| Related Artifacts | `user-stories/` (US-001–US-021), `mrd.md` |
| System Description | N/A — MRD used as primary input |
| Selected Runtime | `crewai` (default; no `aamad.config.yml` present) |
| Delivery Model | **Path C — Full text agentic MVP** (MRD §6); community-only Phase 0 **not** leading |

---

## Finalized Product Decisions

| Decision | Resolution | Rationale |
|----------|------------|-----------|
| **Delivery path** | Build **2-agent text platform** with **intent router** (Tutor \| Scam Detector) | Simplifies orchestration; explicit user paths + Flow gate for NL (MRD §6 Path C minus voice) |
| **Voice** | **Tier A only** — optional browser Web Speech (speak-to-type / read-aloud) | Cloud STT/TTS and phone voice channel **deferred to P2** (`claude-agent-sdk`) — cost and complexity |
| **Beta audience** | **Margaret-first** — home users with personal smartphone/tablet | Partial User track primary; caregiver-assisted signup (David) |
| **Carmen / No-Device** | **Build in MVP** (track + visual-first UI); **beta validation deferred** until library/housing partner | No partner site now; design for Carmen, pilot when venue exists (P1-6) |
| **Community workshop pilot** | **Parallel outreach**, not a build gate | Partner acquisition continues during Build; does not block agentic MVP |
| **Content** | RAG indexes **free public curricula** first (DigitalLearn, TechBoomers, Senior Planet/OATS) + IC3/AARP scam corpus | Lowers content cost (MRD §6) |
| **Monetization** | **Free beta**; Stripe subscription **P1** after retention proof | — |
| **Runtime** | `crewai` **Flow** + 2 conversational agents | Intent gate → Tutor **or** Scam Detector; voice Phase 2 may evaluate `claude-agent-sdk` |
| **LLM cost control** | Session token cap (default 8K agent-side); model tiering; progressive routing **P1** | MRD unit-economics requirement |
| **Beta tutor session cap** | **5 tutoring sessions per user per week** | Scam Defense checks/drills **unlimited** during beta |
| **Extra help (MVP)** | **Patient Mode** (Tutor) or **Priority Mode** (Scam Detector) — same agent persona | Triggered by Get extra help, distress, low confidence, or active scam; AI disclosure on mode entry; no human callback MVP |
| **LLM provider (MVP)** | **Anthropic Claude** (Claude API) | Build may use Cursor IDE; runtime inference via Claude |
| **Visual step cards** | **Illustrated** assets (not icon-only) | No-Device + Beginner tracks; budget for simple senior-friendly illustrations |
| **Carmen partner pilot** | **Q4 2026** target | First library/housing MOU + No-Device beta cohort (P1-6) |
| **Scam check surface copy** | Heading **Learn the Signs, Protect Yourself**; shame-free subtitle and Pause idle line (§6) | Operator-finalized MVP strings for F1 / US-002 / US-009; SAD AD-13 |

---

## 1. Executive Summary

### Problem Statement

U.S. adults aged 60+ face a persistent **ownership-without-mastery gap**: roughly 90% of adults 50+ own smartphones, yet approximately one-third do not feel they have the digital literacy skills to fully benefit from online services, with confidence declining sharply with age (AARP, 2024–2025). Privacy concerns, **scam fear**, and age-inappropriate design are top adoption barriers (AARP, 2025; OATS, 2025).

Americans aged 60+ reported **$7.75 billion in fraud losses in 2025**, a 59% year-over-year increase (FBI IC3, 2025). Existing solutions treat scam awareness as an add-on — not as the **headline reason to trust and return**. They also fail to serve learners at different starting points with appropriately paced, emotionally safe experiences.

**Target market scope (MVP beta):** U.S. English-speaking adults aged **65–79** who use a **personal smartphone or tablet at home** (Margaret persona), plus **family caregivers** who assist setup (David). **No-Device / Carmen cohort** and **Spanish/English bilingual** are in product scope but **not beta recruitment focus** until an institutional partner is secured.

### Solution Overview

**Senior Digital Literacy** is a **text agentic** platform (no voice channel on MVP) built on three pillars:

1. **Scam Defense First** — Headline home feature: check suspicious messages, drills, quiz, streaks.
2. **Persona-Specific Learning Tracks** — Beginner, Partial User, No-Device (built; beta emphasizes Partial + Beginner).
3. **Emotional Safety & Patience** — Product-level pause, frustration check-in, shame-free copy guardrails.

**AI coaches (crewai):** **Intent Router** *(Flow gate — no chat UI)* → **Tutor** **or** **Scam Detector** · **Progress Service** *(backend — not a chat agent)*

**UVP:** *"Two clear paths — learn step by step, or check if it's a scam — with patient coaches who never rush you."*

**MVP pilot targets (virtual beta, n≈200):**

- ≥50% engage Scam Defense in session 1
- ≥60% task completion (Partial User goals)
- ≥40% 7-day retention
- ≥80% "felt respected" / "not rushed" on exit survey
- NPS ≥ 40

### Strategic Rationale

Multi-agent architecture separates **scam detection** from **pedagogy** with a deterministic **intent router** — required for PRD pillars, safety, and cost control. **`crewai` Flow** routes each session to exactly one conversational agent (Tutor or Scam Detector); progress persists via a backend service, not a chat persona.

**Delivery vs. MRD §6:** Stakeholder chose **full text agentic MVP** over community-assembly-first because there is **no library partner** and home-based seniors need an on-demand channel. MRD low-cost workshop model remains a **parallel partner strategy**, not the MVP product.

**Cost realism (MRD):** MVP build is **not** zero-cost (~$150–250K equivalent team effort or founder sweat-equity over 3–4 months). Run cost at beta scale **~$2.5–7K/mo** (infra + capped LLM). Voice would add **+$40–150K build** and **+$0.10–5/session** — **excluded from MVP**.

---

## 2. Market Context & User Analysis

### Target Market / Users

#### Primary Persona — MVP Beta Focus: Independent Senior (Margaret, 72)

| Attribute | Detail |
|-----------|--------|
| Age | 65–79 |
| Devices | Personal iPhone or Android; occasional tablet |
| **Learning track (beta default)** | **Partial User** |
| Goals | Video call family, safe banking view, scam checks, telehealth navigation |
| Beta channel | Direct signup or caregiver invite; **PWA on own device at home** |

#### Secondary Persona — MVP Beta: Family Caregiver (David, 48)

| Attribute | Detail |
|-----------|--------|
| Role | Sets up account, helps pick track, optional read-only progress (senior approval) |
| Beta channel | Primary acquisition lever when no library partner |

#### Tertiary Persona — Build MVP / Beta Deferred: Carmen (68)

| Attribute | Detail |
|-----------|--------|
| Context | Public housing; no personal device; library/housing computer |
| **Learning track** | No-Device User — **built in MVP**, beta cohort **deferred** |
| Language | Spanish-preferred — **bilingual P2** |
| **When to beta** | **Q4 2026** — library, housing authority, or senior-center partner (P1-6) |

#### Quaternary Persona — Post-MVP: Activities Director

Institutional kiosk/workshop distribution — P1-3, P1-6.

### Persona-Specific Learning Tracks

| Track | MVP build | MVP beta focus |
|-------|-----------|----------------|
| **Partial User** | ✅ | **Primary** (Margaret) |
| **Beginner** | ✅ | **Secondary** |
| **No-Device User** | ✅ (visual-first, shared-device mode) | **Deferred** (Carmen — needs partner venue) |

Track assignment, switching, and examples unchanged from v1.1 (see user stories US-004, US-005, US-008, US-015).

### User Journey (MVP Beta — Margaret Path)

```mermaid
flowchart TD
    A[PWA signup at home] --> B[Check a scam OR Learn a skill]
    B --> R[Intent Router]
    R -->|TUTOR| T[Tutor session]
    R -->|SCAM| S[Scam Detector session]
    T -->|scam signal| S
    S --> P[Progress Service]
    T --> P
    P --> H[Return within 7 days]
```

### Competitive Landscape

Unchanged from v1.1 — differentiation: Scam Defense headline, three tracks, emotional safety as product behavior, multi-agent vs. single chatbot.

---

## 3. Technical Requirements & Architecture

### Runtime & Agent Specifications

| Parameter | MVP Value |
|-----------|-----------|
| Runtime | `crewai` |
| Process mode | **Flow** (intent gate) → **single-agent crew** per path |
| Agent config | `config/agents.yaml`, `config/tasks.yaml`, `config/flow.yaml` |
| Conversational agents | **2** — Tutor, Scam Detector (see §3 below) |
| Intent Router | **Flow step** — not a chat persona |
| Progress | **Backend service** — PostgreSQL writes; not a CrewAI agent |
| Tutor `max_iter` | ≤ 12 in Patient Mode; ≤ 8 in normal tutoring |
| Scam Detector `max_iter` | ≤ 10 in Priority Mode; ≤ 8 in normal assessment |
| Memory | `memory=False`; state in PostgreSQL |
| Session token cap | 8K agent-side (configurable) |

### Architecture Overview (MVP — v2.3)

Every user session follows **one primary path**:

| Path | Entry | Agent | Weekly cap |
|------|-------|-------|------------|
| **TUTOR** | Home **Learn a skill**, onboarding goal, or router classification | `step_by_step_tutor` | **5 sessions/week** (includes Patient Mode) |
| **SCAM** | Home **Check a scam**, Scam Defense hub, or router classification | `scam_detector` | **Unlimited** |

**Intent Router rules (deterministic):**

1. **Explicit UI choice wins** — tapping **Check a scam** or **Learn a skill** sets path for the session (and can be switched via nav).
2. **Natural language** — lightweight classifier assigns `TUTOR` or `SCAM`; if ambiguous, **one** clarifying question max.
3. **Safety override** — active-scam keywords, pasted suspicious content, or critical risk signals force **SCAM** path regardless of prior path.
4. **Cross-path interrupt** — during TUTOR, scam patterns invoke Scam Detector for **one turn**, then resume Tutor at same step (US-020).

### Agent Definitions (MVP — all AI; Claude API)

Two conversational agents. Inference via **Anthropic Claude API**. Orchestration: **CrewAI Flow** intent gate → kick off Tutor **or** Scam Detector crew.

---

#### Flow step: `intent_router`

| Field | Value |
|-------|-------|
| **Display name (UI)** | *(No chat UI — routing only)* |
| **role** | Session Intent Classifier and Path Gate |
| **goal** | Route each session to **Tutor** or **Scam Detector** using explicit UI choice, NL classification, and safety overrides |
| **inputs** | User message, session context, explicit nav choice (`tutor` \| `scam`), learning track, prior path |
| **outputs** | `route_intent`: `TUTOR` \| `SCAM`; optional one-shot clarifying prompt |
| **tools** | `classify_intent`, `apply_safety_override`, `read_session_path`, `set_session_path` |
| **prohibited** | Conversational tutoring or scam verdicts; impersonating either agent |
| **runtime notes** | Implemented as **CrewAI Flow** entry step; logged for audit; p95 routing ≤500ms excluding LLM |

---

#### Agent 1: `step_by_step_tutor`

| Field | Value |
|-------|-------|
| **Display name (UI)** | Your tutor |
| **role** | Track-Aware Step-by-Step Technology Tutor and Emotional Safety Guardian |
| **goal** | Guide the learner through one verified step at a time toward their life goal; detect frustration; offer pause; enter **Patient Mode** when extra help is needed |
| **backstory** | An experienced community tech volunteer who explains things simply, repeats without judgment, and never skips steps. When you need more time, the same tutor slows down — **never pretends to be human**. |
| **tools** | `rag_search_tutorials`, `get_device_context`, `get_learning_track`, `set_learning_track`, `simplify_explanation`, `confirm_step_complete`, `render_visual_step_card`, `detect_frustration_signal`, `offer_pause`, `enter_patient_mode`, `exit_patient_mode`, `invoke_scam_detector_interrupt`, `learner_state_read`, `learner_state_write` |
| **modes** | **Normal:** one step per turn, track-aware pacing. **Patient Mode:** longer turns, re-explain, distress handling; triggered by Get extra help, frustration/distress, or 3 failed simplifications |
| **track behavior** | **Beginner:** micro-steps + device basics first. **Partial User:** standard one-step life-goal flow. **No-Device:** illustrated visual step cards, minimal prose, public-computer safety reminders. |
| **inputs** | Routed TUTOR intent, learner goal, track, device context |
| **outputs** | Single step per turn (or micro-step for Beginner), verified guide indicator when RAG-sourced, illustrated card payload when No-Device/Beginner |
| **prohibited** | Scam verdicts without Scam Detector; multiple steps in one turn (unless repeat); generative answers for banking/security-sensitive tasks; shame language |
| **runtime notes** | RAG-only for sensitive tasks; Patient Mode **must disclose AI** on entry; counts toward **5 tutor sessions/week**; never auto-switches track without user consent |

---

#### Agent 2: `scam_detector`

| Field | Value |
|-------|-------|
| **Display name (UI)** | Scam checker |
| **role** | Digital Safety and Scam Detection Specialist |
| **goal** | Analyze suspicious messages and calls; run drills and quiz; deliver calm risk assessments; handle **active scam in progress** in Priority Mode |
| **backstory** | A retired fraud investigator who protects seniors with calm clarity. Never blames the victim. Celebrates every scam avoided. |
| **tools** | `rag_search_scam_patterns`, `assess_risk_level`, `run_scam_scenario`, `recommend_safe_action`, `recommend_ic3_aarp_resources`, `enter_priority_mode`, `exit_priority_mode`, `log_escalation_event`, `record_scam_milestone`, `learner_state_read` |
| **modes** | **Normal:** check, drill, quiz, streak. **Priority Mode:** immediate safety steps (hang up, do not pay, do not share codes) + IC3/AARP links; triggered by active-scam declaration or critical risk |
| **inputs** | Routed SCAM intent, suspicious message/call text, interrupt signal from Tutor, user question |
| **outputs** | Plain-language risk assessment (likely scam / suspicious / likely safe), recommended actions, drill/quiz content, milestone events |
| **prohibited** | Alarmist tone; blaming user; claiming to be law enforcement or a bank; promising human callback in MVP |
| **runtime notes** | First-class Scam Defense hub entry; IC3/AARP RAG corpus; **does not count** toward weekly tutor session cap; Priority Mode **must disclose AI** on entry |

---

#### Backend: `progress_service`

| Field | Value |
|-------|-------|
| **Display name (UI)** | Your progress *(summary UI only)* |
| **role** | Learning Progress and Scam Defense Milestone Recorder |
| **goal** | Record completed steps, track changes, scam quiz scores, defense streaks, and session summaries |
| **implementation** | **Not a CrewAI agent** — invoked by Tutor, Scam Detector, and session-end hooks |
| **tools** | `record_milestone`, `record_scam_milestone`, `record_track_change`, `generate_session_summary`, `get_scam_streak`, `learner_state_write` |
| **outputs** | Updated learner state, session summary, continue pointers, caregiver-safe aggregate counts (no message content) |
| **prohibited** | Conversational replies; storing raw suspicious messages in caregiver-visible fields |
| **runtime notes** | Persists `learning_track`, `track_history`, `scam_streak_days`, `scam_defense_level` |

---

### Agent collaboration flow (MVP)

```mermaid
flowchart TD
    U[Senior user] --> H[Home: Check a scam OR Learn]
    H --> R[Intent Router Flow]
    R -->|TUTOR| T[1 Tutor]
    R -->|SCAM| S[2 Scam Detector]
    T -->|scam interrupt| S
    S -->|resume step| T
    T --> P[Progress Service]
    S --> P
```

| Session type | Path | Primary agent | Weekly cap |
|--------------|------|---------------|------------|
| Learn a skill | TUTOR | Tutor (+ optional Scam interrupt) | Counts (5/week) |
| Scam Defense check/drill/quiz | SCAM | Scam Detector | Uncapped |
| Get extra help (learning) | TUTOR | Tutor **Patient Mode** | Counts (5/week) |
| Active scam / critical risk | SCAM | Scam Detector **Priority Mode** | Uncapped |

| Role | MVP | P1+ |
|------|-----|-----|
| Intent Router + 2 agents | All AI (Claude) | AI |
| Patient / Priority modes | Same agent persona + AI disclosure | Same |
| Live human callback | None | Optional webhook |

### Voice & Modality (Final)

| Tier | Scope | MVP |
|------|-------|-----|
| **A — Browser Web Speech** | Optional speak-to-type; optional read-aloud of step text | **✅ Optional** |
| **B — Cloud STT/TTS** | ElevenLabs, Whisper API, Polly, etc. | **❌ P2** |
| **C — Phone / voice agent** | `claude-agent-sdk`, Twilio, realtime voice LLM | **❌ P2** |

**MVP is text-first.** Voice is not a primary input modality; no telephony integration.

### Integration Requirements

| Integration | MVP | P1/P2 |
|-------------|-----|-------|
| **LLM API — Anthropic Claude** | **Required (primary)** | Multi-model failover P1 |
| Vector store (RAG) | Required — scam corpus first | — |
| PostgreSQL | Required | — |
| Redis | Optional | Recommended at scale |
| Browser Web Speech API | Optional (Tier A) | — |
| **Human escalation webhook** | **❌ Deferred P1** | Live human guide queue |
| **Extended Help / Patient Mode** | **Tutor Patient Mode** or **Scam Detector Priority Mode** | May add human handoff P1 |
| Stripe | ❌ | P1 |
| Spanish i18n | ❌ | P2 |
| Library/kiosk hardened mode | ❌ | P1 (with partner) |

### Content Strategy (Final)

1. **Scam corpus first** — IC3/AARP patterns; ≥10 drills (F1, F9).
2. **Tutorial RAG** — ≥50 guides tagged by track; **source from DigitalLearn, TechBoomers, Senior Planet/OATS** where licensed/public; custom handouts only to fill gaps.
3. **Sensitive tasks** — RAG-only; no generative fallback.

### Performance, Security, Infrastructure

Unchanged from v1.1 §3 (p95 ≤5s chat, WCAG 2.1 AA, shared-device mode for No-Device track, US single-region deploy).

---

## 4. Functional Requirements

### Core Features (P0) — Summary

| ID | Feature | Beta priority |
|----|---------|---------------|
| **F1** | Scam Defense Hub (headline) | **P0 — beta critical** |
| **F2** | Three learning tracks | **P0 — Partial/Beginner beta** |
| **F3** | Goal-based onboarding | P0 |
| **F4** | Multi-agent text tutoring | P0 |
| **F5** | Emotional safety system | P0 |
| **F6** | Progress + scam streaks | P0 |
| **F7** | Patient Mode (Tutor) + Priority Mode (Scam Detector) | P0 |
| **F8** | Accessible PWA + **illustrated** visual-first No-Device mode | P0 build; No-Device **beta Q4 2026** |
| **F9** | RAG corpus (free curricula + scam) | P0 |

Full acceptance criteria: see v1.1 §4 and `user-stories/US-001` through `US-021`.

### P1 — Post-Beta

P1-1 Stripe · P1-2 Caregiver dashboard · P1-3 Library/kiosk mode · P1-4 Email/SMS reminders · P1-5 Model tiering · **P1-6 Partner pilot pack (Carmen recruitment)**

### P2 — Future

Spanish/English bilingual · Cloud STT/TTS · Phone voice agent · Native apps · Screen share · B2B white-label · HIPAA · SOC 2

---

## 5. Non-Functional Requirements

Unchanged from v1.1: performance targets, emotional safety NFRs, WCAG 2.1 AA, CCPA, session caps, pilot disaster recovery.

### Cost Controls (NFR — Final)

| Control | MVP |
|---------|-----|
| Token cap per session | 8K default; hard stop with friendly message |
| **Tutor sessions per user** | **5 per calendar week** (Scam Defense unlimited) |
| Beta user ceiling | ~200 concurrent design; 100 concurrent sessions |
| LLM provider | **Anthropic Claude** (single model MVP) |
| Infra budget target | $2–5K/mo at pilot (MRD) |

---

## 6. User Experience Design

**Pillars:** Scam Defense hero, track badge, pause always visible, shame-free copy (US-009).

**Beta UX default:** Mobile-first PWA on personal phone; home screen **Scam Defense + Learn** equal weight; remember last entry **P1** (default: balanced home for all users at launch).

### Canonical copy — Scam check surface (MVP)

Operator-finalized strings for the primary scam-check entry (F1, US-002, US-009). Use **exactly** as written unless gerontology review supersedes (Open Questions).

| Element | Copy |
|---------|------|
| **Page heading / document tab title** | Learn the Signs, Protect Yourself |
| **Subtitle** (below heading) | Check a suspicious message or call. You're safe here, and you're never wrong to ask. |
| **Pause idle line** (`SafetyBar`, session not paused) | Pause is always here, waiting for you. |

Build note: the first frontend slice implements these on route `/` before the full two-path home route map ships (SAD §3).

**Visual step cards (Final):** **Illustrated** senior-friendly artwork per step (No-Device + Beginner); not icon-only. Simple, high-contrast, minimal text overlay; alt text for accessibility.

**Voice UX:** Microphone button for browser dictation where supported; **no** voice-only mode or phone-call UI on MVP.

---

## 7. Success Metrics & KPIs

### MVP Virtual Beta (Margaret-first, n≈200)

| Metric | Target | Notes |
|--------|--------|-------|
| Activation | 200 accounts + 1 session | Caregiver + direct |
| Scam Defense session 1 | ≥50% | Primary KPI |
| Task completion (Partial) | ≥60% | Top 5 goals |
| 7-day retention | ≥40% | |
| "Felt respected" / "Not rushed" | ≥80% each | Exit survey |
| NPS | ≥40 | |
| No-Device track beta | **Q4 2026** | With Carmen partner (P1-6) |
| Escalation rate | ≤15% | |

Technical metrics unchanged (p95 latency, 0 critical scam misses on audit sample, WCAG 0 critical).

---

## 8. Implementation Strategy

### Phase Sequence (Final)

| Phase | Deliverable | Status |
|-------|-------------|--------|
| **Define** | MRD, PRD, user stories | **Complete** |
| **Define** | SAD (`@system.arch`) | **Next** |
| **Build** | crewai backend + RAG + PWA | 3–4 months |
| **Beta** | Virtual cohort (Margaret/David) | Free; capped sessions |
| **P1** | Monetization, human escalation option, Carmen Q4 pilot | Carmen **Q4 2026** |

### MVP Scope Boundary (Final)

**In MVP — ship:**

- Full **2-agent** text platform (`crewai` Flow): Intent Router → Tutor **or** Scam Detector; Progress Service (backend)
- Scam Defense headline · three tracks · emotional safety
- Text PWA WCAG 2.1 AA · optional browser speech (Tier A)
- RAG from free curricula + scam corpus · **Claude API**
- **Illustrated** visual step cards (No-Device + Beginner)
- **Get extra help** → Tutor **Patient Mode** or Scam Detector **Priority Mode** (AI disclosure on entry); no human callback queue in MVP
- No-Device track in product; **Carmen beta Q4 2026**

**Out of MVP — do not build:**

- Live human escalation webhook / callback queue (**P1**)

- Cloud STT/TTS · phone voice agent · native apps · screen share
- Stripe · Spanish i18n · enterprise SSO
- Hardened library kiosk (until partner — P1)
- Community-only workshop as substitute for product

### Resource & Budget (Indicative — MRD)

| Item | Estimate |
|------|----------|
| MVP engineering | 3–4 months; ~$150–250K equivalent or founder-built |
| Beta monthly ops | ~$2.5–7K (infra + capped LLM) |
| Voice (if added later) | +$40–150K build; +per-session API cost |

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| No library partner | Virtual beta; David channel; partner outreach parallel |
| LLM cost | Session caps; beta size limit; tiering P1 |
| Carmen underserved in beta | Q4 2026 partner pilot; illustrated cards + No-Device track ready at Build |
| Extended Help trust | Same agent persona per path; mode-entry AI disclosure; active-scam → IC3/AARP resources |
| Wrong instructions | RAG-only; free verified curricula |
| Building before demand proof | Beta KPIs gate P1 spend and monetization |

---

## 9. Launch & Go-to-Market Strategy (Final)

### Primary — Virtual B2C Beta

- **Audience:** Seniors 65–79 with own smartphone/tablet + caregiver-assisted signup
- **Message:** *"Protect yourself from scams — then learn at your pace"*
- **Channels:** Caregiver referrals, senior community groups, local AARP/church networks, word of mouth
- **Pricing:** Free during beta; **unlimited Scam Defense**; **5 tutor sessions per user per week**
- **No library partner required** to launch beta

### Secondary — Partner Pipeline (Carmen Q4 2026)

- Outreach to libraries, housing authorities, senior centers for **Q4 2026** Carmen cohort and P1-6 kiosk pack
- Optional: printed scam one-pagers at events (low-cost MRD §6 tactic) driving PWA signup QR

### Post-Beta Pricing (P1)

| Tier | Price |
|------|-------|
| Free | Scam Defense + limited tutor sessions |
| Standard | $9.99/mo |
| Premium | $19.99/mo |

### Pre-Beta Checklist

- [ ] SAD approved (`@system.arch`)
- [ ] 8–12 senior interviews (Margaret/David focus)
- [ ] Scam hub first-entry usability test
- [ ] Partial + Beginner track E2E validated
- [ ] Emotional safety copy review
- [ ] WCAG audit on core flows
- [ ] Scam + tutorial RAG validated (free sources indexed)
- [ ] Tutor Patient Mode + Scam Detector Priority Mode disclosure copy validated with seniors
- [ ] Illustrated step card set for Beginner + No-Device sample paths
- [ ] Claude API integration + session/week caps enforced
- [ ] QA + security assessments
- [ ] `aamad validate --phase define` after SAD

---

## Quality Assurance Checklist

- [x] Requirements traceable to MRD (incl. §6 delivery fork — Path C text chosen)
- [x] Feasible with `crewai` adapter
- [x] Success metrics aligned with pillars and beta scope (Margaret-first)
- [x] MVP vs P1/P2 explicit (voice, Carmen beta, monetization)
- [x] Finalized decisions documented (§ Finalized Product Decisions)
- [x] User stories US-001–US-021 trace to P0 features
- [x] Cost and voice tiers documented

---

## Sources

1. `project-context/1.define/mrd.md` — market, technical, §6 low-cost gap analysis
2. `project-context/1.define/user-stories/` — acceptance criteria
3. Stakeholder sessions — tracks, scam headline, emotional safety, Carmen (2026-08-10); delivery/voice/beta (2026-08-10); **session cap, AI Partner Tutor, Claude, illustrations, Q4 Carmen** (2026-08-10)
4. `.cursor/templates/prd-template.md`
5. Free curriculum sources: DigitalLearn.org, TechBoomers, Senior Planet/OATS (MRD §6)
6. MRD research citations: AARP, FBI IC3, OATS, W3C WCAG 2.1

---

## Assumptions

- **`crewai`** is the Build runtime; **`claude-agent-sdk`** evaluated for P2 voice only.
- **LLM inference:** **Anthropic Claude API** for all MVP agents; Cursor IDE may be used for development — not a production LLM endpoint.
- **Beta caps:** **5 tutor sessions/user/week**; Scam Defense checks, drills, and quiz **uncapped** during beta.
- **Escalation MVP:** **Tutor Patient Mode** (learning path) or **Scam Detector Priority Mode** (scam path); UI discloses AI on mode entry. Live human callback **P1**. Active scam: immediate safety steps + IC3/AARP links.
- **Architecture v2.3:** Intent Router (Flow) → Tutor **or** Scam Detector; Progress Service is backend-only (not a chat agent).
- **Visual step cards:** **Illustrated** assets required for No-Device and Beginner tracks (not icon-only).
- **Carmen partner pilot:** target **Q4 2026** (P1-6).
- **Full text agentic MVP** proceeds without library partner until Q4; virtual beta is valid GTM until then.
- **No-Device track** ships in product; Carmen cohort beta **Q4 2026**.
- **Tier A browser speech** is best-effort; typing always fully supported.
- **Free beta** with session caps; monetization P1.
- **RAG** prioritizes free public curricula; licensing/terms respected per source.
- **Home screen** shows balanced Scam Defense + Learn at launch (no "remember last" until P1).
- **Track assignment** is self-select at onboarding; Tutor **suggests** switch after frustration signals but does not auto-change track without user consent in MVP.
- **Telehealth tutorials** are navigation-only; no credential entry (HIPAA avoided).
- **Emotional check-ins** not shared with caregivers.
- **Phase 0 community-only workshop** is complementary outreach, not a substitute for this PRD scope.

---

## Open Questions

*All prior open questions resolved as of v2.1 (2026-08-10). New items for SAD/architect:*

1. **Claude model tier for MVP:** Haiku for intent router + progress hooks vs. Sonnet for Tutor and Scam Detector — confirm in SAD.
2. **Illustration source:** Custom commission vs. licensed stock vs. generated assets — confirm art pipeline before frontend build.
3. **Get extra help label:** Confirm copy (e.g., “Get extra help from your tutor”) — gerontology review; must not imply human.
4. **Intent router NL fallback:** When classifier confidence is low, default to SCAM if safety keywords present else TUTOR — confirm thresholds in SAD.
5. **Scam check copy review:** Confirm heading/subtitle/Pause idle strings with gerontology advisor (§6 table is operator default).

*Architect handoff:* `@system.arch` → `*create-sad` using this PRD and user stories.

---

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T15:45:00Z |
| Persona id | `product-mgr` |
| Action | `update-prd` — §6 canonical scam-check surface copy (operator) |
| Prior version | 2.3 Final |
| Resolved runtime | `crewai` Flow |
| LLM provider | Anthropic Claude (API) |
| Architecture | Intent Router + 2 agents + Progress Service |
| Escalation MVP | Tutor Patient Mode / Scam Detector Priority Mode |
| Beta tutor cap | 5 sessions/user/week |
| Carmen pilot | Q4 2026 |
| Visual step cards | Illustrated |
| Model | Composer |
| Inputs | `mrd.md`, user-stories, stakeholder finalization session |
| Prompt Trace | Omitted — PRD finalization with documented decisions |
