import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Heart, CreditCard, TrendingUp, Activity, DollarSign, Gift } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const supabase = createClient();

  // Basic stats
  const [
    { count: usersCount },
    { count: activeSubs },
    { count: charitiesCount },
    { count: drawsCount },
    { data: recentUsers },
    { data: recentDraws },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("charities").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("draws").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("draws").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  // Get total contributions
  const { data: charities } = await supabase.from("charities").select("total_contributions");
  const totalContributions = charities?.reduce((sum, c) => sum + Number(c.total_contributions || 0), 0) || 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-system-ui bg-gradient-to-r from-[#f2f2f2] to-[#8b949e] bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-[#8b949e] mt-1">Welcome back, Admin. Here&apos;s your system status.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-[#00d992]/10 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#00d992]" />
          <span className="text-sm font-medium text-[#00d992]">Live Data</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/20 overflow-hidden relative group hover:border-[#00d992]/40 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d992]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Users</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-[#00d992]/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-[#00d992]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-[#f2f2f2]">{usersCount || 0}</div>
            <p className="text-xs text-[#00d992] mt-1 flex items-center gap-1">
              <TrendingUp size={12} /> Active community members
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/20 overflow-hidden relative group hover:border-[#00d992]/40 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d992]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Active Subscriptions</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-[#00d992]/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-[#00d992]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-[#00d992]">{activeSubs || 0}</div>
            <p className="text-xs text-[#8b949e] mt-1 flex items-center gap-1">
              <Activity size={12} /> Paying customers
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/20 overflow-hidden relative group hover:border-[#00d992]/40 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d992]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Contributions</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-[#00d992]/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-[#00d992]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-[#00d992]">${totalContributions.toFixed(0)}</div>
            <p className="text-xs text-[#8b949e] mt-1 flex items-center gap-1">
              <Gift size={12} /> Donated to charities
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/20 overflow-hidden relative group hover:border-[#00d992]/40 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00d992]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Draws Conducted</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-[#00d992]/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-[#00d992]" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-bold text-[#f2f2f2]">{drawsCount || 0}</div>
            <p className="text-xs text-[#8b949e] mt-1 flex items-center gap-1">
              <Activity size={12} /> Total draws
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
              <Users className="h-5 w-5 text-[#00d992]" />
              Recent Users
            </CardTitle>
            <CardDescription className="text-[#8b949e]">Latest registered members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers && recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 hover:border-[#00d992]/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-[#3d3a39]/30">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-[#00d992]/20 to-[#00d992]/10 font-bold text-[#00d992]">
                          {user.full_name?.substring(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#f2f2f2]">{user.full_name || "Unknown"}</p>
                        <p className="text-xs text-[#8b949e]">{format(new Date(user.created_at), "MMM d, yyyy")}</p>
                      </div>
                    </div>
                    <Badge variant={user.role === "admin" ? "default" : "outline"} className={user.role === "admin" ? "bg-[#00d992]/20 text-[#00d992] border-[#00d992]/30" : ""}>
                      {user.role}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-[#8b949e]">No users yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Draws */}
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
              <Trophy className="h-5 w-5 text-[#00d992]" />
              Recent Draws
            </CardTitle>
            <CardDescription className="text-[#8b949e]">Latest draw events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDraws && recentDraws.length > 0 ? (
                recentDraws.map((draw) => (
                  <div key={draw.id} className="p-4 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 hover:border-[#00d992]/20 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#f2f2f2]">
                          {draw.month}/{draw.year}
                        </span>
                        <Badge variant={draw.status === "completed" ? "default" : "secondary"} className={draw.status === "completed" ? "bg-[#00d992]/20 text-[#00d992] border-[#00d992]/30" : ""}>
                          {draw.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-[#8b949e]">
                        {format(new Date(draw.created_at), "MMM d")}
                      </span>
                    </div>
                    {draw.draw_numbers && draw.draw_numbers.length > 0 && (
                      <div className="flex gap-2">
                        {draw.draw_numbers.map((num: number, i: number) => (
                          <div key={i} className="h-8 w-8 rounded-lg bg-[#00d992]/10 border border-[#00d992]/30 flex items-center justify-center font-bold text-[#00d992] text-sm">
                            {num}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-[#8b949e]">No draws yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charity Overview */}
      <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#00d992]" />
            Charity Partners
          </CardTitle>
          <CardDescription className="text-[#8b949e]">{charitiesCount || 0} active charity organizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 text-center">
              <p className="text-3xl font-bold text-[#00d992]">{charitiesCount || 0}</p>
              <p className="text-sm text-[#8b949e]">Active Charities</p>
            </div>
            <div className="p-4 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 text-center">
              <p className="text-3xl font-bold text-[#f2f2f2]">${totalContributions.toFixed(0)}</p>
              <p className="text-sm text-[#8b949e]">Total Donated</p>
            </div>
            <div className="p-4 rounded-xl bg-[#050507]/50 border border-[#3d3a39]/20 text-center">
              <p className="text-3xl font-bold text-[#00d992]">10%</p>
              <p className="text-sm text-[#8b949e]">Default Charity %</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}