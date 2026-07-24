# Journey Comparison: Digital vs. Branch-Assisted

SYNTHETIC — demo only. Comparing `existing-journeys/deposit-digital.json` (14 steps) and `existing-journeys/deposit-branch.json` (17 steps), current as of both journeys' latest rebuilds.

12 of digital's 14 steps and branch's 17 steps are the exact same module, reused as-is. 2 steps are digital-only (branch replaced them with a different mechanism entirely, not just a variant). 5 steps are branch-only. 3 of the shared steps carry a rule difference even though the step itself is the same module.

| Step | Digital | Branch | Category | Note |
|---|---|---|---|---|
| FA login | — | ✓ | Branch-only | No digital equivalent — establishes which banker and client the session is for before anything else starts. |
| Overview | ✓ | ✓ | Shared | None. |
| Phone number | ✓ | ✓ | Shared | None. |
| Verify code (OTP) | ✓ | ✓ | Shared | None. |
| Profile setup | ✓ | ✓ | Shared | None. |
| Verify identity (intro) | ✓ | — | **Digital-only** | Not a variant — branch doesn't use this splash screen at all. Its self-serve identity flow is replaced entirely on branch by a different mechanism (see next two rows). |
| Identity verification (form) | ✓ | — | **Digital-only** | Same reasoning — the applicant fills this in themselves on digital. Branch never reaches this page. |
| Verify identity (remote, FA view) | — | ✓ | Branch-only | The customer must complete ID-V on their own device, not the FA's — this screen sends a link and polls for completion. See `docs/rules/remote-identity-verification.md`. |
| Identity verified (remote) | — | ✓ | Branch-only | Animated confirmation once the customer finishes on their own device; auto-advances. |
| Address info | ✓ | ✓ | Shared | None. |
| Employment info | ✓ | ✓ | Shared | None. |
| Credit card offer (conditional) | ✓ | ✓ | Shared | None — same eligibility rule, same gating logic, on both channels. |
| Card added (conditional) | ✓ | ✓ | Shared | None — same animation, same trigger (offer accepted), on both channels. |
| Tax questions | ✓ | ✓ | Shared | None. |
| Account agreements (Terms & Conditions) | ✓ | ✓ | Shared, rule differs | Same accordion cards and per-card checkboxes on both. On branch, the checkboxes alone aren't sufficient — followed by two e-signature steps, which digital doesn't have. |
| Client e-signature | — | ✓ | Branch-only | No digital equivalent — digital's consent mechanism is the account-agreement checkboxes alone. |
| FA e-signature | — | ✓ | Branch-only | No digital equivalent — no banker present in the digital channel at all. |
| Fund account | ✓ | ✓ | Shared, rule differs | Digital offers transfer, Interac e-Transfer, or cheque deposit. Branch offers transfer, cash, or cheque — no e-Transfer on branch. |
| Confirmation | ✓ | ✓ | Shared, rule differs | Branch additionally names the FA who assisted, and shows a QR code + infotip for the customer to set up online banking access. Digital has neither. |

## Summary

- **Shared, no rule difference (9):** Overview, Phone number, Verify code, Profile setup, Address info, Employment info, Credit card offer, Card added, Tax questions.
- **Shared, rule differs (3):** Account agreements (downstream e-signature requirement), Fund account (funding methods), Confirmation (FA-assisted note + QR code).
- **Digital-only (2):** Verify identity (intro), Identity verification (form) — not variants of a branch step, genuinely absent from branch.
- **Branch-only (5):** FA login, Verify identity (remote, FA view), Identity verified (remote), Client e-signature, FA e-signature.

The "digital-only" category is new since the last version of this comparison — previously, identity verification was reused as-is on both channels. It no longer is: branch replaced it with an entirely different mechanism (a remote, cross-device hand-off) rather than a channel-aware variant of the same page.

## Sources used

- `existing-journeys/deposit-digital.json`, `existing-journeys/deposit-branch.json`
- `/modules/*.json`
- `docs/rules/channels/digital.md`, `docs/rules/channels/branch.md`, `docs/rules/credit-cross-sell.md`, `docs/rules/remote-identity-verification.md`
