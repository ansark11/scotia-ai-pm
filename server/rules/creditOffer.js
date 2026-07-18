// SYNTHETIC business rule logic, demo purposes only — made-up thresholds.
// Mirrors docs/rules/credit-cross-sell.md.
// This is the gating rule that decides whether an applicant ever sees the
// /credit-offer screen at all (see client/src/pages/EmploymentInfo.jsx).

const { calculateAge } = require('./profile')

const MIN_INCOME = 24000
const MIN_AGE = 21
const QUALIFYING_STATUSES = ['employed', 'self-employed']
const LIMIT_RATE = 0.2
const MAX_LIMIT = 15000

function checkEligibility({ employmentStatus, annualIncome, dob }) {
  const age = calculateAge(dob)
  const reasons = []

  if (annualIncome < MIN_INCOME) reasons.push(`Annual income below the $${MIN_INCOME.toLocaleString()} threshold.`)
  if (!QUALIFYING_STATUSES.includes(employmentStatus)) reasons.push('Employment status does not qualify for this offer.')
  if (age < MIN_AGE) reasons.push(`Applicant is younger than the age ${MIN_AGE} minimum for this offer.`)

  const eligible = reasons.length === 0
  const creditLimit = eligible ? Math.min(MAX_LIMIT, Math.round((annualIncome * LIMIT_RATE) / 100) * 100) : 0

  return { eligible, creditLimit, reasons }
}

module.exports = { checkEligibility, MIN_INCOME, MIN_AGE, QUALIFYING_STATUSES, LIMIT_RATE, MAX_LIMIT }
