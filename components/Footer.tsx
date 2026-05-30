import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">
                Gaming <span className="text-purple-400">Problem Solver</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Smart product recommendations for gamers — describe your problem, get the gear that actually fixes it.
            </p>
            <p className="text-slate-600 text-xs mt-4">
              Some links on this site may be affiliate links in the future.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Pages</h3>
            <ul className="space-y-2">
              {[
                { href: '/solve', label: 'Solve My Problem' },
                { href: '/examples', label: 'Example Problems' },
                { href: '/recommendations', label: 'Saved Gear' },
                { href: '/about', label: 'About' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/auth', label: 'Sign In / Sign Up' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Gaming Problem Solver. All rights reserved.
          </p>
          <p className="text-slate-700 text-xs">
            Built for gamers, by gamers.
          </p>
        </div>
      </div>
    </footer>
  );
}
