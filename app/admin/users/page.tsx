import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserCheck, CreditCard, Target, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Get all users with their subscriptions
  const { data: profiles } = await supabase
    .from("profiles")
    .select(`
      *,
      subscriptions (
        status,
        plan_type,
        current_period_end
      ),
      scores (count)
    `)
    .order("created_at", { ascending: false });

  const totalUsers = profiles?.length || 0;
  const adminCount = profiles?.filter(p => p.role === "admin").length || 0;
  const activeSubCount = profiles?.filter(p => p.subscriptions?.[0]?.status === "active").length || 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-system-ui bg-gradient-to-r from-[#f2f2f2] to-[#8b949e] bg-clip-text text-transparent">
            Users Management
          </h1>
          <p className="text-[#8b949e] mt-1">Manage all registered users and their subscriptions</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f2f2f2]">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Admins</CardTitle>
            <Shield className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00d992]">{adminCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Active Subs</CardTitle>
            <CreditCard className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00d992]">{activeSubCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Free Users</CardTitle>
            <UserCheck className="h-4 w-4 text-[#8b949e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f2f2f2]">{totalUsers - activeSubCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10 overflow-hidden">
        <CardHeader className="border-b border-[#3d3a39]/20 bg-[#0a0a0a]/50">
          <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
            <Users className="h-5 w-5 text-[#00d992]" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#0a0a0a]/80">
              <TableRow className="border-[#3d3a39]/20 hover:bg-transparent">
                <TableHead className="text-[#8b949e] font-medium py-4">User</TableHead>
                <TableHead className="text-[#8b949e] font-medium">Role</TableHead>
                <TableHead className="text-[#8b949e] font-medium">Joined</TableHead>
                <TableHead className="text-[#8b949e] font-medium">Subscription</TableHead>
                <TableHead className="text-[#8b949e] font-medium text-right">Scores</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles && profiles.length > 0 ? (
                profiles.map((profile) => {
                  const sub = profile.subscriptions && profile.subscriptions[0];
                  return (
                    <TableRow key={profile.id} className="border-[#3d3a39]/10 hover:bg-[#00d992]/5 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border-2 border-[#3d3a39]/30">
                            <AvatarImage src={profile.avatar_url} />
                            <AvatarFallback className="bg-gradient-to-br from-[#00d992]/20 to-[#00d992]/10 font-bold text-[#00d992]">
                              {profile.full_name?.substring(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-[#f2f2f2]">{profile.full_name || "Unknown"}</p>
                            <p className="text-xs text-[#8b949e] truncate max-w-[200px]">{profile.user_id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={profile.role === "admin" ? "default" : "outline"} className={profile.role === "admin" ? "bg-[#00d992]/20 text-[#00d992] border-[#00d992]/30 capitalize" : "capitalize border-[#3d3a39]/30 text-[#8b949e]"}>
                          {profile.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#8b949e]">
                        {format(new Date(profile.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {sub ? (
                          <div className="flex items-center gap-2">
                            <Badge variant={sub.status === "active" ? "default" : "destructive"} className={sub.status === "active" ? "bg-[#00d992]/20 text-[#00d992] border-[#00d992]/30" : ""}>
                              {sub.status}
                            </Badge>
                            <span className="text-xs text-[#8b949e] capitalize">{sub.plan_type}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-[#8b949e]/50 italic">No subscription</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Target className="h-4 w-4 text-[#8b949e]" />
                          <span className="font-semibold text-[#f2f2f2]">{profile.scores?.[0]?.count || 0}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-[#8b949e]">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>No users found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}