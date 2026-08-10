# US-005: Switch Learning Track Mid-Journey

## 1. Story Identity

- **ID**: US-005
- **Title**: Switch Learning Track Mid-Journey
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a learner whose lessons feel too fast or too slow, I want to switch my learning track without losing progress, so that I stay engaged without feeling stupid or bored.

## 3. Acceptance Criteria

1. **Given** I am in an active or paused session, **When** I tap **"This is too fast"** or equivalent, **Then** I am offered to switch to a slower track (e.g., Partial → Beginner) with reassuring copy and no penalty messaging.
2. **Given** I am on Beginner track, **When** I tap **"I'm ready for more"**, **Then** I can switch to Partial User track without losing recorded milestones.
3. **Given** I change tracks, **When** the switch completes, **Then** `track_history` is appended in learner state and Progress Tracker retains completed steps and scam milestones.
4. **Given** track switch occurs, **When** the next Tutor message is sent, **Then** step granularity matches the new track.
5. **Given** any track-switch UI, **When** copy is displayed, **Then** it contains no shame language (e.g., no "demoted" or "advanced enough").

## 4. Scope Notes

- **In Scope for MVP**: Explicit user-initiated track switch; progress preservation; track_history audit.
- **Deferred**: Automatic Coordinator downgrade after N failures (heuristic MVP may suggest but not force — see Open Questions).

## 5. Traceability

- **PRD Anchors**: §4 F2; §2 track assignment flow step 4; §4 F5 emotional safety copy rules
- **Related SFS**: TBD — `project-context/1.define/sfs/learning-tracks.md`

## Sources

- `project-context/1.define/prd.md` — §4 F2, §2 track assignment

## Assumptions

- Switching from No-Device to Partial User implies user now has personal device access; UI may confirm device ownership.

## Open Questions

- Should Coordinator auto-suggest track switch after 3 "I don't understand" responses?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
