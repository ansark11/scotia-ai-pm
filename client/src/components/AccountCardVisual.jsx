export default function AccountCardVisual({ holderName, product }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #17171d 0%, #2a2a33 55%, #3d3d47 100%)',
        borderRadius: 18,
        padding: '20px 22px',
        marginBottom: 20,
        color: '#fff',
        position: 'relative',
        minHeight: 140
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 30 }}>{product}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Account holder</div>
          <div style={{ fontSize: 14 }}>{holderName}</div>
        </div>
      </div>
    </div>
  )
}
