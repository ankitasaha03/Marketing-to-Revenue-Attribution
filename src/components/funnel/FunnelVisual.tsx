"use client";

import * as React from "react";
import {
  ChevronRight,
  Clock,
  DollarSign,
  AlertOctagon,
  ArrowDown,
  Sparkles,
  Info,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import { FunnelStageData, FunnelStageId } from "@/lib/types";
import { formatCurrency, formatNumber, formatPercent, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";

interface FunnelVisualProps {
  stages: FunnelStageData[];
  selectedStageId: FunnelStageId | null;
  onSelectStage: (stageId: FunnelStageId) => void;
  onSimulateStageFix?: (stageId: FunnelStageId) => void;
}

export function FunnelVisual({
  stages,
  selectedStageId,
  onSelectStage,
  onSimulateStageFix,
}: FunnelVisualProps) {
  return (
    <div className="space-y-4">
      {/* Header and Filter status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Full-Funnel Stage-by-Stage Conversion Architecture</span>
            <Tooltip content="Click any stage to filter diagnostics and multi-touch analysis">
              <Info className="h-4 w-4 text-slate-400 cursor-pointer" />
            </Tooltip>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            End-to-end tracing from Ad Impression exposure to ARR Retention. Click any stage to inspect value loss.
          </p>
        </div>

        {selectedStageId && (
          <button
            onClick={() => onSelectStage(null as any)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1 font-medium self-start sm:self-auto"
          >
            Clear stage filter
          </button>
        )}
      </div>

      {/* Visual Funnel Cards Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {stages.map((stage, idx) => {
          const isSelected = selectedStageId === stage.id;
          const isCritical = stage.healthStatus === "critical";
          const isWarning = stage.healthStatus === "warning";
          const isBottleneck = stage.id === "sqls";

          return (
            <div
              key={stage.id}
              onClick={() => onSelectStage(stage.id)}
              className={cn(
                "group relative rounded-xl border p-4 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between",
                isSelected
                  ? "ring-2 ring-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40 border-indigo-500 shadow-md"
                  : isCritical
                  ? "border-rose-300 dark:border-rose-900/70 bg-gradient-to-b from-rose-50/30 to-white dark:from-rose-950/20 dark:to-slate-900 hover:border-rose-400 shadow-sm"
                  : isWarning
                  ? "border-amber-200 dark:border-amber-900/60 bg-white dark:bg-slate-900 hover:border-amber-400"
                  : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              {/* Step number badge & health indicator */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {stage.name}
                  </span>
                </div>

                {isBottleneck && (
                  <Badge variant="destructive" className="text-[9px] px-1 py-0 animate-pulse font-bold">
                    Primary Leak
                  </Badge>
                )}
              </div>

              {/* Volume & Conversion rate */}
              <div className="space-y-1 my-2">
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {formatNumber(stage.count)}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">CVR:</span>
                  <span
                    className={cn(
                      "font-mono font-semibold",
                      stage.conversionRate < stage.benchmarkRate
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    )}
                  >
                    {idx === 0 ? "100%" : formatPercent(stage.conversionRate)}
                  </span>
                  {idx > 0 && (
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      (bm: {formatPercent(stage.benchmarkRate)})
                    </span>
                  )}
                </div>
              </div>

              {/* Stage Velocity & Dollar Leakage */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-2.5 mt-2 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>Velocity:</span>
                  </span>
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                    {stage.avgTimeInStageDays}d
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <DollarSign className="h-3 w-3 text-rose-500" />
                    <span>Value Leaked:</span>
                  </span>
                  <span
                    className={cn(
                      "font-mono font-bold",
                      stage.revenueLeaked > 0
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {stage.revenueLeaked > 0
                      ? `-${formatCurrency(stage.revenueLeaked, true)}`
                      : "$0"}
                  </span>
                </div>
              </div>

              {/* Action indicator on hover */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-indigo-600 dark:text-indigo-400 opacity-90 group-hover:opacity-100">
                <span>{isSelected ? "Active Focus" : "Inspect Stage"}</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Banner when a stage is clicked */}
      {selectedStageId && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30 animate-in fade-in duration-200">
          {(() => {
            const activeStage = stages.find((s) => s.id === selectedStageId);
            if (!activeStage) return null;
            return (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={activeStage.healthStatus === "critical" ? "destructive" : "default"}>
                      Stage Focus: {activeStage.name}
                    </Badge>
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Drop-off Volume: {formatNumber(activeStage.dropOffVolume)} entities
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {activeStage.keyBottleneckReason ||
                      "Healthy progression observed at this stage with conversion matching or exceeding industry benchmarks."}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {activeStage.revenueLeaked > 0 && (
                    <button
                      onClick={() => onSimulateStageFix?.(activeStage.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Simulate Fix for {activeStage.name}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
