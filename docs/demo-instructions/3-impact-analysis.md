# Instruction Sheet 3 — Plain-English Impact Analysis

Live-demo version of "Demo 3" in `CLAUDE.md`. Run this **after** Instruction Sheets 1 and 2 — it needs the branch journey JSON and module files to exist so it has both journeys to reason about, not just digital.

## Before you start

- Instruction Sheets 1 and 2 should already be done on this branch (FA journey prototype + `existing-journeys/deposit-branch.json` + the 3 new module files).
- Google Chrome must be installed — the PDF export step uses headless Chrome's print-to-PDF (`pandoc`/`wkhtmltopdf` aren't installed in this environment, and weren't needed).
- Otherwise no new setup — this step only reads files, it doesn't touch the running app.

## The prompt

Paste this into Claude Code — one prompt, markdown and PDF both:

```
I'm proposing we add joint-account support to the branch deposit account
journey — two applicants completing one application together. Read the
current digital and branch journeys, the modules in /modules, and our rules
docs in docs/rules, then write a plain-English impact brief: what would need
to change (steps, rules, the e-signature flow), which channels/segments are
affected, and what's still an open question for the business to decide. Save
it as impact-briefs/joint-account-branch.md.

For every step listed under "needs real changes," also add an Estimated
Effort section: a T-shirt size (S/M/L/XL) and sprint count for a single
developer, assuming 2-week sprints, real production scope (not a demo-repo
prototype), and that the business has already answered the open questions
above before development starts. Size one foundational item first if the
steps share a common dependency (e.g. a data model change that unlocks
several steps at once), then size each step's incremental effort on top of
that foundation rather than pricing the foundation into every row. Call out
explicitly if any single open question would swing an estimate's size
materially — don't bury that in a footnote. Close with a rollup total and a
one-line caveat that a real team would parallelize this, so calendar time
would shrink even though total effort wouldn't.

Then convert that markdown into a styled HTML file and render it to PDF
using headless Chrome print-to-pdf — this is a leadership-facing
deliverable, not a repo artifact, so it needs to leave this step as a PDF,
not raw markdown. House style: serif body text (Georgia), sans-serif
headers (Helvetica/Arial) in dark red (#7a1f2b) with a bottom border, an
amber callout box (#a8863a left border, #f5f2ea background) for the
"bottom line" and assumptions callouts, a red callout box (#b23a2e left
border, #fdf0ef background) for open questions and flagged items, and a
plain bordered table with a dark red header row for the effort-sizing
table. Save the HTML and PDF next to the source markdown, e.g.
impact-briefs/joint-account-branch.pdf.
```

## What this should produce

`impact-briefs/joint-account-branch.md` (source) and `impact-briefs/joint-account-branch.pdf` (the actual deliverable), organized roughly as:

- Which steps need real changes vs. which are likely unchanged, and why — grounded in what the actual code and rules currently assume (most of this repo assumes exactly one applicant throughout).
- Channels/segments affected — this is scoped to branch, but it's reasonable for the brief to flag if digital would eventually need to be asked about too.
- A clearly separated list of **open questions the repo has no answer to** — e.g. how credit eligibility works with two incomes, whether both applicants must clear the age gate, ownership/liability model, what happens if one applicant fails a check the other passes, who gets notified, and whether the second applicant needs their own authenticated session. These should read as genuine open questions, not invented answers.
- An **Estimated Effort** section: one foundational item (if applicable) plus a per-step table with size, sprint count, and rationale, closing with a rollup total and the parallelization caveat.
- A short "sources used" list pointing back to the actual files it read.
- Rendered as a formatted PDF matching the house style above, not left as plain markdown.

## How to verify it worked

1. Every claim in the brief should trace back to something actually in the repo — if it says "the rule doesn't account for X," that should be verifiably true by checking the referenced file, not an assumption.
2. Confirm there's a real, visible separation between "what changes" (derived from the repo) and "open questions" (genuinely undecided) — this is the whole point of the demo. If it invents an answer instead of flagging something as open, that's a miss worth calling out live.
3. Effort sizing should state its assumptions up front (production scope, sprint length, questions-resolved) rather than leaving them implicit — if two runs of this demo would produce different numbers because the assumptions silently drifted, that's worth catching before presenting.
4. The PDF should actually open and render — headless Chrome print-to-pdf can silently produce a blank or malformed file if the HTML has an error; open it and check before treating it as done.
5. Read it as if you're the non-technical audience — does it make sense without opening any code?

If the output reads thin or starts guessing at business answers, the reference version (markdown only, no PDF, no effort sizing — those were added after this fallback was created) is at `impact-briefs/joint-account-branch.md` on the `demo/impact-comparison-fallback` branch on GitHub.
