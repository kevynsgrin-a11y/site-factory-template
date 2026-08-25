# Pipeline Status — <SITE-NAME>

> `<SITE-NAME>` is a placeholder set by `/new-site`. Every agent that changes the
> repo updates this file before finishing its turn (GLOBAL LAW 5).

**Current stage:** Stage 0 — Intake
**Blocking gate:** Research APPROVED
**Last updated:** 2026-07-16

| Stage | Owner | Gate | Status | Artifact | Date |
|-------|-------|------|--------|----------|------|
| 0 — Intake | Human + `/new-site` | Research APPROVED | Pending | `docs/research/<site>-research.md` | — |
| 1 — Concept | `concept-agent` | README + backend prompt APPROVED | Pending | `README.md`, `docs/prompts/backend-build-prompt.md` | — |
| 2 — Backend | `backend-agent` | Backend verified + frontend prompt APPROVED | Pending | `functions/`, `docs/prompts/frontend-build-prompt.md` | — |
| 3 — External UI build | Human (v0/Lovable/Replit/Bolt/Builder.io) | UI exported & returned | Pending | exported UI code | — |
| 4 — Integration | `frontend-integration-agent` | Integrated build APPROVED | Pending | integrated frontend + wiring map | — |
| 5 — Verify + Deploy | `verify-deploy-agent` | DONE = live URL confirmed + notification sent | Pending | live `*.pages.dev or *.workers.dev` URL, grade sheet | — |
