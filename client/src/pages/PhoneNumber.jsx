import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. First of two phone-verification screens — phone number only.
// See PhoneOtp's old combined version replaced by this + OtpVerify.jsx.
export default function PhoneNumber() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [phoneNumber, setPhoneNumber] = useState(journeyData.phoneNumber)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleNext() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/phone/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    })
    const result = await res.json()
    setLoading(false)
    if (result.valid) {
      updateJourneyData({ phoneNumber })
      navigate('/otp')
    } else {
      setError(result.reasons.join(' '))
    }
  }

  return (
    <div>
      <h2>Confirm your phone number</h2>
      <p className="subtext">We&apos;ll text you a one-time code to verify it&apos;s really you.</p>
      <FormField label="Mobile phone number" value={phoneNumber} onChange={setPhoneNumber} />
      {error && <div className="error-box">{error}</div>}
      <BottomNav onNext={handleNext} nextLabel="Send code" loading={loading} />
    </div>
  )
}
