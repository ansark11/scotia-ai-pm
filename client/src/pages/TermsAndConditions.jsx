import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

function AccordionCard({ title, defaultOpen, children, checked, onCheckedChange, checkboxLabel }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-card)',
        marginBottom: 12,
        overflow: 'hidden'
      }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen((o) => !o)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 16px',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500
        }}
      >
        {title}
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>{children}</div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
            {checkboxLabel}
          </label>
        </div>
      )}
    </div>
  )
}

export default function TermsAndConditions() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [accountChecked, setAccountChecked] = useState(journeyData.termsAccepted)
  const [cardChecked, setCardChecked] = useState(journeyData.termsAccepted)

  const hasCreditCard = journeyData.creditOfferAccepted === true
  const allChecked = accountChecked && (!hasCreditCard || cardChecked)

  function handleNext() {
    updateJourneyData({ termsAccepted: allChecked, consentTimestamp: new Date().toISOString() })
    navigate('/fund')
  }

  return (
    <div>
      <h2>Account agreements</h2>
      <p className="subtext">Let&apos;s make this official — review your account agreements below.</p>

      <AccordionCard
        title="Chequing account agreement"
        defaultOpen
        checked={accountChecked}
        onCheckedChange={setAccountChecked}
        checkboxLabel="I agree to the agreements above and certify the information I've provided is correct."
      >
        Terms for {journeyData.product}, plus the {journeyData.province} provincial disclosure applicable to
        this product. Explains how funds are held, transferred, and accessed, and your responsibilities when
        using the account and related services.
      </AccordionCard>

      {hasCreditCard && (
        <AccordionCard
          title="Credit card agreement"
          checked={cardChecked}
          onCheckedChange={setCardChecked}
          checkboxLabel="I agree to the credit card agreement above."
        >
          Terms for your Scotia Momentum Card (demo), including your interest rate, credit limit, and
          repayment responsibilities.
        </AccordionCard>
      )}

      <BottomNav onNext={handleNext} nextDisabled={!allChecked} />
    </div>
  )
}
