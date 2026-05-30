'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, ArrowRight, Sparkles } from 'lucide-react';

const quickExamples = [
  { label: 'Back pain',        text: 'My back hurts after gaming for 3 hours' },
  { label: 'Headset $50',      text: 'I need a good gaming headset under $50' },
  { label: 'Sweaty hands',     text: 'My hands get sweaty when gaming' },
  { label: 'Bad mic',          text: 'My microphone sounds bad on Discord' },
  { label: 'FPS mouse',        text: 'I need a precise gaming mouse for FPS games' },
  { label: 'Wrist pain',       text: 'My wrist hurts after long gaming sessions' },
  { label: 'Screen tearing',   text: 'My monitor has screen tearing and blur' },
  { label: 'Start streaming',  text: 'I want to start streaming on Twitch' },
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

  const handleChip = (text: string) => {
    setValue(text);
    textareaRef.current?.focus();
  };

  const canSubmit = value.trim().length > 0 && !isLoading;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Input card */}
        <div className="rounded-2xl border border-white/20 bg-[#0f0f1c] shadow-xl shadow-black/40 transition-all duration-200 focus-within:border-purple-500/60 focus-within:shadow-purple-500/10">

          {/* Textarea row */}
          <div className="flex items-start gap-3 px-5 pt-5 pb-3">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-purple-500" />
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (canSubmit) onSubmit(value.trim());
                }
              }}
              placeholder="e.g. My back hurts after gaming for 3 hours"
              rows={3}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-base leading-relaxed text-white placeholder-slate-500 outline-none disabled:opacity-60"
            />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between px-5 pb-4">
            <span className="text-xs text-slate-500">Press Enter or click the button</span>
            <button
              type="submit"
              disabled={!canSubmit}
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: canSubmit ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '#374151' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  Solve My Problem
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick-pick chips */}
      <div className="mt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Quick examples — click to try
        </p>
        <div className="flex flex-wrap gap-2">
          {quickExamples.map(ex => (
            <button
              key={ex.label}
              type="button"
              onClick={() => handleChip(ex.text)}
              disabled={isLoading}
              className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-200 disabled:pointer-events-none"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
