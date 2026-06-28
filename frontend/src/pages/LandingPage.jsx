import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Brain, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';

const features = [
  { icon: Zap, title: 'Fast', desc: 'Move from signup to submission in minutes.' },
  { icon: ShieldCheck, title: 'Secure', desc: 'Your information is safely stored and encrypted.' },
  { icon: Brain, title: 'AI Powered', desc: 'Voice onboarding with a conversational assistant.' },
  { icon: Smartphone, title: 'Responsive', desc: 'Optimized for mobile, tablet, and desktop.' }
];

function LandingPage() {
  const { setMode } = useOnboarding();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-black/30 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-sm text-brand-200">AI-powered onboarding for hackathon teams</span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Welcome to AI Onboarding</h1>
          <p className="max-w-xl text-lg text-slate-300">Complete your onboarding manually or with our AI Voice Assistant.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/manual" onClick={() => setMode('manual')}>
              <Button>Start Manual Onboarding <ArrowRight className="ml-2 inline h-4 w-4" /></Button>
            </Link>
            <Link to="/voice" onClick={() => setMode('voice')}>
              <Button variant="secondary">Start AI Voice Onboarding</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-brand-600/30 to-cyan-500/20 p-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">What you get</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Guided multi-step onboarding</li>
              <li>• Voice-first conversational flow</li>
              <li>• Structured submission and review</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} whileHover={{ y: -4 }} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="mb-4 inline-flex rounded-2xl bg-brand-500/10 p-3 text-brand-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          );
        })}
      </section>
    </motion.div>
  );
}

export default LandingPage;
