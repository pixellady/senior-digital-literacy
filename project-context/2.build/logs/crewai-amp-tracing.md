# CrewAI AMP tracing — operator notes

**Scope:** Local Build-phase observability only. Not a product defect. Not a QA fail.  
**Dates:** 2026-08-27 evening through 2026-08-28 morning (America/New_York).

Do not paste device-login codes, ephemeral access codes, API keys, or senior/scam message text into this file or into chat logs.

## What is wired

- `tracing=True` (and `verbose=True`) on `tutor_crew` and `scam_crew` in `crew.py`.
- Flow `__init__` sets `tracing=True` so FastAPI `/api/v1/chat` turns are traced, not only `crewai run`.
- Optional env: `CREWAI_TRACING_ENABLED=true` when starting uvicorn.

Traces open in [app.crewai.com](https://app.crewai.com) under **Traces**. The localhost UI does not show them.

## What went wrong

1. **Stale API process.** uvicorn on port 8000 had been started **before** `tracing=True` and **before** `crewai login`. Live chat still returned 200; CrewAI sent nothing to AMP. Restart the API after code changes and after login.
2. **Consent declined.** `crewai traces status` showed consent declined. New runs went to **24-hour ephemeral** batches (`/ephemeral_trace_batches/...`) instead of the org **Traces** tab (`/trace_batches/...`). Last night’s logged-in batches stayed in the dashboard; morning runs did not.
3. **Login session expired.** The evening `crewai login` no longer attached traces to the account. A later `crewai login` **timed out** waiting for the browser device step; a retry then succeeded.
4. **Must restart after login.** Even with a good login, the already-running uvicorn process stayed unauthenticated. Dashboard traces appeared only after restarting the API (with `CREWAI_TRACING_ENABLED=true`).

Confirmed good path: account batch under `/trace_batches/` (not ephemeral) after re-login + API restart on 2026-08-28.

## Procedure (next time traces are missing)

1. `cd senior_digital_literacy`
2. `crewai login` — finish the browser device step before it expires.
3. `crewai traces enable` then `crewai traces status` — consent must not be declined.
4. Restart uvicorn (stop the old PID; start again). Login in a different shell does not update the running process.
5. Run one chat turn.
6. In AMP **Traces**, expect `/trace_batches/...`. If the terminal prints `ephemeral_trace_batches`, login/consent/restart is still wrong.

## How to tell which you got

| Kind | URL shape | AMP Traces tab |
|------|-----------|----------------|
| Account (wanted) | `/crewai_plus/trace_batches/...` | Yes |
| Ephemeral (24h) | `/crewai_plus/ephemeral_trace_batches/...` | No |

## Safety

Trace payloads can include the pasted message, agent prompts, and tool results. Do not share a trace link if the run had personal or scam-report details.

## Sources

- Operator session 2026-08-27–2026-08-28 (tracing enable, login, live API, AMP Traces).
- `senior_digital_literacy/src/senior_digital_literacy/crew.py`
- `senior_digital_literacy/src/senior_digital_literacy/flow.py`
- SAD Build logging: persist operator notes under `project-context/2.build/logs`.
