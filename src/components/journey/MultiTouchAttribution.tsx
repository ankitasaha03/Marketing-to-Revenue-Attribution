"use client";

import * as React from "react";
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ATTRIBUTION_DATA } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

type ModelType = "wShaped" | "firstTouch" | "lastTouch" | "linear";

export function MultiTouchAttribution() {
  const [selectedModel, setSelectedModel] = React.useState<ModelType>("wShaped");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = ATTRIBUTION_DATA.map((item) => ({
    name: item.channel.split(" ")[0],
    fullName: item.channel,
    firstTouch: item.firstTouch,
    lastTouch: item.lastTouch,
    linear: item.linear,
    wShaped: item.wShaped,
    revenue: item.revenue,
    spend: item.spend,
    cac: item.cac,
  }));

  const modelDescriptions: Record<ModelType, string> = {
    wShaped:
      "W-Shaped Model assigns 40% to First Touch, 20% to Lead Qualification (MQL), and 40% to Opportunity Creation (SQL).",
    firstTouch:
      "First-Touch Model gives 100% credit to the initial brand discovery interaction (heavily favors Paid Social).",
    lastTouch:
      "Last-Touch Model attributes 100% of revenue to the final touchpoint prior to deal signature (favors Search & Direct).",
    linear:
      "Linear Model distributes equal credit across every touchpoint along the customer journey.",
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between pb-2 gap-3">
          <div>
            <CardTitle className="text-base font-semibold">
              Multi-Touch Attribution Revenue Comparison
            </CardTitle>
            <CardDescription>{modelDescriptions[selectedModel]}</CardDescription>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={() => setSelectedModel("wShaped")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                selectedModel === "wShaped"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              W-Shaped (Recommended)
            </button>
            <button
              onClick={() => setSelectedModel("firstTouch")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedModel === "firstTouch"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              First-Touch
            </button>
            <button
              onClick={() => setSelectedModel("lastTouch")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedModel === "lastTouch"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              Last-Touch
            </button>
            <button
              onClick={() => setSelectedModel("linear")}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedModel === "linear"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              Linear
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          {mounted ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900/95 text-xs space-y-1">
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {d.fullName}
                            </div>
                            <div className="text-indigo-600 dark:text-indigo-400 font-mono">
                              Attributed Credit: {d[selectedModel]}%
                            </div>
                            <div className="text-emerald-600 dark:text-emerald-400 font-mono">
                              Realized Revenue: {formatCurrency(d.revenue)}
                            </div>
                            <div className="text-slate-500 font-mono">
                              Channel CAC: {formatCurrency(d.cac)}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey={selectedModel}
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    name="Attributed Share (%)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-xs text-slate-400">
              Loading attribution chart...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deep-Dive Channel Attribution Performance Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Acquisition Channel Efficiency & Quality Matrix
          </CardTitle>
          <CardDescription>
            Comprehensive unit economics, lead quality scores, and return on ad spend (ROAS) across all touched channels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel Name</TableHead>
                <TableHead>Ad Spend</TableHead>
                <TableHead>MQL Volume</TableHead>
                <TableHead>Cost/Lead</TableHead>
                <TableHead>Won Deals</TableHead>
                <TableHead>Channel CAC</TableHead>
                <TableHead>Realized ARR</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>ROAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ATTRIBUTION_DATA.map((ch) => {
                const isLinkedIn = ch.channel.includes("LinkedIn");
                return (
                  <TableRow
                    key={ch.channel}
                    className={isLinkedIn ? "bg-rose-50/30 dark:bg-rose-950/20 border-rose-200" : ""}
                  >
                    <TableCell className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span>{ch.channel}</span>
                      {isLinkedIn && (
                        <Badge variant="destructive" className="text-[9px] px-1 py-0">
                          Low Velocity
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{formatCurrency(ch.spend)}</TableCell>
                    <TableCell className="font-mono text-xs">{formatNumber(ch.mqlVolume)}</TableCell>
                    <TableCell className="font-mono text-xs">${ch.cpl.toFixed(2)}</TableCell>
                    <TableCell className="font-mono text-xs font-semibold">{ch.wonDeals}</TableCell>
                    <TableCell
                      className={`font-mono text-xs font-semibold ${
                        ch.cac > 5000
                          ? "text-rose-600 dark:text-rose-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {formatCurrency(ch.cac)}
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {formatCurrency(ch.revenue)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs">{ch.qualityScore}</span>
                        <div className="h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className={`h-full ${
                              ch.qualityScore > 75
                                ? "bg-emerald-500"
                                : ch.qualityScore > 50
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${ch.qualityScore}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {ch.roas.toFixed(1)}x
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
