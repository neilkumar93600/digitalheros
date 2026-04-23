"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ScoreInputProps {
  value: number | null;
  onChange: (value: number | null) => void;
  className?: string;
  disabled?: boolean;
}

export function ScoreInput({
  value,
  onChange,
  className,
  disabled,
}: ScoreInputProps) {
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (inputValue === "") {
      onChange(null);
      setError(null);
      return;
    }

    const numValue = parseInt(inputValue, 10);

    if (isNaN(numValue)) {
      setError("Please enter a valid number");
      return;
    }

    if (numValue < 1 || numValue > 45) {
      setError("Score must be between 1 and 45");
      return;
    }

    setError(null);
    onChange(numValue);
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        type="number"
        min={1}
        max={45}
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Enter score (1-45)"
        className={cn(error && "border-destructive")}
      />
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
