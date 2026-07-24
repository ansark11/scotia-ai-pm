# Instruction Sheet 1 — Prototype the Branch-Assisted Journey

Live-demo version of "Demo 1" in `DEMO-SCRIPT.md`. This has already been built and validated once (see `demo/branch-assisted-fa` on GitHub for the reference/fallback version) — this sheet reproduces it live.

## Before you start

- Start from a clean `main`: `git checkout main && git status` should show nothing pending.
- Create a fresh branch: `git checkout -b demo/branch-assisted-fa-live` (or any name — just don't reuse `demo/branch-assisted-fa`, that's the fallback).
- Confirm `docs/rules/channels/branch.md` exists and is the rules doc driving this.
- Have both servers running so you can click through the result immediately after (see `README.md` — server on :4000, client on :5173).

## The prompt

Paste this into Claude Code:

```
I want to prototype a branch-assisted version of this onboarding journey.
Read docs/rules/channels/branch.md for the requirements before making changes.
Reuse the existing pages and components wherever a step is unchanged from the
digital journey. Add a new FA/banker login and session-start step before
Overview, and add e-signature capture steps for both the client and the
banker after Terms & conditions and before Fund account. Wire the new pages
into the routing in client/src/App.jsx and update the step list so the
progress indicator reflects the new flow. Keep using the same design tokens
and component patterns as the rest of the app.

The digital journey's existing routes and behavior must not change — the
branch flow should be reachable as a separate entry point (e.g. /fa-login)
gated by a channel flag in journey context, not a replacement of the
existing routes. Funding must also allow cash and cheque on the branch
channel, in addition to transfer (server/rules/funding.js already branches
on channel === 'branch' for this — the client-side funding method options
need to reflect it too).
```

## What this should produce

- A new FA/banker login page, reachable at a new route (e.g. `/fa-login`), capturing who's assisting and which client record is open.
- Two new e-signature pages (client, then FA) inserted between Terms & Conditions and Fund Account.
- `client/src/App.jsx` and the journey step list updated so the progress bar reflects the branch flow's step count, without touching the digital flow's routes.
- `Fund Account` offering cash/cheque options on the branch channel only.
- `Confirmation` noting that a Financial Advisor assisted the client.
- The credit cross-sell conditional step left untouched and still gated the same way.

## How to verify it worked

1. `http://localhost:5173/` (digital entry) still behaves exactly as before — same 14 steps (as of the digital journey's UX redesign), transfer/e-transfer/cheque funding, no FA mentions anywhere. If this sheet drifts from the digital journey's actual current shape again, update this checklist to match rather than assume.
2. `http://localhost:5173/fa-login` (or whatever route it created) starts the new flow — fill it in, continue to Overview.
3. Progress indicator step count is higher than digital's.
4. Terms & Conditions leads to the client e-signature step, then the FA e-signature step — not straight to Fund Account.
5. Fund Account shows Cash and Cheque options in addition to Transfer.
6. Confirmation mentions the FA who assisted.
7. `cd client && npm run build` compiles clean.

If any of these don't hold and you're short on time, switch to the `demo/branch-assisted-fa` fallback branch instead of debugging live.
