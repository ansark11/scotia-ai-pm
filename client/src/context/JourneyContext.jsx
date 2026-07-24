import { createContext, useContext, useState } from 'react'

// SYNTHETIC. Ordered steps for the digital deposit-account journey.
// Note: "Credit offer" is only ever visited by applicants who pass the
// eligibility check in EmploymentInfo — see docs/rules/credit-cross-sell.md.
// "Card added" is only ever visited if that offer was accepted.
export const JOURNEY_STEPS_DIGITAL = [
  { path: '/overview', label: 'Overview' },
  { path: '/phone', label: 'Phone number' },
  { path: '/otp', label: 'Verify code' },
  { path: '/profile', label: 'Profile setup' },
  { path: '/identity-intro', label: 'Verify identity' },
  { path: '/identity', label: 'Identity verification' },
  { path: '/address', label: 'Address info' },
  { path: '/employment', label: 'Employment info' },
  { path: '/credit-offer', label: 'Credit card offer' },
  { path: '/credit-card-added', label: 'Card added' },
  { path: '/tax', label: 'Tax questions' },
  { path: '/terms', label: 'Account agreements' },
  { path: '/fund', label: 'Fund account' },
  { path: '/confirmation', label: 'Confirmation' }
]

// SYNTHETIC. Branch-assisted journey — see docs/rules/channels/branch.md.
// Reuses most digital steps as-is. Identity verification must happen on
// the customer's own device (see docs/rules/remote-identity-verification.md)
// so it's replaced by idv-remote-fa/idv-remote-complete instead of
// identity-intro/identity. Adds FA login up front and dual e-signature
// before funding.
export const JOURNEY_STEPS_BRANCH = [
  { path: '/fa-login', label: 'FA login' },
  { path: '/overview', label: 'Overview' },
  { path: '/phone', label: 'Phone number' },
  { path: '/otp', label: 'Verify code' },
  { path: '/profile', label: 'Profile setup' },
  { path: '/idv-remote-fa', label: 'Verify identity' },
  { path: '/idv-remote-complete', label: 'Identity verified' },
  { path: '/address', label: 'Address info' },
  { path: '/employment', label: 'Employment info' },
  { path: '/credit-offer', label: 'Credit card offer' },
  { path: '/credit-card-added', label: 'Card added' },
  { path: '/tax', label: 'Tax questions' },
  { path: '/terms', label: 'Account agreements' },
  { path: '/esign-client', label: 'Client e-signature' },
  { path: '/esign-fa', label: 'FA e-signature' },
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
  fundingAmount: '500',
  channel: 'digital',
  faEmployeeId: '',
  faName: '',
  idvRemoteCompleted: false,
  clientSignature: '',
  clientSignedAt: null,
  faSignature: '',
  faSignedAt: null
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
