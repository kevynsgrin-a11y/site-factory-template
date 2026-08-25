# <SITE-NAME>

> **Stub.** This README is populated by `concept-agent` at **Stage 1** of the
> Site Factory pipeline. Until then, this repo is the unconfigured master
> template. Run `/new-site` to begin, or read `CLAUDE.md` for the full pipeline,
> the global laws, and the slash-command cheat sheet.

## Pipeline status

| Stage | Owner | Gate | Status |
|-------|-------|------|--------|
| 0 — Intake | Human + `/new-site` | Research APPROVED | Pending |
| 1 — Concept | `concept-agent` | README + backend prompt APPROVED | Pending |
| 2 — Backend | `backend-agent` | Backend verified + frontend prompt APPROVED | Pending |
| 3 — External UI build | Human (v0/Lovable/Replit/Bolt/Builder.io) | UI exported & returned | Pending |
| 4 — Integration | `frontend-integration-agent` | Integrated build APPROVED | Pending |
| 5 — Verify + Deploy | `verify-deploy-agent` | DONE = live URL confirmed + notification sent | Pending |

See `PIPELINE.md` for the live status table.

## Quickstart

```bash
# 1. Clone this template for a new site
git clone <this-repo-url> my-new-site && cd my-new-site

# 2. Drop the Agent 1 research report into docs/research/ as <site>-research.md,
#    then start Claude Code and run the pipeline:
#    /new-site  →  APPROVED  →  /concept  →  APPROVED  →  /build-backend  → ...

# Local dev / deploy (Cloudflare Pages or Workers)
npm install
npm run preview   # wrangler pages dev OR wrangler dev
npm run deploy    # wrangler pages deploy OR wrangler deploy
```

> **Migration Note:** Existing clones that are purely Cloudflare Pages-based
> remain fully supported. When starting a new project, an explicit choice between
> Pages or Worker hosting will be required during the Concept/Backend stages.
