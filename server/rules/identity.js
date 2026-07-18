// SYNTHETIC business rule logic, demo purposes only.
// Mirrors docs/rules/identity-verification.md.

function validateIdentity({ idType, idNumber, idExpiry }) {
  const reasons = []
  if (!idType) reasons.push('ID type is required.')
  if (!idNumber) reasons.push('ID number is required.')
  if (!idExpiry || isNaN(new Date(idExpiry).getTime())) {
    reasons.push('A valid ID expiry date is required.')
  } else if (new Date(idExpiry) <= new Date()) {
    reasons.push('This ID has expired. A non-expired, government-issued ID is required.')
  }
  return { valid: reasons.length === 0, reasons }
}

module.exports = { validateIdentity }
