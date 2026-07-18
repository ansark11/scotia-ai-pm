# Instruction Sheet 3 — Plain-English Impact Analysis

Live-demo version of "Demo 3" in `CLAUDE.md`. Run this **after** Instruction Sheets 1 and 2 — it needs the branch journey JSON and module files to exist so it has both journeys to reason about, not just digital.

## Before you start

- Instruction Sheets 1 and 2 should already be done on this branch (FA journey prototype + `existing-journeys/deposit-branch.json` + the 3 new module files).
- No new setup beyond that — this step only reads files, it doesn't touch the running app.

## The prompt

Paste this into Claude Code:

```
I'm proposing we add joint-account support to the branch deposit account
journey — two applicants completing one application together. Read the
current digital and branch journeys, the modules in /modules, and our rules
docs in docs/rules, then write a plain-English impact brief: what would need
to change (steps, rules, the e-signature flow), which channels/segments are
affected, and what's still an open question for the business to decide. Save
it as impact-briefs/joint-account-branch.md.
```

## What this should produce

`impact-briefs/joint-account-branch.md`, organized roughly as:

- Which steps need real changes vs. which are likely unchanged, and why — grounded in what the actual code and rules currently assume (most of this repo assumes exactly one applicant throughout).
- Channels/segments affected — this is scoped to branch, but it's reasonable for the brief to flag if digital would eventually need to be asked about too.
- A clearly separated list of **open questions the repo has no answer to** — e.g. how credit eligibility works with two incomes, whether both applicants must clear the age gate, ownership/liability model, what happens if one applicant fails a check the other passes, who gets notified. These should read as genuine open questions, not invented answers.
- A short "sources used" list pointing back to the actual files it read.

## How to verify it worked

1. Every claim in the brief should trace back to something actually in the repo — if it says "the rule doesn't account for X," that should be verifiably true by checking the referenced file, not an assumption.
2. Confirm there's a real, visible separation between "what changes" (derived from the repo) and "open questions" (genuinely undecided) — this is the whole point of the demo. If it invents an answer instead of flagging something as open, that's a miss worth calling out live.
3. Read it as if you're the non-technical audience — does it make sense without opening any code?

If the output reads thin or starts guessing at business answers, the reference version is at `impact-briefs/joint-account-branch.md` on the `demo/impact-comparison-fallback` branch on GitHub.
