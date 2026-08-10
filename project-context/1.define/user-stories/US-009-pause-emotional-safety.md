# US-009: Pause and Emotional Safety Controls

## 1. Story Identity

- **ID**: US-009
- **Title**: Pause and Emotional Safety Controls
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior who has felt rushed by tech support before, I want to pause anytime and hear respectful language, so that I feel safe continuing without shame.

## 3. Acceptance Criteria

1. **Given** any active session (tutoring or Scam Defense), **When** I view the screen, **Then** a **Pause** control is always visible and responds in <200ms.
2. **Given** I tap Pause, **When** session is paused, **Then** no new steps are sent until I resume and copy confirms I can return when ready.
3. **Given** any UI or agent message, **When** copy is reviewed against guardrails, **Then** it contains no shame terms (e.g., "obvious," "simply," "just click") and does not blame age or ability.
4. **Given** agent responses, **When** reading level is analyzed, **Then** default language targets ~6th grade with **Explain simpler** and jargon glossary on demand.
5. **Given** I attempt a step unsuccessfully, **When** feedback is shown, **Then** the product celebrates the attempt, not only success.

## 4. Scope Notes

- **In Scope for MVP**: Pause UX, copy guardrails, reading level, attempt-positive feedback.
- **Deferred**: Clinical mental-health resources integration; caregiver visibility into emotional flags.

## 5. Traceability

- **PRD Anchors**: §4 F5; §5 Emotional Safety NFRs; §6 UX pillars
- **Related SFS**: TBD — `project-context/1.define/sfs/emotional-safety.md`

## Sources

- `project-context/1.define/prd.md` — §4 F5, §5 NFR emotional safety

## Assumptions

- Copy guardrails enforced via prompt templates plus optional lint in CI for static UI strings.

## Open Questions

- Formal list of banned shame phrases for QA automation?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
