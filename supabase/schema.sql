-- ============================================================
-- Gaming Problem Solver — Supabase Schema
-- Run this in the Supabase SQL editor to set up your database
-- ============================================================

-- Problems: stores each problem a user has submitted
CREATE TABLE IF NOT EXISTS problems (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  problem_text     TEXT NOT NULL,
  matched_products JSONB DEFAULT '[]'::jsonb,   -- array of product IDs
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;

-- Users can only see their own problems
CREATE POLICY "Users can view own problems"
  ON problems FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own problems
CREATE POLICY "Users can insert own problems"
  ON problems FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own problems
CREATE POLICY "Users can delete own problems"
  ON problems FOR DELETE
  USING (auth.uid() = user_id);

-- ── Index for fast user-specific queries ────────────────────────────────────
CREATE INDEX IF NOT EXISTS problems_user_id_idx ON problems(user_id);
CREATE INDEX IF NOT EXISTS problems_created_at_idx ON problems(created_at DESC);

-- ============================================================
-- Stripe-ready: subscription tiers (not yet integrated)
-- Uncomment when adding Stripe billing
-- ============================================================
-- CREATE TABLE IF NOT EXISTS subscriptions (
--   id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--   user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
--   stripe_customer_id   TEXT,
--   stripe_subscription_id TEXT,
--   plan            TEXT NOT NULL DEFAULT 'free',  -- 'free' | 'pro'
--   status          TEXT NOT NULL DEFAULT 'active',
--   current_period_end TIMESTAMP WITH TIME ZONE,
--   created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );
-- ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own subscription"
--   ON subscriptions FOR SELECT
--   USING (auth.uid() = user_id);
