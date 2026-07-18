// SYNTHETIC mock OTP logic, demo purposes only.
// Real implementation would send an actual SMS and a random, single-use code.
// This demo always issues "123456" so the journey can be clicked through quickly.

const MOCK_OTP = '123456'

function validatePhone({ phoneNumber }) {
  const digits = (phoneNumber || '').replace(/\D/g, '')
  const reasons = []
  if (digits.length !== 10) reasons.push('Enter a valid 10-digit Canadian phone number.')
  return { valid: reasons.length === 0, reasons }
}

function verifyOtp({ otp }) {
  const reasons = []
  if (otp !== MOCK_OTP) reasons.push('That code is incorrect or expired. Try again or resend.')
  return { verified: reasons.length === 0, reasons }
}

module.exports = { validatePhone, verifyOtp, MOCK_OTP }
