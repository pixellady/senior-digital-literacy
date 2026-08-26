# Senior Digital Literacy — frontend

Single-route Next.js App Router app. On-page title: **Learn the Signs, Protect Yourself** (internal slice name: Critical Research Workflow).

## Spec

See `project-context/2.build/frontend-funcional-spec.md` (Inputs, Run, Results, History, Spec Sync checklist). After each commit that changes this app or the spec, update that checklist.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. There is one route: `/`.

`sendChat` posts SAD `ChatRequest` to `POST /api/v1/chat` (non-streaming JSON, AD-5).

- **Live:** set `NEXT_PUBLIC_API_BASE_URL` in gitignored `frontend/.env.local` (for example `http://127.0.0.1:8000`). See `project-context/2.build/setup.md` § “Run both sides together”.
- **Fixtures:** if that variable is unset, `sendChat` returns named Path A / Path B responses (gift-card `likely_scam`, or happening-now `critical` + Priority Mode). The checkbox `activeScamNow` only selects the fixture; it is not on `ChatRequest`.
