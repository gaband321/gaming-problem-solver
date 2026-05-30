import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function AffiliateDisclosurePage() {
  const lastUpdated = 'May 30, 2025';

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Affiliate Disclosure</h1>
            <p className="mt-1 text-sm text-slate-600">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="space-y-8 text-slate-400 leading-relaxed">

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <p className="text-sm text-emerald-300/90">
              <strong className="text-emerald-300">Plain language summary:</strong> Some links on this site may earn us a small commission at no cost to you. Our recommendations are based on which product actually solves your problem best — not which one pays more. We would rather lose a commission than give you bad advice.
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">FTC Disclosure</h2>
            <p className="text-sm leading-relaxed">
              Gaming Problem Solver participates in affiliate marketing programs. This means that if you click a link on this site and make a purchase, we may receive a small commission from the retailer at no additional cost to you. This is how we fund the site and keep it free for everyone.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              In accordance with the United States Federal Trade Commission (FTC) guidelines (16 CFR Part 255), we are required to disclose this relationship and do so transparently here and where relevant throughout the site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">How Recommendations Are Made</h2>
            <p className="text-sm leading-relaxed">
              Every product recommendation on Gaming Problem Solver is selected based on the following criteria, in order of priority:
            </p>
            <ol className="mt-3 space-y-2 text-sm">
              {[
                "Problem fit — how directly does the product address the specific issue described?",
                "Verified user reviews — we only feature products with substantial, real review data from reputable platforms.",
                "Value for money — we consider the price-to-performance ratio across budget, mid-range, and premium options.",
                "Brand reputation and availability — we prioritise established brands with reliable customer support.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-400">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-relaxed">
              <strong className="text-white">Commission rates are never a factor in our rankings.</strong> A product with a higher affiliate commission rate will not be ranked higher than a product that better solves your problem.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">Current Affiliate Status</h2>
            <p className="text-sm leading-relaxed">
              At the time of this disclosure, most links on Gaming Problem Solver are standard links with no affiliate tracking. As we grow, we may apply to and be accepted into affiliate programs (such as Amazon Associates, or brand-specific programs). When this happens, we will update this disclosure and add clear indicators on pages containing affiliate links.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">Prices and Availability</h2>
            <p className="text-sm leading-relaxed">
              All prices shown on this site are approximate retail prices at the time of our last review and may not reflect current prices. We do not guarantee the accuracy of prices. Always verify the current price on the retailer's site before purchasing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">Questions</h2>
            <p className="text-sm leading-relaxed">
              If you have any questions about our affiliate relationships or how we make recommendations, please{' '}
              <Link href="/contact" className="text-purple-400 underline hover:text-purple-300 transition-colors">
                contact us
              </Link>
              . We are committed to full transparency.
            </p>
          </section>

          <div className="border-t border-white/[0.06] pt-6">
            <p className="text-xs text-slate-600">
              See also:{' '}
              <Link href="/privacy" className="underline hover:text-slate-400 transition-colors">Privacy Policy</Link>
              {' · '}
              <Link href="/about" className="underline hover:text-slate-400 transition-colors">About Us</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
