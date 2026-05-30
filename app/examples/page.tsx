'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { exampleProblems, problemCategories } from '@/lib/products';

const categoryColors: Record<string, string> = {
  Ergonomics:   'text-blue-400   bg-blue-400/10   border-blue-400/25',
  'Budget Audio':'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  Comfort:      'text-orange-400  bg-orange-400/10  border-orange-400/25',
  Audio:        'text-yellow-400  bg-yellow-400/10  border-yellow-400/25',
  FPS:          'text-red-400     bg-red-400/10     border-red-400/25',
  Input:        'text-purple-400  bg-purple-400/10  border-purple-400/25',
  Display:      'text-cyan-400    bg-cyan-400/10    border-cyan-400/25',
  Streaming:    'text-pink-400    bg-pink-400/10    border-pink-400/25',
  Lighting:     'text-amber-400   bg-amber-400/10   border-amber-400/25',
  Controller:   'text-green-400   bg-green-400/10   border-green-400/25',
  Networking:   'text-sky-400     bg-sky-400/10     border-sky-400/25',
  Desk:         'text-teal-400    bg-teal-400/10    border-teal-400/25',
  Budget:       'text-lime-400    bg-lime-400/10    border-lime-400/25',
};

export default function ExamplesPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? exampleProblems
    : exampleProblems.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">20 real problems</p>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Don&apos;t know what to type?
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-500">
            Click any problem below to instantly get tailored product recommendations. These are the most common gaming setup issues we solve.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {problemCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'border-purple-500/50 bg-purple-500/15 text-purple-300'
                  : 'border-white/10 bg-white/[0.03] text-slate-500 hover:border-white/20 hover:text-slate-300'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className={`ml-1.5 text-xs opacity-60`}>
                  {exampleProblems.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Problems grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map(({ problem, category, icon }) => (
            <Link
              key={problem}
              href={`/solve?q=${encodeURIComponent(problem)}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all hover:border-purple-500/30 hover:bg-white/[0.05]"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/8 blur-2xl" />
              </div>

              {/* Icon */}
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-2xl transition-all group-hover:border-purple-500/30 group-hover:bg-purple-500/8">
                {icon}
              </div>

              {/* Text */}
              <div className="relative flex-1 min-w-0">
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      categoryColors[category] ?? 'text-slate-500 bg-white/5 border-white/10'
                    }`}
                  >
                    {category}
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug text-white/90 group-hover:text-white transition-colors">
                  &ldquo;{problem}&rdquo;
                </p>
              </div>

              {/* Arrow */}
              <ArrowRight className="relative h-4 w-4 shrink-0 text-slate-700 transition-all group-hover:translate-x-0.5 group-hover:text-purple-400" />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-600">No problems in this category yet.</div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center">
          <Search className="mx-auto mb-4 h-8 w-8 text-purple-500/60" />
          <h2 className="mb-2 text-xl font-bold text-white">
            Don&apos;t see your problem?
          </h2>
          <p className="mb-6 text-slate-500">
            Type it in your own words — our engine handles any phrasing you throw at it.
          </p>
          <Link
            href="/solve"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:bg-purple-500"
          >
            Try Your Own Problem
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
