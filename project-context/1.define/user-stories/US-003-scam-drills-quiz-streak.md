# US-003: Scam Drills, Quiz, and Streak

## 1. Story Identity

- **ID**: US-003
- **Title**: Scam Drills, Quiz, and Streak
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a senior user who wants to get better at spotting scams, I want to practice realistic scam scenarios and take a short quiz, so that I build daily safety habits and see my improvement over time.

## 3. Acceptance Criteria

1. **Given** I am in Scam Defense, **When** I choose **Practice scams**, **Then** I can access ≥10 scenario drills covering tech support, grandparent, IRS, housing/benefits, romance, and recovery scams.
2. **Given** I complete a drill, **When** the Safety Coach debriefs, **Then** feedback is calm, educational, and never shaming.
3. **Given** I choose **Scam quiz**, **When** I answer ≥5 questions, **Then** I receive a score and Progress Tracker records the result and `scam_defense_level`.
4. **Given** I engage with Scam Defense on consecutive days, **When** I return to home, **Then** my **Scam Defense streak** is visible.
5. **Given** I am on the No-Device track (Carmen), **When** I run drills, **Then** scenarios include housing/benefits scam variants where applicable.
6. **Given** quiz or drill completion, **When** my score improves on retake, **Then** session summary can reflect improvement (≥20% lift target for pilot KPI).

## 4. Scope Notes

- **In Scope for MVP**: 10+ drills, 5+ question quiz, streak counter, track-appropriate scenario emphasis.
- **Deferred**: Daily push/email reminders (P1-4); Spanish drill content (P2).

## 5. Traceability

- **PRD Anchors**: §4 F1; §4 F6 (scam milestones); §7 KPIs (scam quiz lift, first-session Scam Defense use)
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-drills.md`

## Sources

- `project-context/1.define/prd.md` — §4 F1, §2 learning tracks (scam emphasis by track)

## Assumptions

- Streak counts calendar days with any Scam Defense activity (check, drill, or quiz).

## Open Questions

- Does a streak require a drill, or does a message check count?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
