import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import { JOURNEY_STEPS_DIGITAL, JOURNEY_STEPS_BRANCH, useJourney } from './context/JourneyContext.jsx'
import Overview from './pages/Overview.jsx'
import PhoneOtp from './pages/PhoneOtp.jsx'
import ProfileSetup from './pages/ProfileSetup.jsx'
import IdentityVerification from './pages/IdentityVerification.jsx'
import AddressInfo from './pages/AddressInfo.jsx'
import EmploymentInfo from './pages/EmploymentInfo.jsx'
import CreditCrossSell from './pages/CreditCrossSell.jsx'
import TaxQuestions from './pages/TaxQuestions.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import FundAccount from './pages/FundAccount.jsx'
import Confirmation from './pages/Confirmation.jsx'
import FaLogin from './pages/FaLogin.jsx'
import EsignClient from './pages/EsignClient.jsx'
import EsignFa from './pages/EsignFa.jsx'

// SYNTHETIC deposit-account onboarding journey — digital by default, or
// branch-assisted (FA login + dual e-signature) when entered via /fa-login.
// See docs/rules/channels/branch.md. Every screen is pre-filled with mock
// data so either flow can be clicked through quickly for a demo.
function StepLayout({ children }) {
  const location = useLocation()
  const { journeyData } = useJourney()
  const steps = journeyData.channel === 'branch' ? JOURNEY_STEPS_BRANCH : JOURNEY_STEPS_DIGITAL
  const currentIndex = steps.findIndex((s) => s.path === location.pathname)
  return (
    <div className="app-shell">
      {currentIndex >= 0 && <TopBar steps={steps} currentIndex={currentIndex} />}
      {children}
    </div>
  )
}

export default function App() {
  return (
    <StepLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/fa-login" element={<FaLogin />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/phone-otp" element={<PhoneOtp />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/identity" element={<IdentityVerification />} />
        <Route path="/address" element={<AddressInfo />} />
        <Route path="/employment" element={<EmploymentInfo />} />
        <Route path="/credit-offer" element={<CreditCrossSell />} />
        <Route path="/tax" element={<TaxQuestions />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/esign-client" element={<EsignClient />} />
        <Route path="/esign-fa" element={<EsignFa />} />
        <Route path="/fund" element={<FundAccount />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </StepLayout>
  )
}
