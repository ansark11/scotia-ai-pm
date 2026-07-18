import { useNavigate } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

export default function Overview() {
  const navigate = useNavigate()
  const { journeyData } = useJourney()

  return (
    <div>
      <h1>{journeyData.product}</h1>
      <p className="subtext">
        Opening your account takes about 8 minutes. You&apos;ll need your phone number, a
        government-issued ID, and some basic employment information.
      </p>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-card)',
          padding: '16px',
          marginBottom: 24,
          fontSize: 14,
          color: 'var(--text-secondary)'
        }}
      >
        No monthly fees. No minimum balance. Free e-transfers.
      </div>
      <CTAButton onClick={() => navigate('/phone-otp')}>Get started</CTAButton>
    </div>
  )
}
