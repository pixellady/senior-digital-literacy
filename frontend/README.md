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

`sendChat` is an in-memory stub for SAD `POST /api/v1/chat`. It returns named fixtures (Path A gift-card `likely_scam`, or Path B happening-now `critical` + Priority Mode). Do not point this client at a live API in the frontend epic.
