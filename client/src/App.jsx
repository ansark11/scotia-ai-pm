import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import { JOURNEY_STEPS_DIGITAL, JOURNEY_STEPS_BRANCH, useJourney } from './context/JourneyContext.jsx'
import Overview from './pages/Overview.jsx'
import PhoneNumber from './pages/PhoneNumber.jsx'
import OtpVerify from './pages/OtpVerify.jsx'
import ProfileSetup from './pages/ProfileSetup.jsx'
import IdvIntro from './pages/IdvIntro.jsx'
import IdentityVerification from './pages/IdentityVerification.jsx'
import AddressInfo from './pages/AddressInfo.jsx'
import EmploymentInfo from './pages/EmploymentInfo.jsx'
import CreditCrossSell from './pages/CreditCrossSell.jsx'
import CreditCardDelight from './pages/CreditCardDelight.jsx'
import TaxQuestions from './pages/TaxQuestions.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import FundAccount from './pages/FundAccount.jsx'
import Confirmation from './pages/Confirmation.jsx'
import FaLogin from './pages/FaLogin.jsx'
import EsignClient from './pages/EsignClient.jsx'
import EsignFa from './pages/EsignFa.jsx'
import IdvRemoteFa from './pages/IdvRemoteFa.jsx'
import IdvRemoteComplete from './pages/IdvRemoteComplete.jsx'
import RemoteIdentityEntry from './pages/RemoteIdentityEntry.jsx'

// SYNTHETIC deposit-account onboarding journey — digital by default, or
// branch-assisted (FA login + remote ID-V handoff + dual e-signature) when
// entered via /fa-login. See docs/rules/channels/branch.md. Every screen is
// pre-filled with mock data so either flow can be clicked through quickly.
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

// The journey proper — everything except the customer's remote ID-V page,
// which is a separate device/session and deliberately has no step chrome.
function JourneyRoutes() {
  return (
    <StepLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/fa-login" element={<FaLogin />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/phone" element={<PhoneNumber />} />
        <Route path="/otp" element={<OtpVerify />} />
        <Route path="/profile" element={<ProfileSetup />} />
        <Route path="/identity-intro" element={<IdvIntro />} />
        <Route path="/identity" element={<IdentityVerification />} />
        <Route path="/idv-remote-fa" element={<IdvRemoteFa />} />
        <Route path="/idv-remote-complete" element={<IdvRemoteComplete />} />
        <Route path="/address" element={<AddressInfo />} />
        <Route path="/employment" element={<EmploymentInfo />} />
        <Route path="/credit-offer" element={<CreditCrossSell />} />
        <Route path="/credit-card-added" element={<CreditCardDelight />} />
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

export default function App() {
  return (
    <Routes>
      <Route path="/remote-identity/:token" element={<RemoteIdentityEntry />} />
      <Route path="/*" element={<JourneyRoutes />} />
    </Routes>
  )
}
