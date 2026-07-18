import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

export default function PhoneOtp() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [phoneNumber, setPhoneNumber] = useState(journeyData.phoneNumber)
  const [otp, setOtp] = useState(journeyData.otp)
  const [codeSent, setCodeSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSendCode() {
    const res = await fetch('/api/phone/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    })
    const result = await res.json()
    if (result.valid) {
      setCodeSent(true)
      setError('')
    } else {
      setError(result.reasons.join(' '))
    }
  }

  async function handleVerify() {
    const res = await fetch('/api/phone/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp })
    })
    const result = await res.json()
    if (result.verified) {
      updateJourneyData({ phoneNumber, otp })
      navigate('/profile')
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
      {!codeSent ? (
        <CTAButton onClick={handleSendCode}>Send code</CTAButton>
      ) : (
        <>
          <FormField label="6-digit code" value={otp} onChange={setOtp} />
          <CTAButton onClick={handleVerify}>Verify & continue</CTAButton>
          <p className="skip-note">Didn&apos;t get a code? Resend in 30s.</p>
        </>
      )}
    </div>
  )
}
