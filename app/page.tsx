import Link from 'next/link';
import { ArrowRight, ChevronRight, Search, Cpu, BarChart3, ShieldCheck, Zap, Users, Star } from 'lucide-react';
import { exampleProblems } from '@/lib/products';

const trustBadges = [
  { icon: ShieldCheck, text: 'Unbiased recommendations' },
  { icon: Users,       text: 'No account required' },
  { icon: Star,        text: 'Real product reviews only' },
  { icon: Zap,         text: 'Results in seconds' },
];

const features = [
  {
    icon: Search,
    title: 'Describe the problem',
    body: "Type your exact issue in plain language. Back pain, sweaty hands, screen tearing — anything. You don't need to know what product category you want.",
    accent: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  },
  {
    icon: Cpu,
    title: 'Expert analysis runs',
    body: "We explain why your problem happens and exactly what spec or feature solves it — not just a list of products, but the reasoning behind each recommendation.",
    accent: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  },
  {
    icon: BarChart3,
    title: 'Compare and decide',
    body: "See all three recommendations side-by-side with prices, ratings, pros, cons, and a clear explanation of why each one fits your specific situation.",
    accent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
];

const stats = [
  { value: '45+',  label: 'Products reviewed' },
  { value: '15',   label: 'Problem categories' },
  { value: '30',   label: 'Example problems' },
  { value: '100%', label: 'Free, no sign-up' },
];

const categories = [
  { icon: '🪑', label: 'Back Pain',      href: '/solve?q=My back hurts when gaming' },
  { icon: '🎧', label: 'Headset',        href: '/solve?q=I need a good headset' },
  { icon: '🎙️', label: 'Microphone',     href: '/solve?q=My microphone sounds bad on Discord' },
  { icon: '🎯', label: 'FPS Mouse',      href: '/solve?q=I need a precise gaming mouse for FPS games' },
  { icon: '💧', label: 'Sweaty Hands',   href: '/solve?q=My hands get sweaty when gaming' },
  { icon: '⌨️', label: 'Keyboard',       href: '/solve?q=I want a fast mechanical keyboard for competitive play' },
  { icon: '🖥️', label: 'Monitor',        href: '/solve?q=My monitor stutters and has screen tearing' },
  { icon: '📡', label: 'Streaming',      href: '/solve?q=I want to start streaming on Twitch' },
  { icon: '💡', label: 'Lighting',       href: '/solve?q=I need better RGB lighting for my battle station' },
  { icon: '🎮', label: 'Controller',     href: '/solve?q=I need a controller for PC gaming' },
  { icon: '📶', label: 'Lag & Ping',     href: '/solve?q=My game lags and disconnects during online matches' },
  { icon: '💰', label: 'Budget Gear',    href: '/solve?q=I need a gaming mouse under $40' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:pb-32 sm:pt-24">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-orb absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-purple-700/10 blur-[100px]" />
          <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-indigo-600/6 blur-[80px]" />
          <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-violet-500/5 blur-[60px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="animate-fade-in mb-7 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
            Smart gaming gear recommendations
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in stagger-1 mb-5 text-5xl font-extrabold leading-[1.06] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Tell us what&apos;s wrong.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #c4b5fd 100%)' }}
            >
              We&apos;ll find the fix.
            </span>
          </h1>

          {/* Sub */}
          <p className="animate-fade-in stagger-2 mx-auto mb-9 max-w-xl text-lg leading-relaxed text-slate-400">
            Describe any gaming setup problem and get expert product recommendations with a clear explanation of why each one solves it — not just a generic &ldquo;best of&rdquo; list.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in stagger-3 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/solve"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Try the Solver
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
            </Link>
            <Link
              href="/examples"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-3.5 font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
            >
              Browse 30 example problems
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-in stagger-4 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustBadges.map(badge => (
              <span key={badge.text} className="flex items-center gap-1.5 text-sm text-slate-600">
                <badge.icon className="h-3.5 w-3.5 text-emerald-500" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.05] bg-white/[0.01]">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {stats.map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold tracking-tight text-white">{s.value}</span>
                <span className="text-xs font-medium text-slate-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">How it works</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              From problem to product in three steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="absolute right-5 top-5 text-5xl font-black text-white/[0.03] select-none">{i + 1}</div>
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${f.accent}`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust section ─────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: 'Unbiased picks',
                body: "Products are ranked by how well they solve your specific problem — not by which ones have the highest affiliate commissions. Our methodology is problem-first.",
                color: 'text-emerald-400',
              },
              {
                icon: Star,
                title: 'Real reviews only',
                body: "Every product on this site is backed by thousands of verified user reviews from reputable platforms. We never invent or fabricate review data.",
                color: 'text-amber-400',
              },
              {
                icon: Users,
                title: 'Built for gamers',
                body: "We are gamers. Every product category, explanation, and recommendation is written from the perspective of someone who understands the actual problem.",
                color: 'text-purple-400',
              },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <item.icon className={`mb-3 h-6 w-6 ${item.color}`} />
                <h3 className="mb-2 text-sm font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem categories grid ───────────────────────────────── */}
      <section className="border-t border-white/[0.05] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">Categories</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Every type of gaming problem
            </h2>
            <p className="mt-3 text-slate-500">Click any category to get recommendations instantly</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map(cat => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 text-sm text-slate-400 transition-all hover:border-purple-500/30 hover:bg-white/[0.05] hover:text-white"
              >
                <span className="shrink-0 text-xl">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
                <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample problems ───────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">30 example problems</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">See what others are solving</h2>
            </div>
            <Link href="/examples" className="flex items-center gap-1.5 text-sm text-purple-400 transition-colors hover:text-purple-300">
              View all 30 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {exampleProblems.slice(0, 8).map(({ problem, category, icon }) => (
              <Link
                key={problem}
                href={`/solve?q=${encodeURIComponent(problem)}`}
                className="group flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all hover:border-purple-500/25 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xl">{icon}</span>
                  <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-slate-500">{category}</span>
                </div>
                <p className="text-sm font-medium leading-snug text-slate-300 group-hover:text-white transition-colors">
                  &ldquo;{problem}&rdquo;
                </p>
                <span className="mt-auto flex items-center gap-1 text-xs text-purple-500 group-hover:text-purple-400 transition-colors">
                  See products <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="relative overflow-hidden rounded-2xl border border-purple-500/20 p-12"
            style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 120%, rgba(124,58,237,0.14) 0%, transparent 70%), #0d0d1a' }}
          >
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/12 blur-3xl" />
            <div className="relative">
              <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to stop guessing?
              </h2>
              <p className="mb-8 text-slate-500">
                Describe your problem and get 3 targeted recommendations with full analysis — free, no account needed.
              </p>
              <Link
                href="/solve"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500 hover:shadow-purple-500/50"
              >
                Try the Solver
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-5 text-xs text-slate-700">
                Recommendations are based on problem fit, verified reviews, and value.{' '}
                <Link href="/affiliate-disclosure" className="underline hover:text-slate-500 transition-colors">
                  Affiliate disclosure.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
