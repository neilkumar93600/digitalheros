"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/contexts/auth-context";
import { toast } from "sonner";
import { getStripe } from "@/lib/stripe-client";

export function SubscriptionManager() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchSubscription = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .in("status", ["active", "trialing"])
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setSubscription(data);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    setIsProcessing(true);
    try {
      // In a real app, these should come from your environment variables
      const priceId = plan === 'monthly' 
        ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || 'price_monthly_placeholder'
        : process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || 'price_yearly_placeholder';

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
          successUrl: `${window.location.origin}/dashboard?checkout=success`,
          cancelUrl: `${window.location.origin}/dashboard?checkout=canceled`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Something went wrong');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        const stripe = await getStripe();
        await (stripe as any)?.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to start checkout process");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManageBilling = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Failed to access billing portal');
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Could not open billing portal");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-[#101010] border-[#3d3a39] h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#00d992]/10 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#00d992]" />
          </div>
          <CardTitle className="text-[#f2f2f2] font-system-ui">Subscription</CardTitle>
        </div>
        <CardDescription className="text-[#8b949e]">
          Manage your plan and billing
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00d992]"></div>
          </div>
        ) : subscription ? (
          <div className="space-y-4">
            <div className="p-4 rounded bg-[#050507] border border-[#3d3a39]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#f2f2f2] font-semibold capitalize">{subscription.plan_type} Plan</span>
                <span className="px-2 py-1 bg-[#00d992]/20 text-[#00d992] text-xs rounded-full font-medium">
                  {subscription.status}
                </span>
              </div>
              <p className="text-sm text-[#8b949e]">
                Renews on {new Date(subscription.current_period_end).toLocaleDateString()}
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-[#f2f2f2]">
                <Check className="w-4 h-4 text-[#00d992]" /> Enter all weekly draws
              </li>
              <li className="flex items-center gap-2 text-sm text-[#f2f2f2]">
                <Check className="w-4 h-4 text-[#00d992]" /> Support your favorite charity
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-[#8b949e] pb-2">
              <p>You don't have an active subscription.</p>
              <p className="text-sm mt-1">Subscribe to enter draws and support charities.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[#050507] border border-[#3d3a39] flex flex-col items-center text-center cursor-pointer hover:border-[#00d992] transition-colors" onClick={() => handleSubscribe('monthly')}>
                <span className="font-semibold text-[#f2f2f2]">$10<span className="text-xs text-[#8b949e] font-normal">/mo</span></span>
                <span className="text-xs text-[#8b949e] mt-1">Monthly billing</span>
              </div>
              <div className="p-3 rounded bg-[#050507] border border-[#00d992] relative flex flex-col items-center text-center cursor-pointer hover:bg-[#00d992]/5 transition-colors" onClick={() => handleSubscribe('yearly')}>
                <div className="absolute -top-2 inset-x-0 flex justify-center">
                  <span className="bg-[#00d992] text-[#050507] text-[10px] font-bold px-2 py-0.5 rounded-full">SAVE 20%</span>
                </div>
                <span className="font-semibold text-[#f2f2f2]">$96<span className="text-xs text-[#8b949e] font-normal">/yr</span></span>
                <span className="text-xs text-[#8b949e] mt-1">Yearly billing</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {subscription ? (
          <Button 
            variant="outline" 
            className="w-full border-[#3d3a39] bg-transparent text-[#f2f2f2] hover:bg-[#101010] hover:border-[#00d992] hover:text-[#00d992]"
            onClick={handleManageBilling}
            disabled={isProcessing}
          >
            {isProcessing ? "Loading..." : "Manage Billing"}
          </Button>
        ) : (
          <Button 
            className="w-full bg-[#00d992] text-[#050507] hover:bg-[#00ffaa]"
            onClick={() => handleSubscribe('monthly')}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Subscribe Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
