export default function PrivacyPage() {
  const lastUpdated = 'May 30, 2025';

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-2xl">

        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="text-sm text-slate-600">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-slate-400 leading-relaxed">

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">1. Information We Collect</h2>
            <p>
              When you create an account, we collect your email address and a hashed password (we never store plain-text passwords).
              When you use the Problem Solver, we may store the text of your submitted problems and the product IDs that were recommended,
              so you can access them later.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">2. How We Use Your Information</h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>To provide and improve the Gaming Problem Solver service</li>
              <li>To save your problem history when you are logged in</li>
              <li>To respond to your messages sent via the contact form</li>
              <li>We do not sell your personal data to third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">3. Cookies & Analytics</h2>
            <p>
              We use session cookies to keep you logged in. We may use analytics tools to understand how users interact
              with the site. These tools may collect anonymized usage data such as pages visited and session duration.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">4. Affiliate Links</h2>
            <p>
              Some links on this website may be affiliate links in the future. This means we could earn a commission
              if you purchase a product through a link on our site, at no extra cost to you.
              Affiliate relationships do not influence which products we recommend.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">5. Data Storage</h2>
            <p>
              Your data is stored using Supabase, which uses PostgreSQL hosted on secure, SOC 2 compliant infrastructure.
              Passwords are hashed using industry-standard algorithms and are never stored in plain text.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">6. Your Rights</h2>
            <p>
              You may request deletion of your account and all associated data at any time by contacting us.
              You also have the right to request a copy of your data or to correct inaccurate information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">7. Contact</h2>
            <p>
              If you have questions about this policy or your data, please reach out via our{' '}
              <a href="/contact" className="text-purple-400 underline hover:text-purple-300">
                contact page
              </a>
              .
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
