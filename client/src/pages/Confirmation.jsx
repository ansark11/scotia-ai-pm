import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { useJourney } from '../context/JourneyContext.jsx'
import AccountCardVisual from '../components/AccountCardVisual.jsx'
import CreditCardVisual from '../components/CreditCardVisual.jsx'

export default function Confirmation() {
  const { journeyData } = useJourney()
  const [result, setResult] = useState(null)
  const [qrDataUrl, setQrDataUrl] = useState(null)

  useEffect(() => {
    fetch('/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(journeyData)
    })
      .then((res) => res.json())
      .then(setResult)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (journeyData.channel === 'branch' && result?.accountNumber) {
      const setupUrl = `${window.location.origin}/digital-access-setup?acct=${result.accountNumber}`
      QRCode.toDataURL(setupUrl, { margin: 1, width: 160 }).then(setQrDataUrl)
    }
  }, [journeyData.channel, result])

  if (!result) {
    return <p>Finalizing your account...</p>
  }

  const hasCard = Boolean(journeyData.creditOfferAccepted && result.cardAccountNumber)

  return (
    <div>
      <h1>You&apos;re all set</h1>
      <p className="subtext">
        Your new {journeyData.product} is open and ready to use. A welcome email is on its way to{' '}
        {journeyData.email}.
      </p>

      {hasCard ? (
        <CreditCardVisual holderName={journeyData.fullName} creditLimit={journeyData.creditLimit} />
      ) : (
        <AccountCardVisual holderName={journeyData.fullName} product={journeyData.product} />
      )}

      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '16px',
          marginBottom: 12
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>PRODUCTS OPENED</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: hasCard ? 10 : 0 }}>
          <span>{journeyData.product}</span>
          <span style={{ color: 'var(--text-secondary)' }}>{result.accountNumber}</span>
        </div>
        {hasCard && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span>Scotia Momentum Card (demo)</span>
            <span style={{ color: 'var(--text-secondary)' }}>{result.cardAccountNumber}</span>
          </div>
        )}
      </div>

      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '16px',
          marginBottom: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>CURRENT BALANCE</span>
        <span style={{ fontSize: 18, fontWeight: 500 }}>
          ${Number(journeyData.fundingAmount || 0).toLocaleString()}
        </span>
      </div>

      {hasCard && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-card)',
            padding: '14px 16px',
            fontSize: 14,
            color: 'var(--text-secondary)',
            marginBottom: journeyData.channel === 'branch' ? 12 : 0
          }}
        >
          Your Scotia Momentum Card (demo) will arrive by mail in 5-7 business days.
        </div>
      )}

      {journeyData.channel === 'branch' && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-card)',
            padding: '16px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>SET UP ONLINE BANKING</div>
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR code to set up digital access" width={160} height={160} style={{ borderRadius: 8 }} />
          ) : (
            <div style={{ width: 160, height: 160, margin: '0 auto' }} />
          )}
          <p className="subtext" style={{ marginTop: 12, marginBottom: 0 }}>
            Present QR code to customer to set up access for online banking.
          </p>
        </div>
      )}
    </div>
  )
}
