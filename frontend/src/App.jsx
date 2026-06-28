import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import ManualOnboardingPage from './pages/ManualOnboardingPage';
import VoiceOnboardingPage from './pages/VoiceOnboardingPage';
import ReviewPage from './pages/ReviewPage';
import SuccessPage from './pages/SuccessPage';
import Layout from './layouts/Layout';
import { OnboardingProvider } from './context/OnboardingContext';

function App() {
  return (
    <OnboardingProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/manual" element={<ManualOnboardingPage />} />
            <Route path="/voice" element={<VoiceOnboardingPage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </OnboardingProvider>
  );
}

export default App;
