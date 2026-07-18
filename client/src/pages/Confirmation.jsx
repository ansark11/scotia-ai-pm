import { useEffect, useState } from 'react'
import { useJourney } from '../context/JourneyContext.jsx'

export default function Confirmation() {
  const { journeyData } = useJourney()
  const [accountNumber, setAccountNumber] = useState(null)

  useEffect(() => {
    fetch('/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(journeyData)
    })
      .then((res) => res.json())
      .then((result) => setAccountNumber(result.accountNumber))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h2>You&apos;re all set</h2>
      {accountNumber ? (
        <>
          <p>
            Your new account number is <strong>{accountNumber}</strong>. A welcome email is on its way to{' '}
            {journeyData.email}.
          </p>
          {journeyData.channel === 'branch' && (
            <p className="subtext">
              Financial Advisor {journeyData.faName} ({journeyData.faEmployeeId}) assisted you with this account
              opening.
            </p>
          )}
          {journeyData.creditOfferAccepted && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-card)',
                padding: '14px 16px',
                fontSize: 14,
                color: 'var(--text-secondary)',
                marginTop: 16
              }}
            >
              Your Scotia Momentum Card (demo) is on its way — arriving in 5-7 business days.
            </div>
          )}
        </>
      ) : (
        <p>Finalizing your account...</p>
      )}
    </div>
  )
}
