# Fund Account Rules (SYNTHETIC — demo only)

Mirrors `server/rules/funding.js`. Previously undocumented — this repo's business-rule extractor demo (see `business-rules/deposit-account-digital.md`) flagged that this logic existed only in code with no plain-language mirror, unlike every other rule area. This file closes that gap.

- Presented as selectable option cards, not a dropdown — the applicant picks one method, then enters a deposit amount.
- Digital channel offers three funding methods: transfer from another bank, Interac e-Transfer, or depositing a cheque. For the purposes of this demo, only the method selection is captured — the actual linked-account, e-Transfer, or cheque-deposit sub-flows aren't built out.
- Branch channel offers transfer, cash, or cheque (see `docs/rules/channels/branch.md`) — no e-Transfer option there.
- Minimum initial deposit is $25, regardless of channel or method.
