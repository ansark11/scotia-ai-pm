# Channel Rules: Branch-Assisted (SYNTHETIC — demo only, target state for a future demo)

Applies to onboarding completed in person with a Financial Advisor (FA). This channel does not exist in the codebase yet.

- The journey must begin with an FA login / client session-start step, before Overview, so the system knows which banker is assisting and which client record is being opened.
- Profile setup, Identity verification, Address info, Employment info, Credit cross-sell, and Tax questions are the same as digital and should be reused as-is — only who is present, and how consent/funding are captured, changes.
- Because a banker is present, consent cannot rely on a checkbox alone. The journey should capture two e-signatures — one from the client, one from the FA — after Terms & conditions and before Fund account.
- Funding supports cash and cheque in addition to transfer (`server/rules/funding.js` already branches on `channel === 'branch'` for this).
- Confirmation should note that a Financial Advisor assisted the client.
