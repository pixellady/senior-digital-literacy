# US-002: Check Suspicious Message

## 1. Story Identity

- **ID**: US-002
- **Title**: Check Suspicious Message
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who received a strange text or call, I want to paste or describe the message and get a plain-language scam assessment, so that I can decide safely whether to respond, ignore, or get help.

## 3. Acceptance Criteria

1. **Given** I am in Scam Defense, **When** I choose to check a message, **Then** I can paste text, type a description of a phone call, or enter text from a screenshot (manual paste MVP).
2. **Given** I submit suspicious content, **When** the Safety Coach analyzes it, **Then** I receive a plain-language assessment (likely scam / suspicious / likely safe) with recommended next steps.
3. **Given** the Safety Coach detects high risk (e.g., tech-support, grandparent, IRS patterns), **When** results are shown, **Then** I am offered **Get extra help** (Coordinator Extended Help Mode — US-013) and clear do-not-pay / do-not-click guidance; active-scam signals route to US-014.
4. **Given** the assessment completes, **When** the session ends, **Then** Progress Tracker records a scam-check milestone (no message content stored in progress summary shown to caregivers).
5. **Given** sensitive banking or credential requests in the message, **When** the Coach responds, **Then** advice is RAG-grounded from verified scam corpus only.

## 4. Scope Notes

- **In Scope for MVP**: Text paste and describe-call input; RAG-grounded assessment; **Get extra help** offer on high risk. Scam Defense does **not** count toward 5 tutor sessions/week.
- **Deferred**: Image/OCR upload for screenshots; Spanish-language assessment (P2).

## 5. Traceability

- **PRD Anchors**: §4 F1; §3 safety_scam_coach agent; §4 F9 scam corpus
- **Related SFS**: TBD — `project-context/1.define/sfs/scam-message-check.md`

## Sources

- `project-context/1.define/prd.md` — §4 F1, §3 Agent: safety_scam_coach

## Assumptions

- MVP accepts manual transcription from screenshots rather than OCR upload.

## Open Questions

- Minimum confidence threshold before showing "likely safe" vs. "we're not sure — get extra help"?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
