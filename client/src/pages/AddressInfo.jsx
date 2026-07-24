import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

const PROVINCES = ['ON', 'BC', 'AB', 'QC', 'MB', 'NS', 'NB', 'SK', 'PE', 'NL'].map((p) => ({
  value: p,
  label: p
}))

export default function AddressInfo() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [addressLine, setAddressLine] = useState(journeyData.addressLine)
  const [city, setCity] = useState(journeyData.city)
  const [province, setProvince] = useState(journeyData.province)
  const [postalCode, setPostalCode] = useState(journeyData.postalCode)
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleNext() {
    setLoading(true)
    setReasons([])
    const res = await fetch('/api/address/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addressLine, city, province, postalCode })
    })
    const result = await res.json()
    setLoading(false)
    if (result.valid) {
      updateJourneyData({ addressLine, city, province, postalCode })
      navigate('/employment')
    } else {
      setReasons(result.reasons)
    }
  }

  return (
    <div>
      <h2>Address info</h2>
      <p className="subtext">Where do you currently live?</p>
      <FormField label="Street address" value={addressLine} onChange={setAddressLine} />
      <FormField label="City" value={city} onChange={setCity} />
      <FormField label="Province" value={province} onChange={setProvince} options={PROVINCES} />
      <FormField label="Postal code" value={postalCode} onChange={setPostalCode} />
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
