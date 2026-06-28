import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useOnboarding } from '../context/OnboardingContext';
import { submitUser } from '../services/api';

function ReviewPage() {
  const navigate = useNavigate();
  const { formData, updateData, reset } = useOnboarding();

  const handleSubmit = async () => {
    try {
      await submitUser(formData.data);
      navigate('/success');
    } catch (error) {
      console.error(error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <h2 className="text-2xl font-semibold">Review Your Information</h2>
        <p className="mt-2 text-slate-400">Confirm your information before submission.</p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(formData.data).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{key}</p>
              <p className="mt-2 text-sm text-slate-200">{value || '—'}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => navigate(formData.mode === 'voice' ? '/voice' : '/manual')}>Edit</Button>
          <Button onClick={handleSubmit}>Submit Onboarding</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default ReviewPage;
