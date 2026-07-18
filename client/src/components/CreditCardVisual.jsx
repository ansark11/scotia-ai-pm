export default function CreditCardVisual({ holderName, creditLimit }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #3a0008 0%, #7a0016 55%, #e4002b 100%)',
        borderRadius: 18,
        padding: '20px 22px',
        marginBottom: 20,
        color: '#fff',
        position: 'relative',
        minHeight: 170
      }}
    >
      <div style={{ fontSize: 13, color: '#f4b9c4', marginBottom: 34 }}>Scotia Momentum Card (demo)</div>
      <div style={{ fontSize: 18, letterSpacing: 2, marginBottom: 18 }}>&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4471</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, color: '#f4b9c4' }}>Card holder</div>
          <div style={{ fontSize: 14 }}>{holderName}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: '#f4b9c4' }}>Expires</div>
          <div style={{ fontSize: 14 }}>05/31</div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 22,
          fontSize: 12,
          background: 'rgba(255,255,255,0.15)',
          padding: '4px 10px',
          borderRadius: 12
        }}
      >
        Limit ${Number(creditLimit).toLocaleString()}
      </div>
    </div>
  )
}
