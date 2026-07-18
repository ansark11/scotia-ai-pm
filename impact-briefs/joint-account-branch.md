# Impact Brief: Joint-Account Support — Branch Deposit Account Journey

SYNTHETIC — demo only. Written from the current repo state (journeys, modules, rules docs, and the actual client/server implementation), not from outside knowledge.

## Proposed change

Two applicants complete one deposit-account application together, on the branch-assisted journey.

## Bottom line

Every step and rule in the current journey is built around a single applicant — one name, one ID, one income figure, one signature, one email. The branch journey's *sequence* of steps mostly still makes sense for two applicants, but almost every step's *content* would need real changes, not just a UI tweak. Two items below are genuine business decisions, not engineering ones — see Open Questions.

## Steps affected

### Need real changes

- **Profile setup** — captures one `fullName`/`dob`/`email` today. Would need to capture two applicants' identities, or repeat this step per applicant.
- **Identity verification** — one ID document today. Both applicants presumably need independent ID verification, each subject to the existing expiry/type rules (`docs/rules/identity-verification.md`).
- **Employment info** — one `employmentStatus`/`annualIncome` today, and this is what feeds the credit cross-sell eligibility check. Whose income counts for a joint application is unresolved — see Open Questions.
- **Credit cross-sell** — the eligibility rule (`server/rules/creditOffer.js`, `docs/rules/credit-cross-sell.md`) is written entirely in terms of one applicant's income, employment status, and age. There is no joint-income concept anywhere in it today.
- **Client e-signature** — one client signs today. A joint application presumably needs both applicants to sign before the FA co-signs; the branch journey's step dependency (client signs → FA signs → funding) would need to allow for two client signatures, not one.
- **Confirmation** — notifies one email and returns one `accountNumber`. The mock data record (`server/data/mockDb.js`) has no concept of multiple applicants or shared ownership at all — this is a data-model gap, not just a UI one.

### Likely unchanged

- **FA login** — no applicant-specific logic; stays one FA per session regardless of applicant count.
- **Address info** — the underlying rules (`docs/rules/address-info.md`) don't reference applicant count, so the rule itself likely doesn't change, only who it's collected for. Whether both applicants must share one address isn't addressed either way and would need confirming.
- **Tax questions** — the two declarations are individual by nature and would presumably be asked per applicant, but the rule text itself (`docs/rules/tax-questions.md`) doesn't need to change.
- **Terms & conditions** — the terms/disclosure content is the same regardless of applicant count; only the "who consents" part changes, which is really the e-signature step's problem.
- **Fund account** — `server/rules/funding.js` has no concept of applicant count; funding source/amount rules are unaffected.

## Channels/segments impacted

- As scoped, this is branch-only.
- Worth flagging even though it's out of scope here: the digital channel has no e-signature step to extend into a two-signer version, since its consent model is checkbox + timestamp (`docs/rules/channels/digital.md`). If joint accounts become a real product ask, digital will likely come up next — noting it now rather than letting it surface later as scope creep.

## Open questions for the business (the repo has no answer to these)

1. **Credit eligibility basis** — is eligibility based on one applicant's income, combined income, or the higher/lower earner? The current rule has no joint-income concept at all; this needs an underwriting decision, not an engineering guess.
2. **Age gate per applicant** — does each applicant independently need to clear the 18+ gate (`docs/rules/profile-setup.md`), or could a minor be a secondary holder? Not addressed anywhere today.
3. **Ownership/liability model** — joint-and-several, or one primary holder? This affects the account structure itself, and the current data model (`server/data/mockDb.js`) has no field for it at all.
4. **Partial failure handling** — if one applicant fails identity verification or the credit-offer eligibility check but the other doesn't, does the whole application stop, or proceed as single-owner? No existing rule covers this.
5. **Notification target** — does confirmation go to both emails, one primary email, or a shared one? Today it assumes exactly one.

## Sources used

- Journeys: `existing-journeys/deposit-digital.json`, `existing-journeys/deposit-branch.json`
- Modules: `/modules/*.json`
- Rules docs: `docs/rules/*.md`, `docs/rules/channels/branch.md`, `docs/rules/channels/digital.md`
- Implementation reality check: `client/src/context/JourneyContext.jsx`, `server/rules/*.js`, `server/data/mockDb.js`
