// SYNTHETIC business rule logic, demo purposes only.
// Channel-aware: digital allows transfer, e-transfer, or cheque deposit;
// branch allows transfer, cash, or cheque (see docs/rules/fund-account.md
// and docs/rules/channels/branch.md).

function validateFunding({ fundingMethod, fundingAmount }, channel = 'digital') {
  const reasons = []
  const allowedMethods = channel === 'branch' ? ['transfer', 'cash', 'cheque'] : ['transfer', 'e-transfer', 'cheque']

  if (!allowedMethods.includes(fundingMethod)) {
    reasons.push(`Funding method "${fundingMethod}" is not supported on the ${channel} channel.`)
  }
  if (!fundingAmount || fundingAmount < 25) {
    reasons.push('Minimum initial deposit is $25.')
  }

  return { valid: reasons.length === 0, reasons }
}

module.exports = { validateFunding }
