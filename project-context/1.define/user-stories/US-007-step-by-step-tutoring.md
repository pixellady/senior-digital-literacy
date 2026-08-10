# US-007: Step-by-Step Tutoring Session

## 1. Story Identity

- **ID**: US-007
- **Title**: Step-by-Step Tutoring Session
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user learning a new digital task, I want one clear step at a time from a patient tutor, so that I can complete the task without feeling overwhelmed.

## 3. Acceptance Criteria

1. **Given** I start a tutoring session with a life goal, **When** the Coordinator routes my message, **Then** the Step-by-Step Tutor responds with exactly one step per turn (Partial User track).
2. **Given** a tutor step is shown, **When** content is from RAG, **Then** a **verified guide** indicator is visible.
3. **Given** any tutor turn, **When** I view actions, **Then** **Explain simpler**, **Pause**, **Start over**, and **Repeat last step** are available.
4. **Given** I refresh the browser mid-session, **When** I return, **Then** session and step progress are restored from learner state.
5. **Given** the session runs, **When** steps auto-advance, **Then** no timers or forced progression occur.
6. **Given** tutoring touches banking or security settings, **When** Tutor responds, **Then** content is RAG-only with no generative fallback.

## 4. Scope Notes

- **In Scope for MVP**: Track-aware one-step tutoring, RAG grounding, session persistence, action buttons.
- **Deferred**: Screen sharing co-browsing (Phase 2); native app tutoring.

## 5. Traceability

- **PRD Anchors**: §4 F4; §3 step_by_step_tutor agent; §4 F9 sensitive tasks
- **Related SFS**: TBD — `project-context/1.define/sfs/tutoring-session.md`

## Sources

- `project-context/1.define/prd.md` — §4 F4, §3 Tutor agent

## Assumptions

- Partial User is default path for Margaret; Beginner and No-Device variants covered in US-018 and US-014.

## Open Questions

- Maximum steps per session before suggesting break (soft limit)?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
