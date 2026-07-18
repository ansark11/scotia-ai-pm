// SYNTHETIC business rule logic, demo purposes only.
// Already channel-aware: digital only allows transfer; branch would allow
// cash/cheque too (see docs/rules/channels/branch.md, for a future demo).

function validateFunding({ fundingMethod, fundingAmount }, channel = 'digital') {
  const reasons = []
  const allowedMethods = channel === 'branch' ? ['transfer', 'cash', 'cheque'] : ['transfer']

  if (!allowedMethods.includes(fundingMethod)) {
    reasons.push(`Funding method "${fundingMethod}" is not supported on the ${channel} channel.`)
  }
  if (!fundingAmount || fundingAmount < 25) {
    reasons.push('Minimum initial deposit is $25.')
  }

  return { valid: reasons.length === 0, reasons }
}

module.exports = { validateFunding }
