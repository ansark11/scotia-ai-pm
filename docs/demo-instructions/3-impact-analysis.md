# Instruction Sheet 3 — Plain-English Impact Analysis

Live-demo version of "Demo 3" in `CLAUDE.md`. **Rewritten** — the original version of this sheet proposed joint-account support for the *branch* journey and depended on Sheets 1 and 2. That scope was superseded by a product-owner-defined async invite model, digital-only: independent of the other sheets.

## Before you start

- `existing-journeys/deposit-digital.json`, the files in `/modules`, and `docs/rules/*.md` should be present — no branch journey or other sheets required.
- `docs/rules/remote-identity-verification.md` should also be present — it's a relevant existing pattern this brief references (branch's remote ID-V hand-off), not something this demo builds.
- Google Chrome must be installed for the PDF export step.
- **Live output goes to `analysis/`, not `impact-briefs/`.** `impact-briefs/` is the fallback vault — if the live prompt saved there too, a successful run would silently overwrite the known-good fallback sample, defeating the point of having one.

## The prompt

Paste this into Claude Code — one prompt, markdown and PDF both:

```
I'm proposing we add joint-account support to the digital deposit account
journey — two applicants opening one account together, but not in one
sitting. User #1 completes the existing digital journey largely as-is,
indicating partway through that this is a joint account and providing User
#2's name and email. Once User #1 finishes, User #2 gets an emailed invite
link into a separate, shorter flow to complete their own required steps
(DOB, phone, address, employment info, tax questions, consent, and identity
verification) on their own device. The account is pending until both are
done.

Read the current digital journey (existing-journeys/deposit-digital.json,
the modules in /modules, docs/rules/*.md), and also read
docs/rules/remote-identity-verification.md as a relevant existing pattern
already built for branch. Write a plain-English impact brief: which of User
#1's existing steps need to change vs. stay untouched, what User #2's new
separate flow needs to reuse vs. skip, what new cross-cutting system work
this requires (pending state, notification triggers, invite token), and
what's still an open question for the business to decide — including
whether this should share a mechanism with branch's remote ID-V pattern,
and whether the new per-product Terms & Conditions accordion needs its own
joint-ownership agreement card. Save it as analysis/joint-account-digital.md.

For every item that needs real engineering work, also add an Estimated
Effort section: a T-shirt size (S/M/L/XL) and sprint count for a single
developer, assuming 2-week sprints, real production scope (not a demo-repo
prototype), and that the business has already answered the open questions
above before development starts. Size the foundational cross-cutting items
first (data model/token handling, notification triggers), then size each
remaining item's incremental effort on top of that. Call out explicitly if
any single open question would swing an estimate's size materially. Close
with a rollup total and a one-line caveat that a real team would
parallelize this.

Then convert that markdown into a styled HTML file and render it to PDF
using headless Chrome print-to-pdf — this is a leadership-facing
deliverable, not a repo artifact. House style: serif body text (Georgia),
sans-serif headers (Helvetica/Arial) in dark red (#7a1f2b) with a bottom
border, an amber callout box (#a8863a left border, #f5f2ea background) for
the "bottom line" and assumptions callouts, a blue callout box (#3a6ea5
left border, #eef3f7 background) for "what's new" observations that
reference the branch remote-ID-V pattern, a red callout box (#b23a2e left
border, #fdf0ef background) for open questions, and a plain bordered table
with a dark red header row for the effort-sizing table. Save the HTML and
PDF next to the source markdown, e.g. analysis/joint-account-digital.pdf.
```

## What this should produce

`analysis/joint-account-digital.md` (source) and `analysis/joint-account-digital.pdf` (the actual deliverable), organized roughly as:

- **Steps affected — User #1's journey**: Overview and Confirmation need changes (new capture point; richer messaging fit into Confirmation's multi-section layout); everything else stays untouched.
- **New: User #2's journey** — a separate flow, not a modification to existing steps, that explicitly notes the branch remote-ID-V pattern as a relevant precedent for the identity-verification portion (not identical — branch is same-visit/real-time, this is async over potentially days).
- **New: cross-cutting system needs** — pending-completion state, two notification triggers, invite token.
- **Open questions** — including whether to unify with branch's remote-ID-V mechanism, and whether Terms & Conditions needs a joint-ownership agreement card now that it's per-product accordion cards.
- **Estimated Effort** — foundational items, then per-item table, then a rollup total with the parallelization caveat.
- A short "sources used" list, including `docs/rules/remote-identity-verification.md`.

## How to verify it worked

1. Every claim should trace back to something actually in the repo — including the branch remote-ID-V reference, which should point at real files, not a vague gesture at "branch has something similar."
2. Real separation between "what changes" (derived from the repo) and "open questions" (genuinely undecided) — the whole point of this demo.
3. Effort sizing states its assumptions up front rather than leaving them implicit.
4. The PDF actually opens and renders — check before treating it as done.
5. Confirm it saved to `analysis/`, not `impact-briefs/` — if it landed in `impact-briefs/`, the fallback sample there just got silently overwritten and needs restoring from git before you present.
6. Read it as the non-technical audience — does it make sense without opening any code?

If the output reads thin or starts guessing at business answers, the reference version is `impact-briefs/joint-account-digital.md` and `impact-briefs/joint-account-digital.pdf`.
