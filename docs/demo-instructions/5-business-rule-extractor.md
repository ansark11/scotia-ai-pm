# Instruction Sheet 5 — Business Rule Extractor

Live-demo version of "Demo 5" in `CLAUDE.md`. Independent of the other sheets — this one only reads the existing **digital** journey (code + docs), so it can run on a clean `main` with no prior setup.

## Before you start

- Google Chrome must be installed — the PDF export step uses headless Chrome's print-to-PDF (`pandoc`/`wkhtmltopdf` aren't installed in this environment, and weren't needed).
- Otherwise nothing extra needed. This demo doesn't touch the running app or any other journey artifact — it only reads existing files and writes new ones.

## Talking point to say before running it

This is the demo with a built-in caveat, worth saying out loud rather than letting it pass unremarked: it works cleanly here because this repo's rules are already explicit and contained in a handful of small files. A real extractor over a production codebase would need human review before anyone acts on its output, not blind trust — especially anywhere the logic is implicit rather than written down.

## The prompt

Paste this into Claude Code — one prompt, markdown and PDF both:

```
Read every rule that governs the digital deposit account journey:
server/rules/*.js, server/data/*.js, docs/rules/*.md, and any inline
business logic in client/src/pages/*.jsx (required fields, what happens on
validation failure, which steps are conditional). Consolidate all of it
into a single business-rules/deposit-account-digital.md file, organized by
journey step, written in plain language, with a note on where each rule
lives in the codebase. Flag anything that reads as a rule but isn't
explicitly stated anywhere, rather than guessing at it.

Then convert that markdown into a styled HTML file and render it to PDF
using headless Chrome print-to-pdf — this is a leadership-facing
deliverable, not a repo artifact, so it needs to leave this step as a PDF,
not raw markdown. House style: serif body text (Georgia), sans-serif
headers (Helvetica/Arial) in dark red (#7a1f2b) with a bottom border, an
amber callout box (#a8863a left border, #f5f2ea background) for the
trustworthiness caveat at the top, and a red callout box (#b23a2e left
border, #fdf0ef background) for each flagged mismatch. Save the HTML and
PDF next to the source markdown, e.g.
business-rules/deposit-account-digital.pdf.
```

## What this should produce

`business-rules/deposit-account-digital.md` (source) and `business-rules/deposit-account-digital.pdf` (the actual deliverable), one section per journey step (**14 sections** — Overview through Confirmation), each rule written in plain language with a source pointer back to the actual file(s) it lives in. A closing summary of anything flagged as a mismatch or gap.

Specific things a good run should catch, since they're genuinely present in this repo today (not hypothetical):

- **Account agreements has no server-side validation at all** — consent is enforced only by the Continue button staying disabled client-side, unlike every other step which has a backing `/api/*` check.
- **Confirmation generates a second, credit-card-specific account number** (`cardAccountNumber` in `server/data/mockDb.js`) whenever the credit offer was accepted — this exists only in code, with no mirror in `docs/rules/credit-cross-sell.md` or anywhere else.

Two mismatches from earlier runs of this demo — Phone & OTP and Fund account having no `docs/rules/*.md` mirror — have since been closed: `docs/rules/phone-otp.md` and `docs/rules/fund-account.md` both exist now. A correct run today should **not** flag those two anymore; if it does, the docs and code have drifted again since.

## How to verify it worked

1. All 14 digital journey steps are represented, in order (not 11 — that was the step count before the journey's UX redesign).
2. Every rule cites a real file path — spot-check 2-3 against the actual source to confirm it's not paraphrased or invented.
3. Confirm the two current items above (or equivalent genuine mismatches) show up as explicit flags, not silently smoothed over or guessed at — and that the two closed ones don't reappear.
4. Read it as the non-technical audience — does each rule make sense without opening any code?
5. The PDF should actually open and render — headless Chrome print-to-pdf can silently produce a blank or malformed file if the HTML has an error; open it and check before treating it as done.

If it misses the mismatches above and just describes the code cleanly with no flags, that's a miss worth catching live — the entire point of this demo is proving it doesn't blindly trust either source on its own. If you're short on time, the reference copy is `impact-briefs/deposit-account-digital-business-rules.md` and `impact-briefs/deposit-account-digital-business-rules.pdf`.
