import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'

const ID_TYPES = [
  { value: 'drivers-license', label: "Driver's License" },
  { value: 'passport', label: 'Passport' },
  { value: 'provincial-id', label: 'Provincial ID Card' },
  { value: 'pr-card', label: 'Permanent Resident Card' }
]

// SYNTHETIC. Branch-only, customer-facing — see docs/rules/remote-identity-verification.md.
// Reached via the link the FA sends. Deliberately NOT part of JOURNEY_STEPS —
// this is a separate device/session, not a tracked step in the FA's progress
// bar. Standalone route, no TopBar chrome.
export default function RemoteIdentityEntry() {
  const { token } = useParams()
  const [stage, setStage] = useState('loading') // loading | invalid | intro | form | done
  const [session, setSession] = useState(null)
  const [idType, setIdType] = useState('drivers-license')
  const [idNumber, setIdNumber] = useState('D1234-56789-01234')
  const [idExpiry, setIdExpiry] = useState('2029-08-01')
  const [reasons, setReasons] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/idv-remote/${token}/status`)
      .then((res) => res.json())
      .then((result) => {
        if (!result.found || result.status === 'completed') {
          setStage('invalid')
        } else {
          setSession(result)
          setStage('intro')
        }
      })
  }, [token])

  async function handleVerify() {
    setLoading(true)
    setReasons([])
    const res = await fetch(`/api/idv-remote/${token}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idType, idNumber, idExpiry })
    })
    const result = await res.json()
    setLoading(false)
    if (result.valid) {
      setStage('done')
    } else {
      setReasons(result.reasons)
    }
  }

  if (stage === 'loading') {
    return <div className="app-shell"><p className="subtext">Loading…</p></div>
  }

  if (stage === 'invalid') {
    return (
      <div className="app-shell">
        <h2>Link no longer valid</h2>
        <p className="subtext">This link has already been used or could not be found. Ask your FA to send a new one.</p>
      </div>
    )
  }

  if (stage === 'intro') {
    return (
      <div className="app-shell" style={{ textAlign: 'center', paddingTop: 20 }}>
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
        <h2>Verify your identity, {session.fullName}</h2>
        <p className="subtext">Your FA sent you this link so you can complete this step on your own device.</p>
        <CTAButton onClick={() => setStage('form')}>Verify your identity</CTAButton>
      </div>
    )
  }

  if (stage === 'form') {
    return (
      <div className="app-shell">
        <h2>Identity verification</h2>
        <p className="subtext">Document scan + liveness check (mocked for this demo).</p>
        <FormField label="ID type" value={idType} onChange={setIdType} options={ID_TYPES} />
        <FormField label="ID number" value={idNumber} onChange={setIdNumber} />
        <FormField label="ID expiry date" type="date" value={idExpiry} onChange={setIdExpiry} />
        {reasons.length > 0 && (
          <div className="error-box">
            {reasons.map((r) => (
              <div key={r}>{r}</div>
            ))}
          </div>
        )}
        <CTAButton onClick={handleVerify} disabled={loading}>
          {loading ? 'Verifying…' : 'Verify'}
        </CTAButton>
      </div>
    )
  }

  return (
    <div className="app-shell" style={{ textAlign: 'center', paddingTop: 48 }}>
      <div className="delight-pop">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="var(--success)" />
          <path d="M7 12.5L10.2 15.7L17 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ marginTop: 22 }}>You&apos;re verified</h2>
      <p className="subtext">You can hand the device back to your FA — they&apos;ll continue from here.</p>
    </div>
  )
}
