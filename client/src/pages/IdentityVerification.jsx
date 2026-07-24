import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

const ID_TYPES = [
  { value: 'drivers-license', label: "Driver's License" },
  { value: 'passport', label: 'Passport' },
  { value: 'provincial-id', label: 'Provincial ID Card' },
  { value: 'pr-card', label: 'Permanent Resident Card' }
]

export default function IdentityVerification() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [idType, setIdType] = useState(journeyData.idType)
  const [idNumber, setIdNumber] = useState(journeyData.idNumber)
  const [idExpiry, setIdExpiry] = useState(journeyData.idExpiry)
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleNext() {
    setLoading(true)
    setReasons([])
    const res = await fetch('/api/identity/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idType,
        idNumber,
        idExpiry,
        fullName: journeyData.fullName,
        email: journeyData.email,
        phoneNumber: journeyData.phoneNumber
      })
    })
    const result = await res.json()
    setLoading(false)
    if (result.valid) {
      updateJourneyData({ idType, idNumber, idExpiry })
      navigate('/address')
    } else {
      setReasons(result.reasons)
    }
  }

  return (
    <div>
      <h2>Identity verification</h2>
      <p className="subtext">
        Digital channel: document scan + liveness check (mocked for this demo).
      </p>
      <FormField label="ID type" value={idType} onChange={setIdType} options={ID_TYPES} />
      <FormField label="ID number" value={idNumber} onChange={setIdNumber} />
      <FormField label="ID expiry date" type="date" value={idExpiry} onChange={setIdExpiry} />
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
