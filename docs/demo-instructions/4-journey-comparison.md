# Instruction Sheet 4 — Journey Comparison Across Channel

Live-demo version of "Demo 4" in `CLAUDE.md`. Independent of the other sheets — both journeys already exist permanently on `main`, so this just needs to read them.

## Before you start

- Google Chrome must be installed — the PDF export step uses headless Chrome's print-to-PDF (`pandoc`/`wkhtmltopdf` aren't installed in this environment, and weren't needed).

## The prompt

Paste this into Claude Code — one prompt, markdown and PDF both:

```
Compare existing-journeys/deposit-digital.json and existing-journeys/deposit-branch.json.
Produce a markdown table with one row per step across the union of both
journeys, showing whether each step is shared, digital-only, branch-only, or
shared-but-the-rule-differs, and a plain-language note on any rule
differences (e.g. consent capture, funding methods, identity verification
approach). Save it as comparisons/digital-vs-branch.md.

Then convert that markdown into a styled HTML file and render it to PDF
using headless Chrome print-to-pdf, landscape orientation (this is a wide
table) — this is a leadership-facing deliverable, not a repo artifact, so
it needs to leave this step as a PDF, not raw markdown. House style: serif
body text (Georgia), sans-serif headers (Helvetica/Arial) in dark red
(#7a1f2b) with a bottom border, a dark red table header row (#7a1f2b, white
text), alternating light row shading, and small colored badges for the
category column - green (#e8f0e8/#2f5a35) for shared, amber
(#fdf6e3/#8a6d1a) for shared-but-differs, blue (#eef3f7/#2a5075) for
digital-only, red (#fdf0ef/#7a1f2b) for branch-only. Save the HTML and PDF
next to the source markdown, e.g. comparisons/digital-vs-branch.pdf.
```

## What this should produce

`comparisons/digital-vs-branch.md` (source) and `comparisons/digital-vs-branch.pdf` (the actual deliverable) — one markdown table, one row per step across the union of both journeys (**19 rows**: 9 shared with no rule difference + 3 shared with a rule difference + 2 digital-only + 5 branch-only), with columns roughly: step name, present in digital?, present in branch?, category, plain-language note. The PDF should render in landscape with the four-color badge styling above, not just a plain markdown table dump.

Things worth double-checking in the output specifically, since they're easy to get wrong:

- **Identity verification is now genuinely digital-only, not a shared step.** Branch replaced it entirely with a different, cross-device mechanism (see `docs/rules/remote-identity-verification.md`) — this isn't the same page working differently per channel, it's two unrelated implementations. A run that lumps "Verify identity (intro)" and "Identity verification (form)" in as "shared" is wrong.
- **Account agreements, Fund account, and Confirmation are "shared" steps that still carry a rule difference** — same module/page reused on both channels, but the actual behavior differs (branch adds e-signature after the agreement checkboxes, branch swaps e-Transfer for cash, branch confirmation adds the FA note and QR code). These shouldn't get lumped in as identical just because it's the same file.
- **Card added is genuinely identical on both channels** — same animation, same trigger condition (credit offer accepted). Don't assume a branch-specific difference exists just because it's a newer/less obviously-shared-sounding step.

## How to verify it worked

1. Row count is 19 (9 + 3 + 2 + 5), not 14 — that was accurate for an earlier, simpler branch journey that no longer reflects what's built.
2. Spot-check rows against the actual JSON files (`existing-journeys/deposit-digital.json` and `existing-journeys/deposit-branch.json`) to confirm the category calls are correct.
3. Confirm it reads cleanly as a table someone could screenshot straight into a slide.
4. The PDF should actually open and render — headless Chrome print-to-pdf can silently produce a blank or malformed file if the HTML has an error; open it and check before treating it as done.

If it undercounts steps, misses the digital-only category entirely, or blurs the "shared but rule differs" distinction, that's the thing to fix live rather than ship as-is — it undercuts the "not a black box" point of the whole demo. If you're short on time, the reference copy is `impact-briefs/digital-vs-branch.md` and `impact-briefs/digital-vs-branch.pdf`.
