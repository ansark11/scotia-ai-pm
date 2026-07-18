import { createContext, useContext, useState } from 'react'

// SYNTHETIC. Ordered steps for the digital deposit-account journey.
// Note: "Credit offer" is only ever visited by applicants who pass the
// eligibility check in EmploymentInfo — see docs/rules/credit-cross-sell.md.
export const JOURNEY_STEPS = [
  { path: '/overview', label: 'Overview' },
  { path: '/phone-otp', label: 'Phone & OTP' },
  { path: '/profile', label: 'Profile setup' },
  { path: '/identity', label: 'Identity verification' },
  { path: '/address', label: 'Address info' },
  { path: '/employment', label: 'Employment info' },
  { path: '/credit-offer', label: 'Credit card offer' },
  { path: '/tax', label: 'Tax questions' },
  { path: '/terms', label: 'Terms & conditions' },
  { path: '/fund', label: 'Fund account' },
  { path: '/confirmation', label: 'Confirmation' }
]

// Pre-filled with mock data so the whole journey can be clicked through
// quickly for a demo. Every field remains editable.
const DEFAULT_JOURNEY_DATA = {
  product: 'Everyday Chequing Account',
  phoneNumber: '416 555 0148',
  otp: '123456',
  fullName: 'Jordan Casey',
  dob: '1990-05-14',
  email: 'jordan.casey@example.com',
  idType: 'drivers-license',
  idNumber: 'D1234-56789-01234',
  idExpiry: '2029-08-01',
  addressLine: '482 King Street West, Unit 12',
  city: 'Toronto',
  province: 'ON',
  postalCode: 'M5V 1M1',
  employmentStatus: 'employed',
  employerName: 'Nimbus Analytics Inc.',
  jobTitle: 'Senior Data Analyst',
  schoolName: '',
  expectedGraduationDate: '',
  annualIncome: '82000',
  creditEligible: null,
  creditLimit: null,
  creditOfferAccepted: null,
  taxUsPerson: false,
  taxOtherResident: false,
  termsAccepted: true,
  fundingMethod: 'transfer',
  fundingAmount: '500'
}

const JourneyContext = createContext(null)

export function JourneyProvider({ children }) {
  const [journeyData, setJourneyData] = useState(DEFAULT_JOURNEY_DATA)

  function updateJourneyData(patch) {
    setJourneyData((prev) => ({ ...prev, ...patch }))
  }

  return (
    <JourneyContext.Provider value={{ journeyData, updateJourneyData }}>{children}</JourneyContext.Provider>
  )
}

export function useJourney() {
  const ctx = useContext(JourneyContext)
  if (!ctx) throw new Error('useJourney must be used within a JourneyProvider')
  return ctx
}
