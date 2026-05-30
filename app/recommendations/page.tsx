import { createClient } from '@/lib/supabase/server';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { BookmarkX, Plus, Lock, ArrowRight } from 'lucide-react';

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SignInPrompt({ reason }: { reason: 'not-configured' | 'not-logged-in' }) {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.02] py-20 text-center px-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10">
            <Lock className="h-7 w-7 text-purple-400" />
          </div>

          <h1 className="mb-3 text-2xl font-bold text-white">Sign in to save gear</h1>

          {reason === 'not-configured' ? (
            <>
              <p className="mb-2 max-w-sm text-slate-400">
                User accounts are not set up on this site yet. You can still use the full Problem Solver for free — no account required.
              </p>
              <p className="mb-8 text-sm text-slate-600">
                Saved recommendations will be available once accounts are enabled.
              </p>
            </>
          ) : (
            <p className="mb-8 max-w-sm text-slate-400">
              Create a free account to bookmark your gear searches and revisit them anytime.
            </p>
          )}

          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <Link
              href="/solve"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500"
            >
              <Plus className="h-4 w-4" />
              Use the Solver Now
            </Link>

            {reason === 'not-logged-in' && (
              <Link
                href="/auth"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-300 transition-all hover:border-purple-500/40 hover:text-white"
              >
                Sign in or create account
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <p className="mt-8 text-xs text-slate-700">
            The solver works without an account. Saving is optional.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function RecommendationsPage() {
  // Supabase not configured — show helpful page, no crash or redirect
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <SignInPrompt reason="not-configured" />;
  }

  const supabase = await createClient();

  if (!supabase) {
    return <SignInPrompt reason="not-configured" />;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <SignInPrompt reason="not-logged-in" />;
  }

  // Fetch saved problems for this user
  const { data: savedProblems } = await supabase
    .from('problems')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const hasSaved = savedProblems && savedProblems.length > 0;

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Your Saved Gear
            </h1>
            <p className="mt-2 text-slate-500">
              Searches you saved from the solver. Click any to re-run.
            </p>
          </div>
          <p className="text-xs text-slate-600">{user.email}</p>
        </div>

        {hasSaved ? (
          <div className="space-y-14">
            {savedProblems!.map(entry => {
              const matchedProducts = (entry.matched_products as string[])
                .map((id: string) => products.find(p => p.id === id))
                .filter(Boolean);

              return (
                <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-xs text-slate-600">
                        {new Date(entry.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-white">
                        &ldquo;{entry.problem_text}&rdquo;
                      </h2>
                    </div>
                    <Link
                      href={`/solve?q=${encodeURIComponent(entry.problem_text)}`}
                      className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 transition-all hover:border-purple-500/30 hover:text-purple-300"
                    >
                      Re-run Search
                    </Link>
                  </div>

                  {matchedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      {matchedProducts.map((product, i) => (
                        <ProductCard
                          key={(product as { id: string }).id}
                          product={product as Parameters<typeof ProductCard>[0]['product']}
                          rank={i + 1}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">
                      Product data not available for this search.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-24 text-center">
            <BookmarkX className="mb-4 h-12 w-12 text-slate-600" />
            <h2 className="mb-2 text-xl font-bold text-white">No saved searches yet</h2>
            <p className="mb-8 max-w-sm text-slate-500">
              After solving a problem, click &ldquo;Save This Search&rdquo; to bookmark it here.
            </p>
            <Link
              href="/solve"
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500"
            >
              <Plus className="h-4 w-4" />
              Solve Your First Problem
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
