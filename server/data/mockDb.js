// SYNTHETIC in-memory "database" for demo purposes only. Resets on server restart.

const applications = []

function createApplication(data) {
  const accountNumber = `DEMO-${Math.floor(100000 + Math.random() * 900000)}`
  const cardAccountNumber = data.creditOfferAccepted
    ? `DEMO-CC-${Math.floor(100000 + Math.random() * 900000)}`
    : null
  const record = { accountNumber, cardAccountNumber, createdAt: new Date().toISOString(), ...data }
  applications.push(record)
  return record
}

module.exports = { applications, createApplication }
