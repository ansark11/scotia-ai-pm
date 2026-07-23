# Instruction Sheet 4 — Journey Comparison Across Channel

Live-demo version of "Demo 4" in `CLAUDE.md`. Run this **after** Instruction Sheets 1 and 2 (needs both journey JSONs to exist) — can run before or after Sheet 3, they're independent of each other.

## Before you start

- Instruction Sheets 1 and 2 should already be done on this branch — specifically, `existing-journeys/deposit-branch.json` needs to exist alongside `existing-journeys/deposit-digital.json`.
- Google Chrome must be installed — the PDF export step uses headless Chrome's print-to-PDF (`pandoc`/`wkhtmltopdf` aren't installed in this environment, and weren't needed).

## Step 1 — the markdown prompt

Paste this into Claude Code:

```
Compare existing-journeys/deposit-digital.json and the branch journey JSON we
created in demo 2. Produce a markdown table with one row per step, showing
whether each step is shared or channel-specific, and a plain-language note on
any rule differences (e.g. consent capture, funding methods). Save it as
comparisons/digital-vs-branch.md.
```

## Step 2 — render it as PDF

This is a leadership-facing deliverable, not a repo artifact — it needs to leave this step as a PDF, not raw markdown. Paste this next:

```
Convert comparisons/digital-vs-branch.md into a styled HTML file and render
it to PDF using headless Chrome print-to-pdf, landscape orientation (this is
a wide table). House style: serif body text (Georgia), sans-serif headers
(Helvetica/Arial) in dark red (#7a1f2b) with a bottom border, a dark red
table header row (#7a1f2b, white text), alternating light row shading, and
small colored badges for the shared/channel-specific column - green
(#e8f0e8 background, #2f5a35 text) for shared, red (#fdf0ef background,
#7a1f2b text) for channel-specific. Save the HTML and PDF next to the
source markdown, e.g. comparisons/digital-vs-branch.pdf.
```

## What this should produce

`comparisons/digital-vs-branch.md` (source) and `comparisons/digital-vs-branch.pdf` (the actual deliverable) — one markdown table, one row per step across the union of both journeys (14 rows: 11 shared steps + 3 branch-only steps), with columns roughly: step name, present in digital?, present in branch?, shared vs. channel-specific, and a plain-language rule difference note. The PDF should render in landscape with the badge styling above, not just a plain markdown table dump.

Two things worth double-checking in the output specifically, since they're easy to get wrong:

- **Terms & conditions, Fund account, and Confirmation are "shared" steps that still carry a rule difference** — same module/page reused on both channels, but the actual behavior differs (branch adds e-signature after consent, branch adds cash/cheque funding, branch confirmation names the FA). These shouldn't get lumped in as identical just because it's the same file.
- **Identity verification is currently identical on both channels in the code**, even though the branch rules doc says it's *expected* to eventually move to physical ID review. The comparison should reflect what's actually implemented today, not what a rules doc aspires to — call out the aspiration as a note, not as a present-tense rule difference.

## How to verify it worked

1. Row count matches: 11 shared + 3 branch-only = 14 rows.
2. Spot-check 2-3 rows against the actual JSON files (`existing-journeys/deposit-digital.json` and `existing-journeys/deposit-branch.json`) to confirm the shared/channel-specific calls are correct.
3. Confirm it reads cleanly as a table someone could screenshot straight into a slide.
4. The PDF should actually open and render — headless Chrome print-to-pdf can silently produce a blank or malformed file if the HTML has an error; open it and check before treating it as done.

If it undercounts steps or blurs the "shared but rule differs" distinction, that's the thing to fix live rather than ship as-is — it undercuts the "not a black box" point of the whole demo.
