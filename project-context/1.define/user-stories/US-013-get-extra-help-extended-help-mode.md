# US-013: Get Extra Help (Coordinator Extended Help Mode)

## 1. Story Identity

- **ID**: US-013
- **Title**: Get Extra Help (Coordinator Extended Help Mode)
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who is stuck or anxious, I want to ask my guide for extra, patient help without being handed off to a stranger, so that I can keep working through my problem with someone who already knows my context.

## 3. Acceptance Criteria

1. **Given** any screen (home, tutoring, Scam Defense), **When** I look for help, **Then** **Get extra help** is visible (same **Your guide** persona as normal routing).
2. **Given** I tap **Get extra help**, **When** Escalation Handler assesses the request, **Then** Coordinator enters **Extended Help Mode** with session context (goal, track, last steps) and **no passwords or credentials** in logs.
3. **Given** Extended Help Mode starts, **When** the first message appears, **Then** UI **discloses AI assistance** honestly (Coordinator does not impersonate a human) and reassures me the same guide is staying with me.
4. **Given** I am in Extended Help Mode, **When** Coordinator responds, **Then** replies use longer, simpler turns (re-explain, slow down) until I exit the mode or choose to resume normal tutoring/Scam Defense flow.
5. **Given** Tutor confidence falls below threshold, Safety Coach flags non-critical risk, distress keywords fire, or three simplifications fail (US-010), **When** auto-escalation runs, **Then** I am offered **Get extra help** with the same Extended Help flow (not a human callback).
6. **Given** Extended Help Mode, **When** session counts toward weekly limits, **Then** it applies to the **5 tutor sessions per calendar week** cap (Scam Defense remains unlimited per PRD §5).

## 4. Scope Notes

- **In Scope for MVP**: Visible **Get extra help** control; Escalation Handler as internal CrewAI task; Coordinator Extended Help Mode; AI disclosure on mode entry; auto-offer on low confidence/distress; session cap alignment.
- **Deferred**: Human escalation webhook and callback queue (**P1**); in-app live human chat; CRM integration.

## 5. Traceability

- **PRD Anchors**: §4 F7; §3 `coordinator` (Extended Help Mode); §3 `escalation_handler` (routing task); §5 session caps
- **Related SFS**: TBD — `project-context/1.define/sfs/extended-help-mode.md`

## Sources

- `project-context/1.define/prd.md` v2.2 — §4 F7, §3 Agent definitions, §8 MVP scope

## Assumptions

- Final **Get extra help** copy subject to gerontology review (PRD Open Question #3).
- Escalation Handler has no chat UI; user always interacts with **Your guide** in Extended Help Mode.

## Open Questions

- Exact mode-entry AI disclosure wording for senior trust testing?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-10T20:30:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.2` |
| PRD version | v2.2 Final |
