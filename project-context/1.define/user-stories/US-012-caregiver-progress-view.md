# US-012: Caregiver Read-Only Progress View

## 1. Story Identity

- **ID**: US-012
- **Title**: Caregiver Read-Only Progress View
- **Priority**: Must
- **Persona**: Family Caregiver (David, 48)

## 2. Narrative

As a family caregiver, I want to see my parent's learning and scam-defense progress without reading private messages, so that I can support them while respecting their dignity and privacy.

## 3. Acceptance Criteria

1. **Given** I am a caregiver, **When** the senior sends me an invite link, **Then** I can link my account only after the senior explicitly approves sharing.
2. **Given** sharing is approved, **When** I open progress view, **Then** I see read-only summary: completed goals, step counts, scam milestone counts, and scam streak — **not** chat message content.
3. **Given** emotional check-in responses exist, **When** caregiver views dashboard, **Then** "Did you feel rushed?" and frustration flags are **not** displayed.
4. **Given** senior revokes sharing, **When** revocation saves, **Then** caregiver loses access immediately.
5. **Given** senior enters Patient Mode or active-scam Priority flow, **When** caregiver views progress, **Then** only aggregate escalation **event counts** may appear if senior opted in — **no** escalation alerts or human callback status in MVP (**P1**).

## 4. Scope Notes

- **In Scope for MVP**: Invite flow, senior approval, read-only progress summary, privacy boundaries.
- **Deferred**: Full caregiver dashboard (P1-2); escalation SMS/alerts to caregiver (**P1** with human escalation webhook).

## 5. Traceability

- **PRD Anchors**: §2 David persona; §4 F6 caregiver criteria; §4 auth caregiver link
- **Related SFS**: TBD — `project-context/1.define/sfs/caregiver-access.md`

## Sources

- `project-context/1.define/prd.md` — §2 Secondary Persona David, §4 F6

## Assumptions

- Escalation alerts to caregiver are **out of MVP**; deferred to P1 with human handoff option.

## Open Questions

- None — caregiver escalation notifications deferred to P1 per PRD v2.2.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
