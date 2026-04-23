import { createClient } from "@/lib/supabase/server";
import { DrawControl } from "./DrawControl";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Calendar, DollarSign, TrendingUp, Target, Gift } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DrawsPage() {
  const supabase = await createClient();

  // Get all draws with better data
  const { data: draws } = await supabase
    .from("draws")
    .select("*, prize_pools(*)")
    .order("created_at", { ascending: false });

  const totalPool = draws?.reduce((sum, d) => sum + Number(d.total_pool || 0), 0) || 0;
  const completedDraws = draws?.filter(d => d.status === "completed").length || 0;
  const totalWinners = draws?.reduce((sum, d) => {
    if (d.prize_pools?.[0]) {
      return sum + d.prize_pools[0].tier_5_winners + d.prize_pools[0].tier_4_winners + d.prize_pools[0].tier_3_winners;
    }
    return sum;
  }, 0) || 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-system-ui bg-gradient-to-r from-[#f2f2f2] to-[#8b949e] bg-clip-text text-transparent">
            Draw Management
          </h1>
          <p className="text-[#8b949e] mt-1">Conduct and manage weekly golf score draws</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Draws</CardTitle>
            <Trophy className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f2f2f2]">{draws?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00d992]">{completedDraws}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Pool</CardTitle>
            <DollarSign className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00d992]">${totalPool.toFixed(0)}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Winners</CardTitle>
            <Gift className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f2f2f2]">{totalWinners}</div>
          </CardContent>
        </Card>
      </div>

      {/* Draw Control */}
      <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
            <Target className="h-5 w-5 text-[#00d992]" />
            Draw Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DrawControl />
        </CardContent>
      </Card>

      {/* Past Draws */}
      <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#00d992]" />
            Draw History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {draws && draws.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {draws.map((draw) => (
                <div key={draw.id} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#101010] border border-[#3d3a39]/20 p-6 hover:border-[#00d992]/30 transition-all duration-300 group">
                  {/* Glow effect */}
                  <div className="absolute top-0 right-0 h-24 w-24 bg-[#00d992]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-[#f2f2f2]">
                          {draw.month}/{draw.year}
                        </h3>
                        <Badge variant={draw.status === "completed" ? "default" : "secondary"} className={draw.status === "completed" ? "bg-[#00d992]/20 text-[#00d992] border-[#00d992]/30" : ""}>
                          {draw.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#8b949e] mt-1">
                        {format(new Date(draw.created_at), "MMMM d, yyyy")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#8b949e]">Pool Amount</p>
                      <p className="text-xl font-bold text-[#00d992]">${Number(draw.total_pool).toFixed(0)}</p>
                    </div>
                  </div>

                  {/* Winning Numbers */}
                  {draw.draw_numbers && draw.draw_numbers.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-medium text-[#8b949e] mb-3 uppercase tracking-wider">Winning Numbers</p>
                      <div className="flex gap-3">
                        {draw.draw_numbers.map((num: number, i: number) => (
                          <div key={i} className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00d992]/20 to-[#00d992]/5 border border-[#00d992]/30 flex items-center justify-center font-bold text-[#00d992] text-lg shadow-lg shadow-[#00d992]/10">
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prize Distribution */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#3d3a39]/20 relative z-10">
                    <div>
                      <p className="text-xs text-[#8b949e]">Jackpot Rollover</p>
                      <p className="font-semibold text-[#f2f2f2]">${Number(draw.jackpot_rollover).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8b949e]">Draw Type</p>
                      <p className="font-semibold text-[#f2f2f2] capitalize">{draw.draw_type}</p>
                    </div>

                    {draw.prize_pools && draw.prize_pools[0] && (
                      <>
                        <div className="col-span-2 grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#3d3a39]/20">
                          <div className="text-center p-3 rounded-xl bg-[#00d992]/5 border border-[#00d992]/10">
                            <p className="text-2xl font-bold text-[#00d992]">{draw.prize_pools[0].tier_5_winners}</p>
                            <p className="text-xs text-[#8b949e]">Tier 5</p>
                          </div>
                          <div className="text-center p-3 rounded-xl bg-[#00d992]/5 border border-[#00d992]/10">
                            <p className="text-2xl font-bold text-[#00d992]">{draw.prize_pools[0].tier_4_winners}</p>
                            <p className="text-xs text-[#8b949e]">Tier 4</p>
                          </div>
                          <div className="text-center p-3 rounded-xl bg-[#00d992]/5 border border-[#00d992]/10">
                            <p className="text-2xl font-bold text-[#00d992]">{draw.prize_pools[0].tier_3_winners}</p>
                            <p className="text-xs text-[#8b949e]">Tier 3</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border-2 border-dashed border-[#3d3a39]/20 rounded-2xl">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-[#3d3a39]/50" />
              <p className="text-[#8b949e] text-lg">No draws have been conducted yet</p>
              <p className="text-[#8b949e]/50 text-sm mt-2">Use the control panel above to run your first draw</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}