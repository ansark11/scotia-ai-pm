import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

export default function TermsAndConditions() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [checked, setChecked] = useState(journeyData.termsAccepted)

  function handleContinue() {
    updateJourneyData({ termsAccepted: checked, consentTimestamp: new Date().toISOString() })
    // Branch consent needs two e-signatures, not just this checkbox — see
    // docs/rules/channels/branch.md.
    navigate(journeyData.channel === 'branch' ? '/esign-client' : '/fund')
  }

  return (
    <div>
      <h2>Terms & conditions</h2>
      <p className="subtext">
        Terms for {journeyData.product}, plus disclosures required for {journeyData.province} residents.
      </p>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '16px',
          marginBottom: 16,
          fontSize: 13,
          color: 'var(--text-secondary)'
        }}
      >
        By continuing, you agree to the account opening terms, privacy disclosures, and the{' '}
        {journeyData.province} provincial disclosure applicable to this product.
      </div>
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 14,
          marginBottom: 20
        }}
      >
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        I agree to the terms and disclosures above
      </label>
      <CTAButton onClick={handleContinue} disabled={!checked}>
        I agree & continue
      </CTAButton>
    </div>
  )
}
