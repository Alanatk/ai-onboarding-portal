function Input({ label, error, ...props }) {
  return (
    <label className="block space-y-2 text-sm">
      {label && <span className="text-slate-300">{label}</span>}
      <input
        className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-brand-500"
        {...props}
      />
      {error && <span className="text-sm text-rose-400">{error}</span>}
    </label>
  );
}

export default Input;
