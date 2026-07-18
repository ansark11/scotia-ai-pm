# Journey Comparison: Digital vs. Branch-Assisted

SYNTHETIC — demo only. Comparing `existing-journeys/deposit-digital.json` (11 steps) and `existing-journeys/deposit-branch.json` (14 steps).

11 of the 14 branch steps are the exact same module as digital — same page, same rule, reused as-is. 3 steps exist only on branch. 2 of the shared steps carry a rule difference even though the step itself is the same module.

| Step | Digital | Branch | Shared or channel-specific | Rule difference |
|---|---|---|---|---|
| FA login | — | ✓ | Branch-only | No digital equivalent — establishes which banker and client the session is for before anything else can start. |
| Overview | ✓ | ✓ | Shared | None. |
| Phone & OTP | ✓ | ✓ | Shared | None. |
| Profile setup | ✓ | ✓ | Shared | None. |
| Identity verification | ✓ | ✓ | Shared | None functionally implemented yet — both still use the mocked document-scan + liveness check. The module's own notes flag that branch is *expected* to move to physical ID review with the FA present, but that change hasn't been built. |
| Address info | ✓ | ✓ | Shared | None. |
| Employment info | ✓ | ✓ | Shared | None. |
| Credit card offer (conditional) | ✓ | ✓ | Shared | None — same eligibility rule, same gating logic, on both channels. |
| Tax questions | ✓ | ✓ | Shared | None. |
| Terms & conditions | ✓ | ✓ | Shared | Same consent text and checkbox capture on both channels. On branch, the checkbox alone isn't treated as sufficient — it's followed by two e-signature steps, which digital doesn't have. |
| Client e-signature | — | ✓ | Branch-only | No digital equivalent — digital's consent mechanism is the checkbox + timestamp alone. |
| FA e-signature | — | ✓ | Branch-only | No digital equivalent — there's no banker present in the digital channel at all. |
| Fund account | ✓ | ✓ | Shared | Digital allows transfer only. Branch also allows cash and cheque (`server/rules/funding.js` already branches on `channel === 'branch'` for this). |
| Confirmation | ✓ | ✓ | Shared | Branch confirmation additionally names the FA who assisted. Digital confirmation never mentions a banker, since none was involved. |

## Summary

- **Shared, no rule difference:** Overview, Phone & OTP, Profile setup, Identity verification, Address info, Employment info, Credit card offer, Tax questions.
- **Shared, rule differs:** Terms & conditions (downstream consent requirement), Fund account (funding methods), Confirmation (FA-assisted note).
- **Branch-only:** FA login, Client e-signature, FA e-signature.

## Sources used

- `existing-journeys/deposit-digital.json`, `existing-journeys/deposit-branch.json`
- `/modules/*.json`
- `docs/rules/channels/digital.md`, `docs/rules/channels/branch.md`, `docs/rules/credit-cross-sell.md`
