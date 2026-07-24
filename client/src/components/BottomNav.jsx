import { useNavigate } from 'react-router-dom'

// Smaller paired nav buttons used on every step after Overview — back
// arrow bottom-left, primary action bottom-right. Replaces the old
// full-width CTAButton pattern for in-journey steps.
export default function BottomNav({ onNext, nextLabel = 'Next', nextDisabled, nextType = 'button', loading, onBack }) {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
      <button
        type="button"
        onClick={onBack || (() => navigate(-1))}
        aria-label="Back"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid var(--border-card)',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          fontSize: 18,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        &#8249;
      </button>
      <button
        type={nextType}
        onClick={nextType === 'submit' ? undefined : onNext}
        disabled={nextDisabled}
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          padding: '11px 26px',
          fontSize: 14,
          fontWeight: 500,
          cursor: nextDisabled ? 'not-allowed' : 'pointer',
          opacity: nextDisabled ? 0.5 : 1
        }}
      >
        {loading ? 'Please wait…' : nextLabel}
      </button>
    </div>
  )
}
