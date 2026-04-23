import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Globe, Star, DollarSign, Calendar, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCharitiesPage() {
  const supabase = await createClient();

  // Get all charities with better data
  const { data: charities } = await supabase
    .from("charities")
    .select("*")
    .order("created_at", { ascending: false });

  const totalContributions = charities?.reduce((sum, c) => sum + Number(c.total_contributions || 0), 0) || 0;
  const activeCount = charities?.filter(c => c.is_active).length || 0;
  const featuredCount = charities?.filter(c => c.is_featured).length || 0;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold font-system-ui bg-gradient-to-r from-[#f2f2f2] to-[#8b949e] bg-clip-text text-transparent">
            Charities Management
          </h1>
          <p className="text-[#8b949e] mt-1">Manage charity partners and track contributions</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Charities</CardTitle>
            <Heart className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f2f2f2]">{charities?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Active</CardTitle>
            <Heart className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00d992]">{activeCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Total Donated</CardTitle>
            <DollarSign className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#00d992]">${totalContributions.toFixed(0)}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#8b949e]">Featured</CardTitle>
            <Star className="h-4 w-4 text-[#00d992]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f2f2f2]">{featuredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charities Grid */}
      <Card className="bg-gradient-to-br from-[#101010] to-[#0a0a0a] border-[#00d992]/10 overflow-hidden">
        <CardHeader className="border-b border-[#3d3a39]/20 bg-[#0a0a0a]/50">
          <CardTitle className="text-lg font-semibold text-[#f2f2f2] flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#00d992]" />
            All Charities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {charities && charities.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {charities.map((charity) => (
                <div key={charity.id} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#101010] border border-[#3d3a39]/20 p-6 hover:border-[#00d992]/30 transition-all duration-300 group">
                  {/* Glow effect */}
                  <div className="absolute top-0 right-0 h-32 w-32 bg-[#00d992]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#00d992]/20 to-[#00d992]/5 border border-[#00d992]/20 flex items-center justify-center">
                        <Heart className="h-6 w-6 text-[#00d992]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#f2f2f2]">{charity.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={charity.is_active ? "default" : "secondary"} className={charity.is_active ? "bg-[#00d992]/20 text-[#00d992] border-[#00d992]/30 text-xs" : "text-xs"}>
                            {charity.is_active ? "Active" : "Inactive"}
                          </Badge>
                          {charity.is_featured && (
                            <Badge variant="outline" className="border-[#00d992]/30 text-[#00d992]/70 text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {charity.description && (
                    <p className="text-sm text-[#8b949e] mb-4 line-clamp-2 relative z-10">
                      {charity.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#3d3a39]/20 relative z-10">
                    <div className="text-center p-3 rounded-xl bg-[#00d992]/5 border border-[#00d992]/10">
                      <p className="text-xl font-bold text-[#00d992]">${Number(charity.total_contributions).toFixed(0)}</p>
                      <p className="text-xs text-[#8b949e]">Contributed</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-[#0a0a0a] border border-[#3d3a39]/20">
                      <p className="text-sm font-medium text-[#f2f2f2]">{format(new Date(charity.created_at), "MMM yyyy")}</p>
                      <p className="text-xs text-[#8b949e]">Added</p>
                    </div>
                  </div>

                  {/* Website */}
                  {charity.website && (
                    <a
                      href={charity.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex items-center gap-2 text-xs text-[#00d992] hover:underline relative z-10"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border-2 border-dashed border-[#3d3a39]/20 rounded-2xl">
              <Heart className="h-16 w-16 mx-auto mb-4 text-[#3d3a39]/50" />
              <p className="text-[#8b949e] text-lg">No charities yet</p>
              <p className="text-[#8b949e]/50 text-sm mt-2">Add your first charity partner to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}