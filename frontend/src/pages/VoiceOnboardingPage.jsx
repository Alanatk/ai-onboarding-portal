import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';

const questions = [
  'Hello! Welcome to the onboarding process.',
  'What is your full name?',
  'What is your email?',
  'What is your phone number?',
  'Which college are you studying at?',
  'What degree are you pursuing?',
  'What is your graduation year?',
  'What skills do you bring?',
  'What is your current role or experience?',
  'What city and country are you based in?',
  'What languages do you speak?',
  'What are your interests?'
];

function VoiceOnboardingPage() {
  const navigate = useNavigate();
  const { updateData, setMode } = useOnboarding();
  const [messages, setMessages] = useState([{ role: 'assistant', text: questions[0] }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognition = useMemo(() => {
    if (typeof window === 'undefined' || !('webkitSpeechRecognition' in window)) return null;
    return new window.webkitSpeechRecognition();
  }, []);

  useEffect(() => {
    if (!recognition) return;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setMessages((prev) => [...prev, { role: 'user', text }]);
      const next = questions[currentQuestionIndex + 1] || 'Thanks! Your response has been captured.';
      setMessages((prev) => [...prev, { role: 'assistant', text: next }]);
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsListening(false);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 1200);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setTranscript('Voice capture failed. Please try again.');
    };
  }, [recognition, currentQuestionIndex]);

  const startListening = () => {
    if (!recognition) {
      setTranscript('Speech Recognition is not supported in this browser.');
      return;
    }
    setIsListening(true);
    setTranscript('Listening...');
    recognition.start();
  };

  const finalize = () => {
    const payload = {
      name: messages.find((m) => m.text.toLowerCase().includes('name'))?.text || '',
      email: messages.find((m) => m.text.includes('@'))?.text || '',
      phone: messages.find((m) => m.text.match(/\d/))?.text || '',
      college: messages.find((m) => m.text.toLowerCase().includes('college'))?.text || '',
      degree: messages.find((m) => m.text.toLowerCase().includes('degree'))?.text || '',
      graduationYear: messages.find((m) => m.text.match(/20\d{2}/))?.text || '',
      skills: messages.find((m) => m.text.toLowerCase().includes('skills'))?.text || '',
      experience: messages.find((m) => m.text.toLowerCase().includes('experience'))?.text || '',
      currentRole: messages.find((m) => m.text.toLowerCase().includes('role'))?.text || '',
      city: messages.find((m) => m.text.toLowerCase().includes('city'))?.text || '',
      country: messages.find((m) => m.text.toLowerCase().includes('country'))?.text || '',
      languages: messages.find((m) => m.text.toLowerCase().includes('language'))?.text || '',
      interests: messages.find((m) => m.text.toLowerCase().includes('interest'))?.text || ''
    };
    updateData(payload);
    setMode('voice');
    navigate('/review');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">AI Voice Onboarding</h2>
            <p className="mt-2 text-sm text-slate-400">A chat-style voice experience powered by the browser Speech Recognition API.</p>
          </div>
          <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">Voice Mode</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.role === 'assistant' ? 'bg-slate-800 text-slate-200' : 'bg-brand-600 text-white'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
            <button onClick={startListening} className="rounded-full bg-brand-600 p-4 text-white shadow-lg shadow-brand-600/20">
              <Mic className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <p className="text-sm text-slate-300">{isListening ? 'Listening...' : isSpeaking ? 'AI speaking...' : 'Tap to speak'}</p>
              <p className="text-xs text-slate-500">{transcript || 'Your transcript will appear here.'}</p>
            </div>
            {isListening && <div className="flex gap-1">
              {[0, 1, 2].map((i) => <motion.span key={i} className="h-2 w-2 rounded-full bg-cyan-400" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }} />)}
            </div>}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
          <div className="flex items-center gap-3 text-brand-200">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">Voice Flow</h3>
          </div>
          <p className="mt-3 text-sm text-slate-400">The flow is designed to be compatible with OpenAI Realtime, Vapi, ElevenLabs, and Deepgram.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">• Browser-based recognition fallback</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">• Structured JSON output generation</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">• Seamless handoff into the review form</div>
          </div>
          <Button className="mt-6 w-full" onClick={finalize}>Populate Form & Continue</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default VoiceOnboardingPage;
