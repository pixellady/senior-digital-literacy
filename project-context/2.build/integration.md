# Integration Build Log — Senior Digital Literacy

**Persona:** `@integration.eng`  
**Action:** `*integrate-api` / `*verify-messageflow` / `*log-integration`  
**Slice:** PWA `sendChat` → FastAPI `POST /api/v1/chat`

## Status

Wired the single-route PWA to the CrewAI Flow API when `NEXT_PUBLIC_API_BASE_URL` is set. Envelope is still SAD §4: one non-streaming JSON POST. Without that env var, `sendChat` still returns named fixtures.

Verified locally: paste a gift-card scam → Run → live `POST http://127.0.0.1:8000/api/v1/chat` (HTTP 200) → Scam checker result → History → Reset. Session id was not the stub UUID.

## Wire

| Side | Behavior |
|------|----------|
| Request | `toChatRequest` still sends `explicit_path: "scam"`, `client_action: "none"`, `track_override: null` |
| Transport | `fetch(`${apiBase}/api/v1/chat`)` from `frontend/lib/services/chatService.ts` |
| Auth | None (local/dev, matches backend.md) |
| Fallback | If `NEXT_PUBLIC_API_BASE_URL` is unset, Path A/B fixtures |

`activeScamNow` is still **not** on `ChatRequest`. Live Priority Mode comes from Flow safety markers (for example `"gift card"`), not the checkbox.

## How to run both

1. Backend: `cd senior_digital_literacy && uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000`
2. Frontend: set `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000` in gitignored `frontend/.env.local`, then `cd frontend && npm run dev`
3. Open `http://localhost:3000`, paste a message, tap Run, wait for `Crew: done` (live calls take longer than the 900ms stub)

## Gaps

- Learn-a-skill / Tutor UI still not on `/` (`explicit_path` is always `"scam"`).
- Extra Guidance, Pause-during-flight cancel, auth, RAG, caps, progress: not in this slice.
- Happening-now checkbox does not change the live request.
- `frontend-funcional-spec.md` still describes the stub-only slice; fixtures remain the offline fallback.

## Sources

- `project-context/2.build/backend.md`
- `project-context/2.build/frontend.md`
- `project-context/1.define/sad.md` §4, AD-5
- `.cursor/agents/integration-eng.md`

## Assumptions

- `setup.md` still missing.
- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- CORS on the API allows `http://localhost:3000`.
- `.env.local` is gitignored; operators must set the public API base locally.

## Open Questions

1. Should Integration update the frontend functional spec Spec Sync row now that live fetch exists?
2. Should `activeScamNow` be added to `ChatRequest` so Path B is UI-driven on the live API?

## Audit

| Field | Value |
|-------|-------|
| Timestamp | 2026-08-24T18:08:00Z |
| Persona id | `integration-eng` |
| Action | `integrate-api` — `sendChat` fetch when `NEXT_PUBLIC_API_BASE_URL` is set |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset) |
| Outputs | `frontend/lib/services/chatService.ts`; `project-context/2.build/integration.md` |
| Model | Cursor Grok 4.6 |
| Prompt Trace | Omitted — client fetch + docs, not a runtime prompt write |
| Tools used | Read; Write; local click-through against uvicorn + Next |
