# US-020: Scam Detector Interrupt During Tutoring

## 1. Story Identity

- **ID**: US-020
- **Title**: Scam Detector Interrupt During Tutoring
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user describing something suspicious while learning, I want the scam checker to step in immediately during my lesson, so that I don't follow dangerous advice while trying to complete a task.

## 3. Acceptance Criteria

1. **Given** I am in a tutoring session (TUTOR path), **When** my message contains scam patterns or I paste suspicious content, **Then** Tutor invokes Scam Detector interrupt within the same turn or next turn before continuing the lesson step.
2. **Given** Scam Detector interrupts, **When** UI displays response, **Then** role is clearly indicated (e.g., **Scam checker tip**) distinct from tutor voice.
3. **Given** interrupt completes, **When** risk is not critical, **Then** I return to tutoring at the same step via Tutor resume.
4. **Given** critical risk during tutoring, **When** Scam Detector assesses, **Then** active-scam Priority Mode (US-014) activates and Tutor pauses sensitive steps.
5. **Given** interrupt flow, **When** copy is shown, **Then** tone remains calm and never blames user for mentioning the suspicious content.

## 4. Scope Notes

- **In Scope for MVP**: Live scam signal detection in tutoring sessions; Scam Detector one-turn interrupt; resume tutoring; Priority Mode on critical risk.
- **Deferred**: Proactive scam warnings before user mentions (predictive) — post-MVP.

## 5. Traceability

- **PRD Anchors**: §4 F1, F4; §3 cross-path interrupt (Tutor → Scam Detector); §3 `invoke_scam_detector_interrupt`
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-defense-hub.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §3 Architecture Overview, §3 Tutor runtime notes

## Assumptions

- Tutor orchestrates interrupt via `invoke_scam_detector_interrupt`; Tutor and Scam Detector do not compete in the same message.

## Open Questions

- None.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-14T14:00:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.3` |
| PRD version | v2.3 Final |
