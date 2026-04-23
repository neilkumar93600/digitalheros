"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Heart, Building2 } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Image from "next/image";

type Charity = {
  id: string;
  name: string;
  description: string;
  logo_url: string;
};

export function CharityManager() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [selectedCharityId, setSelectedCharityId] = useState<string | null>(null);
  const [percentage, setPercentage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch charities
      const { data: charityData, error: charityError } = await supabase
        .from("charities")
        .select("*")
        .eq("is_active", true);
        
      if (charityError) throw charityError;
      setCharities(charityData || []);

      // Fetch active subscription
      const { data: subData, error: subError } = await supabase
        .from("subscriptions")
        .select(`*, charities (name)`)
        .eq("user_id", user.id)
        .in("status", ["active", "trialing"])
        .maybeSingle();

      if (subError && subError.code !== 'PGRST116') throw subError; // PGRST116 is 0 rows
      
      setSubscription(subData);
      if (subData) {
        setSelectedCharityId(subData.charity_id);
        setPercentage(subData.charity_percentage || 10);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    if (!subscription) {
      toast.error("You need an active subscription to set a charity contribution.");
      setIsOpen(false);
      return;
    }

    if (!selectedCharityId) {
      toast.error("Please select a charity");
      return;
    }

    setIsSaving(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("subscriptions")
        .update({
          charity_id: selectedCharityId,
          charity_percentage: percentage
        })
        .eq("id", subscription.id);

      if (error) throw error;
      
      toast.success("Charity preferences updated");
      fetchData();
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const activeCharity = charities.find(c => c.id === subscription?.charity_id);

  return (
    <Card className="bg-[#101010] border-[#3d3a39] h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#00d992]/10 flex items-center justify-center">
            <Heart className="w-4 h-4 text-[#00d992]" />
          </div>
          <CardTitle className="text-[#f2f2f2] font-system-ui">My Charity</CardTitle>
        </div>
        <CardDescription className="text-[#8b949e]">
          Manage your contribution
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00d992]"></div>
          </div>
        ) : !subscription ? (
          <div className="text-center text-[#8b949e] py-4">
            <p className="mb-2">Subscribe to start contributing to charities.</p>
          </div>
        ) : activeCharity ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 rounded bg-[#050507] border border-[#3d3a39]">
              <div className="w-12 h-12 rounded bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                {activeCharity.logo_url ? (
                  <img src={activeCharity.logo_url} alt={activeCharity.name} className="w-full h-full object-cover" />
                ) : (
                  <Building2 className="w-6 h-6 text-[#8b949e]" />
                )}
              </div>
              <div>
                <p className="font-semibold text-[#f2f2f2]">{activeCharity.name}</p>
                <p className="text-sm text-[#00d992]">{subscription.charity_percentage}% contribution</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-[#8b949e] py-4">
            <p>No charity selected yet.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-[#3d3a39] bg-transparent text-[#f2f2f2] hover:bg-[#101010] hover:border-[#00d992] hover:text-[#00d992]">
              {activeCharity ? "Change Charity" : "Select Charity"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#101010] border-[#3d3a39] text-[#f2f2f2] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-system-ui">Select a Charity</DialogTitle>
              <DialogDescription className="text-[#8b949e]">
                Choose which cause you want your subscription fee to support.
              </DialogDescription>
            </DialogHeader>
            
            {!subscription ? (
               <div className="py-8 text-center text-[#8b949e]">
                 <p>You must have an active subscription to select a charity.</p>
               </div>
            ) : (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {charities.length === 0 && (
                    <p className="text-[#8b949e] col-span-2">No charities available at the moment.</p>
                  )}
                  {charities.map((charity) => (
                    <div 
                      key={charity.id}
                      onClick={() => setSelectedCharityId(charity.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors flex gap-3 ${
                        selectedCharityId === charity.id 
                          ? 'border-[#00d992] bg-[#00d992]/5' 
                          : 'border-[#3d3a39] bg-[#050507] hover:border-[#8b949e]'
                      }`}
                    >
                      <div className="w-10 h-10 shrink-0 rounded bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                        {charity.logo_url ? (
                          <img src={charity.logo_url} alt={charity.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-5 h-5 text-[#8b949e]" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{charity.name}</h4>
                        <p className="text-xs text-[#8b949e] line-clamp-2 mt-1">{charity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-[#3d3a39]">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Contribution Percentage</h4>
                    <span className="text-[#00d992] font-bold text-lg">{percentage}%</span>
                  </div>
                  <p className="text-xs text-[#8b949e]">
                    Choose what percentage of your entry fee goes to your selected charity (Minimum 10%).
                  </p>
                  <Slider 
                    value={[percentage]} 
                    onValueChange={(vals) => setPercentage(vals[0])} 
                    max={100} 
                    min={10} 
                    step={5}
                    className="py-4"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-[#8b949e] hover:text-[#f2f2f2]">
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={isSaving || !subscription}
                className="bg-[#00d992] text-[#050507] hover:bg-[#00ffaa]"
              >
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
