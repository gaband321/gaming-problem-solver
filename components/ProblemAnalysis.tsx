import { categoryAnalysis, defaultAnalysis } from '@/lib/categoryAnalysis';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

interface ProblemAnalysisProps {
  category: string;
}

export default function ProblemAnalysis({ category }: ProblemAnalysisProps) {
  const analysis = categoryAnalysis[category] ?? defaultAnalysis;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/20">
          <Lightbulb className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-400">
            Expert Analysis
          </p>
          <h3 className="text-sm font-bold text-white">{analysis.headline}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
        {/* Explanation */}
        <div>
          <p className="text-sm leading-relaxed text-slate-400">{analysis.explanation}</p>
        </div>

        {/* What to look for */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            What to look for
          </p>
          <ul className="space-y-2">
            {analysis.lookFor.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                <span className="text-sm text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
