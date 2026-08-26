# US-001: Scam Defense Hub Entry

## 1. Story Identity

- **ID**: US-001
- **Title**: Scam Defense Hub Entry
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who is afraid of online scams, I want scam protection to be the first thing I see when I open the app, so that I can check suspicious messages and build safety habits before learning anything else.

## 3. Acceptance Criteria

1. **Given** I am a logged-in or new user on the scam-check entry, **When** the page loads, **Then** the page heading and document tab title read **Learn the Signs, Protect Yourself** (PRD §6; SAD AD-13).
2. **Given** I view the scam-check entry, **When** I read below the heading, **Then** the subtitle is: *Check a suspicious message or call. You're safe here, and you're never wrong to ask.*
3. **Given** I am on the home or scam-check screen, **When** I look for Scam Defense, **Then** **Scam Defense** is displayed with equal or greater visual prominence than "Learn something new" on the full two-path home (Build slice may ship checker on `/` first).
4. **Given** I am on the scam-check entry, **When** I submit a message to check, **Then** I enter a standalone Scam Defense session without completing tutoring onboarding first.
5. **Given** I start a Scam Defense session, **When** Scam Detector responds, **Then** the response appears within 5 seconds (p95 target) and uses calm, non-alarmist language.
6. **Given** any Scam Defense interaction, **When** copy is shown, **Then** it never blames the user for almost falling for a scam.
7. **Given** I complete onboarding, **When** I return to home, **Then** Scam Defense remains a primary entry point alongside Learn and Continue.

## 4. Scope Notes

- **In Scope for MVP**: Canonical heading/subtitle (PRD §6); home or single-route scam-check entry; standalone session start; Scam Detector headline flow.
- **Deferred**: Email/SMS scam reminders (P1-4); bilingual Scam Defense copy (P2).

## 5. Traceability

- **PRD Anchors**: §4 F1 (Scam Defense Hub); §1 Solution Overview (pillar 1); §6 UX (canonical scam-check copy)
- **SAD Anchors**: AD-13 (scam check surface copy)
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-defense-hub.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §4 F1, §6 UX, §2 Margaret persona
- `project-context/1.define/sad.md` — AD-13, §3 Interface Requirements

## Assumptions

- Home screen defaults to equal prominence for Scam Defense and Learn unless stakeholder resolves Open Question #1 (Scam vs. Learn default memory).
- Build may ship the checker on `/` with this copy before the full two-path home route map.

## Open Questions

- Should returning users land on last-used entry (Scam vs. Learn) or always show balanced home?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T16:10:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-scam-check-copy` |
| PRD version | v2.3 Final |
