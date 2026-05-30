import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { BookmarkX, Plus } from 'lucide-react';

export default async function RecommendationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Protect this page — redirect to auth if not logged in
  if (!user) {
    redirect('/auth?redirect=/recommendations');
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
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white">Your Saved Searches</h1>
          <p className="mt-2 text-slate-500">
            Searches you&apos;ve saved from the solver. Click any problem to re-run it.
          </p>
        </div>

        {hasSaved ? (
          <div className="space-y-14">
            {savedProblems!.map(entry => {
              // Hydrate product objects from stored IDs
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
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        <ProductCard key={(product as any).id} product={product as any} rank={i + 1} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600">Product data no longer available for this search.</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] py-24 text-center">
            <BookmarkX className="mb-4 h-12 w-12 text-slate-700" />
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
