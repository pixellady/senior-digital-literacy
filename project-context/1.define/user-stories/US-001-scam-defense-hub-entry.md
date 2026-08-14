# US-001: Scam Defense Hub Entry

## 1. Story Identity

- **ID**: US-001
- **Title**: Scam Defense Hub Entry
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who is afraid of online scams, I want scam protection to be the first thing I see when I open the app, so that I can check suspicious messages and build safety habits before learning anything else.

## 3. Acceptance Criteria

1. **Given** I am a logged-in or new user on the home screen, **When** the app loads, **Then** **Scam Defense** is displayed with equal or greater visual prominence than "Learn something new."
2. **Given** I am on the home screen, **When** I tap **"Is this a scam?"**, **Then** I enter a standalone Scam Defense session without completing tutoring onboarding first.
3. **Given** I start a Scam Defense session, **When** Scam Detector responds, **Then** the response appears within 5 seconds (p95 target) and uses calm, non-alarmist language.
4. **Given** any Scam Defense interaction, **When** copy is shown, **Then** it never blames the user for almost falling for a scam.
5. **Given** I complete onboarding, **When** I return to home, **Then** Scam Defense remains a primary entry point alongside Learn and Continue.

## 4. Scope Notes

- **In Scope for MVP**: Home layout, one-tap Scam Defense entry, standalone session start, Scam Detector headline flow.
- **Deferred**: Email/SMS scam reminders (P1-4); bilingual Scam Defense copy (P2).

## 5. Traceability

- **PRD Anchors**: §4 F1 (Scam Defense Hub); §1 Solution Overview (pillar 1); §6 UX (home screen)
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-defense-hub.md`

## Sources

- `project-context/1.define/prd.md` — §4 F1, §2 Margaret persona

## Assumptions

- Home screen defaults to equal prominence for Scam Defense and Learn unless stakeholder resolves Open Question #1 (Scam vs. Learn default memory).

## Open Questions

- Should returning users land on last-used entry (Scam vs. Learn) or always show balanced home?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
