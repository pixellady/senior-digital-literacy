# US-008: Beginner Track Micro-Steps

## 1. Story Identity

- **ID**: US-008
- **Title**: Beginner Track Micro-Steps
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72) — Beginner track; new device owners

## 2. Narrative

As a beginner who is new to smartphones, I want the smallest possible steps including basic device actions, so that I can build confidence before trying harder tasks like video calls or email.

## 3. Acceptance Criteria

1. **Given** my track is **Beginner**, **When** I start a life-goal task, **Then** Tutor includes prerequisite device steps (e.g., wake phone, find home screen, open app) before goal-specific steps.
2. **Given** Beginner track, **When** each step is delivered, **Then** steps may be split into micro-steps smaller than Partial User granularity.
3. **Given** Beginner track, **When** I complete device basics, **Then** Progress Tracker records basic milestones separately from life-goal milestones.
4. **Given** Beginner scam content, **When** I access Scam Defense, **Then** foundational content includes "What is a scam?" and common red flags before advanced drills.
5. **Given** I confirm a step, **When** I tap **Did that work?**, **Then** Tutor waits for Yes/No before advancing (no skip on failed confirmation).
6. **Given** Beginner track, **When** Tutor delivers a step, **Then** **illustrated** visual step cards are shown via `render_visual_step_card` (PRD §6).

## 4. Scope Notes

- **In Scope for MVP**: Micro-step pacing, device basics gating, foundational scam content for Beginner.
- **Deferred**: Video-based device tutorials (P1 content expansion).

## 5. Traceability

- **PRD Anchors**: §2 learning tracks (Beginner row); §4 F2, F4
- **Related SFS**: TBD — `project-context/1.define/sfs/learning-tracks.md`

## Sources

- `project-context/1.define/prd.md` — §2 Beginner track examples

## Assumptions

- Beginner users may overlap with Partial User persona when self-selecting; track behavior drives UX not age alone.

## Open Questions

- None — scope defined in PRD track table.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
