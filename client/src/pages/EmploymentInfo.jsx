import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import CTAButton from '../components/CTAButton.jsx'
import { useJourney } from '../context/JourneyContext.jsx'

const STATUS_OPTIONS = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-employed' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' }
]

export default function EmploymentInfo() {
  const navigate = useNavigate()
  const { journeyData, updateJourneyData } = useJourney()
  const [employmentStatus, setEmploymentStatus] = useState(journeyData.employmentStatus)
  const [employerName, setEmployerName] = useState(journeyData.employerName)
  const [jobTitle, setJobTitle] = useState(journeyData.jobTitle)
  const [schoolName, setSchoolName] = useState(journeyData.schoolName || 'Toronto Metropolitan University')
  const [expectedGraduationDate, setExpectedGraduationDate] = useState(
    journeyData.expectedGraduationDate || '2027-06-01'
  )
  const [annualIncome, setAnnualIncome] = useState(journeyData.annualIncome)
  const [loading, setLoading] = useState(false)

  // Employment info always continues — the credit cross-sell gating rule
  // (server/rules/creditOffer.js) decides, on submit, whether this
  // applicant ever sees /credit-offer at all. See docs/rules/credit-cross-sell.md.
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    updateJourneyData({
      employmentStatus,
      employerName,
      jobTitle,
      schoolName,
      expectedGraduationDate,
      annualIncome
    })
    const res = await fetch('/api/credit-offer/eligibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employmentStatus, annualIncome: Number(annualIncome), dob: journeyData.dob })
    })
    const result = await res.json()
    setLoading(false)
    updateJourneyData({ creditEligible: result.eligible, creditLimit: result.creditLimit })
    navigate(result.eligible ? '/credit-offer' : '/tax')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Employment info</h2>
      <p className="subtext">This helps us understand your financial picture.</p>
      <FormField
        label="Employment status"
        value={employmentStatus}
        onChange={setEmploymentStatus}
        options={STATUS_OPTIONS}
      />

      {(employmentStatus === 'employed' || employmentStatus === 'self-employed') && (
        <>
          <FormField label="Employer name" value={employerName} onChange={setEmployerName} />
          <FormField label="Job title" value={jobTitle} onChange={setJobTitle} />
          <FormField label="Annual income ($)" type="number" value={annualIncome} onChange={setAnnualIncome} />
        </>
      )}

      {employmentStatus === 'student' && (
        <>
          <FormField label="School name" value={schoolName} onChange={setSchoolName} />
          <FormField
            label="Expected graduation date"
            type="date"
            value={expectedGraduationDate}
            onChange={setExpectedGraduationDate}
          />
          <FormField label="Annual income, if any ($)" type="number" value={annualIncome} onChange={setAnnualIncome} />
        </>
      )}

      {employmentStatus === 'retired' && (
        <FormField
          label="Annual income — pension/other ($)"
          type="number"
          value={annualIncome}
          onChange={setAnnualIncome}
        />
      )}

      {employmentStatus === 'unemployed' && (
        <FormField
          label="Annual income — other sources ($)"
          type="number"
          value={annualIncome}
          onChange={setAnnualIncome}
        />
      )}

      <CTAButton type="submit" disabled={loading}>
        {loading ? 'Checking...' : 'Continue'}
      </CTAButton>
    </form>
  )
}
