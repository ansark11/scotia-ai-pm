# Business Rules: Digital Deposit Account Journey

SYNTHETIC — demo only. Consolidated from `server/rules/*.js`, `docs/rules/*.md`, and inline logic in `client/src/pages/*.jsx`. Each rule below notes exactly where it lives so it can be traced back and kept in sync as the code changes.

A note on trustworthiness: this works cleanly here because this repo's rules are already explicit and contained in a handful of small files. A real extractor over a production codebase would need human review before anyone acts on it, not blind trust — especially anywhere logic is implicit rather than written down, which is exactly what the "Flagged" callouts below are pointing at.

---

## 1. Overview

No validation rule at this step. Displays the selected product name and a static description. Purely informational — there's nothing to trace back beyond `client/src/pages/Overview.jsx` itself.

## 2. Phone & OTP

- Phone number must be a 10-digit number (non-digit characters are stripped before counting). — `server/rules/phone.js`
- The one-time code is mocked: the only code that ever verifies successfully is `123456`. A real implementation would text an actual random code. — `server/rules/phone.js`

**Flagged:** neither of these rules has a plain-language mirror in `docs/rules/` — there is no `docs/rules/phone-otp.md`. `phone.js` is the only place this logic is written down.

## 3. Profile setup

- Full name, date of birth, and email are required. — `client/src/pages/ProfileSetup.jsx` (fields), `server/rules/profile.js` (age check only — name/email aren't independently validated server-side beyond being present in the request)
- Applicant must be at least 18 years old, calculated from date of birth. This is the eligibility gate for the entire journey — there's no separate eligibility screen. — `server/rules/profile.js`, `docs/rules/profile-setup.md`
- Email becomes the channel for confirmation/welcome messages later. — `docs/rules/profile-setup.md`, used in `client/src/pages/Confirmation.jsx`

## 4. Identity verification

- Accepted ID types: Driver's License, Passport, Provincial ID Card, Permanent Resident Card. — `client/src/pages/IdentityVerification.jsx`, `docs/rules/identity-verification.md`
- ID must not be expired — expiry date must be in the future. — `server/rules/identity.js`, `docs/rules/identity-verification.md`
- Digital channel does document scan + liveness check (mocked). — `docs/rules/identity-verification.md`

**Flagged:** `docs/rules/identity-verification.md` states "the name on the ID should reasonably match the full legal name captured in Profile setup," but `server/rules/identity.js` doesn't check this at all — it only validates `idType`, `idNumber`, and `idExpiry`. This is a documented rule with no corresponding code — worth confirming with whoever owns this doc whether it's aspirational or an implementation gap.

## 5. Address info

- Must be a Canadian residential address — PO boxes are rejected via pattern match on the address line. — `server/rules/address.js`, `docs/rules/address-info.md`
- Supported provinces: ON, BC, AB, QC, MB, NS, NB, SK, PE, NL. — `server/rules/address.js`, `docs/rules/address-info.md`
- Postal code must match standard Canadian format. — `server/rules/address.js`, `docs/rules/address-info.md`
- The province captured here drives which provincial disclosure appears later, in Terms & conditions. — `docs/rules/address-info.md`, `client/src/pages/TermsAndConditions.jsx`

## 6. Employment info

- Fields shown branch by employment status: Employed/Self-employed → employer name, job title, income; Student → school name, expected graduation date, income; Retired → income only; Unemployed → income only. — `client/src/pages/EmploymentInfo.jsx`, `docs/rules/employment-info.md`
- Annual income is always required and feeds directly into the credit cross-sell eligibility check on submit. — `client/src/pages/EmploymentInfo.jsx`, `docs/rules/employment-info.md`
- This step always continues to either Credit card offer or Tax questions, depending on that eligibility result. — `client/src/pages/EmploymentInfo.jsx`

**Flagged:** `docs/rules/employment-info.md` states the Unemployed income field "defaults to $0," but nothing in `EmploymentInfo.jsx` actually resets or defaults the income value based on employment status — it just carries over whatever value was already in the field. Documented behavior that isn't implemented.

## 7. Credit card offer (conditional step)

Only shown if **all** of the following hold, checked on Employment info's submit — the offer screen never appears at all for non-qualifying applicants, not even briefly:

- Annual income ≥ $24,000
- Employment status is Employed or Self-employed
- Applicant is at least 21 years old (higher than the 18+ minimum for the account itself)

If qualifying, the displayed credit limit is 20% of annual income, capped at $15,000, rounded to the nearest $100. If the applicant accepts, Confirmation later notes a physical card is on its way (5-7 business days); if skipped or never seen, Confirmation makes no mention of a card. — `server/rules/creditOffer.js`, `docs/rules/credit-cross-sell.md`, `client/src/pages/CreditCrossSell.jsx`, `client/src/pages/Confirmation.jsx`

## 8. Tax questions

Captures two declarations (US tax person, tax resident of another country) as data only. Neither answer branches, gates, or otherwise affects the journey in this demo — there's no server call from this step at all, unlike every other step. — `client/src/pages/TaxQuestions.jsx`, `docs/rules/tax-questions.md`

## 9. Terms & conditions

- Displays terms for the selected product plus the provincial disclosure matching the address captured earlier. — `docs/rules/terms-and-conditions.md`
- Requires an explicit consent checkbox before continuing. — `client/src/pages/TermsAndConditions.jsx`, `docs/rules/terms-and-conditions.md`

**Flagged:** unlike every other step, this one has no server-side validation call at all — consent is enforced purely client-side, via the Continue button staying disabled until the checkbox is checked (`client/src/pages/TermsAndConditions.jsx`). Nothing server-side would stop a request with `termsAccepted: false` from reaching Fund account if the UI were bypassed.

## 10. Fund account

- Digital channel supports transfer from a linked account only. — `client/src/pages/FundAccount.jsx`, `server/rules/funding.js`
- Minimum initial deposit is $25. — `server/rules/funding.js`

**Flagged:** neither of these rules has a plain-language mirror in `docs/rules/` — there is no `docs/rules/fund-account.md`. The $25 minimum in particular exists only in `funding.js`, nowhere else.

## 11. Confirmation

No validation rule at this step — it records the accumulated application data and returns a generated account number (`server/data/mockDb.js`). If the applicant accepted the credit card offer, a note about the card appears; otherwise it doesn't. — `client/src/pages/Confirmation.jsx`, `server/data/mockDb.js`

---

## Summary of flags (rules worth a second look, not guesses — genuine mismatches found while tracing code against docs)

1. **Phone & OTP** and **Fund account** rules exist only in code — no `docs/rules/*.md` mirror exists for either, unlike every other step.
2. **Identity verification** — the name-matching rule is documented but not implemented in code.
3. **Employment info** — the "defaults to $0" behavior for Unemployed applicants is documented but not implemented in code.
4. **Terms & conditions** — consent is enforced client-side only; there's no server-side check backing it up, unlike identity, address, funding, and age checks which all have a `/api/*` validation endpoint.
