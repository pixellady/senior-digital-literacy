# US-006: Goal-Based Onboarding

## 1. Story Identity

- **ID**: US-006
- **Title**: Goal-Based Onboarding
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a senior user, I want to tell the app what I want to accomplish in everyday life, so that I receive track-appropriate guidance instead of a confusing list of technology features.

## 3. Acceptance Criteria

1. **Given** I finish track selection, **When** onboarding continues, **Then** I choose **Scam Defense first** OR **Learn a skill**.
2. **Given** I choose Learn a skill, **When** goal picker appears, **Then** I see ≥5 options: video calling, email, banking (view-only), telehealth navigation, housing portal access.
3. **Given** I am on No-Device track, **When** goals are shown, **Then** housing portal and public-computer-safe tasks are prioritized.
4. **Given** none of the listed goals fit, **When** I type a custom goal in plain language, **Then** Coordinator accepts and maps to nearest supported path, offers **Get extra help** (Extended Help Mode), or responds with honest limits.
5. **Given** onboarding flow, **When** I count screens, **Then** completion requires ≤5 screens and ≤3 navigation levels.
6. **Given** all onboarding screens, **When** audited for accessibility, **Then** they meet WCAG 2.1 AA (contrast, touch targets, font size).

## 4. Scope Notes

- **In Scope for MVP**: Dual path onboarding (Scam vs. Learn), 5+ goals, custom goal text, track-filtered priorities.
- **Deferred**: Spanish goal labels (P2); payment tier selection (P1).

## 5. Traceability

- **PRD Anchors**: §4 F3; §2 user journey; §6 onboarding UX
- **Related SFS**: TBD — `project-context/1.define/sfs/onboarding.md`

## Sources

- `project-context/1.define/prd.md` — §4 F3, §2 Carmen/Margaret goals

## Assumptions

- Custom goals outside corpus scope trigger Extended Help offer or generic Coordinator response with honest limits.

## Open Questions

- Which custom goals must route to Extended Help Mode in MVP vs. generic tutoring attempt?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
