"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import {
  Sliders,
  TrendingUp,
  Sparkles,
  RotateCcw,
  CheckCircle,
  DollarSign,
  Award,
  Zap,
  ArrowRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimulatorState } from "@/lib/types";
import { BASELINE_SIMULATOR } from "@/lib/mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface ScenarioSimulatorProps {
  initialState?: Partial<SimulatorState>;
  onAskAi: (prompt: string) => void;
}

export function ScenarioSimulator({ initialState, onAskAi }: ScenarioSimulatorProps) {
  const [params, setParams] = React.useState<SimulatorState>({
    ...BASELINE_SIMULATOR,
    ...initialState,
  });

  const [applied, setApplied] = React.useState(false);

  // Update if external initial state changes
  React.useEffect(() => {
    if (initialState) {
      setParams((prev) => ({ ...prev, ...initialState }));
    }
  }, [initialState]);

  // Total MQL base: 3,420
  const totalMqls = 3420;

  // Baseline metrics:
  const baselineSqls = Math.round(totalMqls * (BASELINE_SIMULATOR.mqlToSqlRate / 100));
  const baselineDeals = Math.round(baselineSqls * (BASELINE_SIMULATOR.opportunityWinRate / 100));
  const baselineArr = baselineDeals * BASELINE_SIMULATOR.averageDealSize;
  const baselineCac = 245800 / baselineDeals; // $245.8k ad spend

  // Simulated metrics:
  // Follow-up speed multiplier: when followup drops from 42h to 2h, additional bonus conversion
  const velocityBonus = Math.max(0, (42 - params.salesFollowupHours) * 0.15); // percentage point bonus
  const effectiveMqlToSql = params.mqlToSqlRate + velocityBonus;

  const simulatedSqls = Math.round(totalMqls * (effectiveMqlToSql / 100));
  const simulatedDeals = Math.round(simulatedSqls * (params.opportunityWinRate / 100));
  const simulatedArr = simulatedDeals * params.averageDealSize;
  const arrUplift = Math.max(0, simulatedArr - baselineArr);
  const additionalDeals = Math.max(0, simulatedDeals - baselineDeals);
  const simulatedCac = simulatedDeals > 0 ? 245800 / simulatedDeals : baselineCac;
  const cacReduction = Math.max(0, baselineCac - simulatedCac);

  const chartData = [
    {
      metric: "ARR ($M)",
      Baseline: parseFloat((baselineArr / 1_000_000).toFixed(2)),
      Simulated: parseFloat((simulatedArr / 1_000_000).toFixed(2)),
    },
    {
      metric: "Closed Deals",
      Baseline: baselineDeals,
      Simulated: simulatedDeals,
    },
    {
      metric: "SQL Pipeline",
      Baseline: baselineSqls,
      Simulated: simulatedSqls,
    },
  ];

  const handleApplyPlan = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  const handleReset = () => {
    setParams(BASELINE_SIMULATOR);
  };

  const handlePreset = (preset: "sdr_sprint" | "aggressive_abm" | "enterprise_acv") => {
    if (preset === "sdr_sprint") {
      setParams({
        mqlToSqlRate: 22.5,
        salesFollowupHours: 3,
        opportunityWinRate: 18.0,
        averageDealSize: 58000,
      });
    } else if (preset === "aggressive_abm") {
      setParams({
        mqlToSqlRate: 26.0,
        salesFollowupHours: 6,
        opportunityWinRate: 22.0,
        averageDealSize: 64000,
      });
    } else if (preset === "enterprise_acv") {
      setParams({
        mqlToSqlRate: 18.0,
        salesFollowupHours: 12,
        opportunityWinRate: 20.5,
        averageDealSize: 76000,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="h-5 w-5 text-indigo-500" />
              <span>What-If Scenario Revenue Uplift Simulator</span>
            </h3>
            <Badge variant="purple">Realtime Financial Modeling</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate the bottom-line ARR impact of fixing sales follow-up latency, qualification rates, and deal sizes.
          </p>
        </div>

        {/* Quick Strategy Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Presets:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset("sdr_sprint")}
            className="text-xs h-8"
          >
            <Zap className="h-3.5 w-3.5 text-amber-500 mr-1" />
            &lt;4h SLA Sprint
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset("aggressive_abm")}
            className="text-xs h-8"
          >
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500 mr-1" />
            Full ABM Fix
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreset("enterprise_acv")}
            className="text-xs h-8"
          >
            <DollarSign className="h-3.5 w-3.5 text-indigo-500 mr-1" />
            Enterprise ACV
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs h-8 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Dynamic Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900 dark:text-white">
                Funnel Optimization Levers
              </CardTitle>
              <CardDescription>
                Adjust parameters to calculate downstream deal velocity and revenue recovery.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Lever 1: MQL to SQL Conversion Rate */}
              <Slider
                label="MQL → SQL Qualification Rate"
                min={10}
                max={35}
                step={0.5}
                value={params.mqlToSqlRate}
                baseline={BASELINE_SIMULATOR.mqlToSqlRate}
                unit="%"
                onChange={(val) => setParams({ ...params, mqlToSqlRate: val })}
              />

              {/* Lever 2: Sales Followup Duration */}
              <Slider
                label="SDR Median Follow-up Speed"
                min={1}
                max={60}
                step={1}
                value={params.salesFollowupHours}
                baseline={BASELINE_SIMULATOR.salesFollowupHours}
                unit="h"
                onChange={(val) => setParams({ ...params, salesFollowupHours: val })}
              />

              {/* Lever 3: Opportunity Win Rate */}
              <Slider
                label="Opportunity-to-Close Win Rate"
                min={12}
                max={32}
                step={0.5}
                value={params.opportunityWinRate}
                baseline={BASELINE_SIMULATOR.opportunityWinRate}
                unit="%"
                onChange={(val) => setParams({ ...params, opportunityWinRate: val })}
              />

              {/* Lever 4: Average Deal Size (ACV) */}
              <Slider
                label="Average Contract Value (ACV)"
                min={30000}
                max={95000}
                step={1000}
                value={params.averageDealSize}
                baseline={BASELINE_SIMULATOR.averageDealSize}
                prefix="$"
                onChange={(val) => setParams({ ...params, averageDealSize: val })}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Projected Real-Time Financial Uplift Output (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Executive Projected ROI Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Projected Net ARR Uplift */}
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 p-4 dark:border-indigo-900/60 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/20 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Projected ARR Uplift
              </span>
              <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                +{formatCurrency(arrUplift, true)}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Total ARR: {formatCurrency(simulatedArr, true)} (+
                {((arrUplift / baselineArr) * 100).toFixed(1)}%)
              </p>
            </div>

            {/* Additional Deals Won */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-4 dark:border-emerald-900/60 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/20 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Additional Won Deals
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                +{additionalDeals} Deals
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {simulatedDeals} Total Closed-Won (+
                {((additionalDeals / baselineDeals) * 100).toFixed(0)}%)
              </p>
            </div>

            {/* CAC Reduction */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Blended CAC Reduction
              </span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
                -${cacReduction.toFixed(0)}
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                New CAC: ${simulatedCac.toFixed(0)} / deal
              </p>
            </div>
          </div>

          {/* Side-by-Side Visual Comparison Chart */}
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Baseline vs. Simulated Performance Projection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                    <XAxis dataKey="metric" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900/95 text-xs space-y-1">
                              <div className="font-semibold text-slate-900 dark:text-white">{label}</div>
                              <div className="text-slate-500 font-mono">
                                Baseline: {payload[0]?.value}
                              </div>
                              <div className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                                Simulated: {payload[1]?.value}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Simulated" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Execution Action Footer */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Calculated against current pipeline inflow of 3,420 monthly leads.
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      onAskAi(
                        `How can our revenue team achieve +$${(arrUplift / 1_000_000).toFixed(
                          2
                        )}M ARR uplift by improving qualification rate to ${params.mqlToSqlRate}% and reducing follow-up time to ${
                          params.salesFollowupHours
                        } hours?`
                      )
                    }
                    className="text-xs h-8"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-purple-500 mr-1" />
                    Review with AI
                  </Button>

                  <Button
                    variant="glow"
                    size="sm"
                    onClick={handleApplyPlan}
                    className="text-xs h-8 font-semibold"
                  >
                    {applied ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-300 mr-1" />
                        Target Applied!
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        Apply as Q4 Plan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
