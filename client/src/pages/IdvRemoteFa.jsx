import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

// SYNTHETIC. Branch-only, FA-facing — see docs/rules/remote-identity-verification.md.
// The customer must complete ID-V on their own device, not the FA's. This
// screen sends them a link and polls the server for completion.
export default function IdvRemoteFa() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [status, setStatus] = useState('idle') // idle | sending | waiting
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const pollRef = useRef(null)

  useEffect(() => () => clearInterval(pollRef.current), [])

  async function sendLink() {
    setStatus('sending')
    setError('')
    const res = await fetch('/api/idv-remote/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: journeyData.fullName,
        email: journeyData.email,
        phoneNumber: journeyData.phoneNumber
      })
    })
    const result = await res.json()
    setToken(result.token)
    setStatus('waiting')

    pollRef.current = setInterval(async () => {
      const statusRes = await fetch(`/api/idv-remote/${result.token}/status`)
      const statusResult = await statusRes.json()
      if (statusResult.status === 'completed') {
        clearInterval(pollRef.current)
        updateJourneyData({ idvRemoteCompleted: true })
        navigate('/idv-remote-complete')
      }
    }, 2000)
  }

  const link = token ? `${window.location.origin}/remote-identity/${token}` : null

  return (
    <div>
      <h2>Verify {journeyData.fullName}&apos;s identity</h2>
      <p className="subtext">
        This has to happen on the customer&apos;s own device — send them a link to complete it.
      </p>

      {status === 'idle' && (
        <>
          <CTAButtonRow onSms={sendLink} onEmail={sendLink} />
          {error && <div className="error-box">{error}</div>}
        </>
      )}

      {(status === 'sending' || status === 'waiting') && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-card)',
            padding: '16px',
            marginBottom: 16
          }}
        >
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 10 }}>
            {status === 'sending' ? 'Generating link…' : 'Link sent. Waiting for the customer to complete verification on their device…'}
          </div>
          {link && (
            <a href={link} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--accent)', wordBreak: 'break-all' }}>
              {link}
            </a>
          )}
          {status === 'waiting' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <span className="delight-pop" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Waiting…</span>
            </div>
          )}
        </div>
      )}

      <BottomNav onNext={() => {}} nextDisabled nextLabel="Waiting…" />
    </div>
  )
}

function CTAButtonRow({ onSms, onEmail }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
      <button
        type="button"
        onClick={onSms}
        style={{
          flex: 1,
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          padding: '13px',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer'
        }}
      >
        Send via SMS
      </button>
      <button
        type="button"
        onClick={onEmail}
        style={{
          flex: 1,
          background: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-pill)',
          padding: '13px',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer'
        }}
      >
        Send via Email
      </button>
    </div>
  )
}
