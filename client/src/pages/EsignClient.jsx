import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Branch-only — see docs/rules/channels/branch.md. With a banker
// present, consent can't rely on the account-agreement checkboxes alone,
// so client and FA each sign separately (this step, then EsignFa) before
// funding.
export default function EsignClient() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [signature, setSignature] = useState(journeyData.clientSignature || journeyData.fullName)

  function handleNext() {
    updateJourneyData({ clientSignature: signature, clientSignedAt: new Date().toISOString() })
    navigate('/esign-fa')
  }

  return (
    <div>
      <h2>Client e-signature</h2>
      <p className="subtext">
        Type your full legal name below to sign the account opening consent for {journeyData.product}.
      </p>
      <FormField label="Type your full legal name to sign" value={signature} onChange={setSignature} />
      <BottomNav onNext={handleNext} nextLabel="Sign & continue" nextDisabled={!signature} />
    </div>
  )
}
