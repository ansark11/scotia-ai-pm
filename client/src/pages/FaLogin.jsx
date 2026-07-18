import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Branch-only entry point — see docs/rules/channels/branch.md.
// Establishes which banker is assisting and which client record is being
// opened before the shared journey steps begin.
export default function FaLogin() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [faEmployeeId, setFaEmployeeId] = useState(journeyData.faEmployeeId || 'FA-48213')
  const [faName, setFaName] = useState(journeyData.faName || 'Priya Nair')
  const [clientName, setClientName] = useState(journeyData.fullName)

  function handleContinue() {
    updateJourneyData({ channel: 'branch', faEmployeeId, faName, fullName: clientName })
    navigate('/overview')
  }

  return (
    <div>
      <h2>Branch session start</h2>
      <p className="subtext">Confirm who&apos;s assisting and which client record this session is for.</p>
      <FormField label="FA employee ID" value={faEmployeeId} onChange={setFaEmployeeId} />
      <FormField label="FA name" value={faName} onChange={setFaName} />
      <FormField label="Client name" value={clientName} onChange={setClientName} />
      <CTAButton onClick={handleContinue}>Start client session</CTAButton>
    </div>
  )
}
