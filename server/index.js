// SYNTHETIC mock backend for the onboarding demo. Not production code —
// no auth, no persistence beyond memory, no real customer data.

const express = require('express')
const cors = require('cors')
const { validatePhone, verifyOtp } = require('./rules/phone')
const { checkAge } = require('./rules/profile')
const { validateIdentity } = require('./rules/identity')
const { validateAddress } = require('./rules/address')
const { checkEligibility } = require('./rules/creditOffer')
const { validateFunding } = require('./rules/funding')
const { createApplication } = require('./data/mockDb')
const { createSession, getSession, completeSession } = require('./data/remoteIdvSessions')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.post('/api/phone/send-code', (req, res) => {
  res.json(validatePhone(req.body))
})

app.post('/api/phone/verify-code', (req, res) => {
  res.json(verifyOtp(req.body))
})

app.post('/api/profile/check-age', (req, res) => {
  res.json(checkAge(req.body))
})

app.post('/api/identity/validate', (req, res) => {
  res.json(validateIdentity(req.body))
})

app.post('/api/address/validate', (req, res) => {
  res.json(validateAddress(req.body))
})

app.post('/api/credit-offer/eligibility', (req, res) => {
  res.json(checkEligibility(req.body))
})

app.post('/api/funding', (req, res) => {
  const { channel, ...fundingData } = req.body
  res.json(validateFunding(fundingData, channel))
})

// SYNTHETIC. Branch-only remote ID-V handoff — see docs/rules/remote-identity-verification.md.
// The FA's screen creates a session and polls its status; the customer's
// own device (a separate browser session, reached via the emailed/texted
// link) verifies against the same session and flips it to 'completed'.
app.post('/api/idv-remote/create', (req, res) => {
  const session = createSession(req.body)
  res.json({ token: session.token })
})

app.get('/api/idv-remote/:token/status', (req, res) => {
  const session = getSession(req.params.token)
  if (!session) return res.status(404).json({ found: false })
  res.json({
    found: true,
    status: session.status,
    fullName: session.fullName,
    email: session.email,
    phoneNumber: session.phoneNumber
  })
})

app.post('/api/idv-remote/:token/verify', (req, res) => {
  const session = getSession(req.params.token)
  if (!session) return res.status(404).json({ valid: false, reasons: ['This link has expired or was not found.'] })
  const result = validateIdentity({
    ...req.body,
    fullName: session.fullName,
    email: session.email,
    phoneNumber: session.phoneNumber
  })
  if (result.valid) completeSession(req.params.token)
  res.json(result)
})

app.post('/api/application', (req, res) => {
  const record = createApplication(req.body)
  res.json({ accountNumber: record.accountNumber, cardAccountNumber: record.cardAccountNumber })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Deposit onboarding demo API listening on http://localhost:${PORT}`)
})
