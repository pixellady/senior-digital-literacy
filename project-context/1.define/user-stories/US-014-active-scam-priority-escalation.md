# US-014: Active Scam Priority Escalation

## 1. Story Identity

- **ID**: US-014
- **Title**: Active Scam Priority Escalation
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a senior who thinks a scam is happening right now, I want immediate, calm safety guidance from my guide, so that I can protect my money and peace of mind without waiting for a callback.

## 3. Acceptance Criteria

1. **Given** I am in Scam Defense or tutoring, **When** I indicate **"I think I'm being scammed right now"** or equivalent, **Then** Escalation Handler triggers the **active-scam safety flow** (US-013 Extended Help Mode or dedicated active-scam branch).
2. **Given** Safety Coach assesses **critical** risk, **When** auto-escalation runs, **Then** Coordinator enters **Extended Help Mode** immediately with **active-scam priority** (no separate chat persona).
3. **Given** active-scam priority flow, **When** Coordinator responds, **Then** copy includes immediate safety steps (hang up, do not pay, do not share codes) plus **IC3/AARP resource links** via `recommend_ic3_aarp_resources`.
4. **Given** active-scam event, **When** Escalation Handler logs the event, **Then** escalation log records urgency and `active_scam_in_progress=true` (and scam type if detected) with **no credentials** — **no human webhook in MVP**.
5. **Given** priority flow, **When** user remains in session, **Then** Coordinator and Safety Coach provide calm grounding messages until user ends session or exits Extended Help Mode; Tutor pauses sensitive lesson steps.

## 4. Scope Notes

- **In Scope for MVP**: User-declared active scam; critical auto-escalation; Coordinator Extended Help with immediate safety guidance; IC3/AARP links; internal escalation log.
- **Deferred**: Human callback queue and escalation webhook (**P1**); real-time hotline integration; law enforcement direct dial.

## 5. Traceability

- **PRD Anchors**: §4 F7 (active-scam safety flow); §3 `safety_scam_coach`; §3 `coordinator` tools (`trigger_active_scam_guidance`, `recommend_ic3_aarp_resources`); §4 F1
- **Related SFS**: TBD — `project-context/1.define/sfs/extended-help-mode.md`

## Sources

- `project-context/1.define/prd.md` v2.2 — §4 F7, §3 Escalation Handler triggers

## Assumptions

- Active-scam flow does **not** promise human callback in MVP; copy must set expectation for in-app AI-guided steps and official reporting resources.

## Open Questions

- Should active-scam sessions bypass the 5 tutor sessions/week cap, or count as Extended Help? (Default: count toward cap unless SAD specifies otherwise.)

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
