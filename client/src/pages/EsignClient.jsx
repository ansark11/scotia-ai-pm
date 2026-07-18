import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Branch-only — see docs/rules/channels/branch.md. With a banker
// present, consent can't rely on a checkbox alone, so client and FA each
// sign separately (this step, then EsignFa) before funding.
export default function EsignClient() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [signature, setSignature] = useState(journeyData.clientSignature || journeyData.fullName)

  function handleSign() {
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
      <CTAButton onClick={handleSign} disabled={!signature}>
        Sign & continue
      </CTAButton>
    </div>
  )
}
