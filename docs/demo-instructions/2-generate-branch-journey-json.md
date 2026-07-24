# Instruction Sheet 2 — Generate the Branch Journey JSON

Live-demo version of "Demo 2" in `DEMO-SCRIPT.md`. **Changed since this sheet was first written:** the branch-assisted journey is no longer something built fresh in the same session — it's now permanent, already-built code on `main` (FA login, a remote identity-verification hand-off, dual e-signature, channel-aware funding, a QR code on confirmation). So this demo is no longer "generate something new that doesn't exist yet" — it's "read the actual, already-built branch app and produce an accurate structured description of it." That's arguably a better demo: reverse-engineering a real, non-trivial implementation (conditional steps, a cross-device hand-off, dependency chains) into clean structured data is a stronger proof point than describing something simple from a rules doc.

Can run independently — doesn't depend on Instruction Sheet 1 having just run in the same session.

## Before you start

- Confirm `schema/journey-schema.json`, the files in `/modules`, and `existing-journeys/deposit-digital.json` are present — they're the pattern this step follows.
- `existing-journeys/deposit-branch.json` already exists on `main` — that's expected. The point of running this live is watching Claude Code independently re-derive it from the actual app and get the same (correct) answer, not creating it from nothing.

## The prompt

Paste this into Claude Code:

```
Read the current branch-assisted deposit account journey directly from the
codebase — client/src/App.jsx, the JOURNEY_STEPS_BRANCH list in
client/src/context/JourneyContext.jsx, and the branch-specific pages under
client/src/pages/ (FaLogin, IdvRemoteFa, IdvRemoteComplete, EsignClient,
EsignFa). Using schema/journey-schema.json and the module files in /modules
as the pattern, produce or refresh existing-journeys/deposit-branch.json —
journeyId deposit-account-branch, channel branch — matching what the app
actually does today, in the same order. Reuse existing module references for
steps unchanged from digital, including the conditional credit-cross-sell
and credit-card-added modules. Confirm the branch-only module files
(fa-login, idv-remote-fa, idv-remote-complete, esign-client, esign-fa)
still accurately describe those pages, updating them if anything has
drifted from the real implementation.

Where a step depends on a specific prior step completing — not just its
position in the list — add an explicit dependsOn field naming that prior
step's module (e.g. Overview depends on fa-login; the FA's e-signature
depends on the client's; funding depends on both signatures existing).

Format every step object one field per line, matching the existing
convention in existing-journeys/deposit-digital.json.

Validate the resulting JSON against the schema when done.
```

## What this should produce

- `existing-journeys/deposit-branch.json` — `journeyId: "deposit-account-branch"`, `channel: "branch"`, all 17 steps in order: fa-login, overview, phone-number, otp-verification, profile-setup, idv-remote-fa, idv-remote-complete, address-info, employment-info, credit-cross-sell (conditional), credit-card-added (conditional), tax-questions, terms-and-conditions, esign-client, esign-fa, fund-account, confirmation.
- Five branch-only module files confirmed accurate (or corrected if drifted): `fa-login.json`, `idv-remote-fa.json`, `idv-remote-complete.json`, `esign-client.json`, `esign-fa.json`.
- `dependsOn` present on: overview (depends on fa-login), idv-remote-complete (depends on idv-remote-fa), esign-fa (depends on esign-client), fund-account (depends on esign-fa) — not on every step.
- Every step object formatted one field per line.

## How to verify it worked

1. `existing-journeys/deposit-digital.json` still validates against the schema (nothing broke for the existing journey).
2. The (re)generated `existing-journeys/deposit-branch.json` validates too:
   ```
   npx --yes -p ajv-cli ajv validate -s schema/journey-schema.json -d existing-journeys/deposit-branch.json --spec=draft7
   npx --yes -p ajv-cli ajv validate -s schema/journey-schema.json -d existing-journeys/deposit-digital.json --spec=draft7
   ```
3. Step count is 17, in the order above — not 14 (that was the count before FA login, remote ID-V, and dual e-signature existed) and not the digital journey's 14.
4. Open the file and confirm it reads sensibly to a non-technical reviewer — this is the artifact you'd actually show on screen.

If this doesn't come out clean and you're short on time, the reference copy is `impact-briefs/deposit-branch.json` and `impact-briefs/module-*.json` (fa-login, idv-remote-fa, idv-remote-complete, esign-client, esign-fa).
