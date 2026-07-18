# Demo Script — Prototype Creation & Journey JSON

Recording/live-demo script. Everything in this repo is synthetic — say so on camera before you start.

**Opening disclaimer to say out loud:**
"Everything you're about to see is a fake bank, fake rules, and a fake onboarding journey, running as a real working web app on my personal machine. It is not our real code. The point is to show what becomes possible when AI can see and work inside the actual delivery environment, not just answer isolated questions."

---

## Setup (before recording)

1. Start both servers (see README.md) and confirm `http://localhost:5173` loads the Overview screen.
2. Open the repo in VS Code.
3. Open a terminal in the repo root and confirm `claude` runs.
4. Have `docs/rules/channels/branch.md` and `docs/rules/credit-cross-sell.md` open in tabs.

---

## Demo 1 — Prototype Creation

### Beat 1 — Show the "before" (30-45 seconds)

Click through the live journey: Overview → Phone & OTP → Profile setup → Identity verification → Address info → Employment info → Credit card offer (shown by default) → Tax questions → Terms & conditions → Fund account → Confirmation.

> "This is our current digital-only journey — fully working, with a real gating rule deciding whether that credit card offer even shows up, not just a static slide."

### Beat 2 — The core prompt

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
```

**Talking point while it runs:**

> "This is the moment Copilot Web can't do. It has no access to our components, our rules, or our routing, so it can only guess at a generic layout. This is reading our actual rules and producing pages that reuse our real components — including a real conditional step it needs to leave alone."

### Beat 3 — Show the "after"

Refresh and click through the new branch flow end to end, including the unchanged conditional credit-offer step.

> "Everything in the middle is identical to the digital version, because those steps — including the credit card gating logic — didn't need to change. Only the parts our branch rules called out are new, and it's clickable, not a slide."

---

## Demo 2 — Journey JSON Creation

### The core prompt

```
Using schema/journey-schema.json and the module files in /modules as a
pattern, generate a journey JSON for the branch-assisted deposit account
journey we just built, called deposit-account-branch. Reuse existing modules
for steps that didn't change, including the conditional credit-cross-sell
module. Create new module definition files, following the same format as the
existing ones, for the FA login step and for the two e-signature steps.
```

**Talking point:**

> "This is the same feature we just prototyped, now expressed the way our future orchestration layer would need it — a structured definition instead of hand-coded pages, including which steps are conditional. You can read this JSON yourselves; it's not a black box."

---

## Closing line

> "This was built with Claude CLI because I already had it configured. The capability is the same one GitHub Copilot provides in VS Code through workspace-aware chat. What we're asking for is governed access to run this against our real workspace, not a personal machine and fake data."

---

## If something goes wrong live

Have a screen recording as backup — a clean recorded take is safer for a leadership audience than live improvisation with an LLM.
