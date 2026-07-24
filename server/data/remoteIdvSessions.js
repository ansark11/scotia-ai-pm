// SYNTHETIC in-memory store for branch-channel remote ID-V handoff
// sessions, demo purposes only. Resets on server restart. This is the
// shared state that lets the FA's screen and the customer's own device
// — two separate browser sessions — coordinate on the same application.

const crypto = require('crypto')

const sessions = new Map()

function createSession({ fullName, email, phoneNumber }) {
  const token = crypto.randomBytes(6).toString('hex')
  const session = { token, fullName, email, phoneNumber, status: 'pending', createdAt: new Date().toISOString() }
  sessions.set(token, session)
  return session
}

function getSession(token) {
  return sessions.get(token) || null
}

function completeSession(token) {
  const session = sessions.get(token)
  if (session) session.status = 'completed'
  return session
}

module.exports = { createSession, getSession, completeSession }
