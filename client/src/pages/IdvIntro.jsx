import { useNavigate } from 'react-router-dom'
import CTAButton from '../components/CTAButton.jsx'

// SYNTHETIC. Intro splash before the identity-verification form — sets
// expectations before asking for ID details.
export default function IdvIntro() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      <div
        style={{
          width: 88,
          height: 88,
          margin: '0 auto 28px',
          borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="9" width="16" height="12" rx="2" stroke="var(--accent)" strokeWidth="1.6" />
          <path d="M8 9V6a4 4 0 0 1 8 0v3" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="14.5" r="1.6" fill="var(--accent)" />
        </svg>
      </div>
      <h2>Verify your identity to open your account</h2>
      <p className="subtext">
        You&apos;ll need a government-issued ID. This takes about a minute.
      </p>
      <CTAButton onClick={() => navigate('/identity')}>Verify your identity</CTAButton>
    </div>
  )
}
