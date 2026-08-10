# US-021: Verified Guide Responses

## 1. Story Identity

- **ID**: US-021
- **Title**: Verified Guide Responses
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Product operator (implicit)

## 2. Narrative

As a senior user following instructions about money or security, I want answers that come from verified guides—not guesses—so that I can trust what the app tells me to do.

## 3. Acceptance Criteria

1. **Given** Tutor or Safety Coach answers a supported question, **When** response uses RAG corpus, **Then** UI shows **verified guide** or equivalent trust indicator.
2. **Given** question matches sensitive category (banking view-only, security settings, scam response), **When** confidence below threshold, **Then** system refuses generative guess and offers escalation or simplified verified snippet only.
3. **Given** MVP launch, **When** corpus is queried, **Then** scam pattern content includes ≥10 scenario drills and IC3/AARP-sourced patterns (operator acceptance).
4. **Given** MVP launch, **When** tutoring corpus is queried, **Then** ≥50 task guides exist tagged by `learning_track` compatibility.
5. **Given** content update, **When** operator rolls back corpus version, **Then** feature flag restores prior RAG index without code deploy.

## 4. Scope Notes

- **In Scope for MVP**: RAG-first responses, trust indicator, sensitive-task guard, corpus size and tagging (user-visible trust; operator corpus management backend).
- **Deferred**: User-facing corpus citation links to external OEM docs (P1).

## 5. Traceability

- **PRD Anchors**: §4 F9; §4 F4 RAG grounding; §4 F7 low-confidence escalation
- **Related SFS**: TBD — `project-context/1.define/sfs/rag-content-corpus.md`

## Sources

- `project-context/1.define/prd.md` — §4 F9, §3 RAG integration

## Assumptions

- QA validates corpus coverage via acceptance test matrix mapped to US-006 goals and US-003 drill types.

## Open Questions

- Show source title to user or only "verified guide" badge in MVP?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
