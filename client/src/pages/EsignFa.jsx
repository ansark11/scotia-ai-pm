import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Branch-only — see docs/rules/channels/branch.md. Second of the
// two required e-signatures; the FA co-signs after the client.
export default function EsignFa() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [signature, setSignature] = useState(journeyData.faSignature || journeyData.faName)

  function handleNext() {
    updateJourneyData({ faSignature: signature, faSignedAt: new Date().toISOString() })
    navigate('/fund')
  }

  return (
    <div>
      <h2>FA e-signature</h2>
      <p className="subtext">
        {journeyData.faName}, co-sign to confirm you witnessed and assisted this account opening.
      </p>
      <FormField label="Type your full legal name to sign" value={signature} onChange={setSignature} />
      <BottomNav onNext={handleNext} nextLabel="Sign & continue" nextDisabled={!signature} />
    </div>
  )
}
