import Link from 'next/link';
import { Gamepad2, ShieldCheck } from 'lucide-react';

const navLinks = [
  { href: '/solve',    label: 'Solve My Problem' },
  { href: '/examples', label: 'Example Problems' },
  { href: '/recommendations', label: 'Saved Gear' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const legalLinks = [
  { href: '/privacy',              label: 'Privacy Policy' },
  { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
  { href: '/auth',                 label: 'Sign In / Sign Up' },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.06] bg-black/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg shadow-purple-500/20">
                <Gamepad2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Gaming <span className="text-purple-400">Problem Solver</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              Smart product recommendations for gamers — describe your problem, get the gear that actually fixes it.
            </p>

            {/* Disclosure summary */}
            <div className="mt-5 flex items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-xs leading-relaxed text-slate-600">
                Recommendations are based on problem fit, features, verified reviews, and value — not commission potential.{' '}
                <Link href="/affiliate-disclosure" className="text-slate-500 underline hover:text-slate-300 transition-colors">
                  Some links may be affiliate links.
                </Link>
              </p>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Pages</h3>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-6 sm:flex-row">
          <p className="text-xs text-slate-700">
            &copy; {new Date().getFullYear()} Gaming Problem Solver. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">Built for gamers, by gamers.</p>
        </div>
      </div>
    </footer>
  );
}
