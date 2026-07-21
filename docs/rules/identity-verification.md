# Identity Verification Rules (SYNTHETIC — demo only)

Mirrors `server/rules/identity.js`.

- Accepted ID types: Driver's License, Passport, Provincial ID Card, Permanent Resident Card.
- The ID must not be expired — expiry date must be in the future.
- Identity match requires full name, email, and phone number to all be on file and present, not just the name — matching against a single field isn't sufficient. In this demo that means the values captured in Profile setup and Phone & OTP must all be present when this step submits; it's a presence/consistency check, not fuzzy name-matching or document OCR.
- This step immediately follows Profile setup and precedes Address info.
