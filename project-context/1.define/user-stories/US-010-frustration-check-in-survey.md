# US-010: Frustration Check-in and Session Survey

## 1. Story Identity

- **ID**: US-010
- **Title**: Frustration Check-in and Session Survey
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who sometimes gets confused or upset during learning, I want the app to notice when I'm struggling and ask if I need a break, so that I don't give up feeling frustrated.

## 3. Acceptance Criteria

1. **Given** I send "I don't understand" or equivalent three times consecutively during tutoring, **When** Tutor detects frustration, **Then** it offers: "Would you like to slow down or take a break?"
2. **Given** I use distress keywords (e.g., "scared," "upset," "I'm stupid") on the TUTOR path, **When** detected, **Then** Tutor offers pause and optional **Get extra help** (Patient Mode — US-013).
3. **Given** Tutor simplifies three times without success, **When** threshold is reached, **Then** Tutor offers **Get extra help** → Patient Mode (not a human callback).
4. **Given** I end a session, **When** optional emotional check-in appears, **Then** I can answer **"Did you feel rushed?"** (Yes/No) or skip without penalty.
5. **Given** emotional check-in response, **When** stored, **Then** it is logged for KPIs only and **not** visible to caregivers (US-012).
6. **Given** frustration or pause events, **When** recorded, **Then** `emotional_safety_flags` updated without storing PII in flag reason text.

## 4. Scope Notes

- **In Scope for MVP**: Keyword/heuristic frustration detection on TUTOR path, check-in prompt, optional exit survey, **Get extra help** offer (Patient Mode).
- **Deferred**: ML-based sentiment analysis; human escalation webhook (**P1**).

## 5. Traceability

- **PRD Anchors**: §4 F5; §3 `step_by_step_tutor` tools (`detect_frustration_signal`, `offer_pause`, `enter_patient_mode`); §7 UX KPIs (80% not rushed)
- **Related SFS**: TBD — `project-context/1.define/sfs/emotional-safety.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §4 F5, §3 Tutor agent

## Assumptions

- Distress keyword list maintained in config and reviewed by gerontology advisor before beta.

## Open Questions

- Exact keyword list and localization plan for P2 Spanish?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-14T14:00:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.3` |
| PRD version | v2.3 Final |
