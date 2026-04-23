-- Digital Heroes Database Schema
-- Golf Performance, Charity & Draw Platform

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CHARITIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.charities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    logo_url TEXT,
    website TEXT,
    events JSONB DEFAULT '[]'::JSONB,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    total_contributions DECIMAL(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT UNIQUE,
    plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'yearly')),
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'trialing')),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    charity_id UUID REFERENCES public.charities(id),
    charity_percentage INTEGER NOT NULL DEFAULT 10 CHECK (charity_percentage >= 10 AND charity_percentage <= 100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, stripe_subscription_id)
);

-- ============================================
-- SCORES TABLE (rolling 5 scores)
-- ============================================
CREATE TABLE IF NOT EXISTS public.scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    score_value INTEGER NOT NULL CHECK (score_value >= 1 AND score_value <= 45),
    score_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, score_date)
);

-- ============================================
-- DRAWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.draws (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    draw_numbers INTEGER[] NOT NULL,
    draw_type TEXT NOT NULL DEFAULT 'random' CHECK (draw_type IN ('random', 'algorithmic')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'simulated', 'published', 'completed')),
    total_pool DECIMAL(12,2) NOT NULL DEFAULT 0,
    jackpot_rollover DECIMAL(12,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ,
    UNIQUE(month, year)
);

-- ============================================
-- DRAW ENTRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.draw_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entry_numbers INTEGER[] NOT NULL,
    matches_count INTEGER DEFAULT 0,
    prize_tier INTEGER CHECK (prize_tier IN (3, 4, 5)),
    prize_amount DECIMAL(12,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(draw_id, user_id)
);

-- ============================================
-- WINNERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.winners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_id UUID NOT NULL REFERENCES public.draws(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entry_id UUID NOT NULL REFERENCES public.draw_entries(id) ON DELETE CASCADE,
    prize_tier INTEGER NOT NULL CHECK (prize_tier IN (3, 4, 5)),
    prize_amount DECIMAL(12,2) NOT NULL,
    proof_url TEXT,
    verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(draw_id, user_id, entry_id)
);

-- ============================================
-- PRIZE POOLS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.prize_pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    draw_id UUID NOT NULL UNIQUE REFERENCES public.draws(id) ON DELETE CASCADE,
    tier_5_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    tier_4_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    tier_3_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    tier_5_winners INTEGER NOT NULL DEFAULT 0,
    tier_4_winners INTEGER NOT NULL DEFAULT 0,
    tier_3_winners INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON public.subscriptions(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS idx_scores_user_id ON public.scores(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_date ON public.scores(score_date);

CREATE INDEX IF NOT EXISTS idx_draws_month_year ON public.draws(month, year);
CREATE INDEX IF NOT EXISTS idx_draws_status ON public.draws(status);

CREATE INDEX IF NOT EXISTS idx_draw_entries_draw_id ON public.draw_entries(draw_id);
CREATE INDEX IF NOT EXISTS idx_draw_entries_user_id ON public.draw_entries(user_id);

CREATE INDEX IF NOT EXISTS idx_winners_draw_id ON public.winners(draw_id);
CREATE INDEX IF NOT EXISTS idx_winners_user_id ON public.winners(user_id);
CREATE INDEX IF NOT EXISTS idx_winners_status ON public.winners(verification_status);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draw_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.winners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prize_pools ENABLE ROW LEVEL SECURITY;

-- PROFILES policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- CHARITIES policies (public read, admin write)
DROP POLICY IF EXISTS "Charities are viewable by everyone" ON public.charities;
DROP POLICY IF EXISTS "Only admins can modify charities" ON public.charities;
CREATE POLICY "Charities are viewable by everyone"
    ON public.charities FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "Only admins can modify charities"
    ON public.charities FOR ALL
    USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- SUBSCRIPTIONS policies
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Admins can update subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Users can insert own subscriptions"
    ON public.subscriptions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update subscriptions"
    ON public.subscriptions FOR UPDATE
    USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- SCORES policies
DROP POLICY IF EXISTS "Users can view own scores" ON public.scores;
DROP POLICY IF EXISTS "Users can insert own scores" ON public.scores;
DROP POLICY IF EXISTS "Users can update own scores" ON public.scores;
DROP POLICY IF EXISTS "Users can delete own scores" ON public.scores;
CREATE POLICY "Users can view own scores"
    ON public.scores FOR SELECT
    USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Users can insert own scores"
    ON public.scores FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scores"
    ON public.scores FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scores"
    ON public.scores FOR DELETE
    USING (auth.uid() = user_id);

-- DRAWS policies (public read results, admin manage)
DROP POLICY IF EXISTS "Published draws are viewable by everyone" ON public.draws;
DROP POLICY IF EXISTS "Only admins can modify draws" ON public.draws;
CREATE POLICY "Published draws are viewable by everyone"
    ON public.draws FOR SELECT
    TO authenticated, anon
    USING (status = 'published' OR status = 'completed' OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Only admins can modify draws"
    ON public.draws FOR ALL
    USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- DRAW ENTRIES policies
DROP POLICY IF EXISTS "Users can view own entries" ON public.draw_entries;
DROP POLICY IF EXISTS "Only admins can manage entries" ON public.draw_entries;
CREATE POLICY "Users can view own entries"
    ON public.draw_entries FOR SELECT
    USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Only admins can manage entries"
    ON public.draw_entries FOR ALL
    USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- WINNERS policies
DROP POLICY IF EXISTS "Winners can view own winnings" ON public.winners;
DROP POLICY IF EXISTS "Only admins can manage winners" ON public.winners;
CREATE POLICY "Winners can view own winnings"
    ON public.winners FOR SELECT
    USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Only admins can manage winners"
    ON public.winners FOR ALL
    USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- PRIZE POOLS policies (public read published, admin all)
DROP POLICY IF EXISTS "Published prize pools are viewable" ON public.prize_pools;
DROP POLICY IF EXISTS "Only admins can modify prize pools" ON public.prize_pools;
CREATE POLICY "Published prize pools are viewable"
    ON public.prize_pools FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.draws d
        WHERE d.id = draw_id AND (d.status = 'published' OR d.status = 'completed')
    ) OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

CREATE POLICY "Only admins can modify prize pools"
    ON public.prize_pools FOR ALL
    USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');


-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_charities_updated_at
    BEFORE UPDATE ON public.charities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_winners_updated_at
    BEFORE UPDATE ON public.winners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prize_pools_updated_at
    BEFORE UPDATE ON public.prize_pools
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- HANDLE NEW USER SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample charities
INSERT INTO public.charities (name, description, is_featured, is_active) VALUES
('Golf For Good', 'Supporting underprivileged youth through golf education', true, true),
('Green Fairways Foundation', 'Environmental conservation for golf courses', false, true),
('Swing Together', 'Community building through golf programs', false, true)
ON CONFLICT DO NOTHING;
