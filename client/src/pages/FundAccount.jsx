import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

const FUNDING_METHODS_DIGITAL = [{ value: 'transfer', label: 'Digital Transfer' }]

export default function FundAccount() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [fundingMethod, setFundingMethod] = useState(journeyData.fundingMethod)
  const [fundingAmount, setFundingAmount] = useState(journeyData.fundingAmount)
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
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
    <form onSubmit={handleSubmit}>
      <h2>Fund your account</h2>
      <p className="subtext">Digital channel supports transfer from a linked account only.</p>
      <FormField
        label="Funding method"
        value={fundingMethod}
        onChange={setFundingMethod}
        options={FUNDING_METHODS_DIGITAL}
      />
      <FormField label="Initial deposit ($)" type="number" value={fundingAmount} onChange={setFundingAmount} />
      {reasons.length > 0 && (
        <div className="error-box">
          {reasons.map((r) => (
            <div key={r}>{r}</div>
          ))}
        </div>
      )}
      <CTAButton type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Continue'}
      </CTAButton>
    </form>
  )
}
