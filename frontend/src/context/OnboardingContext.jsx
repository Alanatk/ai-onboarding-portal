import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const OnboardingContext = createContext();

const defaultState = {
  mode: 'manual',
  data: {
    name: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    graduationYear: '',
    skills: '',
    experience: '',
    currentRole: '',
    linkedin: '',
    github: '',
    portfolio: '',
    city: '',
    country: '',
    languages: '',
    interests: ''
  },
  step: 1
};

export function OnboardingProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('onboarding-state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('onboarding-state', JSON.stringify(formData));
  }, [formData]);

  const updateData = (changes) => {
    setFormData((prev) => ({ ...prev, data: { ...prev.data, ...changes } }));
  };

  const setMode = (mode) => setFormData((prev) => ({ ...prev, mode }));
  const setStep = (step) => setFormData((prev) => ({ ...prev, step }));
  const reset = () => {
    localStorage.removeItem('onboarding-state');
    setFormData(defaultState);
  };

  const value = useMemo(
    () => ({ formData, updateData, setMode, setStep, reset }),
    [formData]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}
