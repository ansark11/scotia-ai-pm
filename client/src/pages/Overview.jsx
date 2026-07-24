import { useNavigate } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

const BENEFITS = [
  'No monthly fees',
  'No minimum balance required',
  'Free e-transfers',
  'Reimbursed ATM withdrawal fees'
]

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="var(--accent)" />
      <path d="M5 9.3L7.5 11.8L13 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
          padding: '18px 16px',
          marginBottom: 24
        }}
      >
        {BENEFITS.map((benefit) => (
          <div
            key={benefit}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 14,
              color: 'var(--text-secondary)',
              padding: '7px 0'
            }}
          >
            <CheckIcon />
            {benefit}
          </div>
        ))}
      </div>
      <CTAButton onClick={() => navigate('/phone')}>Get started</CTAButton>
    </div>
  )
}
