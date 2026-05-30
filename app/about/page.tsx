import Link from 'next/link';
import { ArrowRight, Gamepad2, Target, Heart, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Problem-First Thinking',
    body: 'We start with your specific pain point, not a product catalog. Every recommendation is chosen because it directly solves what you described.',
  },
  {
    icon: Heart,
    title: 'Honest Reviews',
    body: "We list real cons alongside pros. If a product has a drawback, we'll tell you. We'd rather lose a click than give bad advice.",
  },
  {
    icon: Zap,
    title: 'Built for Gamers',
    body: 'No lifestyle fluff or vague buying guides. Just direct, technical recommendations from people who actually game.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl">

        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-400 shadow-lg shadow-purple-500/30">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            About Gaming Problem Solver
          </h1>
          <p className="text-lg leading-relaxed text-slate-400">
            We built this tool because gaming forums are full of vague advice and product recommendations
            that don&apos;t actually match what you asked for. We thought there was a better way.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="mb-4 text-xl font-bold text-white">The Problem with Gaming Advice</h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              Every gamer has experienced it: you ask &ldquo;what headset should I buy?&rdquo; and get 15 different answers
              ranging from $30 to $400, with no explanation of why one is better for <em>your situation</em>.
            </p>
            <p>
              Or you search &ldquo;gaming chair for back pain&rdquo; and get a listicle of 20 chairs where half of them
              aren&apos;t even gaming chairs, and none of them explain what makes them good for your specific complaint.
            </p>
            <p>
              Gaming Problem Solver flips this. You describe your exact problem, and we give you exactly three
              products that solve it — with a clear explanation of <em>how</em> each one addresses your issue.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-xl font-bold text-white">What we stand for</h2>
          <div className="space-y-5">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                  <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate disclaimer */}
        <div className="mb-16 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="text-sm text-yellow-300/80">
            <strong className="text-yellow-300">Affiliate Disclosure:</strong> Some links on this site may
            become affiliate links in the future, which means we may earn a commission if you purchase through them.
            This comes at no extra cost to you and does not influence which products we recommend.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/solve"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:bg-purple-500"
          >
            Try the Problem Solver
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-slate-600">
            Questions? <Link href="/contact" className="text-slate-400 underline hover:text-white">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
