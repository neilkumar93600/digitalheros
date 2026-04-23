"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PercentageSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  label?: string;
}

export function PercentageSlider({
  value,
  onChange,
  min = 10,
  max = 100,
  step = 5,
  className,
  label,
}: PercentageSliderProps) {
  const [localValue, setLocalValue] = useState<number>(value);

  function handleChange(values: number[]) {
    const newValue = values[0];
    setLocalValue(newValue);
    onChange(newValue);
  }

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-bold text-primary">{localValue}%</span>
        </div>
      )}
      <Slider
        value={[localValue]}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <p className="text-xs text-muted-foreground">
        Minimum contribution: {min}%
      </p>
    </div>
  );
}
