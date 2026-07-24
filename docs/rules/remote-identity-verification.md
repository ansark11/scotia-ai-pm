# Remote Identity Verification Rules (SYNTHETIC — demo only)

Mirrors `server/data/remoteIdvSessions.js` and the `/api/idv-remote/*` routes in `server/index.js`. Branch-only — see `docs/rules/channels/branch.md`. This is the mechanism that lets two separate devices (the FA's screen and the customer's own device) coordinate on the same in-progress application.

- The FA's screen (`client/src/pages/IdvRemoteFa.jsx`) creates a session, carrying over the client's full name, email, and phone number already captured earlier in the journey. The customer doesn't re-enter these on their own device.
- Creating a session returns a token. The link the FA sends is `{origin}/remote-identity/{token}` — a route the customer opens on their own device.
- The customer's page (`client/src/pages/RemoteIdentityEntry.jsx`) is deliberately **not** part of the tracked journey step list — it's a separate device/session, not a step the FA's progress bar advances through.
- The customer's identity form runs the same underlying rule as digital's identity-verification step (`server/rules/identity.js` — accepted ID types, non-expired, full name/email/phone all on file). On success, the session is marked `completed`.
- The FA's screen polls the session's status every 2 seconds while waiting. Once it sees `completed`, it shows an animated confirmation (same pattern as the credit-card-added transition) and auto-advances to Address info.
- A link that's already been used, or doesn't exist, shows the customer an "invalid link" message rather than letting them re-verify or silently failing.
- Sessions are in-memory only and reset on server restart, same as the rest of this demo's mock data — this isn't a real SMS/email delivery integration, and the link is displayed directly on the FA's screen for demo purposes rather than actually sent.
