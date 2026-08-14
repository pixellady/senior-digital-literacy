# US-020: Safety Coach Live Interrupt During Tutoring

## 1. Story Identity

- **ID**: US-020
- **Title**: Safety Coach Live Interrupt During Tutoring
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user describing something suspicious while learning, I want the safety coach to step in immediately during my lesson, so that I don't follow dangerous advice while trying to complete a task.

## 3. Acceptance Criteria

1. **Given** I am in a tutoring session, **When** my message contains scam patterns or I paste suspicious content, **Then** Safety Coach can interrupt within the same turn or next turn before Tutor continues the lesson step.
2. **Given** Safety Coach interrupts, **When** UI displays response, **Then** role is clearly indicated (e.g., **Safety tip**) distinct from tutor voice.
3. **Given** interrupt completes, **When** risk is not critical, **Then** user can return to tutoring at same step with Coordinator managing handoff.
4. **Given** critical risk during tutoring, **When** Safety Coach assesses, **Then** active-scam priority flow (US-014) activates Coordinator Extended Help Mode and Tutor pauses sensitive steps.
5. **Given** interrupt flow, **When** copy is shown, **Then** tone remains calm and never blames user for mentioning the suspicious content.

## 4. Scope Notes

- **In Scope for MVP**: Live scam signal detection in tutoring sessions; Coach interrupt; resume tutoring; active-scam Extended Help on critical risk.
- **Deferred**: Proactive scam warnings before user mentions (predictive) — post-MVP.

## 5. Traceability

- **PRD Anchors**: §4 F1, F4; §3 safety_scam_coach runtime notes (can interrupt Tutor flow)
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-defense-hub.md`

## Sources

- `project-context/1.define/prd.md` — §3 Safety Coach, §2 user journey

## Assumptions

- Coordinator orchestrates interrupt; Tutor does not compete with Safety Coach in same message.

## Open Questions

- None.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
