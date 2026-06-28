function ProgressBar({ currentStep, totalSteps }) {
  const percent = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
        <span>Progress</span>
        <span>{currentStep}/{totalSteps}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
