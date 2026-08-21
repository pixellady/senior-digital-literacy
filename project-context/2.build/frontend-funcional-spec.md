# Frontend Functional Spec — Critical Research Workflow

**Document type:** Frontend functional specification (operator filename `frontend-funcional-spec.md`)  
**Product:** Senior Digital Literacy Platform  
**Workflow:** Critical Research Workflow  
**Owner:** `@frontend.eng`  
**Status:** Implemented as a single-route UI slice (fixtures only; no live API)

## Context & Instructions

This spec describes the first frontend slice: a **single-route** form + results page for researching a suspicious message or call (the **Critical Research Workflow**). It is derived from PRD F1 / US-002 / US-014 and SAD frontend contracts. Backend wiring is owned by `@integration.eng`; this slice uses **stub services** only.

**PRD Document**: `project-context/1.define/prd.md` (v2.3 Final — MVP)  
**SAD**: `project-context/1.define/sad.md` (v1.0)  
**User stories**: US-001, US-002, US-014, US-009, US-013, US-018  
**Selected Runtime**: `crewai` (UI-visible constraint: non-streaming JSON; client loading state)  
**App path**: `frontend/` (Next.js App Router, TypeScript, Tailwind CSS)

---

### 1. Purpose and Scope

- **Feature ID**: `CRW-001` (Critical Research Workflow) — maps to PRD **F1** Scam Defense Hub + US-002 check flow; critical/active-scam path from US-014
- **Purpose**: Let a senior (Margaret) paste or describe a suspicious message or call, start a check, wait calmly, read a plain-language result, and review earlier checks from this browser session
- **In Scope**: Single route `/`; Inputs form; Run + Reset controls; Results; session History; FSM `idle → running → done`; stub `startRun` / `getRunStatus` with **fixed mock payloads**; Crew status banner (`Crew: idle|running|done`); basic keyboard + headings
- **Out of Scope**: Live `POST /api/v1/chat`; streaming; tool-call details; cost fields; Pause / cancel / retry-diff; Extra Guidance control; Tutor / Learn path; onboarding; auth; caregiver view; OCR; additional SAD routes; advanced accessibility and resilience (observability phase)

---

### 2. Traceability

| Anchor | Reference |
|--------|-----------|
| PRD | §4 F1 Scam Defense; §3 `scam_detector`; §6 UX (no auto-dismiss modals; calm loading) |
| Stories | US-001 entry, US-002 paste/describe + assessment, US-014 active-scam / critical, US-009 non-blaming copy + Pause later, US-013 Extra Guidance offer on high risk, US-018 large type / 44px targets |
| SAD | §3 Frontend (Next.js + Tailwind, single chat bubble later); §4 `ChatRequest`/`ChatResponse` (fixtures only); AD-3, AD-5 non-streaming; AD-11 Extra Guidance label |
| Conflict | SAD §3 lists many PWA routes. Operator requested **one route** for this slice. Other routes remain Future Work placeholders in `frontend.md`, not implemented here. |

---

## Inputs

All inputs are collected on route `/` while the FSM is `idle` (form enabled). The form is read-only while `running` or `done`.

| Input name | Type / format | Required | Source | Validation |
|------------|---------------|----------|--------|------------|
| `messageText` | string, plain text | Yes | User paste or typed description of a text/call | Trimmed; min 1 character after trim; max 4000 characters (SAD length-limit intent for pasted scam text) |
| `activeScamNow` | boolean | No (default `false`) | Checkbox: “I think this is happening right now” | Collected; **stub payload ignores this field** (fixed mock) |

**Not collected in this slice (deferred):** `session_id`, `explicit_path` (always treated as `scam`), screenshot/OCR, account identity.

**UI rules**

- Labels in plain language; no shame language (US-009).
- Prefer in-page form, not a modal (`prefer_modals: false`).
- Form editable in `idle` only; read-only in `running` and `done` until **Reset**.

---

## Run

### Crew status (must be obvious)

A sticky **status banner** at the top of `/` shows:

| Element | Rule |
|---------|------|
| Label | Always `Crew: idle`, `Crew: running`, or `Crew: done` — same words in the banner, Run section, and Results |
| Pill | Colored pill + dot (color is **not** the only cue): **gray** idle, **blue** running, **green** done |
| Last updated | `Last updated: {locale date + time with seconds}` next to the label |

Copy source of truth: `frontend/lib/copy/crewStatus.ts`.

### Finite state machine

Exactly three states. Errors are **not** a fourth state.

```
idle --START--> running --COMPLETE--> done
running --RESET--> idle   (stub failure recovery; inputs kept)
done --RESET--> idle      (Reset control; inputs cleared)
```

| Phase | UI | Allowed actions |
|-------|-----|-----------------|
| `idle` | Banner **Crew: idle** (gray); Inputs enabled | **Run** → `START`; **Reset** clears form |
| `running` | Banner **Crew: running** (blue); Inputs locked | None (no pause / cancel / retry-diff) |
| `done` | Banner **Crew: done** (green); Results visible; Inputs locked | **Reset** → `idle` |

**Controls (this slice):** **Run** and **Reset** only. On stub/runtime failure: return to `idle`, keep the same inputs, show an inline alert and a **Retry** button (Retry calls Run with those inputs). Validation errors show the alert **without** Retry.

Illegal transitions are no-ops (`frontend/lib/fsm/runFsm.ts`).

### Stub services (no network)

Fixed mock payloads in `frontend/lib/fixtures/runFixtures.ts`. No streaming, tool-call details, or cost fields.

| Function | Signature | Behavior |
|----------|-----------|----------|
| `startRun` | `(input: RunInput) => Promise<StartRunResponse>` | Validates input; after a short delay returns `{ runId: "stub-run-001" }` |
| `getRunStatus` | `(runId: string) => Promise<RunStatusResponse>` | After a short delay returns `{ runId, status: "done", result }` where `result` is `STUB_RESULT_PAYLOAD` with that `runId` |

Client sequence:

1. **Run** → `START` → phase `running`
2. `await startRun(input)`
3. `await getRunStatus(runId)` (stub completes on first call; no stream)
4. `COMPLETE` → phase `done`; append History row

On stub throw: `RESET` → `idle`, inline error, **Retry**.

**Runtime note (SAD AD-5):** Non-streaming JSON. Pause / cancel / Extra Guidance are Future Work.

### Accessibility (this slice)

- One `h1` (page title); section `h2`s: Inputs, Run, Results, History
- Native form controls; Tab order follows the page; visible focus rings
- Skip link to `#workflow-main`
- `lang="en"` on the document
- Advanced accessibility, live-region strategy, and resilience deferred to the observability phase

---

## Results

Shown only when phase is `done`. Fixture shape is a **subset** of SAD §4 `ChatResponse` so Integration can swap stubs later.

| Field | Type | UI |
|-------|------|-----|
| `runId` | string (`stub-run-001` in this slice, not a UUID) | Not shown on Results; used as a History key prefix |
| `riskLevel` | `likely_scam` \| `suspicious` \| `likely_safe` \| `critical` | Plain-language heading (never alarmist; never “you fell for it”) |
| `summary` | string | Body copy |
| `recommendedActions` | string[] | Bulleted next steps |
| `extraGuidanceOffered` | boolean | Present on mock; **not** shown as a control (Run/Reset only) |
| `resourceLinks` | `{ label, url }[]` | Optional links in the fixed mock |

**Fixture rules (stub only)**

- Every successful `getRunStatus` returns `STUB_RESULT_PAYLOAD` (`riskLevel: suspicious`). Input values are not used to vary the mock.
- No streaming chunks, tool-call traces, or cost fields.

Errors from stubs: return to **Crew: idle**, keep inputs, inline message + **Retry**.

---

## History

Session-scoped list of completed runs (React state only). **Not** written to `localStorage` (SAD shared-device: no durable sensitive content on the client).

| Field | Type | Display |
|-------|------|---------|
| `runId` | string | Internal key |
| `completedAt` | ISO-8601 string | Locale-friendly time |
| `inputPreview` | string | First ~80 characters of `messageText` (no full body required on the list) |
| `riskLevel` | same as Results | Same `riskHeading` copy as Results (not a separate badge) |
| `activeScamNow` | boolean | **Happening now** when true |

**Rules**

- Newest first.
- Empty state: “No checks yet in this visit.”
- List key: `` `${runId}-${completedAt}-${index}` `` (stub `runId` is fixed, so it is not unique alone).
- Caregiver-visible Progress Service fields are **out of scope**; this list is senior-session only and must not be treated as the caregiver API.

---

## Contracts

Canonical names and shapes. Source of truth for payloads: `frontend/lib/types/run.ts`. Stub constants: `frontend/lib/fixtures/runFixtures.ts`. If a prop or payload changes, update this section in the same change.

### Payload types

**`RunPhase` / `CrewStatus`:** `"idle" | "running" | "done"`  
(`CrewStatus` is an alias of `RunPhase` in `frontend/lib/copy/crewStatus.ts`.)

**`RunFsmEvent`:** `"START" | "COMPLETE" | "RESET"`

**`RunInput`**

| Field | Type |
|-------|------|
| `messageText` | `string` |
| `activeScamNow` | `boolean` |

**`StartRunResponse`**

| Field | Type |
|-------|------|
| `runId` | `string` |

**`RunStatusResponse`**

| Field | Type |
|-------|------|
| `runId` | `string` |
| `status` | `"running" \| "done"` |
| `result` | `RunResult` (optional) |

**`RunResult`**

| Field | Type |
|-------|------|
| `runId` | `string` |
| `riskLevel` | `"likely_scam" \| "suspicious" \| "likely_safe" \| "critical"` |
| `summary` | `string` |
| `recommendedActions` | `string[]` |
| `extraGuidanceOffered` | `boolean` |
| `resourceLinks` | `ResourceLink[]` |

**`ResourceLink`:** `{ label: string; url: string }`

**`HistoryEntry`**

| Field | Type |
|-------|------|
| `runId` | `string` |
| `completedAt` | `string` (ISO-8601) |
| `inputPreview` | `string` |
| `riskLevel` | same as `RunResult.riskLevel` |
| `activeScamNow` | `boolean` |

### Stub constants

| Name | Value |
|------|--------|
| `STUB_RUN_ID` | `"stub-run-001"` |
| `STUB_START_PAYLOAD` | `{ runId: STUB_RUN_ID }` |
| `STUB_RESULT_PAYLOAD` | `RunResult` with `riskLevel: "suspicious"`, `extraGuidanceOffered: false`, one `resourceLinks` row |

`startRun` → `StartRunResponse`. `getRunStatus` → `RunStatusResponse` with `status: "done"` and `result: { ...STUB_RESULT_PAYLOAD, runId }`. No `fetch`, streaming, tool-call, or cost fields.

### Component props

| Component | Props |
|-----------|--------|
| `CrewStatusBanner` | `phase: RunPhase`; `lastUpdated: Date` |
| `InputsSection` | `phase`; `input: RunInput`; `onMessageTextChange`; `onActiveScamNowChange` |
| `RunSection` | `phase`; `input`; `errorMessage: string \| null`; `retryable: boolean`; `onReset`; `onRetry` |
| `ResultsSection` | `phase`; `result: RunResult \| null` |
| `HistorySection` | `entries: HistoryEntry[]` |

Hook `useCriticalResearchRun` exposes: `phase`, `lastUpdated`, `input`, `result`, `history`, `errorMessage`, `retryable`, `updateMessageText`, `updateActiveScamNow`, `run`, `reset`, `retry`.

---

## Spec Sync checklist

Update this checklist **in the same change as each commit** that touches Critical Research Workflow code or this spec. If code and spec disagree, fix the spec or the code before considering the commit complete.

**How to use:** After the commit, set **Last synced commit** to `git rev-parse --short HEAD`. Keep **Item**, **Status**, and a one-line **Note** on what changed (or `unchanged` if the item still matches).

| # | Item | Status | Note |
|---|------|--------|------|
| S1 | Single App Router route `/` (`frontend/app/page.tsx`) | synced | Unchanged — still one workflow page, no SAD extra routes. |
| S2 | Inputs `messageText`, `activeScamNow`; max 4000; form locked when `running`/`done` | synced | Unchanged — names match `RunInput` and `InputsSection` props. |
| S3 | FSM `idle` → `running` → `done`; events START / COMPLETE / RESET | synced | Unchanged — `error`/`FAIL` remain removed from `RunPhase`. |
| S4 | `startRun` / `getRunStatus` fixed mocks; no `fetch`, streaming, tools, or costs | synced | Unchanged — `STUB_START_PAYLOAD` / `STUB_RESULT_PAYLOAD`; `getRunStatus` still copies `runId` onto `result`. |
| S5 | Results render `RunResult`; `extraGuidanceOffered` is not a control | synced | Unchanged — Extra Guidance button stays omitted. |
| S6 | History is session memory; newest first; `inputPreview` + `riskLevel` | synced | Copy aligned: marker is **Happening now**; list key uses `runId-completedAt-index` because stub `runId` is fixed. |
| S7 | Controls Run and Reset only; Retry only when `retryable`; no pause/cancel/retry-diff | synced | Unchanged — `RunSection` props `onReset` / `onRetry`. |
| S8 | `frontend.md` Audit records this FE change | pending | FE tree is still uncommitted (`?? frontend/`); fill SHA on first workflow commit. |
| S9 | SAD extra routes remain Future Work, not implemented | synced | Unchanged — footer still names deferred Pause/cancel/Extra Guidance. |
| S10 | Banner `Crew: idle\|running\|done`; gray/blue/green; Last updated | synced | Banner prop renamed `status` → `phase` so it matches FSM/`RunPhase`. |
| S11 | Basic a11y: skip link `#workflow-main`, h1/h2, native keyboard/focus | synced | Unchanged — advanced a11y still deferred. |
| S12 | Contracts match `lib/types/run.ts`, stub fixtures, and component props | synced | Added Contracts; `runId` documented as stub string not UUID; `CrewStatusBanner.phase` documented. |

**Last synced commit:** _(none — workflow files are untracked; set SHA after first FE commit)_  
**Last synced at:** 2026-08-21T12:19:00Z (spec-to-impl pass: Contracts + Spec Sync notes)

---

## Sources

- `project-context/1.define/prd.md` v2.3 — F1, scam_detector, UX, Extra Guidance
- `project-context/1.define/sad.md` — §3 frontend, §4 schemas, AD-3, AD-5, AD-11
- `project-context/1.define/user-stories/US-001-scam-defense-hub-entry.md`
- `project-context/1.define/user-stories/US-002-check-suspicious-message.md`
- `project-context/1.define/user-stories/US-014-active-scam-priority-escalation.md`
- `project-context/1.define/user-stories/US-009-pause-emotional-safety.md`
- `project-context/1.define/user-stories/US-013-get-extra-help-extended-help-mode.md`
- `project-context/1.define/user-stories/US-018-accessible-pwa-speech-input.md`
- `.cursor/templates/sfs-template.md` (section taxonomy adapted; operator required Inputs / Run / Results / History)
- `.cursor/agents/frontend-eng.md` — UI only; no backend connection
- Operator request: Critical Research Workflow; filename `frontend-funcional-spec.md`; FSM; stubs; Spec Sync
- Operator request (follow-up): obvious Crew status banner, colored pills, last updated, consistent `Crew:` phrasing
- Operator request (follow-up): stubbed backend, Run/Reset only, three-state FSM, Retry on error, basic a11y
- Operator request (follow-up): Spec Sync item/status/note; keep Contracts in sync; spec-to-impl name pass

## Assumptions

- Operator name **Critical Research Workflow** is the FE slice name for US-002/US-014 scam-check research; it is not a new PRD feature ID.
- Filename uses operator spelling `funcional` (not “functional”).
- `project-context/2.build/setup.md` was **missing** at start; FE scaffolded `frontend/` directly. `@project.mgr` should still produce setup.md.
- No `aamad.config.yml`; example config used for `prefer_modals: false`, type checking, `max_file_lines: 400`.
- `AAMAD_TARGET_RUNTIME` unset → **`crewai`** (PRD + adapter registry).
- History persistence via Progress Service is Integration/Backend work; this slice is in-memory only.
- Stub verdicts are a **fixed mock** (`STUB_RESULT_PAYLOAD`); they ignore `activeScamNow` in this slice.
- Single-route scope is an operator override of SAD’s multi-route PWA map for this epic increment only.

## Open Questions

1. Should later FE epics add SAD routes (`/`, `/scam`, `/learn`, …) in this app, or keep `/` as a hub that expands in place?
2. When Integration wires `POST /api/v1/chat`, should `startRun`/`getRunStatus` remain as an anti-corruption layer or be replaced by a single chat client?
3. Is 4000-character paste limit acceptable vs a SAD/security numeric cap still TBD?

*Resolved:* Pause / cancel / retry-diff stay out of this slice (operator). Banner prop is `phase` (not `status`) to match the FSM. `runId` is the stub string `stub-run-001`, not a UUID.

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T01:18:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — Critical Research Workflow spec |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | `project-context/2.build/frontend-funcional-spec.md` |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — document generation |
| Prompt Trace | Omitted — spec is deterministic synthesis from PRD/SAD/stories + operator slice request; no runtime agent kickoff |
| Tools used | Read/Glob/Grep for inputs; Write for this artifact |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T01:38:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — Crew status banner, pills, last updated, consistent phrasing |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | `frontend-funcional-spec.md` Run/Crew status + S10 |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T01:43:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — stubbed backend, Run/Reset, three-state FSM, Retry, basic a11y |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | spec Inputs/Run/Results + S7/S11 |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T12:19:00Z |
| Persona id | `frontend-eng` |
| Action | `document-frontend` — spec-to-impl pass; Contracts; Spec Sync item/status/note |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | Contracts section; S1–S12 notes; `CrewStatusBanner.phase`; History “Happening now” |
