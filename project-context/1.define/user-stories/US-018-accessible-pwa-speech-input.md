# US-018: Accessible PWA and Speech Input

## 1. Story Identity

- **ID**: US-018
- **Title**: Accessible PWA and Speech Input
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a senior with vision or motor limitations, I want a large, accessible app I can install on my phone or use in a browser, so that I can see buttons clearly and optionally speak instead of type.

## 3. Acceptance Criteria

1. **Given** I use iOS Safari or Android Chrome, **When** I follow install prompts, **Then** PWA is installable to home screen.
2. **Given** any core screen, **When** measured, **Then** body text ≥16px, contrast ≥4.5:1, touch targets ≥44×44px.
3. **Given** screen reader or keyboard navigation, **When** I traverse chat and actions, **Then** ARIA labels and focus order are logical.
4. **Given** browser supports Web Speech API, **When** I tap speak-to-type, **Then** I can dictate messages into chat or scam-check fields.
5. **Given** instructional content, **When** displayed, **Then** no auto-advancing timers or auto-dismiss modals occur.
6. **Given** automated WCAG scan on core flows, **When** tested pre-beta, **Then** zero critical violations.

## 4. Scope Notes

- **In Scope for MVP**: PWA install, WCAG 2.1 AA core flows, optional **Tier A** browser Web Speech (dictation only), no timed steps. **No** cloud STT/TTS, phone voice agent, or voice-only mode (PRD v2.2).
- **Deferred**: Native apps; full screen reader certification audit post-MVP.

## 5. Traceability

- **PRD Anchors**: §4 F8; §5 NFR accessibility; §7 UX metrics (0 critical WCAG failures)
- **Related SFS**: TBD — `project-context/1.define/sfs/accessibility-pwa.md`

## Sources

- `project-context/1.define/prd.md` v2.2 — §4 F8, §5 Security & Compliance WCAG, §3 Delivery path (text-first)

## Assumptions

- Speech input is enhancement; typing remains fully supported.

## Open Questions

- None.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
