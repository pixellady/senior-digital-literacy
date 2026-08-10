# US-019: Senior-Owned Account Sign Up

## 1. Story Identity

- **ID**: US-019
- **Title**: Senior-Owned Account Sign Up
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Family Caregiver (David, 48)

## 2. Narrative

As a senior user, I want my own simple account that I control, so that my learning is private and I choose whether my family can see my progress.

## 3. Acceptance Criteria

1. **Given** I am a new user, **When** I sign up, **Then** I can register with email and magic link or a simple password (no complex MFA at launch).
2. **Given** account is created, **When** ownership is recorded, **Then** the senior is the account owner even if a caregiver assisted setup.
3. **Given** David helps Margaret sign up, **When** caregiver link is offered, **Then** progress sharing requires Margaret's explicit in-app approval after signup.
4. **Given** privacy policy link, **When** signup occurs, **Then** plain-language notice states conversations are not used for model training without opt-in consent.
5. **Given** authentication completes, **When** session starts, **Then** connection uses HTTPS and secrets are not exposed in client.

## 4. Scope Notes

- **In Scope for MVP**: Email + magic link or simple password, senior-owned account, caregiver invite deferred to approval step.
- **Deferred**: Enterprise SSO; social login; MFA (post-security assessment).

## 5. Traceability

- **PRD Anchors**: §3 Authentication & Security; §2 David persona; §4 F6 caregiver privacy
- **Related SFS**: TBD — `project-context/1.define/sfs/auth-account.md`

## Sources

- `project-context/1.define/prd.md` — §3 Authentication, §2 personas

## Assumptions

- Minimum age attestation 60+ or honor system for beta; no COPPA flow needed.

## Open Questions

- Magic link vs. password default for senior UX testing?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
