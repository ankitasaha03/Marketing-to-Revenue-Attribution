"use client";

import * as React from "react";
import {
  AlertTriangle,
  Zap,
  Sparkles,
  FileText,
  Clock,
  ArrowRight,
  TrendingDown,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Sliders,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ANOMALIES_LIST } from "@/lib/mock-data";
import { AnomalyDiagnostic, FunnelStageId } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface LeakageDiagnosticsProps {
  onSimulateFix: (anomaly: AnomalyDiagnostic) => void;
  onAskAi: (prompt: string) => void;
  selectedStageId?: FunnelStageId | null;
}

export function LeakageDiagnostics({
  onSimulateFix,
  onAskAi,
  selectedStageId,
}: LeakageDiagnosticsProps) {
  const [severityFilter, setSeverityFilter] = React.useState<"all" | "critical" | "high" | "medium">("all");
  const [expandedId, setExpandedId] = React.useState<string | null>("diag-1");
  const [memoAnomaly, setMemoAnomaly] = React.useState<AnomalyDiagnostic | null>(null);

  const filteredAnomalies = ANOMALIES_LIST.filter((anomaly) => {
    if (selectedStageId && anomaly.stage !== selectedStageId) return false;
    if (severityFilter !== "all" && anomaly.severity !== severityFilter) return false;
    return true;
  });

  const totalLeakedInFilter = filteredAnomalies.reduce((sum, item) => sum + item.leakageValue, 0);

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Root-Cause Leakage Diagnostics & Radar
            </h3>
            <Badge variant="destructive" className="font-mono">
              {filteredAnomalies.length} Anomaly Detections
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Realtime algorithmic root-cause attribution isolating bottlenecks between lead generation and closed ARR.
          </p>
        </div>

        {/* Severity Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 text-xs">
            {(["all", "critical", "high", "medium"] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`rounded-lg px-2.5 py-1 font-medium capitalize transition-all cursor-pointer ${
                  severityFilter === sev
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white font-semibold"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="text-right pl-2 hidden sm:block">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Filter Leakage
            </div>
            <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400">
              {formatCurrency(totalLeakedInFilter, true)}
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="space-y-4">
        {filteredAnomalies.map((anomaly) => {
          const isExpanded = expandedId === anomaly.id;
          const isCritical = anomaly.severity === "critical";

          return (
            <Card
              key={anomaly.id}
              className={`overflow-hidden transition-all duration-200 border ${
                isCritical
                  ? "border-rose-300 dark:border-rose-900/60 shadow-xs"
                  : "border-slate-200/80 dark:border-slate-800/80"
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : anomaly.id)}
                className="flex cursor-pointer items-start sm:items-center justify-between p-4 sm:p-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`rounded-xl p-2.5 mt-0.5 sm:mt-0 ${
                      isCritical
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300"
                        : anomaly.severity === "high"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
                        : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300"
                    }`}
                  >
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          isCritical
                            ? "destructive"
                            : anomaly.severity === "high"
                            ? "warning"
                            : "default"
                        }
                        className="text-[10px] uppercase font-bold"
                      >
                        {anomaly.severity}
                      </Badge>
                      <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
                        Stage: {anomaly.stage.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                      {anomaly.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-2">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Est. ARR Leakage
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono text-rose-600 dark:text-rose-400">
                      -{formatCurrency(anomaly.leakageValue, true)}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Deep-Dive Panel */}
              {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-5 dark:border-slate-800/80 dark:bg-slate-900/60 space-y-4 animate-in fade-in duration-200">
                  {/* Telemetry Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {anomaly.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 shadow-xs"
                      >
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.label}</div>
                        <div className="text-sm sm:text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                          {m.value}
                        </div>
                        {m.delta && (
                          <div
                            className={`text-[10px] font-mono font-medium ${
                              m.isGood
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {m.delta}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Root Cause & Evidence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 space-y-1">
                      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                        Root Cause Breakdown:
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {anomaly.rootCause}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 space-y-1">
                      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        Empirical Telemetry Evidence:
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {anomaly.evidence}
                      </p>
                    </div>
                  </div>

                  {/* AI Remediation Recommendation */}
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-3.5 dark:border-indigo-900/60 dark:bg-indigo-950/30 text-xs">
                    <div className="font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5 mb-1">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      Prescriptive Remediation Playbook:
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {anomaly.recommendation}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMemoAnomaly(anomaly)}
                      className="text-xs h-8"
                    >
                      <FileText className="h-3.5 w-3.5 mr-1" />
                      Export Root Cause Memo
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        onAskAi(
                          `Explain the root cause for "${anomaly.title}" and provide a 30-day tactical remediation plan.`
                        )
                      }
                      className="text-xs h-8"
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1 text-purple-500" />
                      Ask AI Assistant
                    </Button>

                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => onSimulateFix(anomaly)}
                      className="text-xs h-8"
                    >
                      <Sliders className="h-3.5 w-3.5 mr-1" />
                      Simulate Fix in Engine
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Root Cause Detail Memo Modal */}
      {memoAnomaly && (
        <Dialog open={!!memoAnomaly} onOpenChange={() => setMemoAnomaly(null)}>
          <DialogContent className="max-w-xl" onClose={() => setMemoAnomaly(null)}>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="destructive" className="uppercase text-[10px]">
                  {memoAnomaly.severity} Anomaly
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  REF: FP-{memoAnomaly.id.toUpperCase()}
                </span>
              </div>
              <DialogTitle>{memoAnomaly.title}</DialogTitle>
              <DialogDescription>
                Executive Revenue Leakage Briefing • Generated by FunnelPulse AI Diagnostics
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2 text-xs text-slate-700 dark:text-slate-300 max-h-[60vh] overflow-y-auto pr-1">
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">Financial Impact Summary</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div>
                    <span className="text-slate-500">Unrealized ARR:</span>{" "}
                    <span className="font-bold text-rose-600 dark:text-rose-400">
                      {formatCurrency(memoAnomaly.leakageValue)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Affected Leads/Opps:</span>{" "}
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatNumber(memoAnomaly.affectedVolume)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">1. Problem Diagnosis</h5>
                <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {memoAnomaly.rootCause}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">2. Quantitative Evidence</h5>
                <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {memoAnomaly.evidence}
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 dark:text-white mb-1">3. Action Plan & Next Steps</h5>
                <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {memoAnomaly.recommendation}
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.print();
                }}
              >
                Print / Save PDF
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  onSimulateFix(memoAnomaly);
                  setMemoAnomaly(null);
                }}
              >
                Launch Simulator
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
