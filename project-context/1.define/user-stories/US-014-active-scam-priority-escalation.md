# US-014: Active Scam Priority Escalation

## 1. Story Identity

- **ID**: US-014
- **Title**: Active Scam Priority Escalation
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72); Underserved Public Housing User (Carmen, 68)

## 2. Narrative

As a senior who thinks a scam is happening right now, I want urgent help faster than a normal callback, so that I can protect my money and peace of mind immediately.

## 3. Acceptance Criteria

1. **Given** I am in Scam Defense or tutoring, **When** I indicate **"I think I'm being scammed right now"** or equivalent, **Then** priority escalation path is triggered.
2. **Given** Safety Coach assesses **critical** risk, **When** auto-escalation runs, **Then** ticket is flagged urgent in human queue.
3. **Given** priority escalation, **When** confirmation displays, **Then** copy includes immediate safety steps (hang up, do not pay, do not share codes) and urgent queue expectation (faster than standard 24h SLA — target TBD with partner).
4. **Given** urgent ticket, **When** webhook payload is sent, **Then** it includes `active_scam_in_progress=true` and scam type if detected.
5. **Given** priority flow, **When** user is waiting, **Then** Safety Coach remains available with calm grounding messages until human contact or user ends session.

## 4. Scope Notes

- **In Scope for MVP**: User-declared active scam, critical auto-escalation, priority flag, immediate safety guidance.
- **Deferred**: Real-time hotline integration; law enforcement direct dial.

## 5. Traceability

- **PRD Anchors**: §4 F7 (active scam priority); §3 safety_scam_coach; §4 F1
- **Related SFS**: TBD — `project-context/1.define/sfs/human-escalation.md`

## Sources

- `project-context/1.define/prd.md` — §4 F7, PRD Open Question #5 (active scam SLA)

## Assumptions

- MVP urgent SLA remains partner-dependent; product flags urgency even if callback is still hours not minutes.

## Open Questions

- Sub-24-hour callback sufficient or hotline partnership required for launch?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T16:00:00Z |
| Persona id | `product-mgr` |
| Action | `create-stories` |
