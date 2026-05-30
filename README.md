# Gaming Problem Solver

A professional Next.js 16 web app that lets gamers describe their setup problems and get smart product recommendations.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase project keys

# 3. Set up the database
# Run supabase/schema.sql in your Supabase SQL editor

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **Supabase** (auth + PostgreSQL database)
- **lucide-react** (icons)
- **TypeScript**

## Pages

| Route | Description |
|---|---|
| `/` | Home page with hero and feature overview |
| `/solve` | Main problem solver with product recommendations |
| `/examples` | 12 example gaming problems to try |
| `/recommendations` | Saved searches (requires login) |
| `/about` | About the project |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/auth` | Login / sign up |

## Project Structure

```
gaming-problem-solver/
├── app/                    # Next.js App Router pages
│   ├── auth/               # Login & signup + callback route
│   ├── solve/              # Problem solver (main feature)
│   ├── examples/           # Example problems
│   ├── recommendations/    # Saved searches (auth-gated)
│   ├── about/
│   ├── contact/
│   └── privacy/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ProblemInput.tsx
├── lib/
│   ├── products.ts         # Product data + keyword matching engine
│   └── supabase/           # Supabase clients (browser + server)
├── supabase/
│   └── schema.sql          # Run this in Supabase SQL editor
├── proxy.ts                # Session proxy (Next.js 16)
└── .env.local.example
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from **Settings → API**
3. Add them to `.env.local`
4. Run `supabase/schema.sql` in the Supabase SQL editor

## Stripe (Future)

The schema.sql has a commented-out `subscriptions` table ready for Stripe billing. Add Stripe keys to `.env.local` and create `/app/api/stripe/` route handlers when you're ready.

## Deploy to Vercel

```bash
npm run build   # verify clean build
```

Then connect your GitHub repo to Vercel and add your `.env.local` variables in **Project Settings → Environment Variables**.
