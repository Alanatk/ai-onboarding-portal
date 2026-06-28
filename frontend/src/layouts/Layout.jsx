import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu } from 'lucide-react';

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <div className="rounded-full bg-brand-600/20 p-2">
              <Sparkles className="h-5 w-5 text-brand-400" />
            </div>
            AI Onboarding Portal
          </Link>
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link to="/" className={location.pathname === '/' ? 'text-white' : ''}>Landing</Link>
            <Link to="/manual" className={location.pathname === '/manual' ? 'text-white' : ''}>Manual</Link>
            <Link to="/voice" className={location.pathname === '/voice' ? 'text-white' : ''}>Voice</Link>
          </nav>
          <button className="rounded-full border border-white/10 p-2 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <footer className="border-t border-white/10 py-6 text-center text-sm text-slate-400">
        Designed for modern hackathon onboarding experiences.
      </footer>
    </div>
  );
}

export default Layout;
