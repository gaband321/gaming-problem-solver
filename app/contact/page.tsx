'use client';

import { useState } from 'react';
import { Send, CheckCircle, Mail, MessageSquare, Info } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — wire up Resend, SendGrid, or similar when ready
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white">Message sent!</h2>
          <p className="text-slate-400">
            We will get back to you at <span className="font-medium text-white">{form.email}</span> as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="text-slate-400">
            For product suggestions, feedback, or business questions, contact us here.
          </p>
        </div>

        {/* Purpose note */}
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
          <p className="text-sm text-slate-300">
            We welcome product suggestions, partnership enquiries, and general feedback about the recommendations.
            We read every message and typically respond within 24 hours.
          </p>
        </div>

        {/* Contact details */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <Mail className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-xs font-medium text-slate-500">Email</p>
              <a
                href="mailto:gaband321@gmail.com"
                className="text-sm font-medium text-white hover:text-purple-300 transition-colors"
              >
                gaband321@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="text-xs font-medium text-slate-500">Response time</p>
              <p className="text-sm font-medium text-white">Usually within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.02] p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Subject</label>
            <input
              required
              type="text"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              placeholder="Product suggestion, feedback, or business enquiry"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us more..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Sending...' : (
              <>Send Message <Send className="h-4 w-4" /></>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
