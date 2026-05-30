'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProblemInput from '@/components/ProblemInput';
import ProductCard from '@/components/ProductCard';
import ProblemAnalysis from '@/components/ProblemAnalysis';
import ComparisonTable from '@/components/ComparisonTable';
import { matchProducts, getCategoryFromProblem } from '@/lib/products';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types';
import { BookmarkPlus, CheckCircle, Loader2, RefreshCw, Info, ArrowRight } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';

// Shown before the user submits anything — makes the page feel alive
const featuredProblems = [
  { icon: '🪑', category: 'Ergonomics',  text: 'My back hurts after gaming for 3 hours' },
  { icon: '🎧', category: 'Budget Audio', text: 'I need a good gaming headset under $50' },
  { icon: '🎙️', category: 'Audio',        text: 'My microphone sounds bad on Discord' },
  { icon: '🎯', category: 'FPS',          text: 'I need a precise gaming mouse for FPS' },
  { icon: '💧', category: 'Comfort',      text: 'My hands get sweaty when gaming' },
  { icon: '🖥️', category: 'Display',      text: 'My monitor has screen tearing and blur' },
];

// Compute "Best for" labels based on price tier
function getBestForLabels(products: Product[]): string[] {
  if (products.length === 0) return [];
  if (products.length === 1) return ['Best Overall'];

  const prices = products.map(p => parseFloat(p.price.replace(/[$,]/g, '')) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const allSame = minPrice === maxPrice;

  return products.map((_, i) => {
    if (allSame) {
      return i === 0 ? 'Best Overall' : i === 1 ? 'Best Value' : 'Best Premium';
    }
    if (prices[i] === minPrice) return 'Best Budget';
    if (prices[i] === maxPrice) return 'Best Premium';
    return 'Best Overall';
  });
}

// Loading animation with steps
function AnalyzingState() {
  const steps = ['Reading your problem...', 'Matching to categories...', 'Ranking top products...'];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 280);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-20 flex flex-col items-center gap-6">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border border-purple-500/20 bg-purple-500/5 animate-pulse" />
        <Loader2 className="absolute inset-0 m-auto h-7 w-7 animate-spin text-purple-400" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-slate-300">{steps[step]}</p>
        <div className="mt-3 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${i <= step ? 'w-6 bg-purple-500' : 'w-2 bg-white/10'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SolvePageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [problem, setProblem] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (initialQuery) handleSubmit(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleSubmit = (text: string) => {
    setProblem(text);
    setIsLoading(true);
    setSaved(false);
    setHasSearched(false);

    setTimeout(() => {
      const matched = matchProducts(text);
      const cat = getCategoryFromProblem(text);
      setResults(matched);
      setCategory(cat);
      setIsLoading(false);
      setHasSearched(true);
    }, 1100);
  };

  const handleSave = async () => {
    if (!user || !problem) return;
    setSaving(true);
    const supabase = createClient();
    if (!supabase) { setSaving(false); return; }
    await supabase.from('problems').insert({
      user_id: user.id,
      problem_text: problem,
      matched_products: results.map(p => p.id),
    });
    setSaving(false);
    setSaved(true);
  };

  const bestForLabels = getBestForLabels(results);

  const resetSearch = () => {
    setHasSearched(false);
    setResults([]);
    setProblem('');
    setCategory('');
    setSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Describe your gaming problem
          </h1>
          <p className="text-slate-400">
            Be specific — the more detail you give, the better the match.
          </p>
        </div>

        {/* Input */}
        <ProblemInput
          initialValue={initialQuery}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Analyzing */}
        {isLoading && <AnalyzingState />}

        {/* Results */}
        {!isLoading && hasSearched && results.length > 0 && (
          <div className="mt-14 space-y-10 animate-fade-in">

            {/* Results bar */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-white">
                  3 recommendations for:
                </h2>
                <p className="mt-0.5 text-slate-400 italic text-sm">
                  &ldquo;{problem}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3">
                {user ? (
                  <button
                    onClick={handleSave}
                    disabled={saved || saving}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                      saved
                        ? 'border border-green-500/30 bg-green-500/10 text-green-400'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:border-purple-500/30 hover:text-purple-300'
                    }`}
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <CheckCircle className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
                    {saved ? 'Saved' : 'Save search'}
                  </button>
                ) : (
                  <Link href="/auth" className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    Sign in to save
                  </Link>
                )}
                <button
                  onClick={resetSearch}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-400 transition-all hover:text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  New search
                </button>
              </div>
            </div>

            {/* Expert analysis panel */}
            <ProblemAnalysis category={category} />

            {/* Product cards */}
            <div>
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Top 3 Recommendations
              </p>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {results.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    rank={i + 1}
                    bestForLabel={bestForLabels[i]}
                  />
                ))}
              </div>
            </div>

            {/* Comparison table */}
            <ComparisonTable products={results} bestForLabels={bestForLabels} />

            {/* Trust + disclosure note */}
            <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" />
              <p className="text-xs leading-relaxed text-slate-600">
                Recommendations are based on problem fit, verified user reviews, features, and value — not on commission rates. Some links may become affiliate links in the future.{' '}
                <Link href="/affiliate-disclosure" className="text-slate-500 underline hover:text-slate-300 transition-colors">
                  Read our affiliate disclosure.
                </Link>{' '}
                Prices shown are approximate retail and may vary.
              </p>
            </div>

          </div>
        )}

        {/* Pre-search state — show featured problems so the page is never empty */}
        {!isLoading && !hasSearched && (
          <div className="mt-12">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
              Not sure what to type? Click a problem below
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProblems.map(({ icon, category, text }) => (
                <button
                  key={text}
                  onClick={() => handleSubmit(text)}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-purple-500/40 hover:bg-white/[0.06]"
                >
                  <span className="shrink-0 text-2xl">{icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600">{category}</p>
                    <p className="truncate text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      &ldquo;{text}&rdquo;
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-700 transition-all group-hover:translate-x-0.5 group-hover:text-purple-400" />
                </button>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-slate-600">
              <Link href="/examples" className="underline transition-colors hover:text-slate-400">
                Browse all 30 example problems
              </Link>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SolvePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    }>
      <SolvePageInner />
    </Suspense>
  );
}
