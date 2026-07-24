import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Second of two phone-verification screens — OTP entry only.
// Phone number is referenced in copy, not re-collected.
export default function OtpVerify() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [otp, setOtp] = useState(journeyData.otp)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNext() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/phone/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp })
    })
    const result = await res.json()
    setLoading(false)
    if (result.verified) {
      updateJourneyData({ otp })
      navigate('/profile')
    } else {
      setError(result.reasons.join(' '))
    }
  }

  return (
    <div>
      <h2>Enter your code</h2>
      <p className="subtext">Please enter the code sent to {journeyData.phoneNumber}.</p>
      <FormField label="6-digit code" value={otp} onChange={setOtp} />
      {error && <div className="error-box">{error}</div>}
      <p className="skip-note">Didn&apos;t get a code? Resend in 30s.</p>
      <BottomNav onNext={handleNext} nextLabel="Verify" loading={loading} />
    </div>
  )
}
