# User Guide — Senior Digital Literacy

**Product:** Senior Digital Literacy  
**Version:** `0.1.0` (localhost demo)  
**Page title:** Learn the Signs, Protect Yourself  
**Audience:** Operators who run the demo on a laptop, and the older adult using `/` in a browser

---

### 1. Product Overview

This app is a **text** helper on one web page. A person can **check a suspicious message or call**, or **learn a first step** for a simple task (send an email, join a video call, or find a photo). A computer guide — not a live person — answers. Pause is always on the page. You can save or print a summary without the pasted message.

It is for U.S. English-speaking older adults practicing at home (Margaret-first in the PRD), with an operator running the site on a laptop. It is **not** a bank, the police, or a person who will call you back.

**This version is a local demo.** It is not a public website, not a full three-track school, and not a caregiver dashboard. The footer on `/` lists what is not on this page yet: Extra Guidance, account signup, caregiver progress, and lessons with more than one step.

Known gaps you may notice: a live check can take about 10–13 seconds (longer than the 5-second goal); some results omit an IC3 link; weekly session numbers are hidden because they are not real yet.

### 2. Prerequisites

**For the person using the page**

- A current desktop or phone browser (Chrome, Safari, Edge, or Firefox).
- The operator must have the app running. There is no public URL in `0.1.0`.

**For the operator**

| Need | Notes |
|------|--------|
| Docker Desktop (recommended) | Compose file at repo root. Ports stay on this computer only. |
| Or: Python 3.10–3.13, [uv](https://docs.astral.sh/uv/), Node.js 20 LTS, npm | Two-terminal run from `setup.md`. |
| Anthropic Console account | Named workspace API key. Env name: `ANTHROPIC_API_KEY`. Set a monthly spend limit in Console (not in this repo). |
| Model id | Env name: `MODEL` (example in `.env.example`: `anthropic/claude-sonnet-4-5-20250929`). |

Do not commit `.env` or `.env.local`. Copy from `.env.example` files. `SERPER_API_KEY` is unused. Do not put `ANTHROPIC_API_KEY` in GitHub Actions.

### 3. Installation

Work from the repository root. Full operator runbook: `project-context/3.deliver/deploy.md`.

**A. Docker (this Deliver slice)**

1. Copy `senior_digital_literacy/.env.example` to `senior_digital_literacy/.env`.
2. Fill `ANTHROPIC_API_KEY` and `MODEL`. Do not commit the file.
3. Confirm Compose `ports` still say `127.0.0.1:3000` and `127.0.0.1:8000`.
4. Run:

```bash
docker compose up --build
```

5. Open **http://localhost:3000**. Check health: **http://127.0.0.1:8000/health** should show `{"status":"ok"}`.
6. Stop with `docker compose down`.

**B. Without Docker**

1. Terminal A:

```bash
cd senior_digital_literacy
uv sync
uv run uvicorn senior_digital_literacy.api:app --host 127.0.0.1 --port 8000
```

2. Copy `frontend/.env.example` to `frontend/.env.local` so `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`.
3. Terminal B:

```bash
cd frontend
npm install
npm run dev
```

4. Open **http://localhost:3000**. If you omit `.env.local`, the page uses named fixtures and does **not** call Claude.

**Smoke check:** Title **Learn the Signs, Protect Yourself**. Pause line: “Pause is always here, waiting for you.” Paste a short message; **Run** enables; after **Crew: done**, Results show a scam checker verdict or a tutor Step 1 card.

### 4. Getting Started

On `/` you can switch **Check a scam** and **Learn a skill** after a run finishes. You do not need **Reset** to switch.

**Check a scam**

1. Open the page. Subtitle: “Check a suspicious message or call. You're safe here, and you're never wrong to ask.”
2. Paste or type the message or call you want checked (up to 4,000 characters). Empty paste keeps **Run** disabled.
3. **Pause** is always available. “You can come back when you are ready. Nothing new will start until you tap Resume.” Pause does **not** cancel a check that already started.
4. Tap **Run**. Status becomes **Crew: running. Working on this…** This can take several seconds. Inputs are locked until it finishes.
5. When you see **Crew: done**, read Results: agent name **Scam checker**, a large-type heading (for example “This looks like a scam”), the guidance, and official links when present. A **Verified guide** badge appears only when the owned library matched.
6. History lists this visit (what you asked, what we found — not the full pasted scam text). **Save or print** / **Print this visit** open the browser print window. Choose **Save as PDF** if you want a file. The sheet does not include the pasted message or a session id.

**Learn a skill**

1. Switch to **Learn a skill**.
2. Pick one task: **Send an email to my daughter**, **Join a video call with family**, or **Find a photo on my phone**.
3. Tap **Run**. Results show a **Step 1** card from the tutor. This slice is one step, not a full lesson.

**Reset** clears the form and returns Crew to idle. History from this visit stays until you close the tab.

### 5. Everyday Use

| Task | What to expect |
|------|----------------|
| Check a gift-card / jail message | Often **likely_scam**, Priority mode, Verified guide, FTC/AARP-style catalog links. Do not buy cards or send codes. |
| Check something not in the library | **Suspicious**, canned “not in our library” style guidance, official catalog links only. Never treated as “likely safe” from the model alone. |
| Learn a listed task | One Step 1 card. Not a full illustrated course. |
| Too many Runs in a short time | “Please wait a moment, then try again. Nothing you did caused this.” (10 per minute / 40 per hour). |
| Helper error | “Something went wrong… Nothing you did caused this.” **Retry** uses the same inputs. |
| Print | Date/time and website may appear; pasted text and session id do not. |

The helper will not promise that a human will call you. Official links should be catalog sites (FTC, AARP, IC3, and similar), not a random URL from the message.

### 6. Troubleshooting

| What you see | What to try |
|--------------|-------------|
| Page will not load | Operator: is Compose/`npm run dev` running? Use `http://localhost:3000`. |
| Health is not `{"status":"ok"}` | Operator: `curl http://127.0.0.1:8000/health`. Keep the API on `127.0.0.1`. |
| Run never finishes | Wait ~15–30 seconds. Live Claude is slower than the fixture. Check API logs (do not paste scam text into chat or tickets). |
| Fixture-looking results with Docker off | Set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local`. |
| CORS error | Use `http://localhost:3000` or `http://127.0.0.1:3000`. Never set `CORS_ORIGIN=*`. |
| Immediate fail / no Claude | Operator: `.env` has `ANTHROPIC_API_KEY` and `MODEL`; Console monthly limit is not `$0`; auto-reload as you intend. |
| Missing IC3 link | Known gap (QA-EVAL-001). Not a reason to follow a strange link in the original message. |

**Logs:** Docker `docker compose logs api` / `web`; without Docker, the uvicorn terminal. Crew verbose can print pastes — do not share those logs. Eval summaries (no paste bodies): `project-context/2.build/logs/eval-run-latest.json`.

### 7. Deployment Notes (operators)

Full runbook: **`project-context/3.deliver/deploy.md`**.

- Hosting is this laptop only. Do not change Compose ports to drop `127.0.0.1`. Do not publish `/api/v1/chat`.
- GitHub Actions (`.github/workflows/ci.yml`) lints, tests, and builds. It does **not** deploy and must not hold the Anthropic key.
- Promote: CI green, then `docker compose up --build`.
- Rollback: `docker compose down`, return to a known-good git commit, `docker compose up --build`. To stop spend immediately, disable the API key in Anthropic Console.
- Tracing stays off (`CREWAI_TRACING_ENABLED=false`) so pasted messages are not sent to CrewAI AMP.

---

## Sources

- `.cursor/templates/user-guide-template.md`
- `.cursor/agents/devops-eng.md`
- `project-context/1.define/prd.md` v2.3
- `project-context/2.build/setup.md`
- `project-context/2.build/integration.md`
- `project-context/2.build/qa.md`
- `project-context/2.build/security.md`
- `project-context/3.deliver/deploy.md`
- `frontend/lib/copy/pageChrome.ts`, `safetyBar.ts`, `crewStatus.ts`, `tutorGoals.ts`, `printSummary.ts`, `riskCopy.ts`

## Assumptions

- `AAMAD_TARGET_RUNTIME` unset → `crewai`.
- Operator already has Docker or uv/Node as in setup.md; this guide does not install those tools.
- Live checks need a non-zero Anthropic monthly limit and a named-workspace key (operator confirmed a non-zero cap on 2026-09-11).
- Speech input, public-computer mode, and caregiver views are not shipped; they are not documented as working.
- Pause does not abort an in-flight `POST` (integration.md keep-out).

## Open Questions

1. Should a later user-guide revision include a one-page large-type “how to Pause / print” sheet for Margaret, separate from operator install steps?
2. When Extra Guidance or multi-step tutor ships, this guide must be revised; do not treat the footer list as working features.

## Audit

AAMAD_TARGET_RUNTIME: crewai

| Field | Value |
|-------|-------|
| Timestamp | 2026-09-11T13:47:14Z |
| Persona id | `devops-eng` |
| Action | `document-user-guide` |
| Resolved `AAMAD_TARGET_RUNTIME` | `crewai` (env unset; adapter registry default) |
| Outputs | `project-context/3.deliver/user-guide.md` |
| Model | Cursor Grok 4.6 |
| Temperature / max_tokens | N/A — documentation artifact, not CrewAI kickoff |
| Prompt Trace | Omitted — no production prompt write |
| Tools used | Read, Grep, Write, Shell (`date`) |
| Prohibited actions honored | No invented features; no secret values; no app logic changes; no live deploy |
