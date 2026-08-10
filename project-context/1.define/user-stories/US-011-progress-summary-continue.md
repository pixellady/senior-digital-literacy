# US-011: Progress Summary and Continue Session

## 1. Story Identity

- **ID**: US-011
- **Title**: Progress Summary and Continue Session
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a returning senior user, I want to see what I've learned and my scam-defense wins, so that I feel encouraged and can pick up exactly where I left off.

## 3. Acceptance Criteria

1. **Given** I complete a session, **When** summary is shown, **Then** it includes steps completed, current track, and scam wins (e.g., "You spotted 2 scam patterns this week").
2. **Given** I log in after a prior visit, **When** home loads, **Then** I see **Continue last lesson** and **Continue last scam drill** when applicable.
3. **Given** Progress Tracker runs, **When** milestones occur, **Then** it records steps, goals, track, scam milestones, and `scam_streak_days`.
4. **Given** track changes occurred, **When** summary displays, **Then** progress from prior track is preserved and visible.
5. **Given** suggested next action, **When** summary ends, **Then** user is offered next scam drill OR next lesson step aligned with their goal.

## 4. Scope Notes

- **In Scope for MVP**: Session summary, continue flows, scam + skill dual progress display.
- **Deferred**: Email/SMS continue reminders (P1-4); caregiver notifications on milestone (P1-2).

## 5. Traceability

- **PRD Anchors**: §4 F6; §3 progress_tracker agent; §7 retention KPIs
- **Related SFS**: TBD — `project-context/1.define/sfs/progress-tracking.md`

## Sources

- `project-context/1.define/prd.md` — §4 F6, §3 Progress Tracker

## Assumptions

- "Scam wins" counts drill completions and successful scam checks, not raw message content.

## Open Questions

- None.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
