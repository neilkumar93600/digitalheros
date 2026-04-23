"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { runDraw } from "@/app/actions/draw";
import { toast } from "sonner";
import { Trophy, RefreshCw } from "lucide-react";

export function DrawControl() {
  const [isDrawing, setIsDrawing] = useState(false);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const handleRunDraw = async () => {
    try {
      setIsDrawing(true);
      const result = await runDraw(currentMonth, currentYear);
      
      if (result.error) {
        toast.error(`Draw failed: ${result.error}`);
      } else {
        toast.success(`Draw executed successfully! ID: ${result.drawId}`);
        // Refresh the page to show new draw data
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err: any) {
      toast.error(`An error occurred: ${err.message}`);
    } finally {
      setIsDrawing(false);
    }
  };

  return (
    <div className="flex items-center gap-4 bg-[#101010] border border-[#3d3a39] p-6 rounded-lg">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-[#f2f2f2] flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#00d992]" />
          Run Monthly Draw
        </h3>
        <p className="text-sm text-[#8b949e] mt-1">
          Execute the draw for {currentMonth}/{currentYear}. This will select 5 random numbers, evaluate all active user entries, distribute the prize pool, and pick winners.
        </p>
      </div>
      <Button 
        onClick={handleRunDraw} 
        disabled={isDrawing}
        className="bg-[#00d992] text-[#050507] hover:bg-[#00d992]/90 font-medium px-6"
      >
        {isDrawing ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Executing Draw...
          </>
        ) : (
          "Run Official Draw"
        )}
      </Button>
    </div>
  );
}
