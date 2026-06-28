import { motion } from 'framer-motion';
import { CheckCircle2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';

function SuccessPage() {
  const { formData, reset } = useOnboarding();

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(formData.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'onboarding-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex justify-center">
      <div className="w-full max-w-3xl rounded-[2rem] border border-emerald-400/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-black/30">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h2 className="text-3xl font-semibold">Congratulations!</h2>
        <p className="mt-3 text-slate-400">Your onboarding has been completed successfully.</p>
        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4 text-left text-sm text-slate-300">
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(formData.data, null, 2)}</pre>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={downloadJson}>
            <Download className="mr-2 inline h-4 w-4" /> Download JSON
          </Button>
          <Link to="/">
            <Button variant="secondary" onClick={reset}>Start Over</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default SuccessPage;
