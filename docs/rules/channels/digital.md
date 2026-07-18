# Channel Rules: Digital (SYNTHETIC — demo only)

Applies to self-serve onboarding completed by the client with no banker present. This is the channel the app in this repo implements today.

- Phone + OTP is the applicant's identity/MFA channel throughout the session.
- Identity verification is document capture + liveness check (mocked). No staff attestation exists in this channel.
- Consent is captured via checkbox + timestamp (Terms & conditions step) — no e-signature.
- Funding supports transfer from a linked account only (see `server/rules/funding.js`).
- There is no banker involved anywhere in this journey.
