import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// Answers are captured as data only — no branching or gating logic acts on
// them in this demo. See docs/rules/tax-questions.md.
export default function TaxQuestions() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [taxUsPerson, setTaxUsPerson] = useState(journeyData.taxUsPerson)
  const [taxOtherResident, setTaxOtherResident] = useState(journeyData.taxOtherResident)

  function handleContinue() {
    updateJourneyData({ taxUsPerson, taxOtherResident })
    navigate('/terms')
  }

  return (
    <div>
      <h2>Tax questions</h2>
      <p className="subtext">A few questions required for tax reporting purposes.</p>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '14px 16px',
          marginBottom: 12,
          fontSize: 14
        }}
      >
        <input type="checkbox" checked={taxUsPerson} onChange={(e) => setTaxUsPerson(e.target.checked)} />
        I am a US citizen or resident for tax purposes
      </label>

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '14px 16px',
          marginBottom: 20,
          fontSize: 14
        }}
      >
        <input
          type="checkbox"
          checked={taxOtherResident}
          onChange={(e) => setTaxOtherResident(e.target.checked)}
        />
        I am a tax resident of a country other than Canada
      </label>

      <CTAButton onClick={handleContinue}>Continue</CTAButton>
    </div>
  )
}
