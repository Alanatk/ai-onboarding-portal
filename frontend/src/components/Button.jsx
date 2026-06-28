import { motion } from 'framer-motion';

function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'rounded-full px-5 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400';
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-600/20',
    secondary: 'border border-white/10 bg-white/10 text-slate-100 hover:bg-white/20',
    ghost: 'text-slate-200 hover:bg-white/10'
  };

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </motion.button>
  );
}

export default Button;
