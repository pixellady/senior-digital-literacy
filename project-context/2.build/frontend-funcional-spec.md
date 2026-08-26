# Frontend Functional Spec — Critical Research Workflow

**Document type:** Frontend functional specification (operator filename `frontend-funcional-spec.md`)  
**Product:** Senior Digital Literacy Platform  
**Workflow:** Critical Research Workflow  
**Owner:** `@frontend.eng`  
**Status:** Implemented as a single-route UI slice. `sendChat` uses live `POST /api/v1/chat` when `NEXT_PUBLIC_API_BASE_URL` is set; named fixtures when unset.

## Context & Instructions

This spec describes the first frontend slice: a **single-route** form + results page for checking a message or call (internal epic name **Critical Research Workflow**). Visible `h1` / document title: **Learn the Signs, Protect Yourself**. It is derived from PRD F1 / US-002 / US-014 and SAD frontend contracts. `@integration.eng` wired live `fetch` in `7c42dc1`. This spec records that wire and the fixture fallback; it does **not** claim stub-only.

**PRD Document**: `project-context/1.define/prd.md` (v2.3 Final — MVP)  
**SAD**: `project-context/1.define/sad.md` (v1.0)  
**User stories**: US-001, US-002, US-014, US-009, US-013, US-018  
**Selected Runtime**: `crewai` (UI-visible constraint: non-streaming JSON; client loading state)  
**App path**: `frontend/` (Next.js App Router, TypeScript, Tailwind CSS)

---

### 1. Purpose and Scope

- **Feature ID**: `CRW-001` (Critical Research Workflow) — maps to PRD **F1** Scam Defense Hub + US-002 check flow; critical/active-scam path from US-014
- **Purpose**: Let a senior (Margaret) paste or describe a suspicious message or call, start a check, wait calmly, read a plain-language result, and review earlier checks from this browser session
- **In Scope**: Single route `/` only. Proof path: paste → `explicit_path: "scam"` → `sendChat` (`POST /api/v1/chat`) → large-type verdict. Live Flow when `NEXT_PUBLIC_API_BASE_URL` is set; Path A/B fixtures when unset. FSM `idle → running → done`; Crew banner; client **Pause** (US-009, no in-flight cancel); History; basic keyboard + headings
- **Out of Scope**: Extra SAD routes (`/onboarding`, `/learn`, `/scam`, `/caregiver`, …); streaming; Tutor step on this page; Extra Guidance; auth; OCR; retry-diff

---

### 2. Traceability

| Anchor | Reference |
|--------|-----------|
| PRD | §4 F1 Scam Defense; §3 `scam_detector`; §6 UX (no auto-dismiss modals; calm loading) |
| Stories | US-001 entry, US-002 paste/describe + assessment, US-014 active-scam / critical, US-009 Pause, US-013 Extra Guidance later, US-018 large type / 44px targets, US-021 verified guide |
| SAD | §3 Frontend (Next.js + Tailwind, single chat bubble later); §4 `ChatRequest`/`ChatResponse` (live JSON or fixture fallback); AD-3, AD-5 non-streaming; AD-11 Extra Guidance label |
| Conflict | SAD §3 lists many PWA routes. Operator: **do not grow the route map** until paste → `explicit_path=scam` → Scam Detector + RAG → large-type verdict is proven. Tutor step after that if time. |

---

## Inputs

All inputs are collected on route `/` while the FSM is `idle` (form enabled). The form is read-only while `running` or `done`.

| Input name | Type / format | Required | Source | Validation |
|------------|---------------|----------|--------|------------|
| `messageText` | string, plain text | Yes | User paste or typed description of a text/call | Trimmed; min 1 character after trim; max 4000 characters (SAD length-limit intent for pasted scam text) |
| `activeScamNow` | boolean | No (default `false`) | Checkbox: “I think this is happening right now” | Collected; **fixture-only** selector for Path B (not a `ChatRequest` field; **never** inferred from message keywords). Live Priority Mode comes from Flow, not this checkbox. |

**Envelope mapping (SAD §4):** `toChatRequest` builds the **full** `ChatRequest`: `message` from the form; `explicit_path: "scam"`; `session_id` is `null` on the first Run, then echoed from `ChatResponse.session_id` until Reset; `client_action: "none"`; `track_override: null`. `activeScamNow` is **not** on `ChatRequest`. On the fixture path it only picks which named response `sendChat` returns (`selectStubFixturePath`). On the live path Flow scores the message. The client never scans `request.message` for keywords.

**Not collected in this slice (deferred):** screenshot/OCR, account identity, Tutor `explicit_path`.

**UI rules**

- Labels in plain language; no shame language (US-009).
- Prefer in-page form, not a modal (`prefer_modals: false`).
- Form editable in `idle` only; read-only in `running` and `done` until **Reset**.
- Page `h1` / document title: **Learn the Signs, Protect Yourself**.
- Subtitle: “Check a suspicious message or call. You're safe here, and you're never wrong to ask.”

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

**Controls (this slice):** **Run**, **Reset**, and always-visible client **Pause** / **Resume** (US-009; does not cancel an in-flight request). Idle Pause copy: “Pause is always here, waiting for you.” Paused hint: `PAUSE_HINT` in `frontend/lib/copy/safetyBar.ts`. On send/runtime failure: return to `idle`, keep the same inputs, show an inline alert and a **Retry** button. Validation errors show the alert **without** Retry. **Pause** blocks a new Run until Resume.

Illegal transitions are no-ops (`frontend/lib/fsm/runFsm.ts`).

### Chat transport (`sendChat`)

One non-streaming `sendChat` matching SAD §4 `POST /api/v1/chat`. No streaming, tool-call details, or cost fields.

- **Live:** if `NEXT_PUBLIC_API_BASE_URL` is set, `fetch(`${apiBase}/api/v1/chat`)` with the SAD JSON body (Integration `7c42dc1`).
- **Fixtures:** if that variable is unset, return a named `ChatResponse` from `frontend/lib/fixtures/chatFixtures.ts` after a short delay.

On the fixture path, verdicts are fixture-driven. Do **not** add client keyword rules on `message` (no “if text contains gift card…”). Fixture success is one of two frozen paths:

| Stub path | When (fixtures only) | `content.risk_level` | `mode` | `ai_disclosure` |
|-----------|----------------------|----------------------|--------|-----------------|
| `path_a_gift_card_bail` | `activeScamNow === false` | `likely_scam` | `normal` | `false` |
| `path_b_active_scam` | `activeScamNow === true` | `critical` | `priority` | `true` |

Operator paste examples (documentation only; **not** matched in client code): Path A gift-card bail (“grandson in jail, buy gift cards”); Path B ambiguous / happening-now (“still on the phone, they want a code”). Live Flow may use similar markers server-side.

`startRun` / `getRunStatus` is **not** the wire contract. A poller is allowed later only as a temporary anti-corruption layer if Integration maps each call **1:1** onto `ChatRequest` / `ChatResponse` (no second payload shape). This slice uses `sendChat` instead.

| Function | Signature | Behavior |
|----------|-----------|----------|
| `toChatRequest` | `(input: RunInput, sessionId: string \| null) => ChatRequest` | Full SAD request: `message`, `explicit_path: "scam"`, `session_id`, `client_action: "none"`, `track_override: null` |
| `selectStubFixturePath` | `(activeScamNow: boolean) => StubFixturePath` | Checkbox → named fixture id. Used only when the API base is unset. Does not read `message`. |
| `sendChat` | `(request: ChatRequest, stubPath: StubFixturePath) => Promise<ChatResponse>` | Live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set; otherwise `STUB_FIXTURES[stubPath]` with `session_id` copied |

Client sequence:

1. **Run** → `START` → phase `running`
2. `await sendChat(toChatRequest(input, sessionId), selectStubFixturePath(input.activeScamNow))`
3. `COMPLETE` → phase `done`; store `session_id`; append History row

On send throw: `RESET` → `idle`, inline error, **Retry**. Reset also clears `session_id`.

**Runtime note (SAD AD-5):** Non-streaming JSON. Pause / cancel / Extra Guidance are Future Work.

### Accessibility (this slice)

- One `h1` (**Learn the Signs, Protect Yourself**); section `h2`s: Inputs, Run, Results, History
- Native form controls; Tab order follows the page; visible focus rings
- Skip link to `#workflow-main`
- `lang="en"` on the document
- Advanced accessibility, live-region strategy, and resilience deferred to the observability phase

---

## Results

Shown only when phase is `done`. Result is a SAD §4 `ChatResponse`. This slice **renders** nested `content.risk_level`, `content.text`, `content.resource_links`, plus `mode` and `ai_disclosure`. Other envelope fields are typed for Integration but are not controls.

| Field | Type | UI |
|-------|------|-----|
| `agent_display_name` | `"Scam checker"` | Shown above the verdict (proof: Scam Detector path) |
| `content.verified_guide` | boolean | **Verified guide** badge when `true` (proof: RAG, US-021) |
| `content.risk_level` | `likely_scam` \| `suspicious` \| `likely_safe` \| `critical` \| `null` | **Large-type** heading (`text-4xl`) |
| `content.text` | string | `text-xl` body |
| `content.resource_links` | `{ label, url }[]` | Official IC3/AARP/FTC links |
| `mode` | `normal` \| `patient` \| `priority` | Label `Mode: {mode}` |
| `ai_disclosure` | boolean | “This check uses AI.” when `true` |
| `session_id` | UUID string | Not shown on Results; History key prefix |
| `caps.tutor_sessions_*` / `tutor_capped` | number / boolean | **Hidden.** Fixture zeros until `@backend.eng` counts real weekly sessions (`WEEKLY_CAPS_ARE_REAL`). No CapMessage. |

**Fixture rules (when API base is unset)**

- Successful fixture `sendChat` returns `STUB_FIXTURES[stubPath]` only. Both paths set `explicit_path: "scam"`, `route_intent: "SCAM"`, `agent_id: "scam_detector"`, `content.verified_guide: true`. Path A: gift-card, `likely_scam`. Path B: happening-now, `critical` + Priority disclosure.
- `activeScamNow` selects the fixture id. `message` is not used to vary the fixture verdict.
- `ui.actions` is present on both fixtures; **Pause** is rendered from the SafetyBar (client), not from `ui.actions`. Extra Guidance is not rendered.
- `caps` stay on the envelope (SAD). Do **not** show used/limit/capped numbers. `WEEKLY_CAPS_ARE_REAL` is false; do not ask backend to count sessions until that flag flips.
- No streaming chunks, tool-call traces, or cost fields.

Errors from `sendChat` (live or fixture): return to **Crew: idle**, keep inputs, inline message + **Retry**.

---

## History

Session-scoped list of completed runs (React state only). **Not** written to `localStorage` (SAD shared-device: no durable sensitive content on the client).

| Field | Type | Display |
|-------|------|---------|
| `sessionId` | string (`ChatResponse.session_id`) | Internal key |
| `completedAt` | ISO-8601 string | Locale-friendly time |
| `inputPreview` | string | First ~80 characters of `messageText` (no full body required on the list) |
| `riskLevel` | `content.risk_level` | Same `riskHeading` copy as Results (not a separate badge) |
| `activeScamNow` | boolean | **Happening now** when true (UI-only; not on ChatRequest) |

**Rules**

- Newest first.
- Empty state: “No checks yet in this visit.”
- List key: `` `${sessionId}-${completedAt}-${index}` `` (fixture `session_id` is fixed, so it is not unique alone).
- Caregiver-visible Progress Service fields are **out of scope**; this list is senior-session only and must not be treated as the caregiver API.

---

## Contracts

**Wire contract = SAD §4.** Copied below so Backend / Integration do not invent a second shape. Source files: `project-context/1.define/sad.md` §4 and `frontend/lib/types/chat.ts`. UI FSM/form types are **not** the wire envelope (`frontend/lib/types/run.ts`). Fixture fallback: `frontend/lib/fixtures/chatFixtures.ts`. If the wire payload changes, update this section, `chat.ts`, and the SAD together.

**Anti-corruption rule:** `startRun` / `getRunStatus` is allowed only as a **temporary** layer, and only if each call maps **1:1** onto `ChatRequest` / `ChatResponse`. Do not add `runId`, `summary`, `recommendedActions`, `status: running|done`, or any other wrapper as a second API. This slice uses `sendChat(request: ChatRequest, stubPath: StubFixturePath): Promise<ChatResponse>` (one non-streaming JSON POST `/api/v1/chat`; live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set).

`client_action` / `ui.actions` value `get_extra_help` is the machine id; the visible button label is **Extra Guidance** (AD-11). This slice does not render those actions.

### SAD §4 JSON (verbatim)

`POST /api/v1/chat` request:

```json
{
  "session_id": "uuid|null",
  "message": "string",
  "explicit_path": "tutor|scam|null",
  "client_action": "none|pause|resume|explain_simpler|repeat_step|start_over|get_extra_help|confirm_step",
  "track_override": "beginner|partial_user|no_device|null"
}
```

`POST /api/v1/chat` response:

```json
{
  "session_id": "uuid",
  "route_intent": "TUTOR|SCAM",
  "agent_id": "step_by_step_tutor|scam_detector",
  "agent_display_name": "Your tutor|Scam checker",
  "mode": "normal|patient|priority",
  "ai_disclosure": false,
  "content": {
    "text": "string",
    "verified_guide": false,
    "step_card": {
      "illustration_url": "string",
      "alt_text": "string",
      "caption": "string"
    },
    "risk_level": "likely_scam|suspicious|likely_safe|critical|null",
    "resource_links": [{"label": "string", "url": "string"}]
  },
  "interrupt": {
    "active": false,
    "label": "Scam checker tip"
  },
  "ui": {
    "actions": ["pause", "explain_simpler", "repeat_step", "start_over", "get_extra_help"],
    "clarifying_question": false
  },
  "caps": {
    "tutor_sessions_used_this_week": 0,
    "tutor_sessions_limit": 5,
    "tutor_capped": false
  },
  "progress_hint": {
    "continue_lesson": false,
    "continue_drill": false
  }
}
```

Error envelope (all failed API calls):

```json
{
  "error": {
    "code": "VALIDATION|UNAUTHORIZED|RATE_LIMIT|TOKEN_CAP|TUTOR_WEEKLY_CAP|RAG_REFUSAL|TIMEOUT|INTERNAL",
    "message": "plain-language string",
    "retryable": false
  }
}
```

### SAD TypeScript (`frontend/lib/types/chat.ts`)

```ts
export const CHAT_ENDPOINT = "/api/v1/chat";

export type ExplicitPath = "tutor" | "scam" | null;
export type ClientAction =
  | "none"
  | "pause"
  | "resume"
  | "explain_simpler"
  | "repeat_step"
  | "start_over"
  | "get_extra_help"
  | "confirm_step";
export type TrackOverride = "beginner" | "partial_user" | "no_device" | null;
export type RouteIntent = "TUTOR" | "SCAM";
export type AgentId = "step_by_step_tutor" | "scam_detector";
export type AgentDisplayName = "Your tutor" | "Scam checker";
export type ChatMode = "normal" | "patient" | "priority";
export type RiskLevel =
  | "likely_scam"
  | "suspicious"
  | "likely_safe"
  | "critical"
  | null;
export type ApiErrorCode =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "RATE_LIMIT"
  | "TOKEN_CAP"
  | "TUTOR_WEEKLY_CAP"
  | "RAG_REFUSAL"
  | "TIMEOUT"
  | "INTERNAL";

export interface ChatRequest {
  session_id: string | null;
  message: string;
  explicit_path: ExplicitPath;
  client_action: ClientAction;
  track_override: TrackOverride;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface ChatStepCard {
  illustration_url: string;
  alt_text: string;
  caption: string;
}

export interface ChatContent {
  text: string;
  verified_guide: boolean;
  step_card?: ChatStepCard | null;
  risk_level: RiskLevel;
  resource_links: ResourceLink[];
}

export interface ChatInterrupt {
  active: boolean;
  label: string;
}

export interface ChatUi {
  actions: ClientAction[];
  clarifying_question: boolean;
}

export interface ChatCaps {
  tutor_sessions_used_this_week: number;
  tutor_sessions_limit: number;
  tutor_capped: boolean;
}

export interface ChatProgressHint {
  continue_lesson: boolean;
  continue_drill: boolean;
}

export interface ChatResponse {
  session_id: string;
  route_intent: RouteIntent;
  agent_id: AgentId;
  agent_display_name: AgentDisplayName;
  mode: ChatMode;
  ai_disclosure: boolean;
  content: ChatContent;
  interrupt: ChatInterrupt;
  ui: ChatUi;
  caps: ChatCaps;
  progress_hint: ChatProgressHint;
}

export interface ApiErrorEnvelope {
  error: {
    code: ApiErrorCode;
    message: string;
    retryable: boolean;
  };
}
```

This slice still only **sends** `explicit_path: "scam"` and `client_action: "none"`; the type is the full SAD envelope so Backend does not ship a narrower second schema.

### UI types (not the wire)

**`RunPhase` / `CrewStatus`:** `"idle" | "running" | "done"`  
(`CrewStatus` is an alias of `RunPhase` in `frontend/lib/copy/crewStatus.ts`.)

**`RunFsmEvent`:** `"START" | "COMPLETE" | "RESET"`

**`RunInput`** (form only)

| Field | Type |
|-------|------|
| `messageText` | `string` |
| `activeScamNow` | `boolean` |

**`HistoryEntry`**

| Field | Type |
|-------|------|
| `sessionId` | `string` |
| `completedAt` | `string` (ISO-8601) |
| `inputPreview` | `string` |
| `riskLevel` | same as `content.risk_level` |
| `activeScamNow` | `boolean` |

### Stub constants

| Name | Value |
|------|--------|
| `CHAT_ENDPOINT` | `"/api/v1/chat"` |
| `STUB_SESSION_ID` | `"11111111-1111-4111-8111-111111111111"` |
| `STUB_PATH_A_GIFT_CARD_BAIL` | SAD `ChatResponse`; `risk_level: "likely_scam"`; `mode: "normal"`; `ai_disclosure: false` |
| `STUB_PATH_B_ACTIVE_SCAM` | SAD `ChatResponse`; `risk_level: "critical"`; `mode: "priority"`; `ai_disclosure: true` |
| `STUB_FIXTURES` | `{ path_a_gift_card_bail, path_b_active_scam }` |
| `WEEKLY_CAPS_ARE_REAL` | `false` — hide `caps.*` in UI; do not invent a live counter |

`sendChat(request, stubPath)` → live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set; otherwise `STUB_FIXTURES[stubPath]` with `session_id` copied. `stubPath` is fixture-only. No streaming, tool-call, cost fields, or client message-keyword scoring.

### Component props

| Component | Props |
|-----------|--------|
| `CrewStatusBanner` | `phase: RunPhase`; `lastUpdated: Date` |
| `SafetyBar` | `paused`; `onPause`; `onResume` |
| `InputsSection` | `phase`; `input: RunInput`; `onMessageTextChange`; `onActiveScamNowChange` |
| `RunSection` | `phase`; `input`; `errorMessage`; `retryable`; `paused`; `onReset`; `onRetry` |
| `ResultsSection` | `phase`; `result: ChatResponse \| null` |
| `HistorySection` | `entries: HistoryEntry[]` |
| `VerifiedGuideBadge` | `visible: boolean` |

Hook `useCriticalResearchRun` exposes: `phase`, `lastUpdated`, `input`, `result`, `history`, `errorMessage`, `retryable`, `paused`, `updateMessageText`, `updateActiveScamNow`, `run`, `reset`, `retry`, `pause`, `resume`.

---

## Spec Sync checklist

Update this checklist **in the same change as each commit** that touches Critical Research Workflow code or this spec. If code and spec disagree, fix the spec or the code before considering the commit complete.

**How to use:** After the commit, set **Last synced commit** to `git rev-parse --short HEAD`. Keep **Item**, **Status**, and a one-line **Note** on what changed (or `unchanged` if the item still matches).

| # | Item | Status | Note |
|---|------|--------|------|
| S1 | Single App Router route `/` (`frontend/app/page.tsx`) | synced | No `/onboarding`, `/learn`, `/caregiver`. Proof stays on `/`. |
| S2 | Inputs `messageText`, `activeScamNow`; max 4000; form locked when `running`/`done` | synced | `activeScamNow` selects Path B on fixtures only; still not a `ChatRequest` field. |
| S3 | FSM `idle` → `running` → `done`; events START / COMPLETE / RESET | synced | Unchanged. Pause is a UX freeze, not a fourth FSM state. |
| S4 | One non-streaming `POST /api/v1/chat`; `explicit_path: "scam"` | synced | Live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set; Path A/B fixtures when unset (`7c42dc1`). |
| S5 | Results: large-type verdict, Scam checker, `verified_guide`, resources | synced | Caps still hidden (`WEEKLY_CAPS_ARE_REAL` false); no CapMessage. |
| S6 | History is session memory; newest first; `inputPreview` + `riskLevel` | synced | Unchanged — key is `sessionId-completedAt-index`. |
| S7 | Run, Reset, Retry; client Pause always visible | synced | Idle copy: “Pause is always here, waiting for you.” |
| S8 | `frontend.md` Audit records this FE change | synced | Recorded live `sendChat` + fixture fallback (not stub-only). |
| S9 | SAD extra routes and Tutor step not implemented | synced | Tutor still deferred; live Flow on `/` already wired. |
| S10 | Banner `Crew: idle\|running\|done`; gray/blue/green; Last updated | synced | Unchanged. |
| S11 | Basic a11y: skip link `#workflow-main`, h1/h2, native keyboard/focus | synced | h1 is **Learn the Signs, Protect Yourself**. |
| S12 | Contracts match SAD §4 JSON + `lib/types/chat.ts` | synced | `caps` remain on the wire; UI gate `shouldShowWeeklyCaps`. |

**Last synced commit:** pending this docs change  
**Last synced at:** 2026-08-26T16:25:00Z

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
- `.cursor/agents/frontend-eng.md` — UI only; live `fetch` owned by `@integration.eng` (`7c42dc1`)
- Operator request: Critical Research Workflow; filename `frontend-funcional-spec.md`; FSM; stubs; Spec Sync
- Operator request (follow-up): obvious Crew status banner, colored pills, last updated, consistent `Crew:` phrasing
- Operator request (follow-up): stubbed backend, Run/Reset only, three-state FSM, Retry on error, basic a11y
- Operator request (follow-up): Spec Sync item/status/note; keep Contracts in sync; spec-to-impl name pass
- Operator request (follow-up): align stub envelope to SAD §4 ChatRequest/ChatResponse; one non-streaming POST /api/v1/chat
- Operator request (follow-up): poller only if 1:1 onto chat envelope, or `sendChat` JSON; paste SAD JSON/TS into Contracts
- Operator request (follow-up): path-honest fixtures Path A likely_scam / Path B critical+Priority; fixture-driven, no keyword rules
- Operator request (follow-up): hide weekly-limit / cap numbers until they are real; talk to backend only if counting sessions for real
- Operator request (follow-up): on-page title **Learn the Signs, Protect Yourself**; Pause idle “waiting for you”; subtitle “You're safe here, and you're never wrong to ask.”
- Operator request (follow-up): stop describing spec / frontend.md / README as stub-only
- `project-context/2.build/integration.md` — live `fetch` when `NEXT_PUBLIC_API_BASE_URL` is set
- `project-context/2.build/backend.md` — frontend should hide weekly limits until they are real

## Assumptions

- Operator name **Critical Research Workflow** is the FE slice name for US-002/US-014 scam-check research; it is not a new PRD feature ID. Visible `h1` / tab title is **Learn the Signs, Protect Yourself**.
- Filename uses operator spelling `funcional` (not “functional”).
- `project-context/2.build/setup.md` was **missing** at first FE scaffold; `@project.mgr` later produced it.
- No `aamad.config.yml`; example config used for `prefer_modals: false`, type checking, `max_file_lines: 400`.
- `AAMAD_TARGET_RUNTIME` unset → **`crewai`** (PRD + adapter registry).
- History persistence via Progress Service is Integration/Backend work; this slice is in-memory only.
- Fixture verdicts are **named fixtures** (`STUB_PATH_A_GIFT_CARD_BAIL`, `STUB_PATH_B_ACTIVE_SCAM`) when the API base is unset. `activeScamNow` selects the id. `message` is never scored on the client.
- Single-route scope is an operator override of SAD’s multi-route PWA map for this epic increment only.
- Weekly `caps` on the envelope are not shown until `@backend.eng` counts real weekly sessions.

## Open Questions

1. Is 4000-character paste limit acceptable vs a SAD/security numeric cap still TBD?

*Resolved:* Do **not** grow the route map (`/onboarding`, `/learn`, `/caregiver`, …). One Tutor step is still not on this page. Client Pause is on `/` now (US-009). `Crew: idle|running|done` remains the on-page status copy. Wire contract is SAD §4. Live Flow is already used when `NEXT_PUBLIC_API_BASE_URL` is set.

*Resolved:* Hide weekly cap numbers (`WEEKLY_CAPS_ARE_REAL = false`) instead of asking `@backend.eng` to count sessions.

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

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T12:22:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `bd799b4` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | S8 synced; Last synced commit `bd799b4` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T20:33:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — align stub envelope to SAD §4 ChatRequest/ChatResponse |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | `postChat`; `ChatRequest`/`ChatResponse`; Spec Contracts + S4/S5/S12 |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T20:49:00Z |
| Persona id | `frontend-eng` |
| Action | `document-frontend` — paste SAD §4 JSON/TS into Contracts; `sendChat` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | Contracts SAD verbatim; `sendChat`; ChatRequest full envelope |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T20:53:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — path-honest Path A/B fixtures; no keyword rules |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | `STUB_PATH_A_GIFT_CARD_BAIL`; `STUB_PATH_B_ACTIVE_SCAM`; `selectStubFixturePath` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T21:05:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — ICP status copy; on-page title Check a message or call |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | Ready / Checking this… / Check finished; h1 title; `data-phase` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T21:14:00Z |
| Persona id | `frontend-eng` |
| Action | `develop-fe` — prove scam path on `/`; client Pause; no extra routes |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | VerifiedGuideBadge; SafetyBar Pause; large-type verdict; tutor step deferred |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-21T21:18:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `c9686f6` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | S8 synced; Last synced commit `c9686f6` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T00:01:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — hide weekly-limit / cap numbers until they are real |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | Results gate `shouldShowWeeklyCaps`; `WEEKLY_CAPS_ARE_REAL=false`; no `@backend.eng` session counter |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T00:10:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `d9e7d76` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | S8 synced; Last synced commit `d9e7d76` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T15:30:00Z |
| Persona id | `frontend-eng` |
| Action | `style-ui` — on-page title Learn the Signs, Protect Yourself; Pause/subtitle copy |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | spec h1, Pause idle copy, subtitle; Spec Sync S8/S11 |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T15:31:00Z |
| Persona id | `frontend-eng` |
| Action | `sync-docs` — Spec Sync S8 SHA `3541b06` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | S8 synced; Last synced commit `3541b06` |

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-26T16:25:00Z |
| Persona id | `frontend-eng` |
| Action | `document-frontend` — live `sendChat` + fixture fallback (not stub-only) |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Output | Status, Chat transport, S4/S8/S9; README + frontend.md aligned |
