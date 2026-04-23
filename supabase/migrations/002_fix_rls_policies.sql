-- Migration: Fix RLS policies with COALESCE for null role handling
-- Run this in Supabase SQL Editor

-- PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- CHARITIES
DROP POLICY IF EXISTS "Charities are viewable by everyone" ON public.charities;
DROP POLICY IF EXISTS "Only admins can modify charities" ON public.charities;
CREATE POLICY "Charities are viewable by everyone" ON public.charities FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Only admins can modify charities" ON public.charities FOR ALL USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- SUBSCRIPTIONS
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Admins can update subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update subscriptions" ON public.subscriptions FOR UPDATE USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- SCORES
DROP POLICY IF EXISTS "Users can view own scores" ON public.scores;
DROP POLICY IF EXISTS "Users can insert own scores" ON public.scores;
DROP POLICY IF EXISTS "Users can update own scores" ON public.scores;
DROP POLICY IF EXISTS "Users can delete own scores" ON public.scores;
CREATE POLICY "Users can view own scores" ON public.scores FOR SELECT USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Users can insert own scores" ON public.scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scores" ON public.scores FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scores" ON public.scores FOR DELETE USING (auth.uid() = user_id);

-- DRAWS
DROP POLICY IF EXISTS "Published draws are viewable by everyone" ON public.draws;
DROP POLICY IF EXISTS "Only admins can modify draws" ON public.draws;
CREATE POLICY "Published draws are viewable by everyone" ON public.draws FOR SELECT TO authenticated, anon USING (status = 'published' OR status = 'completed' OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Only admins can modify draws" ON public.draws FOR ALL USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- DRAW ENTRIES
DROP POLICY IF EXISTS "Users can view own entries" ON public.draw_entries;
DROP POLICY IF EXISTS "Only admins can manage entries" ON public.draw_entries;
CREATE POLICY "Users can view own entries" ON public.draw_entries FOR SELECT USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Only admins can manage entries" ON public.draw_entries FOR ALL USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- WINNERS
DROP POLICY IF EXISTS "Winners can view own winnings" ON public.winners;
DROP POLICY IF EXISTS "Only admins can manage winners" ON public.winners;
CREATE POLICY "Winners can view own winnings" ON public.winners FOR SELECT USING (auth.uid() = user_id OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Only admins can manage winners" ON public.winners FOR ALL USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');

-- PRIZE POOLS
DROP POLICY IF EXISTS "Published prize pools are viewable" ON public.prize_pools;
DROP POLICY IF EXISTS "Only admins can modify prize pools" ON public.prize_pools;
CREATE POLICY "Published prize pools are viewable" ON public.prize_pools FOR SELECT USING (EXISTS (SELECT 1 FROM public.draws d WHERE d.id = draw_id AND (d.status = 'published' OR d.status = 'completed')) OR COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');
CREATE POLICY "Only admins can modify prize pools" ON public.prize_pools FOR ALL USING (COALESCE((auth.jwt() -> 'user_metadata' ->> 'role'), 'user') = 'admin');