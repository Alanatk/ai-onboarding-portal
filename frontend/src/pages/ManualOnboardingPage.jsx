import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import ProgressBar from '../components/ProgressBar';
import { useOnboarding } from '../context/OnboardingContext';

const steps = [
  { id: 1, title: 'Basic Info', fields: ['name', 'email', 'phone'] },
  { id: 2, title: 'Education', fields: ['college', 'degree', 'graduationYear'] },
  { id: 3, title: 'Experience', fields: ['skills', 'experience', 'currentRole', 'linkedin', 'github', 'portfolio'] },
  { id: 4, title: 'Personal Info', fields: ['city', 'country', 'languages', 'interests'] },
  { id: 5, title: 'Review', fields: [] }
];

function ManualOnboardingPage() {
  const navigate = useNavigate();
  const { formData, updateData, setStep, setMode } = useOnboarding();
  const [submitError, setSubmitError] = useState('');
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({ defaultValues: formData.data });

  const currentStep = formData.step;

  const onNext = async () => {
    const valid = await trigger(steps[currentStep - 1].fields);
    if (!valid) return;
    setStep(Math.min(currentStep + 1, steps.length));
  };

  const onPrevious = () => setStep(Math.max(currentStep - 1, 1));

  const onSubmit = (data) => {
    updateData(data);
    setMode('manual');
    navigate('/review');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        <h2 className="mt-4 text-2xl font-semibold">Manual Onboarding</h2>
        <p className="mt-2 text-slate-400">Complete your profile step by step.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
        {submitError && <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{submitError}</div>}
        {currentStep === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full Name" error={errors.name?.message} {...register('name', { required: 'Full name is required' })} />
            <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' } })} />
            <Input label="Phone Number" error={errors.phone?.message} {...register('phone', { required: 'Phone number is required', pattern: { value: /^\+?[0-9\s-]{7,15}$/, message: 'Enter a valid phone number' } })} />
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid gap-4 md:grid-cols-3">
            <Input label="College" error={errors.college?.message} {...register('college', { required: 'College is required' })} />
            <Input label="Degree" error={errors.degree?.message} {...register('degree', { required: 'Degree is required' })} />
            <Input label="Graduation Year" error={errors.graduationYear?.message} {...register('graduationYear', { required: 'Graduation year is required' })} />
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Skills" error={errors.skills?.message} {...register('skills', { required: 'Skills are required' })} />
            <Input label="Experience" error={errors.experience?.message} {...register('experience', { required: 'Experience is required' })} />
            <Input label="Current Role" error={errors.currentRole?.message} {...register('currentRole', { required: 'Current role is required' })} />
            <Input label="LinkedIn URL" error={errors.linkedin?.message} {...register('linkedin', { pattern: { value: /^https?:\/\//i, message: 'Enter a valid URL' } })} />
            <Input label="GitHub URL" error={errors.github?.message} {...register('github', { pattern: { value: /^https?:\/\//i, message: 'Enter a valid URL' } })} />
            <Input label="Portfolio URL" error={errors.portfolio?.message} {...register('portfolio', { pattern: { value: /^https?:\/\//i, message: 'Enter a valid URL' } })} />
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="City" error={errors.city?.message} {...register('city', { required: 'City is required' })} />
            <Input label="Country" error={errors.country?.message} {...register('country', { required: 'Country is required' })} />
            <Input label="Languages" error={errors.languages?.message} {...register('languages', { required: 'Languages are required' })} />
            <Input label="Interests" error={errors.interests?.message} {...register('interests', { required: 'Interests are required' })} />
          </div>
        )}

        {currentStep === 5 && (
          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-300">
            <p className="mb-3 font-medium text-white">Review your details before continuing.</p>
            <pre className="whitespace-pre-wrap break-words text-slate-400">{JSON.stringify(formData.data, null, 2)}</pre>
          </div>
        )}

        <div className="flex flex-wrap justify-between gap-3">
          <Button type="button" variant="secondary" onClick={onPrevious} disabled={currentStep === 1} className="disabled:opacity-50">
            <ChevronLeft className="mr-2 inline h-4 w-4" /> Previous
          </Button>
          {currentStep < steps.length ? (
            <Button type="button" onClick={onNext}>
              Next <ChevronRight className="ml-2 inline h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">Review & Submit</Button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default ManualOnboardingPage;
