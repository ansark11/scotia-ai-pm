# Instruction Sheet 2 — Generate the Branch Journey JSON

Live-demo version of "Demo 2" in `DEMO-SCRIPT.md`. Run this **after** Instruction Sheet 1's prototype is built and validated — this step describes that same journey as structured data instead of pages.

## Before you start

- The branch-assisted prototype from Instruction Sheet 1 should already exist in the working tree (same branch, still uncommitted or committed — either is fine).
- Confirm `schema/journey-schema.json`, the files in `/modules`, and `existing-journeys/deposit-digital.json` are present — they're the pattern this step follows.

## The prompt

Paste this into Claude Code:

```
Using schema/journey-schema.json and the module files in /modules as a
pattern, generate a journey JSON for the branch-assisted deposit account
journey we just built, called deposit-account-branch, saved to
existing-journeys/deposit-branch.json. Reuse existing modules for steps that
didn't change, including the conditional credit-cross-sell module. Create
new module definition files, following the same format as the existing
ones, for the FA login step and for the two e-signature steps, with their
requiredFields based on the actual data those pages capture.

Where a step in the branch journey depends on a specific prior step
completing — not just its position in the list — add an explicit dependsOn
field naming that prior step's module (e.g. the FA's e-signature depends on
the client's; funding depends on both signatures existing). Add dependsOn
as a new optional field to schema/journey-schema.json if it isn't already
there, without breaking validation of the existing digital journey.

Format every step object the same way existing-journeys/deposit-digital.json
already does: one field per line, not a single-line object, even for steps
with only two or three fields.

Validate the resulting JSON against the schema when done.
```

## What this should produce

- `existing-journeys/deposit-branch.json` — `journeyId: "deposit-account-branch"`, `channel: "branch"`, all 14 steps in order.
- Three new files under `/modules`: FA login, client e-signature, FA e-signature — same shape as the existing module files (`moduleId`, `name`, `description`, `implementedAt`, `appliesToChannels`, `requiredFields`).
- `schema/journey-schema.json` gets one new optional field (`dependsOn`) — additive only, shouldn't break the existing digital journey.
- `dependsOn` should appear only where there's a real named business rule (FA login before Overview, FA signs after client, funding after both signatures) — not on every single step.
- Every step object formatted one field per line, matching `existing-journeys/deposit-digital.json` — not compact single-line objects.

## How to verify it worked

1. `existing-journeys/deposit-digital.json` still validates against the updated schema (nothing broke for the existing journey).
2. The new `existing-journeys/deposit-branch.json` validates against the schema. Quick check:
   ```
   npx --yes -p ajv-cli ajv validate -s schema/journey-schema.json -d existing-journeys/deposit-branch.json --spec=draft7
   npx --yes -p ajv-cli ajv validate -s schema/journey-schema.json -d existing-journeys/deposit-digital.json --spec=draft7
   ```
3. Open the new file and confirm it reads sensibly to a non-technical reviewer — this is the artifact you'd actually show on screen.

If this doesn't come out clean and you're short on time, the reference copy is in `existing-journeys/deposit-branch.json` and `/modules/fa-login.json`, `/modules/esign-client.json`, `/modules/esign-fa.json` on the `demo/branch-assisted-fa` fallback branch.
