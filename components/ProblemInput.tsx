'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Loader2, ArrowRight } from 'lucide-react';

const quickExamples = [
  'My back hurts when gaming',
  'I need a headset under $50',
  'My hands get sweaty',
  'My microphone sounds bad',
  'I need a mouse for FPS',
  'My wrist hurts from gaming',
  'My monitor has screen tearing',
  'I want to start streaming',
];

interface ProblemInputProps {
  initialValue?: string;
  onSubmit: (problem: string) => void;
  isLoading?: boolean;
}

export default function ProblemInput({ initialValue = '', onSubmit, isLoading = false }: ProblemInputProps) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSubmit(value.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Input box */}
        <div
          className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 focus-within:border-purple-500/50 focus-within:bg-white/[0.06]"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}
        >
          {/* Focus glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 focus-within:opacity-100" style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.3), 0 8px 32px rgba(139,92,246,0.1)' }} />

          <div className="flex items-start gap-3 p-4 pb-2">
            <Search className="mt-1 h-5 w-5 shrink-0 text-slate-600" />
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (value.trim()) onSubmit(value.trim());
                }
              }}
              placeholder="Describe your gaming problem... e.g. My back hurts after long sessions"
              rows={3}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-base leading-relaxed text-white placeholder-slate-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between px-4 pb-4 pt-1">
            <span className="text-xs text-slate-700">Press Enter or click Solve</span>
            <button
              type="submit"
              disabled={!value.trim() || isLoading}
              className="group flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}
            >
              {isLoading ? (
                <><Loader2 className="h-4 w-4 animate-spin" />Analyzing…</>
              ) : (
                <>Solve My Problem<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick-select chips */}
      <div className="mt-4">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-slate-700">Quick examples</p>
        <div className="flex flex-wrap gap-2">
          {quickExamples.map(ex => (
            <button
              key={ex}
              onClick={() => { setValue(ex); textareaRef.current?.focus(); }}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-500 transition-all hover:border-purple-500/30 hover:bg-purple-500/[0.08] hover:text-purple-300"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
