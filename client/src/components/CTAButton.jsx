export default function CTAButton({ children, onClick, variant = 'primary', type = 'button', disabled }) {
  const isPrimary = variant === 'primary'
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        background: isPrimary ? 'var(--accent)' : 'transparent',
        color: isPrimary ? '#FFFFFF' : 'var(--text-secondary)',
        border: isPrimary ? 'none' : '1px solid var(--border-card)',
        borderRadius: isPrimary ? 'var(--radius-pill)' : 'var(--radius-card)',
        padding: '14px',
        fontSize: 15,
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        marginBottom: 12
      }}
    >
      {children}
    </button>
  )
}
