# Impact Brief: Joint-Account Support — Digital Deposit Account Journey (Async Invite Model)

SYNTHETIC — demo only. Updated against the current 14-step digital journey (`existing-journeys/deposit-digital.json`) after its UX redesign — the earlier version of this brief was written against the original 11-step journey and is now out of date. UX pattern provided directly by the product owner, not derived from the repo.

## Proposed change

Two applicants open one joint account, but **not** in one sitting. User #1 completes the existing digital journey largely as-is, indicating partway through that this is a joint account and providing User #2's name and email. Once User #1 finishes, User #2 gets an emailed invite link into a separate, shorter flow to complete their own required steps. The account is pending until both are done.

## Bottom line

Still true from the original analysis: the hard part isn't redesigning existing steps to hold two applicants' data at once — nearly every step stays untouched for User #1. What's changed since the last version of this brief: (1) Confirmation is now a much richer screen, so the "invite sent" messaging needs to fit into a multi-section layout instead of one sentence; (2) Terms & Conditions is now per-product agreement cards, which raises a genuinely new question about whether a joint account needs its own agreement card; (3) this repo now has a **working reference implementation** of "customer completes identity verification asynchronously on a token-linked device" — built for the branch journey's remote ID-V hand-off — which directly informs, and somewhat de-risks, User #2's identity-verification step here.

## Steps affected — User #1's journey

### Needs a change

- **Overview** — same as before: a new capture point (joint-account toggle + User #2's name and email). Nothing like this exists today.
- **Confirmation** — now shows a card visual, a "PRODUCTS OPENED" list, a "CURRENT BALANCE" box, and conditional card-delivery messaging, not the single paragraph it used to be. The "invite sent, you'll be notified when they finish" messaging needs a place in this expanded layout — this is now real UI work, not just adding a sentence.

### Unchanged

- **Phone number, Verify code, Profile setup, Verify identity (intro), Identity verification, Address info, Employment info, Credit card offer, Card added, Tax questions, Account agreements, Fund account** — all unchanged for User #1. Several of these look different than they did in the last version of this brief (phone/OTP and identity verification are now two screens each instead of one; "Card added" didn't exist before; funding is now option cards; account agreements are now an accordion) — none of that changes the conclusion. These steps still don't need to know a second applicant exists.

## New: User #2's journey (same shape as before, one new consideration)

Not a modification to an existing step — an entirely new, separate flow, reached via a unique invite link.

- **New entry point**, authenticated by an invite token rather than the standard journey start.
- **Reuses existing modules for data capture**: DOB, phone number, address, and employment info — minus full name and email, already known from the invite.
- **Reuses as-is**: Identity verification, Tax questions, Terms & Conditions (own consent).
- **Explicitly skipped**: Credit card offer, Card added, and Fund account — User #1-only, already fulfilled.
- **New confirmation variant**: "you've been added to the joint account and can start using it."

**New since the last version of this brief:** the branch journey now has a real, working "remote identity verification" mechanism — a server-backed session, a token-linked device, polling for completion (see `docs/rules/remote-identity-verification.md`, `server/data/remoteIdvSessions.js`). User #2's identity-verification step here is structurally similar — a customer completing ID-V on a token-linked device that isn't the one that started the application — and could directly extend that pattern rather than being designed from scratch. They're not identical: branch's version assumes same-visit, real-time completion (the FA is waiting, polling every 2 seconds); this joint-account flow may have User #2 complete hours or days later, closer to an email-driven workflow than a live hand-off. Worth deciding explicitly whether these should share one underlying mechanism or stay separate — see open questions.

## New: cross-cutting system needs (not steps, but real work)

- **Pending joint-completion state** — still nothing in the current data model represents partial/pending completion.
- **Two new notification triggers** — invite email to User #2, completion email to User #1. Still no notification/event system in this repo.
- **Invite token** — securely links User #2's session back to User #1's specific application.

These three items are the same real-world engineering scope as before — a working reference pattern existing elsewhere in the repo reduces *design risk and uncertainty*, not the actual amount of production work (real email delivery integration, durable persistence past a single session, a token with a multi-day lifetime are all still genuinely new).

## Channels/segments impacted

- Scoped to digital, per direction from the product owner.
- Now a sharper question than before: branch has its own, different "customer completes something on a linked device" pattern (real-time, same-visit). Should this joint-account invite model and branch's remote-ID-V mechanism be unified into one shared capability, or are they legitimately different problems that happen to look similar? This question didn't exist when only one of the two patterns existed in the repo.

## Open questions for the business

1. **Invite token lifetime** — how long is the link valid, and what happens if it expires first?
2. **Non-completion handling** — indefinite pending, revert to single-owner, or User #1 cancels/resends?
3. **Age gate for User #2** — same 18+ minimum, or could a minor be a secondary holder?
4. **Phone verification for User #2** — full OTP verification, or just captured as data?
5. **Ownership/liability model** — full/equal rights immediately, or an interim restricted status?
6. **Identity cross-check** — must User #2's identity match the name/email from the invite, or can they correct it?
7. **Invite management** — can User #1 cancel or resend (e.g. mistyped email)?
8. **Shared mechanism with branch** — should this reuse/extend the branch remote-ID-V session pattern, or is a same-visit real-time hand-off different enough from a multi-day cross-applicant invite to warrant its own implementation?
9. **Joint ownership agreement card** — now that Terms & Conditions is per-product agreement cards (Chequing always, Credit Card conditionally), does a joint account need its own "joint ownership agreement" card for User #2 to accept in their own flow? This question didn't exist under the old single-checkbox design.

## Estimated effort (single developer)

**Assumptions:** real production feature, not a demo-repo prototype · 2-week sprints · business has already answered the open questions above before development starts.

**Foundational — Invite/pending-state data model & token handling**
**Size: M — 2 to 3 sprints (4–6 weeks)**

Unchanged from the last version of this brief. A pending-completion status, an invite token tied to the application, and transition-to-active logic once User #2 completes. The branch remote-ID-V build reduces uncertainty about how to shape this, but doesn't shrink the real work — production-grade email delivery and multi-day token persistence are still new.

**Foundational — Notification triggers**
**Size: S–M — 1 to 2 sprints (2–4 weeks)**

Unchanged. Two transactional email triggers and their templates.

**Per-item, on top of the foundations:**

| Item | Size | Sprints | What's driving it |
|---|---|---|---|
| Overview joint-intent capture | S | 1 | One new toggle + two new fields on an existing step. |
| Confirmation messaging (User #1) | S | 1 | Grew from "bundled into an existing sentence" to a small standalone piece of work — Confirmation is now a multi-section card layout, not a paragraph. |
| Account agreements — joint ownership card *(contingent on open question 9)* | S–M | 1–2 | New line item versus the last brief — didn't exist as a concept before Terms & Conditions became per-product agreement cards. |
| User #2 entry point + flow | M | 2–3 | Unchanged in scope; the identity-verification portion specifically carries less implementation risk now that a working token-linked-device pattern exists to extend, though the rest of the flow (DOB/phone/address/employment/tax capture) is unaffected by that. |

**Rollup: roughly 8–13 developer-sprints, or about 4–6.5 months of calendar time for one developer working alone.** Up from the ~6–9 sprints in the last version of this brief — the increase comes from Confirmation's added richness and the new contingent Terms & Conditions line item, not from anything getting harder. A real team would still parallelize this and shorten calendar time.

## Sources used

- Journey: `existing-journeys/deposit-digital.json` (14 steps)
- Modules: `/modules/*.json`
- Rules docs: `docs/rules/*.md`, `docs/rules/channels/digital.md`, `docs/rules/remote-identity-verification.md`
- Implementation reality check: `client/src/context/JourneyContext.jsx`, `client/src/pages/Confirmation.jsx`, `client/src/pages/TermsAndConditions.jsx`, `client/src/pages/FundAccount.jsx`, `server/rules/*.js`, `server/data/mockDb.js`, `server/data/remoteIdvSessions.js`
- UX pattern: provided directly by the product owner earlier in this conversation, not derived from the repo
