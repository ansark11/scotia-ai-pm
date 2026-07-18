// SYNTHETIC business rule logic, demo purposes only.
// Mirrors docs/rules/profile-setup.md.

function calculateAge(dob) {
  const birth = new Date(dob)
  if (isNaN(birth.getTime())) return 0
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }
  return age
}

function checkAge({ dob }) {
  const age = calculateAge(dob)
  const reasons = []
  if (age < 18) reasons.push('Applicant must be at least 18 years old to open this account.')
  return { eligible: reasons.length === 0, age, reasons }
}

module.exports = { checkAge, calculateAge }
