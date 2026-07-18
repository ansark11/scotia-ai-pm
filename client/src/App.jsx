import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import { JOURNEY_STEPS } from './context/JourneyContext.jsx'
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

// SYNTHETIC digital deposit-account onboarding journey.
// Every screen is pre-filled with mock data so the whole flow can be
// clicked through quickly for a demo. Nothing here is real bank code,
// styling, or customer data.
function StepLayout({ children }) {
  const location = useLocation()
  const currentIndex = JOURNEY_STEPS.findIndex((s) => s.path === location.pathname)
  return (
    <div className="app-shell">
      {currentIndex >= 0 && <TopBar steps={JOURNEY_STEPS} currentIndex={currentIndex} />}
      {children}
    </div>
  )
}

export default function App() {
  return (
    <StepLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/phone-otp" element={<PhoneOtp />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/identity" element={<IdentityVerification />} />
        <Route path="/address" element={<AddressInfo />} />
        <Route path="/employment" element={<EmploymentInfo />} />
        <Route path="/credit-offer" element={<CreditCrossSell />} />
        <Route path="/tax" element={<TaxQuestions />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/fund" element={<FundAccount />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </StepLayout>
  )
}
