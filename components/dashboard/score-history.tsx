"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, History } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

type Score = {
  id: string;
  score_value: number;
  score_date: string;
};

export function ScoreHistory({ refreshTrigger }: { refreshTrigger: number }) {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchScores = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .from("scores")
        .select("*")
        .eq("user_id", user.id)
        .order("score_date", { ascending: false })
        .limit(5);

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores, refreshTrigger]);

  const handleDelete = async (id: string) => {
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("scores").delete().eq("id", id);
      
      if (error) throw error;
      
      toast.success("Score deleted");
      fetchScores();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete score");
    }
  };

  return (
    <Card className="bg-[#101010] border-[#3d3a39] flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#00d992]/10 flex items-center justify-center">
            <History className="w-4 h-4 text-[#00d992]" />
          </div>
          <CardTitle className="text-[#f2f2f2] font-system-ui">Recent Scores</CardTitle>
        </div>
        <CardDescription className="text-[#8b949e]">
          Your last 5 recorded rounds
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex justify-center items-center h-full min-h-[150px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00d992]"></div>
          </div>
        ) : scores.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full min-h-[150px] text-[#8b949e]">
            <p>No scores recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scores.map((score) => (
              <div key={score.id} className="flex items-center justify-between p-3 rounded bg-[#050507] border border-[#3d3a39]">
                <div>
                  <p className="text-sm text-[#8b949e]">{format(new Date(score.score_date), "MMM d, yyyy")}</p>
                  <p className="text-xl font-semibold text-[#f2f2f2]">{score.score_value} pts</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDelete(score.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
