// SYNTHETIC business rule logic, demo purposes only.
// Mirrors docs/rules/address-info.md.

const ALLOWED_PROVINCES = ['ON', 'BC', 'AB', 'QC', 'MB', 'NS', 'NB', 'SK', 'PE', 'NL']
const POSTAL_CODE_PATTERN = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/

function validateAddress({ addressLine, city, province, postalCode }) {
  const reasons = []
  if (!addressLine) reasons.push('Street address is required.')
  if (/\bp\.?o\.?\s*box\b/i.test(addressLine || '')) {
    reasons.push('A physical residential address is required — PO boxes are not accepted.')
  }
  if (!city) reasons.push('City is required.')
  if (!ALLOWED_PROVINCES.includes(province)) reasons.push('Province is not currently supported.')
  if (!POSTAL_CODE_PATTERN.test(postalCode || '')) reasons.push('Postal code format looks incorrect.')
  return { valid: reasons.length === 0, reasons }
}

module.exports = { validateAddress, ALLOWED_PROVINCES }
