# US-015: Visual-First No-Device Learning

## 1. Story Identity

- **ID**: US-015
- **Title**: Visual-First No-Device Learning
- **Priority**: Must
- **Persona**: Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a learner without my own smartphone, I want large pictures and simple step cards on a shared computer, so that I can follow instructions without reading long paragraphs.

## 3. Acceptance Criteria

1. **Given** my track is **No-Device User**, **When** Tutor delivers a step, **Then** **illustrated** visual step cards display (senior-friendly artwork + short label) with minimal paragraph text by default — not icon-only (PRD §6).
2. **Given** visual-first mode, **When** I progress through steps, **Then** progress dots or equivalent show where I am in the sequence.
3. **Given** No-Device tutoring, **When** content is loaded, **Then** RAG corpus uses track-tagged guides including public-computer safety (logout, shoulder surfing, fake Wi‑Fi).
4. **Given** a housing portal or benefits goal, **When** Carmen completes flow, **Then** at least one supported path exists in MVP corpus (housing portal access, housing scam drill).
5. **Given** optional audio, **When** browser supports it, **Then** step card label can be read aloud (Web Speech API optional MVP).
6. **Given** English MVP for Carmen, **When** UI is built, **Then** copy avoids idioms and is structured to support future Spanish/English toggle (P2).

## 4. Scope Notes

- **In Scope for MVP**: Illustrated visual step cards, progress indicators, No-Device corpus, English UI, housing-relevant goals. No-Device track **built in product**; Carmen partner beta **Q4 2026** (P1-6).
- **Deferred**: Full Spanish/English bilingual (P2); illustration source finalization (commission vs. stock vs. generated — PRD Open Question #2).

## 5. Traceability

- **PRD Anchors**: §2 Carmen persona; §4 F2, F8; §4 F9 No-Device content
- **Related SFS**: TBD — `project-context/1.define/sfs/no-device-visual-first.md`

## Sources

- `project-context/1.define/prd.md` — §2 Carmen, §4 F8, §6 Carmen UX notes

## Assumptions

- PRD v2.2 requires **illustrated** step cards for No-Device + Beginner; icon-only is insufficient for MVP acceptance.

## Open Questions

- Illustration source: commission vs. stock vs. generated (PRD Open Question #2)?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
