# US-016: Public Computer Shared-Device Mode

## 1. Story Identity

- **ID**: US-016
- **Title**: Public Computer Shared-Device Mode
- **Priority**: Must
- **Persona**: Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a user on a library or housing office computer, I want the app to protect my account when I forget to log out, so that the next person cannot see my information.

## 3. Acceptance Criteria

1. **Given** I am on No-Device track or choose public computer, **When** onboarding or settings offer **"I'm on a public computer"**, **Then** shared-device mode activates.
2. **Given** shared-device mode is on, **When** session is idle beyond configured timeout, **Then** I am logged out automatically.
3. **Given** shared-device mode, **When** session ends, **Then** no credentials or sensitive form data persist in browser storage.
4. **Given** shared-device mode tutoring, **When** steps involve login, **Then** Tutor instructs logout and warns about shoulder surfing per RAG corpus.
5. **Given** I finish a session on public computer, **When** I choose print summary (US-017), **Then** printed output excludes account tokens or session IDs.

## 4. Scope Notes

- **In Scope for MVP**: Public computer toggle, auto logout, no credential persistence, safety instructions.
- **Deferred**: Hardened library kiosk mode (P1-3); staff admin panel.

## 5. Traceability

- **PRD Anchors**: §4 F8; §3 auth shared-device; §4 F9 public-computer content
- **Related SFS**: TBD — `project-context/1.define/sfs/shared-device-mode.md`

## Sources

- `project-context/1.define/prd.md` — §4 F8, §3 Authentication

## Assumptions

- Idle timeout default 15 minutes unless security assessment recommends shorter.

## Open Questions

- Exact idle timeout for public mode?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
