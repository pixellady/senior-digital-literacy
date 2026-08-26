# US-002: Check Suspicious Message

## 1. Story Identity

- **ID**: US-002
- **Title**: Check Suspicious Message
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who received a strange text or call, I want to paste or describe the message and get a plain-language scam assessment, so that I can decide safely whether to respond, ignore, or get help.

## 3. Acceptance Criteria

1. **Given** I am on the scam-check surface, **When** I view the page, **Then** the heading is **Learn the Signs, Protect Yourself** and the subtitle is *Check a suspicious message or call. You're safe here, and you're never wrong to ask.* (PRD §6; SAD AD-13).
2. **Given** I am in Scam Defense, **When** I choose to check a message, **Then** I can paste text, type a description of a phone call, or enter text from a screenshot (manual paste MVP).
3. **Given** I submit suspicious content, **When** Scam Detector analyzes it, **Then** I receive a plain-language assessment (likely scam / suspicious / likely safe) with recommended next steps.
4. **Given** Scam Detector detects high risk (e.g., tech-support, grandparent, IRS patterns), **When** results are shown, **Then** I am offered **Get extra help** (Priority Mode — US-013) and clear do-not-pay / do-not-click guidance; active-scam signals route to US-014.
5. **Given** the assessment completes, **When** the session ends, **Then** Progress Service records a scam-check milestone (no message content stored in progress summary shown to caregivers).
6. **Given** sensitive banking or credential requests in the message, **When** Scam Detector responds, **Then** advice is RAG-grounded from verified scam corpus only.

## 4. Scope Notes

- **In Scope for MVP**: Canonical heading/subtitle; text paste and describe-call input; RAG-grounded assessment; **Get extra help** offer on high risk. Scam Defense does **not** count toward 5 tutor sessions/week.
- **Deferred**: Image/OCR upload for screenshots; Spanish-language assessment (P2).

## 5. Traceability

- **PRD Anchors**: §4 F1; §3 `scam_detector` agent; §4 F9 scam corpus; §6 UX (canonical copy)
- **SAD Anchors**: AD-13
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-message-check.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §4 F1, §6 UX, §3 Agent: scam_detector

## Assumptions

- MVP accepts manual transcription from screenshots rather than OCR upload.

## Open Questions

- Minimum confidence threshold before showing "likely safe" vs. "we're not sure — get extra help"?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T16:10:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-scam-check-copy` |
| PRD version | v2.3 Final |
