"use server";

import { createClient } from "@supabase/supabase-js";
import { createClient as createServerSupabase } from "@/lib/supabase/server";

export async function runDraw(month: number, year: number) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // Check admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return { error: "Forbidden: Admin access required" };
  }

  // Use service role client to bypass RLS for processing all users
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Generate 5 unique random numbers (1-45)
  const drawNumbers = generateRandomNumbers(5, 1, 45);

  // 2. Create the draw record
  const { data: draw, error: drawError } = await adminSupabase
    .from("draws")
    .insert({
      month,
      year,
      draw_numbers: drawNumbers,
      draw_type: "random",
      status: "completed",
    })
    .select()
    .single();

  if (drawError) {
    return { error: drawError.message };
  }

  // 3. Get active subscriptions
  const { data: subscriptions } = await adminSupabase
    .from("subscriptions")
    .select("user_id")
    .eq("status", "active");

  const activeUserIds = subscriptions?.map((s) => s.user_id) || [];

  // 4. For each user, get latest 5 scores
  const entriesToInsert = [];
  let totalEntries = 0;

  for (const userId of activeUserIds) {
    const { data: scores } = await adminSupabase
      .from("scores")
      .select("score_value")
      .eq("user_id", userId)
      .order("score_date", { ascending: false })
      .limit(5);

    if (scores && scores.length === 5) {
      const entryNumbers = scores.map((s) => s.score_value);
      
      // Calculate matches
      let matches = 0;
      for (const num of entryNumbers) {
        if (drawNumbers.includes(num)) matches++;
      }

      let prizeTier = null;
      if (matches === 5) prizeTier = 5;
      else if (matches === 4) prizeTier = 4;
      else if (matches === 3) prizeTier = 3;

      entriesToInsert.push({
        draw_id: draw.id,
        user_id: userId,
        entry_numbers: entryNumbers,
        matches_count: matches,
        prize_tier: prizeTier,
      });
      totalEntries++;
    }
  }

  // Insert entries
  if (entriesToInsert.length > 0) {
    await adminSupabase.from("draw_entries").insert(entriesToInsert);
  }

  // 5. Calculate Prize Pool
  // Assuming a fixed 50% of revenue goes to the pool.
  // $10 per active user (for example), 50% -> $5 per entry.
  const totalRevenue = totalEntries * 10; 
  const totalPool = totalRevenue * 0.50;
  
  const tier5Amount = totalPool * 0.40;
  const tier4Amount = totalPool * 0.35;
  const tier3Amount = totalPool * 0.25;

  const tier5Winners = entriesToInsert.filter((e) => e.prize_tier === 5).length;
  const tier4Winners = entriesToInsert.filter((e) => e.prize_tier === 4).length;
  const tier3Winners = entriesToInsert.filter((e) => e.prize_tier === 3).length;

  await adminSupabase.from("prize_pools").insert({
    draw_id: draw.id,
    tier_5_amount: tier5Amount,
    tier_4_amount: tier4Amount,
    tier_3_amount: tier3Amount,
    tier_5_winners: tier5Winners,
    tier_4_winners: tier4Winners,
    tier_3_winners: tier3Winners,
  });

  // Update draw total pool
  await adminSupabase.from("draws").update({ total_pool: totalPool }).eq("id", draw.id);

  // 6. Assign prize amounts to entries
  const updatePromises = [];

  for (const entry of entriesToInsert) {
    if (entry.prize_tier) {
      let amount = 0;
      if (entry.prize_tier === 5 && tier5Winners > 0) amount = tier5Amount / tier5Winners;
      if (entry.prize_tier === 4 && tier4Winners > 0) amount = tier4Amount / tier4Winners;
      if (entry.prize_tier === 3 && tier3Winners > 0) amount = tier3Amount / tier3Winners;

      updatePromises.push(
        adminSupabase.from("draw_entries")
          .update({ prize_amount: amount })
          .eq("draw_id", draw.id)
          .eq("user_id", entry.user_id)
      );
    }
  }

  await Promise.all(updatePromises);

  // Fetch winning entries to insert into winners table
  const { data: winningEntries } = await adminSupabase
    .from("draw_entries")
    .select("id, user_id, prize_tier, prize_amount")
    .eq("draw_id", draw.id)
    .not("prize_tier", "is", null);

  if (winningEntries && winningEntries.length > 0) {
    const winnersData = winningEntries.map((we) => ({
      draw_id: draw.id,
      user_id: we.user_id,
      entry_id: we.id,
      prize_tier: we.prize_tier,
      prize_amount: we.prize_amount,
    }));
    await adminSupabase.from("winners").insert(winnersData);
  }

  return { success: true, drawId: draw.id };
}

function generateRandomNumbers(count: number, min: number, max: number): number[] {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
}
