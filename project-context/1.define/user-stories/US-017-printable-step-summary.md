# US-017: Printable Step Summary

## 1. Story Identity

- **ID**: US-017
- **Title**: Printable Step Summary
- **Priority**: Must
- **Persona**: Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a learner on a shared computer, I want to print or save a simple summary of the steps I learned, so that I can follow them again later without logging back in.

## 3. Acceptance Criteria

1. **Given** I complete or pause a No-Device tutoring session, **When** I tap **Print summary** or **Save steps**, **Then** a print-friendly view opens with numbered steps and **illustrated** step thumbnails where available.
2. **Given** print view, **When** rendered, **Then** it excludes chat transcript, credentials, and internal session IDs.
3. **Given** print view, **When** content is generated, **Then** fonts and contrast remain readable (≥16px equivalent in print CSS).
4. **Given** scam-related session, **When** summary prints, **Then** key safety reminders (do not share codes, verify caller) are included.
5. **Given** PDF or print is not available on device, **When** user chooses save, **Then** browser print-to-PDF is supported as fallback.

## 4. Scope Notes

- **In Scope for MVP**: Print-friendly step summary for No-Device track; PDF via browser print.
- **Deferred**: Email summary to self; SMS summary (P1).

## 5. Traceability

- **PRD Anchors**: §4 F8 (printable/shareable summary); §2 No-Device track
- **Related SFS**: TBD — `project-context/1.define/sfs/no-device-visual-first.md`

## Sources

- `project-context/1.define/prd.md` — §4 F8

## Assumptions

- Print summary available primarily for No-Device track; optional for other tracks P1.

## Open Questions

- Should Partial User track also get print summary in MVP?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
