# US-013: Get Extra Help (Patient / Priority Mode)

## 1. Story Identity

- **ID**: US-013
- **Title**: Get Extra Help (Patient / Priority Mode)
- **Priority**: Must
- **Persona**: Independent Senior (Margaret, 72)

## 2. Narrative

As a senior user who is stuck or anxious, I want to ask for extra, patient help from the same coach I'm already talking to, so that I can keep working through my problem without being handed off to a stranger.

## 3. Acceptance Criteria

1. **Given** I am on the **TUTOR** path (tutoring), **When** I look for help, **Then** **Get extra help** is visible and enters **Tutor Patient Mode** (same **Your tutor** persona).
2. **Given** I am on the **SCAM** path (Scam Defense), **When** I need deeper guidance, **Then** **Get extra help** enters **Scam Detector Priority Mode** (same **Scam checker** persona) for active-scam or high-urgency situations.
3. **Given** I tap **Get extra help** on the TUTOR path, **When** Patient Mode starts, **Then** Tutor retains session context (goal, track, last steps), uses longer simpler turns, and **discloses AI assistance** on mode entry — no impersonation of a human.
4. **Given** Tutor confidence falls below threshold, distress keywords fire, or three simplifications fail (US-010), **When** auto-escalation runs, **Then** I am offered **Get extra help** → Tutor Patient Mode (not a human callback).
5. **Given** Scam Detector assesses critical risk or I declare active scam (US-014), **When** Priority Mode activates, **Then** immediate safety steps and IC3/AARP resources appear with AI disclosure.
6. **Given** Tutor Patient Mode, **When** session counts toward weekly limits, **Then** it applies to the **5 tutor sessions per calendar week** cap (Scam Detector paths remain unlimited per PRD §5).

## 4. Scope Notes

- **In Scope for MVP**: Visible **Get extra help** control; Tutor Patient Mode; Scam Detector Priority Mode; AI disclosure on mode entry; auto-offer on low confidence/distress; session cap alignment.
- **Deferred**: Human escalation webhook and callback queue (**P1**); in-app live human chat; CRM integration.

## 5. Traceability

- **PRD Anchors**: §4 F7; §3 `step_by_step_tutor` (Patient Mode); §3 `scam_detector` (Priority Mode); §5 session caps
- **Related SFS**: TBD — `project-context/1.define/sfs/patient-priority-mode.md`

## Sources

- `project-context/1.define/prd.md` v2.3 — §4 F7, §3 Agent definitions, §8 MVP scope

## Assumptions

- Final **Get extra help** copy subject to gerontology review (PRD Open Question #3).
- Intent Router has no chat UI; user always interacts with Tutor or Scam Detector in the active path.

## Open Questions

- Exact mode-entry AI disclosure wording for senior trust testing?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-14T14:00:00Z |
| Persona id | `product-mgr` |
| Action | `sync-stories-prd-v2.3` |
| PRD version | v2.3 Final |
