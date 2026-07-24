import { useNavigate } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'
import CreditCardVisual from '../components/CreditCardVisual.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// This screen is only ever reached if EmploymentInfo's eligibility check
// came back true. See docs/rules/credit-cross-sell.md for the gating rule.
export default function CreditCrossSell() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()

  function handleChoice(accepted) {
    updateJourneyData({ creditOfferAccepted: accepted })
    navigate(accepted ? '/credit-card-added' : '/tax')
  }

  return (
    <div>
      <h2>You&apos;re pre-qualified</h2>
      <p className="subtext">Based on your profile, you&apos;re pre-qualified for a credit card.</p>
      <CreditCardVisual holderName={journeyData.fullName} creditLimit={journeyData.creditLimit} />
      <CTAButton onClick={() => handleChoice(true)}>Accept offer</CTAButton>
      <CTAButton variant="secondary" onClick={() => handleChoice(false)}>
        Skip for now
      </CTAButton>
    </div>
  )
}
