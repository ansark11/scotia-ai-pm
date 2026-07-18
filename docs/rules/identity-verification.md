# Identity Verification Rules (SYNTHETIC — demo only)

Mirrors `server/rules/identity.js`.

- Accepted ID types: Driver's License, Passport, Provincial ID Card, Permanent Resident Card.
- The ID must not be expired — expiry date must be in the future.
- The name on the ID should reasonably match the full legal name captured in Profile setup (not fuzzy-matched in this demo, but stated as a rule).
- This step immediately follows Profile setup and precedes Address info.
