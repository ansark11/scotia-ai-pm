# Instruction Sheet 5 — Business Rule Extractor

Live-demo version of "Demo 5" in `CLAUDE.md`. Independent of demos 1-4 — this one only reads the existing **digital** journey (code + docs), so it can run on a clean `main` with no prior setup.

## Before you start

Nothing extra needed. This demo doesn't touch the running app or any other journey artifact — it only reads and writes one new markdown file.

## Talking point to say before running it

This is the demo with a built-in caveat, worth saying out loud rather than letting it pass unremarked: it works cleanly here because this repo's rules are already explicit and contained in a handful of small files. A real extractor over a production codebase would need human review before anyone acts on its output, not blind trust — especially anywhere the logic is implicit rather than written down.

## The prompt

Paste this into Claude Code:

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

## What this should produce

`business-rules/deposit-account-digital.md`, one section per journey step (11 sections — Overview through Confirmation), each rule written in plain language with a source pointer back to the actual file(s) it lives in. A closing summary of anything flagged as a mismatch or gap.

Specific things a good run should catch, since they're genuinely present in this repo (not hypothetical):

- **Phone & OTP and Fund account have rules that exist only in code** — `server/rules/phone.js` and `server/rules/funding.js` have no `docs/rules/*.md` mirror, unlike every other rule area.
- **Identity verification's doc claims a name-matching rule** (`docs/rules/identity-verification.md`) that `server/rules/identity.js` never actually implements.
- **Employment info's doc claims unemployed applicants default to $0 income** (`docs/rules/employment-info.md`) but `EmploymentInfo.jsx` never resets or defaults that field.
- **Terms & conditions has no server-side validation at all** — consent is enforced only by the Continue button staying disabled client-side, unlike every other step which has a backing `/api/*` check.

## How to verify it worked

1. All 11 digital journey steps are represented, in order.
2. Every rule cites a real file path — spot-check 2-3 against the actual source to confirm it's not paraphrased or invented.
3. Confirm the four items above (or equivalent genuine mismatches) show up as explicit flags, not silently smoothed over or guessed at.
4. Read it as the non-technical audience — does each rule make sense without opening any code?

If it misses the doc/code mismatches above and just describes the code cleanly with no flags, that's a miss worth catching live — the entire point of this demo is proving it doesn't blindly trust either source on its own.
