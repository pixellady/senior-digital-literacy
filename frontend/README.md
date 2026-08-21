# Senior Digital Literacy — frontend

Single-route Next.js App Router app for the **Critical Research Workflow**.

## Spec

See `project-context/2.build/frontend-funcional-spec.md` (Inputs, Run, Results, History, Spec Sync checklist). After each commit that changes this app or the spec, update that checklist.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`. There is one route: `/`.

`startRun` and `getRunStatus` are in-memory stubs. Do not point this client at a live API in the frontend epic.
