---
description: Gate-check the integration APPROVED, then run verify-deploy-agent to audit, fix, validate hosting, deploy, and confirm the live URL.
---

**Stage 5 (Verify + Deploy)** of the Site Factory pipeline.

**GATE CHECK:** Confirm the owner has explicitly said `APPROVED` on the integrated
build from Stage 4. If approval has not been given in this conversation, refuse
and ask for it (GLOBAL LAW 1). Do not proceed otherwise.

Then invoke the `verify-deploy-agent` subagent with a self-contained prompt
(GLOBAL LAW 6) that includes:

- The requirement to audit the full site against `docs/templates/grading-rubric.md`
  and grade every category 0–100.
- The requirement to run a Self-Check-and-Fix loop up to 3 times if the score
  falls short.
- The absolute requirement to run `npm run validate:hosting` before deploy and report any missing credentials or resources as human operator blockers. Do not silently provision or fabricate them. Stop and wait if there is a blocker.
- The requirement to deploy via `npm run deploy` → independently confirm the live URL via web fetch →
  send the completion notification → update `PIPELINE.md` to DONE.

Relay the subagent's full output UNTOUCHED, including the final grade sheet, fix
log, and live URL confirmation (GLOBAL LAW 2).
