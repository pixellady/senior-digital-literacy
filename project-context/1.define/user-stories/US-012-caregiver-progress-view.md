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
5. **Given** senior triggers escalation, **When** policy allows, **Then** caregiver may receive escalation alert (optional MVP — confirm in Open Questions).

## 4. Scope Notes

- **In Scope for MVP**: Invite flow, senior approval, read-only progress summary, privacy boundaries.
- **Deferred**: Full caregiver dashboard (P1-2); escalation SMS to caregiver (optional MVP).

## 5. Traceability

- **PRD Anchors**: §2 David persona; §4 F6 caregiver criteria; §4 auth caregiver link
- **Related SFS**: TBD — `project-context/1.define/sfs/caregiver-access.md`

## Sources

- `project-context/1.define/prd.md` — §2 Secondary Persona David, §4 F6

## Assumptions

- Escalation alerts to caregiver are off by default; senior opts in separately from progress sharing.

## Open Questions

- Should MVP include escalation notifications to approved caregivers?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
