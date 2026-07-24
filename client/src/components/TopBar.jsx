// Progress bar only — back navigation lives in BottomNav (bottom-left)
// so it isn't duplicated in two places on screen.
export default function TopBar({ steps, currentIndex }) {
  const pct = Math.round(((currentIndex + 1) / steps.length) * 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
      <div style={{ flex: 1, height: 4, background: 'var(--border-card)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)' }} />
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {currentIndex + 1}/{steps.length}
      </span>
    </div>
  )
}
