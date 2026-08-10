# US-013: Talk to a Person Escalation

## 1. Story Identity

- **ID**: US-013
- **Title**: Talk to a Person Escalation
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who is stuck or anxious, I want to request a real person to help me, so that I am not left alone with a problem I cannot solve.

## 3. Acceptance Criteria

1. **Given** any screen (home, tutoring, Scam Defense), **When** I look for help, **Then** **Talk to a person** is visible.
2. **Given** I request human help, **When** Escalation Handler runs, **Then** a ticket is created with session context (goal, track, last steps) and **no passwords or credentials**.
3. **Given** ticket is created, **When** confirmation is shown, **Then** I see expected callback window (≤24 hours MVP) and reassurance copy validating my feelings.
4. **Given** Tutor confidence falls below threshold or Safety Coach flags non-critical risk, **When** auto-escalation triggers, **Then** user is offered human help with same confirmation flow.
5. **Given** escalation webhook fires, **When** human queue receives ticket, **Then** notification includes urgency level and scam-in-progress flag if set (see US-014).

## 4. Scope Notes

- **In Scope for MVP**: Visible button, ticket creation, user confirmation, webhook to contracted guide, auto-offer on low confidence.
- **Deferred**: In-app live chat; 24/7 call center; CRM integration (Phase 2).

## 5. Traceability

- **PRD Anchors**: §4 F7; §3 escalation_handler agent
- **Related SFS**: TBD — `project-context/1.define/sfs/human-escalation.md`

## Sources

- `project-context/1.define/prd.md` — §4 F7

## Assumptions

- Human guide partner identified before beta (PRD Open Question #4).

## Open Questions

- Named escalation vendor and exact SLA for non-urgent vs. urgent tickets?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
