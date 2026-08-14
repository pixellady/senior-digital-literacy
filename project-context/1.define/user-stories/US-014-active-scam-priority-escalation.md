# US-014: Active Scam Priority Escalation

## 1. Story Identity

- **ID**: US-014
- **Title**: Active Scam Priority Escalation
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a senior who thinks a scam is happening right now, I want immediate, calm safety guidance from my scam checker, so that I can protect my money and peace of mind without waiting for a callback.

## 3. Acceptance Criteria

1. **Given** I am in Scam Defense or tutoring, **When** I indicate **"I think I'm being scammed right now"** or equivalent, **Then** Intent Router forces **SCAM** path and Scam Detector enters **Priority Mode** (US-013).
2. **Given** Scam Detector assesses **critical** risk during a check or Tutor interrupt, **When** auto-escalation runs, **Then** **Priority Mode** activates immediately (same **Scam checker** persona).
3. **Given** Priority Mode, **When** Scam Detector responds, **Then** copy includes immediate safety steps (hang up, do not pay, do not share codes) plus **IC3/AARP resource links** via `recommend_ic3_aarp_resources`.
4. **Given** active-scam event, **When** Scam Detector logs the event, **Then** escalation log records urgency and `active_scam_in_progress=true` (and scam type if detected) with **no credentials** — **no human webhook in MVP**.
5. **Given** Priority Mode during tutoring interrupt, **When** user remains in session, **Then** Scam Detector provides calm grounding messages; Tutor pauses sensitive lesson steps until user exits Priority Mode or returns to TUTOR path.

## 4. Scope Notes

- **In Scope for MVP**: User-declared active scam; critical auto-escalation; Scam Detector Priority Mode with immediate safety guidance; IC3/AARP links; internal escalation log.
- **Deferred**: Human callback queue and escalation webhook (**P1**); real-time hotline integration; law enforcement direct dial.

## 5. Traceability

- **PRD Anchors**: §4 F7 (Priority Mode); §3 `scam_detector`; §3 `intent_router` safety override; §4 F1
- **Related SFS**: TBD — `project-context/1.define/sfs/patient-priority-mode.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §4 F7, §3 Scam Detector Priority Mode

## Assumptions

- Active-scam flow does **not** promise human callback in MVP; copy must set expectation for in-app AI-guided steps and official reporting resources.
- Scam Detector Priority Mode does **not** count toward 5 tutor sessions/week cap.

## Open Questions

- None — cap resolved: Scam path uncapped per PRD §5.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-14T14:00:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.3` |
| PRD version | v2.3 Final |
