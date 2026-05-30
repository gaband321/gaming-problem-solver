'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProblemInput from '@/components/ProblemInput';
import ProductCard from '@/components/ProductCard';
import { matchProducts } from '@/lib/products';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types';
import { BookmarkPlus, CheckCircle, Loader2 } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

// Inner component reads searchParams (must be inside Suspense)
function SolvePageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';

  const [problem, setProblem] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check auth state on mount
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_e, session) => setUser(session?.user ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  // Auto-run search if a query is in the URL
  useEffect(() => {
    if (initialQuery) {
      handleSubmit(initialQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const handleSubmit = (text: string) => {
    setProblem(text);
    setIsLoading(true);
    setSaved(false);

    // Simulate a brief analysis delay for UX
    setTimeout(() => {
      const matched = matchProducts(text);
      setResults(matched);
      setIsLoading(false);
      setHasSearched(true);
    }, 900);
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

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
            Describe your gaming problem
          </h1>
          <p className="text-slate-500">
            Type your issue below — we&apos;ll find the gear that actually fixes it.
          </p>
        </div>

        {/* Problem input */}
        <ProblemInput
          initialValue={initialQuery}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border border-purple-500/30 bg-purple-500/10" />
              <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-purple-400" />
            </div>
            <p className="text-slate-400">Analyzing your problem...</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && hasSearched && results.length > 0 && (
          <div className="mt-16 animate-fade-in">
            {/* Results header */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {results.length} Recommendations for:
                </h2>
                <p className="mt-1 text-slate-400 italic">&ldquo;{problem}&rdquo;</p>
              </div>

              {/* Save button */}
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
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : saved ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4" />
                  )}
                  {saved ? 'Saved!' : 'Save This Search'}
                </button>
              ) : (
                <a
                  href="/auth"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-500 transition-all hover:text-slate-300"
                >
                  <BookmarkPlus className="h-4 w-4" />
                  Sign in to save
                </a>
              )}
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {results.map((product, i) => (
                <ProductCard key={product.id} product={product} rank={i + 1} />
              ))}
            </div>

            {/* Affiliate disclaimer */}
            <p className="mt-8 text-center text-xs text-slate-700">
              Some links on this site may be affiliate links in the future. Prices shown are approximate retail prices.
            </p>

            {/* Try another */}
            <div className="mt-12 text-center">
              <p className="mb-4 text-slate-500">Not quite right? Try a different problem.</p>
              <button
                onClick={() => {
                  setHasSearched(false);
                  setResults([]);
                  setProblem('');
                  setSaved(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-white"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {/* Empty state before search */}
        {!isLoading && !hasSearched && (
          <div className="mt-16 text-center text-slate-700">
            <p className="text-sm">Your recommendations will appear here after you submit a problem.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Suspense wrapper required because useSearchParams() needs it in Next.js 15+
export default function SolvePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      }
    >
      <SolvePageInner />
    </Suspense>
  );
}
