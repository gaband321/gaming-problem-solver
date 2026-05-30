'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Gamepad2, Eye, EyeOff, Loader2, ArrowRight, Info } from 'lucide-react';
import Link from 'next/link';

// Check at module level — NEXT_PUBLIC_ vars are inlined at build time
const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ─── Shown when Supabase env vars are not set ────────────────────────────────
function AccountsNotAvailable() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">

        {/* Logo */}
        <Link href="/" className="mb-8 inline-flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg shadow-purple-500/30">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            Gaming <span className="text-purple-400">Problem Solver</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="mb-5 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
              <Info className="h-6 w-6 text-amber-400" />
            </div>
          </div>

          <h1 className="mb-3 text-xl font-bold text-white">Accounts not available yet</h1>
          <p className="mb-6 text-sm leading-relaxed text-slate-400">
            User accounts are not set up on this site yet. You can still use the full
            Problem Solver for free — no account required.
          </p>

          <Link
            href="/solve"
            className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500"
          >
            Go to the Solver
            <ArrowRight className="h-4 w-4" />
          </Link>

          <p className="mt-5 text-xs text-slate-600">
            Questions?{' '}
            <a href="mailto:gaband321@gmail.com" className="text-slate-500 underline hover:text-slate-300 transition-colors">
              gaband321@gmail.com
            </a>
          </p>
        </div>

        <p className="mt-6 text-sm text-slate-600">
          <Link href="/" className="transition-colors hover:text-slate-400">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

// ─── Full auth form — only rendered when Supabase is configured ──────────────
function AuthFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') ?? '/solve';
  const defaultMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // If already logged in, redirect away
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) router.push(redirectTo);
    });
  }, [router, redirectTo]);

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    if (mode === 'signup') {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (err) setError(err.message);
      else setSuccess('Check your email for a confirmation link to activate your account.');
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else {
        router.push(redirectTo);
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg shadow-purple-500/30">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Gaming <span className="text-purple-400">Problem Solver</span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

          {/* Tabs */}
          <div className="mb-6 flex rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <h1 className="mb-1 text-xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mb-6 text-sm text-slate-500">
            {mode === 'login'
              ? 'Sign in to access your saved gear searches.'
              : 'Save your recommendations and revisit them anytime.'}
          </p>

          {/* Alerts */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  disabled={loading}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>
                : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600">
            By continuing, you agree to our{' '}
            <Link href="/privacy" className="text-slate-500 underline hover:text-white transition-colors">
              Privacy Policy
            </Link>.
          </p>
        </div>

        {/* Note: account not required */}
        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-center">
          <p className="text-sm text-slate-500">
            No account needed to use the solver.{' '}
            <Link href="/solve" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
              Try it free →
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center text-sm text-slate-600">
          <Link href="/" className="transition-colors hover:text-slate-400">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────
export default function AuthPage() {
  // Show the "not available" state immediately — no Suspense needed, no async
  if (!SUPABASE_CONFIGURED) {
    return <AccountsNotAvailable />;
  }

  // Supabase is configured — render the real form (needs Suspense for useSearchParams)
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      }
    >
      <AuthFormInner />
    </Suspense>
  );
}
