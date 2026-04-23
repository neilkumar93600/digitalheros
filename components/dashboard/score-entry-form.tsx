"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Target } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";

export function ScoreEntryForm({ onScoreAdded }: { onScoreAdded: () => void }) {
  const [score, setScore] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const scoreVal = parseInt(score);
    if (isNaN(scoreVal) || scoreVal < 1 || scoreVal > 45) {
      toast.error("Score must be between 1 and 45");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to add a score");
        return;
      }

      // Check if user already has a score for this date
      const { data: existingScore } = await supabase
        .from("scores")
        .select("id")
        .eq("user_id", user.id)
        .eq("score_date", date)
        .single();
        
      if (existingScore) {
        toast.error("You have already logged a score for this date");
        setIsSubmitting(false);
        return;
      }

      // Insert new score
      const { error } = await supabase
        .from("scores")
        .insert([
          {
            user_id: user.id,
            score_value: scoreVal,
            score_date: date
          }
        ]);

      if (error) throw error;
      
      toast.success("Score logged successfully!");
      setScore("");
      onScoreAdded();
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to save score");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-[#101010] border-[#3d3a39]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#00d992]/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-[#00d992]" />
          </div>
          <CardTitle className="text-[#f2f2f2] font-system-ui">Enter Scores</CardTitle>
        </div>
        <CardDescription className="text-[#8b949e]">
          Log your latest Stableford scores (1-45)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="date" className="text-[#f2f2f2]">Date</Label>
              <Input 
                id="date" 
                type="date" 
                required 
                value={date}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="bg-[#050507] border-[#3d3a39] text-[#f2f2f2]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="score" className="text-[#f2f2f2]">Score (Stableford)</Label>
              <Input 
                id="score" 
                type="number" 
                min="1" 
                max="45" 
                required 
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="e.g. 36"
                className="bg-[#050507] border-[#3d3a39] text-[#f2f2f2]"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#00d992] text-[#050507] hover:bg-[#00ffaa] font-semibold"
          >
            {isSubmitting ? "Saving..." : "Add Score"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
