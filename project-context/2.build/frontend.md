# Frontend Build Log — Senior Digital Literacy

**Persona:** `@frontend.eng`  
**Action:** `*develop-fe`  
**Slice:** Critical Research Workflow (single route; on-page title **Learn the Signs, Protect Yourself**)

## Status

Implemented a Next.js App Router app at `frontend/` with **one route** (`/`). Proof path: paste → `explicit_path: "scam"` → `POST /api/v1/chat` → large-type verdict. Client **Pause** is always visible. After **Crew: done**, **Save or print** opens `window.print()` for a curated `#print-summary` sheet (Checked date/time + Website URL; no `session_id` or paste). Weekly cap numbers stay on the SAD envelope but are **hidden** (`WEEKLY_CAPS_ARE_REAL = false`). No `/onboarding`, `/learn`, or `/caregiver`. Tutor step is still not on this page.

`sendChat` is **not stub-only**. Integration (`7c42dc1`) wired live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set. When it is unset, `sendChat` still returns named Path A/B fixtures. Live Flow owns Priority Mode from the message; `activeScamNow` only selects a fixture.

## Steps taken

1. Loaded PRD, SAD, user stories US-001, US-002, US-014, US-009, US-013, US-018. `setup.md` was not present.
2. Wrote `project-context/2.build/frontend-funcional-spec.md` (operator filename spelling `funcional`) with Inputs, Run, Results, History, and a Spec Sync checklist.
3. Scaffolded `frontend/` with `create-next-app` (App Router, TS, Tailwind) per SAD AD-3.
4. Replaced the default page with `CriticalResearchWorkflow` and section components.
5. Added `lib/fsm/runFsm.ts`, `lib/services/runService.ts` (stubs), fixtures, and session History (React state only).
6. Marked remaining SAD routes and SafetyBar as Future Work (footer copy only).
7. Added sticky Crew status banner (pills + last updated) and canonical `Crew:` phrasing.
8. Stubbed backend with fixed mocks; Run/Reset only; three-state FSM; Retry on stub error; skip link + semantic headings.
9. Spec-to-impl pass: Contracts section; Spec Sync item/status/note; `CrewStatusBanner.phase`; History **Happening now**.
10. Aligned stub envelope to SAD §4: `toChatRequest` / `sendChat`; Results read `content.risk_level`, `content.text`, `content.resource_links`, `mode`, `ai_disclosure`.
11. Pasted SAD §4 JSON + TypeScript into spec Contracts; `ChatRequest` is the full envelope; poller allowed later only if mapped 1:1.
12. Path-honest fixtures: Path A gift-card `likely_scam`; Path B `activeScamNow` → `critical` + Priority disclosure. No client keyword rules.
13. Softened ICP copy then restored original `Crew:` labels and title per operator.
14. Held route map: proved scam path on `/` (large-type verdict, Verified guide, Scam checker). Client Pause. Tutor step deferred until Flow.
15. Hid weekly-limit / cap numbers until they are real. Did **not** ask `@backend.eng` to count sessions.
16. Operator copy: h1 **Learn the Signs, Protect Yourself**; subtitle “You're safe here, and you're never wrong to ask.”; Pause idle “Pause is always here, waiting for you.”
17. Documented live `sendChat` (`NEXT_PUBLIC_API_BASE_URL` → `fetch`) plus fixture fallback. Did not change application code. US-001 / US-002 owned by `@product-mgr`.
18. Print sheet (`#print-summary`) adds **Checked:** locale date/time (`lastUpdated` when the check finished) and **Website:** origin + pathname after mount. Still no `session_id` or pasted text (US-016 AC5, US-017 AC2).

## Application map

| Path | Role |
|------|------|
| `frontend/app/page.tsx` | Single route `/` |
| `frontend/components/CriticalResearchWorkflow.tsx` | Compose banner + Inputs / Run / Results / History |
| `frontend/components/CrewStatusBanner.tsx` | Sticky `Crew:` banner, pill, last updated |
| `frontend/components/SafetyBar.tsx` | Always-visible Pause / Resume (client, US-009) |
| `frontend/components/VerifiedGuideBadge.tsx` | RAG trust indicator when `verified_guide` |
| `frontend/components/SavePrintControl.tsx` | **Save or print** after `done`; `window.print()` |
| `frontend/components/PrintSummary.tsx` | Curated print sheet; Checked + Website after mount |
| `frontend/lib/copy/printSummary.ts` | Save/print and sheet labels |
| `frontend/lib/copy/crewStatus.ts` | Canonical status labels and inline copy |
| `frontend/lib/copy/caps.ts` | `WEEKLY_CAPS_ARE_REAL` gate; hide stub 0/5 until backend counts |
| `frontend/lib/fsm/runFsm.ts` | `idle` \| `running` \| `done` |
| `frontend/lib/types/chat.ts` | SAD `ChatRequest` / `ChatResponse` / error envelope |
| `frontend/lib/fixtures/chatFixtures.ts` | Path A `likely_scam` / Path B `critical`+Priority named fixtures |
| `frontend/lib/services/chatService.ts` | `sendChat`: live `POST /api/v1/chat` when `NEXT_PUBLIC_API_BASE_URL` is set; Path A/B fixtures otherwise |
| `frontend/lib/hooks/useCriticalResearchRun.ts` | Client orchestration |

## UI notes (SAD / PRD)

- Calm “Crew: running. Working on this…” loading copy; non-streaming wait (AD-5).
- Sticky Crew status banner: `Crew: idle|running|done`, gray/blue/green pills, Last updated (seconds). Locale time is formatted **after mount** so SSR HTML matches the client (no hydration mismatch from `toLocaleString` / `new Date()`).
- Same `Crew: …` phrase in banner, Run, and Results.
- On-page `h1` and document title: **Learn the Signs, Protect Yourself**. Subtitle: “Check a suspicious message or call. You're safe here, and you're never wrong to ask.”
- Pause idle copy: “Pause is always here, waiting for you.” Paused hint is unchanged (`PAUSE_HINT`).
- Controls: **Run**, **Reset**, **Pause**. Pause is client-side and does not cancel an in-flight request.
- Results proof: **Scam checker** + **Verified guide** + `text-4xl` verdict (live envelope or fixture).
- Send errors (live or fixture): inline message + **Retry** (same inputs); FSM stays three states.
- Basic a11y: skip link, h1/h2, native keyboard/focus. Advanced a11y deferred.
- No modals (`prefer_modals: false`).
- Body ≥16px (18px root); primary controls `min-h-11` (44px).
- Light high-contrast palette (no dark-mode inversion in this slice).
- Shame-free copy; no blame on send failure.
- Wire is SAD §4: one `sendChat` with full `ChatRequest`. Live path uses `fetch`. When the API base is unset, `stubPath` selects Path A (`likely_scam`, gift-card) or Path B (`critical`, `mode: priority`, `ai_disclosure: true`) from `activeScamNow`. The client never scores `message` keywords.
- `ChatResponse.caps` stays on the wire. Results do not show used/limit. Flip `WEEKLY_CAPS_ARE_REAL` only after `@backend.eng` counts real weekly sessions. No CapMessage.
- **Save or print** (Crew: done only): `window.print()` + print CSS; no PDF library. Sheet includes title, Checked date/time, Website URL, Verified guide if on, risk heading, `content.text`, official links. Chrome, `session_id`, paste, and caps stay off the paper. Session ID and paste wait for `@security.eng`.

## Future Work placeholders (visible, non-functional)

- Extra Guidance, Learn a skill, signup, caregiver progress (footer only).
- SAD routes `/onboarding`, `/learn`, `/scam`, `/progress`, `/caregiver`, `/settings` — **not created**.
- One Tutor step — still deferred; the scam check on `/` already posts to Flow when `NEXT_PUBLIC_API_BASE_URL` is set (`7c42dc1`).

## How to run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

For a live check, set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` and run the API as in `setup.md` § “Run both sides together”. Omit that variable to use Path A/B fixtures.

## Spec Sync

After **every commit** that changes this UI or the spec, update the checklist in `frontend-funcional-spec.md` (S1–S12: Item, Status, Note, and Last synced commit).

## Sources

- `project-context/1.define/prd.md` v2.3
- `project-context/1.define/sad.md` v1.0 §3, §4, AD-3, AD-5, AD-11
- User stories US-001, US-002, US-014, US-009, US-013, US-016, US-017, US-018
- `.cursor/agents/frontend-eng.md`
- `project-context/2.build/frontend-funcional-spec.md`
- `project-context/2.build/backend.md` — hide weekly limits until they are real
- Operator request: hide weekly-limit / cap numbers until they are real; talk to `@backend.eng` only if counting sessions for real
- Operator request: replace on-page title and Pause/subtitle copy (Learn the Signs, Protect Yourself)
- Operator request: stop describing frontend.md / spec / README as stub-only (`sendChat` live when API base is set)
- `project-context/2.build/integration.md` — live `fetch` in `7c42dc1`
- Operator request: print sheet may show check date/time and website URL; session ID and pasted text stay off paper until `@security.eng`

## Assumptions

- `setup.md` was missing at first FE scaffold; `@project.mgr` later produced `project-context/2.build/setup.md`.
- Operator “Critical Research Workflow” = US-002/US-014 check slice, not a new PRD feature. Visible `h1` / tab title is **Learn the Signs, Protect Yourself**.
- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- No `aamad.config.yml`; example config for type checking, no modals, 400-line file cap.
- Next.js 15.4.x patched to **15.4.10** and React to **19.1.2** for CVE-2025-66478 / CVE-2025-55182 and the 2025-12-11 RSC follow-ups (create-next-app 15.4.6 was vulnerable).
- Single-route override of SAD multi-route map is this increment only.
- Save or print is a curated `#print-summary` sheet, not a dump of the whole page. Date, time, and site URL are allowed without changing US-016 / US-017.

## Open Questions

1. Is 4000-character paste limit acceptable vs a SAD/security numeric cap still TBD?
2. Should committed `.env.example` files (names only) land under `frontend/` and `senior_digital_literacy/`?

*Resolved:* Do not grow the SAD route map. Client Pause is on `/`. Tutor step is still not on this page. Live Flow on the scam check is already wired when `NEXT_PUBLIC_API_BASE_URL` is set.

*Resolved:* Hide weekly cap numbers rather than asking `@backend.eng` to count sessions. Envelope `caps` may still be stub zeros on fixtures and unused on Results; UI gate is `WEEKLY_CAPS_ARE_REAL`.

*Deferred:* Session ID and pasted message on the print sheet wait for `@security.eng`. US-016 AC5 and US-017 AC2 still apply.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T01:18:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `frontend/` app; `frontend.md`; `frontend-funcional-spec.md` |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — UI/docs, not CrewAI kickoff |
| Prompt Trace | Omitted — no runtime agent execution; FE slice from PRD/SAD + operator request |
| Tools used | Read/Glob/Grep; create-next-app; Write/StrReplace; npm lint/build |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T01:38:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — Crew status banner, pills, last updated, consistent `Crew:` phrasing |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `CrewStatusBanner`; `crewStatus.ts`; FSM `error`/`FAIL`; spec S10 |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — UI copy/state visibility, not runtime kickoff |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T01:43:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — stubbed backend, Run/Reset, three-state FSM, Retry, basic a11y |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `runService` fixed mocks; Run/Reset; FSM idle/running/done; spec S7/S11 |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T12:19:00Z |
| Persona id | `frontend-eng` |
| Action | `document-frontend` — spec-to-impl pass; Contracts; Spec Sync notes |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | spec Contracts + S1–S12; banner `phase`; History “Happening now” |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T12:22:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `bd799b4` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | frontend-funcional-spec.md S8 + Last synced commit |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T20:33:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — SAD §4 ChatRequest/ChatResponse stub envelope |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `chat.ts`; `chatService.postChat`; Results nested content; spec Contracts |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T20:49:00Z |
| Persona id | `frontend-eng` |
| Action | `document-frontend` — SAD §4 JSON/TS in Contracts; `sendChat` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | spec Contracts verbatim SAD; `sendChat`; full `ChatRequest` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T20:53:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — path-honest Path A/B fixtures |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `STUB_PATH_A_GIFT_CARD_BAIL`; `STUB_PATH_B_ACTIVE_SCAM`; `selectStubFixturePath` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T21:05:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — ICP status copy; on-page title Check a message or call |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | Ready / Checking this… / Check finished; h1; `data-phase` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T21:14:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — prove scam path on `/`; no extra routes |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | VerifiedGuideBadge; SafetyBar; large-type verdict; Pause |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T21:18:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `c9686f6` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | frontend-funcional-spec.md S8 + Last synced commit |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T00:01:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — hide weekly-limit / cap numbers until they are real |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `caps.ts` (`WEEKLY_CAPS_ARE_REAL=false`); Results gated CapMessage; spec S5/S12 |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — UI hide of stub caps; did not invoke `@backend.eng` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T00:10:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `d9e7d76` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | frontend-funcional-spec.md S8 + Last synced commit |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T15:30:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — on-page title and Pause/subtitle copy |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | h1 Learn the Signs, Protect Yourself; SafetyBar idle copy; subtitle |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T15:31:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `3541b06` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | frontend-funcional-spec.md S8 + Last synced commit |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T16:25:00Z |
| Persona id | `frontend-eng` |
| Action | `document-frontend` — live `sendChat` + fixture fallback (not stub-only) |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | frontend.md; frontend-funcional-spec.md; frontend/README.md |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T16:30:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `7c8b535` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | frontend-funcional-spec.md S8 + Last synced commit |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-27T23:30:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — format Last updated after mount (hydration) |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `CrewStatusBanner` client-only locale time; spec Last updated note |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-30T08:45:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — print sheet Checked date/time + Website URL |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `PrintSummary` after-mount meta; spec Save or print subsection |
