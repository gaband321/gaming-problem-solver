'use client';

import { useState } from 'react';
import { Send, CheckCircle, Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — wire up email provider (Resend, SendGrid, etc.) when ready
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white">Message sent!</h2>
          <p className="text-slate-500">We&apos;ll get back to you at <span className="text-white">{form.email}</span> as soon as possible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">Contact Us</h1>
          <p className="text-slate-500">
            Have a question, suggestion, or want to report an issue? We read every message.
          </p>
        </div>

        {/* Contact options */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <Mail className="h-5 w-5 text-purple-400" />
            <div>
              <p className="text-xs text-slate-600">Email</p>
              <p className="text-sm text-white">contact@gamingproblemsolverr.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <MessageSquare className="h-5 w-5 text-cyan-400" />
            <div>
              <p className="text-xs text-slate-600">Response time</p>
              <p className="text-sm text-white">Usually within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50 focus:bg-white/8"
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50 focus:bg-white/8"
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
              placeholder="What is it about?"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50 focus:bg-white/8"
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
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-600 outline-none transition-all focus:border-purple-500/50 focus:bg-white/8"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Sending...' : (
              <>
                Send Message
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
