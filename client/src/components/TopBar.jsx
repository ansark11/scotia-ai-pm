import { useNavigate } from 'react-router-dom'

export default function TopBar({ steps, currentIndex }) {
  const navigate = useNavigate()
  const pct = Math.round(((currentIndex + 1) / steps.length) * 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
      <span
        onClick={() => navigate(-1)}
        style={{ fontSize: 24, color: 'var(--text-primary)', cursor: 'pointer', lineHeight: 1 }}
        aria-label="Back"
      >
        &#8249;
      </span>
      <div style={{ flex: 1, height: 4, background: 'var(--border-card)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)' }} />
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {currentIndex + 1}/{steps.length}
      </span>
    </div>
  )
}
