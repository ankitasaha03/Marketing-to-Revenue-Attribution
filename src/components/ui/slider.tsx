"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  className?: string;
  unit?: string;
  prefix?: string;
  label?: string;
  baseline?: number;
}

export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  className,
  unit = "",
  prefix = "",
  label,
  baseline,
}: SliderProps) {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const baselinePercentage = baseline !== undefined ? ((baseline - min) / (max - min)) * 100 : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
          <div className="flex items-center gap-1.5 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
            <span>
              {prefix}
              {typeof value === "number" && !Number.isInteger(value) ? value.toFixed(1) : value.toLocaleString()}
              {unit}
            </span>
            {baseline !== undefined && value !== baseline && (
              <span
                className={cn(
                  "text-[10px] font-normal px-1.5 py-0.5 rounded",
                  value > baseline
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                )}
              >
                {value > baseline ? "+" : ""}
                {(value - baseline).toFixed(1)}
                {unit}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="relative flex items-center select-none touch-none w-full h-5">
        <div className="relative w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Baseline indicator mark if provided */}
        {baselinePercentage !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-400/80 dark:bg-slate-500 pointer-events-none"
            style={{ left: `${baselinePercentage}%` }}
            title={`Baseline: ${prefix}${baseline}${unit}`}
          />
        )}

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Visual thumb */}
        <div
          className="pointer-events-none absolute h-4 w-4 rounded-full border-2 border-indigo-600 bg-white shadow-md shadow-indigo-500/20 dark:border-indigo-400 dark:bg-slate-900 -translate-x-1/2 transition-all duration-75"
          style={{ left: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
        <span>
          {prefix}
          {min}
          {unit}
        </span>
        {baseline !== undefined && (
          <span className="text-slate-500 dark:text-slate-400">
            Base: {prefix}
            {baseline}
            {unit}
          </span>
        )}
        <span>
          {prefix}
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
