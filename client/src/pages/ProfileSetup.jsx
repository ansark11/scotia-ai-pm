import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [fullName, setFullName] = useState(journeyData.fullName)
  const [dob, setDob] = useState(journeyData.dob)
  const [email, setEmail] = useState(journeyData.email)
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setReasons([])
    const res = await fetch('/api/profile/check-age', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dob })
    })
    const result = await res.json()
    setLoading(false)
    if (result.eligible) {
      updateJourneyData({ fullName, dob, email })
      navigate('/identity')
    } else {
      setReasons(result.reasons)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Profile setup</h2>
      <p className="subtext">Tell us a bit about yourself.</p>
      <FormField label="Full legal name" value={fullName} onChange={setFullName} />
      <FormField label="Date of birth" type="date" value={dob} onChange={setDob} />
      <FormField label="Email address" type="email" value={email} onChange={setEmail} />
      {reasons.length > 0 && (
        <div className="error-box">
          {reasons.map((r) => (
            <div key={r}>{r}</div>
          ))}
        </div>
      )}
      <CTAButton type="submit" disabled={loading}>
        {loading ? 'Checking...' : 'Continue'}
      </CTAButton>
    </form>
  )
}
