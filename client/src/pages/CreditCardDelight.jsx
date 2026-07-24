import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// SYNTHETIC. Moment-of-delight transition shown only if the credit card
// cross-sell offer was accepted — auto-advances to Tax questions. Purely
// a UI flourish; carries no business rule of its own.
export default function CreditCardDelight() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/tax'), 2000)
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
      <h2 style={{ marginTop: 22 }}>Your card has been added</h2>
      <p className="subtext">Setting up your account…</p>
    </div>
  )
}
