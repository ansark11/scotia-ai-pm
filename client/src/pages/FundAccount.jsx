import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Digital channel now offers the same funding methods as
// branch — see docs/rules/fund-account.md and server/rules/funding.js.
const FUNDING_OPTIONS = [
  { value: 'transfer', label: 'Transfer from another bank', description: 'Link an external account and transfer funds.' },
  { value: 'e-transfer', label: 'Interac e-Transfer', description: 'Send funds using an email address or phone number.' },
  { value: 'cheque', label: 'Deposit a cheque', description: 'Mobile deposit — snap a photo of your cheque.' }
]

export default function FundAccount() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [fundingMethod, setFundingMethod] = useState(journeyData.fundingMethod)
  const [fundingAmount, setFundingAmount] = useState(journeyData.fundingAmount)
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleNext() {
    setLoading(true)
    setReasons([])
    const res = await fetch('/api/funding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fundingMethod, fundingAmount: Number(fundingAmount), channel: 'digital' })
    })
    const result = await res.json()
    setLoading(false)
    if (result.valid) {
      updateJourneyData({ fundingMethod, fundingAmount })
      navigate('/confirmation')
    } else {
      setReasons(result.reasons)
    }
  }

  return (
    <div>
      <h2>Fund your account</h2>
      <p className="subtext">Choose how you&apos;d like to add money to your new account.</p>

      {FUNDING_OPTIONS.map((option) => {
        const selected = fundingMethod === option.value
        return (
          <div
            key={option.value}
            role="button"
            tabIndex={0}
            onClick={() => setFundingMethod(option.value)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setFundingMethod(option.value)}
            style={{
              background: 'var(--bg-card)',
              border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border-card)'}`,
              borderRadius: 'var(--radius-card)',
              padding: '14px 16px',
              marginBottom: 10,
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--border-card)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {selected && <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />}
              </span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{option.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{option.description}</div>
              </div>
            </div>
          </div>
        )
      })}

      <div style={{ marginTop: 16 }}>
        <FormField label="Initial deposit ($)" type="number" value={fundingAmount} onChange={setFundingAmount} />
      </div>

      {reasons.length > 0 && (
        <div className="error-box">
          {reasons.map((r) => (
            <div key={r}>{r}</div>
          ))}
        </div>
      )}
      <BottomNav onNext={handleNext} loading={loading} />
    </div>
  )
}
