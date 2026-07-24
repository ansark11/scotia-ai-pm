import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// SYNTHETIC. Branch-only, FA-facing — moment-of-delight transition shown
// once the customer completes remote ID-V on their own device. Same
// animation pattern as CreditCardDelight.jsx. Auto-advances to Address info.
export default function IdvRemoteComplete() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/address'), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={{ textAlign: 'center', paddingTop: 48 }}>
      <div className="delight-pop">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="var(--success)" />
          <path d="M7 12.5L10.2 15.7L17 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ marginTop: 22 }}>Identity verified</h2>
      <p className="subtext">The customer completed verification on their own device.</p>
    </div>
  )
}
