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
2. **Given** the session is not paused, **When** I view the Pause area (`SafetyBar`), **Then** idle copy reads: *Pause is always here, waiting for you.* (PRD §6; SAD AD-13).
3. **Given** I tap Pause, **When** session is paused, **Then** no new steps are sent until I resume and copy confirms I can return when ready.
4. **Given** any UI or agent message, **When** copy is reviewed against guardrails, **Then** it contains no shame terms (e.g., "obvious," "simply," "just click") and does not blame age or ability.
5. **Given** agent responses, **When** reading level is analyzed, **Then** default language targets ~6th grade with **Explain simpler** and jargon glossary on demand.
6. **Given** I attempt a step unsuccessfully, **When** feedback is shown, **Then** the product celebrates the attempt, not only success.

## 4. Scope Notes

- **In Scope for MVP**: Pause UX including canonical idle copy; copy guardrails; reading level; attempt-positive feedback.
- **Deferred**: Clinical mental-health resources integration; caregiver visibility into emotional flags.

## 5. Traceability

- **PRD Anchors**: §4 F5; §5 Emotional Safety NFRs; §6 UX (Pause idle line)
- **SAD Anchors**: AD-5 (client Pause); AD-13 (`SafetyBar` idle copy)
- **Related SFS**: TBD — `project-context/1.define/sfs/emotional-safety.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §4 F5, §5 NFR emotional safety, §6 UX
- `project-context/1.define/sad.md` — AD-13

## Assumptions

- Copy guardrails enforced via prompt templates plus optional lint in CI for static UI strings.
- Paused-state hint (`PAUSE_HINT`) is separate from idle copy and may differ in wording.

## Open Questions

- Formal list of banned shame phrases for QA automation?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T16:10:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-scam-check-copy` |
| PRD version | v2.3 Final |
