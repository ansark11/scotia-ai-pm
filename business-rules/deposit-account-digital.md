# Business Rules: Digital Deposit Account Journey

SYNTHETIC — demo only. Consolidated from `server/rules/*.js`, `server/data/*.js`, `docs/rules/*.md`, and inline logic in `client/src/pages/*.jsx`. Updated against the current 14-step journey after its UX redesign — two flags from the previous version of this file (missing docs for Phone & OTP and Fund account) are now closed; one new flag was found.

A note on trustworthiness: this works cleanly here because this repo's rules are already explicit and contained in a handful of small files. A real extractor over a production codebase would need human review before anyone acts on it, not blind trust — especially anywhere logic is implicit rather than written down, which is exactly what the "Flagged" callouts below are pointing at.

---

## 1. Overview

No validation rule at this step. Displays the selected product name and a bulleted benefits list. Purely informational.

## 2. Phone number

Phone number must be a 10-digit number (non-digit characters stripped before counting). — `server/rules/phone.js`, `docs/rules/phone-otp.md`

## 3. Verify code (OTP)

The one-time code is mocked: the only code that ever verifies is `123456`. A real implementation would text an actual random code. — `server/rules/phone.js`, `docs/rules/phone-otp.md`

## 4. Profile setup

- Full name, date of birth, and email are required. — `client/src/pages/ProfileSetup.jsx`, `server/rules/profile.js`
- Applicant must be at least 18 years old — the eligibility gate for the entire journey. — `server/rules/profile.js`, `docs/rules/profile-setup.md`
- Email becomes the channel for confirmation/welcome messages later. — `docs/rules/profile-setup.md`

## 5. Verify identity (intro)

No validation rule — a splash screen that sets expectations before the identity form. Captures no data.

## 6. Identity verification (form)

- Accepted ID types: Driver's License, Passport, Provincial ID Card, Permanent Resident Card. — `docs/rules/identity-verification.md`
- ID must not be expired. — `server/rules/identity.js`
- Identity match requires full name, email, and phone number to all be on file — not name alone. — `server/rules/identity.js`, `docs/rules/identity-verification.md`

## 7. Address info

- Must be a Canadian residential address — PO boxes rejected. — `server/rules/address.js`
- Supported provinces: ON, BC, AB, QC, MB, NS, NB, SK, PE, NL.
- Postal code must match standard Canadian format.
- Province captured here drives which provincial disclosure appears later, in Account agreements.

## 8. Employment info

- Fields shown branch by employment status (Employed/Self-employed, Student, Retired, Unemployed). — `client/src/pages/EmploymentInfo.jsx`, `docs/rules/employment-info.md`
- Annual income is always required and feeds the credit cross-sell eligibility check on submit.

## 9. Credit card offer (conditional step)

Only shown if all hold, checked on Employment info's submit — the screen never appears at all for non-qualifying applicants:

- Annual income ≥ $24,000
- Employment status is Employed or Self-employed
- Applicant is at least 21 years old (higher than the 18+ minimum for the account itself)

If qualifying, displayed credit limit = 20% of annual income, capped at $15,000, rounded to the nearest $100. — `server/rules/creditOffer.js`, `docs/rules/credit-cross-sell.md`

## 10. Card added (conditional step)

No validation rule — an animated transition shown only if the credit card offer was accepted, then auto-advances to Tax questions after ~2 seconds. — `docs/rules/credit-cross-sell.md`

## 11. Tax questions

Captures two declarations as data only. Neither branches nor gates the journey — no server call from this step at all, unlike every other step.

## 12. Account agreements (Terms & Conditions)

- Displayed as collapsible agreement cards: a chequing account agreement (always, expanded by default) and a credit card agreement (only if the offer was accepted, collapsed by default). — `docs/rules/terms-and-conditions.md`
- Each visible card has its own consent checkbox; continuing requires all visible cards checked, not just one.

**Flagged:** unlike every other step, this one has no server-side validation call at all — consent is enforced purely client-side, via the Continue button staying disabled until every visible checkbox is checked. Nothing server-side stops a bypassed request from reaching Fund account.

## 13. Fund account

- Presented as selectable option cards, then a deposit amount field. — `client/src/pages/FundAccount.jsx`, `docs/rules/fund-account.md`
- Digital channel offers transfer, Interac e-Transfer, or cheque deposit. — `server/rules/funding.js`
- Minimum initial deposit is $25.

## 14. Confirmation

- Records the accumulated application data and returns a generated account number. — `server/data/mockDb.js`
- If the applicant accepted the credit card offer, a **separate** account number is generated for that product and shown alongside the chequing account in the "products opened" list. — `server/data/mockDb.js`
- Shows current balance (the funding amount captured in the previous step) and, if a credit card was added, its mail-delivery timing (5-7 business days).

**Flagged:** the second, credit-card-specific account number (`cardAccountNumber` in `server/data/mockDb.js`) is generated whenever `creditOfferAccepted` is true — this specific behavior has no mirror in `docs/rules/credit-cross-sell.md` or anywhere else. The doc mentions the card's delivery timing but not that it gets its own distinct account number.

---

## Summary of flags

1. **Account agreements** consent is enforced client-side only; there's no server-side check backing it up, unlike every other gated step. *(Carried forward from the previous version of this file — still true.)*
2. **Confirmation's second account number** for an accepted credit card is generated in code (`server/data/mockDb.js`) with no plain-language mirror anywhere. *(New — found while re-verifying this file against the redesigned journey.)*

Two flags from the previous version of this file — Phone & OTP and Fund account having no `docs/rules/*.md` mirror — are now closed: `docs/rules/phone-otp.md` and `docs/rules/fund-account.md` both exist and are accurate as of this pass.
