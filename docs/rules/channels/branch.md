# Channel Rules: Branch-Assisted (SYNTHETIC — demo only)

Applies to onboarding completed in person with a Financial Advisor (FA). Built into the codebase — see `existing-journeys/deposit-branch.json`.

- The journey begins with an FA login / client session-start step, before Overview, so the system knows which banker is assisting and which client record is being opened.
- Profile setup, Address info, Employment info, Credit cross-sell, and Tax questions are the same as digital and reused as-is — only who is present, and how identity, consent, and funding are captured, changes.
- **Identity verification must happen on the customer's own device, not the FA's.** The FA's screen sends the customer a link (SMS or email); the customer completes ID-V on their own device; the FA's screen detects completion and shows a moment-of-delight transition before continuing. See `docs/rules/remote-identity-verification.md`. This replaces an earlier assumption that branch would move to in-person physical ID review by the FA — that's not what got built.
- Because a banker is present, consent cannot rely on the account-agreement checkboxes alone. The journey captures two e-signatures — one from the client, one from the FA — after Terms & conditions and before Fund account.
- Funding supports cash and cheque in addition to transfer (`server/rules/funding.js` branches on `channel === 'branch'` for this) — no Interac e-Transfer option on branch, unlike digital.
- Confirmation notes that a Financial Advisor assisted the client, and additionally shows a QR code with a short infotip so the FA can hand the device to the customer to set up their online banking access. Digital doesn't show this — a digital customer already has full access after completing everything themselves.
