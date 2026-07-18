# Project context for Claude Code

Drop this file at the root of `deposit-account-onboarding/` (alongside `README.md`). Claude Code reads `CLAUDE.md` automatically at the start of a session in this directory, so you won't need to re-explain any of this each time you open a new terminal.

## What this repo is

A synthetic demo repo — fake bank, fake rules, fake data — built to make the case to leadership that product teams need workspace-aware AI (Claude Code / GitHub Copilot in VS Code), not just Copilot Web. The pitch in one line: **product teams need AI that can see and work inside the actual delivery workspace — rules, code, design components, journey configs — not just answer generic questions in a browser tab with no context.**

Nothing in this repo is real bank code, real business rules, or real customer data. Every demo built from this repo should keep that framing — say so out loud when presenting, and don't let outputs imply this is production-accurate.

## Repo map

- `client/` — React + Vite frontend, the 11-step digital deposit-account journey, dark mode + red accent design, every field pre-filled with mock data.
- `server/` — Express mock backend; `server/rules/*.js` holds the real validation logic (age gate, identity expiry, employment branching, credit cross-sell gating, channel-aware funding).
- `docs/rules/*.md` — plain-language mirror of each rule in `server/rules/`, plus `docs/rules/channels/digital.md` and `branch.md`.
- `schema/journey-schema.json` — the future JSON-driven orchestration format.
- `modules/*.json` — one descriptor per journey step, matching the schema.
- `existing-journeys/*.json` — journeys expressed in that schema.
- `DEMO-SCRIPT.md` — the recording script for the leadership presentation.

## What's already built

- **Demo 1 (done):** prompted Claude Code to prototype a branch-assisted variant of the digital journey — added an FA/banker login step before Overview, and e-signature capture (client + banker) after Terms & conditions and before Fund account — reusing existing components and rules wherever a step didn't change.
- **Demo 2 (done):** prompted Claude Code to express that branch journey as a structured journey JSON under `existing-journeys/`, plus new module descriptors for the FA login and e-signature steps, following the same schema as the existing modules.

## What's next — 3 more demos

Each one should produce a real, readable markdown output that a non-technical leadership audience could read cold — not a wall of code or a terminal dump. Each is meant to prove the same underlying point as demos 1 and 2: this only works because the AI can see the actual repo, not because it's a smarter chatbot.

### Demo 3 — Plain-English impact analysis

**Goal:** leadership asks "what would it take to add X to this journey?" and gets a decision-ready brief in seconds instead of a multi-day cross-team investigation.

**What "good" looks like:** given a plain-English proposed change, Claude Code reads the real journeys, modules, and rules docs, and writes a short brief covering: which existing steps/modules are affected, which rules would need to change, which channels are impacted, and what's still an open question for a human to decide. No invented detail — if the repo doesn't have an answer, the brief should say so as an open question rather than guess.

**Starter prompt:**
```
I'm proposing we add joint-account support to the branch deposit account
journey — two applicants completing one application together. Read the
current digital and branch journeys, the modules in /modules, and our rules
docs in docs/rules, then write a plain-English impact brief: what would need
to change (steps, rules, the e-signature flow), which channels/segments are
affected, and what's still an open question for the business to decide. Save
it as impact-briefs/joint-account-branch.md.
```

### Demo 4 — Journey comparison across channel/segment

**Goal:** see how two journey variants differ at a glance, instead of manually reading two JSON files or two documents side by side.

**What "good" looks like:** given two journeyIds, Claude Code reads both journey JSONs and the referenced modules, and produces a clean markdown table: one row per step, noting which steps are shared vs. channel-specific, and calling out rule differences (consent capture method, funding methods, etc.) in plain language.

**Starter prompt:**
```
Compare existing-journeys/deposit-digital.json and the branch journey JSON we
created in demo 2. Produce a markdown table with one row per step, showing
whether each step is shared or channel-specific, and a plain-language note on
any rule differences (e.g. consent capture, funding methods). Save it as
comparisons/digital-vs-branch.md.
```

### Demo 5 — Business rule extractor

**Goal:** consolidate business logic that's currently scattered across code and docs into a single, readable knowledge-base file per journey — this is the closest demo to the original "extract business logic from code" ask, so it's worth being upfront about its limits: this works cleanly here because the demo repo's rules are already fairly explicit and contained. Say so when presenting — a real extractor over a production codebase would need human review, not blind trust, especially for logic that's implicit rather than written down.

**What "good" looks like:** Claude Code reads every rule source for one journey — `server/rules/*.js`, `docs/rules/*.md`, and any inline business logic in `client/src/pages/*.jsx` (required fields, what happens on failure, conditional steps) — and consolidates it into one markdown file, organized by journey step, in plain language, with a note on where each rule actually lives in the codebase so it can be traced back and kept in sync later.

**Starter prompt:**
```
Read every rule that governs the digital deposit account journey:
server/rules/*.js, docs/rules/*.md, and any inline business logic in
client/src/pages/*.jsx (required fields, what happens on validation
failure, which steps are conditional). Consolidate all of it into a single
business-rules/deposit-account-digital.md file, organized by journey step,
written in plain language, with a note on where each rule lives in the
codebase. Flag anything that reads as a rule but isn't explicitly stated
anywhere, rather than guessing at it.
```
