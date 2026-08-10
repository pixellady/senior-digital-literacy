# US-004: Select Learning Track at Onboarding

## 1. Story Identity

- **ID**: US-004
- **Title**: Select Learning Track at Onboarding
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a learner starting the app, I want to choose a learning level that matches my device and comfort, so that instructions are neither too basic nor too advanced.

## 3. Acceptance Criteria

1. **Given** I complete initial sign-up, **When** onboarding asks about my situation, **Then** I can select among **Beginner**, **Partial User**, or **No-Device User** using plain language (device ownership and comfort), not technical jargon.
2. **Given** I select **No-Device User**, **When** onboarding continues, **Then** `learning_track` is set to `no_device` and visual-first mode is enabled by default.
3. **Given** I select **Beginner**, **When** I start tutoring, **Then** device basics are included before life-goal tasks.
4. **Given** I select **Partial User**, **When** I start tutoring, **Then** device basics are skipped by default.
5. **Given** track selection completes, **When** learner state is saved, **Then** Coordinator and Tutor receive the track for all future sessions.
6. **Given** Carmen selects No-Device, **When** she uses the app in English MVP, **Then** UI is optimized for shared computer/kiosk (see US-014, US-015).

## 4. Scope Notes

- **In Scope for MVP**: Three tracks, plain-language selection, persistence, track-default behaviors.
- **Deferred**: Coordinator auto-adjust without user consent (Open Question #2); bilingual onboarding (P2).

## 5. Traceability

- **PRD Anchors**: §2 Persona-Specific Learning Tracks; §4 F2; §3 learner state `learning_track`
- **Related SFS**: TBD — `project-context/1.define/sfs/learning-tracks.md`

## Sources

- `project-context/1.define/prd.md` — §2 tracks table, §4 F2

## Assumptions

- Family caregiver (David) may assist with track selection during setup but senior account remains senior-owned.

## Open Questions

- Should Coordinator suggest track change after first session without explicit user request?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
