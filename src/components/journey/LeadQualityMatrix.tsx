"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COHORT_DATA } from "@/lib/mock-data";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ArrowUpRight, TrendingUp, AlertCircle, ShieldAlert, Sparkles } from "lucide-react";

export function LeadQualityMatrix() {
  return (
    <div className="space-y-6">
      {/* 4-Quadrant Visual Matrix */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>Lead Quality vs. Revenue Velocity Matrix</span>
            <Badge variant="purple">Quadrant Intelligence</Badge>
          </CardTitle>
          <CardDescription>
            Categorization of channels based on lead volume generated versus downstream closed-won conversion velocity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quadrant 1: Growth Engines */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4" />
                  Growth Engines (High Vol • High Velocity)
                </span>
                <Badge variant="success" className="text-[10px]">
                  Scale Aggressively
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white p-3 shadow-xs dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Paid Search (Google High-Intent)
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      24.0x ROAS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    1,188 MQLs → 41 Won Deals • Avg Cycle 28 days • CAC $2,390. Highest deal velocity.
                  </p>
                </div>
              </div>
            </div>

            {/* Quadrant 2: Budget Leak / Sinkholes */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 dark:border-rose-900/60 dark:bg-rose-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  Leakage Trap (High Vol • Low Velocity)
                </span>
                <Badge variant="destructive" className="text-[10px]">
                  Primary Bottleneck
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white p-3 shadow-xs dark:bg-slate-900 border border-rose-100 dark:border-rose-950">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      LinkedIn Sponsored InFeed
                    </span>
                    <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                      CAC $7,166
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    1,340 MQLs ($86k spend) but only 12 Won Deals. Cycle drags 54 days due to low ICP title match.
                  </p>
                </div>
              </div>
            </div>

            {/* Quadrant 3: High-Intent Hidden Gems */}
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  High-Intent Gems (Low Vol • High Velocity)
                </span>
                <Badge variant="purple" className="text-[10px]">
                  Expand Inbound
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white p-3 shadow-xs dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Content Marketing / Technical SEO
                    </span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      39.7x ROAS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    481 MQLs → 18 Won Deals ($1.03M ARR). Blended CAC only $1,444 with high product adoption.
                  </p>
                </div>
              </div>
            </div>

            {/* Quadrant 4: Targeted Outbound */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ArrowUpRight className="h-4 w-4" />
                  Targeted Outbound (High ACV Potential)
                </span>
                <Badge variant="secondary" className="text-[10px]">
                  ABM Pilot
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white p-3 shadow-xs dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Outbound SDR Dedicated Sequences
                    </span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      Cycle 24d
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Fastest deal velocity (24 days) with 92% ICP match score. Needs SDR headcount expansion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Cohort Conversion Velocity Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Monthly Cohort Lead-to-Revenue Maturation
          </CardTitle>
          <CardDescription>
            Trailing monthly cohorts demonstrating volume expansion vs declining conversion rate and elongating sales cycle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cohort Period</TableHead>
                <TableHead>MQL Inflow</TableHead>
                <TableHead>SQLs Created</TableHead>
                <TableHead>MQL → SQL CVR</TableHead>
                <TableHead>Avg Sales Cycle</TableHead>
                <TableHead>Generated ARR</TableHead>
                <TableHead>Cohort Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COHORT_DATA.map((c) => (
                <TableRow key={c.cohort}>
                  <TableCell className="font-semibold text-slate-900 dark:text-slate-100">
                    {c.cohort}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{c.mqls}</TableCell>
                  <TableCell className="font-mono text-xs font-semibold">{c.sqls}</TableCell>
                  <TableCell
                    className={`font-mono text-xs font-semibold ${
                      parseFloat(c.cvr) < 15
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {c.cvr}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{c.cycle}</TableCell>
                  <TableCell className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {c.arr}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        c.status === "Active"
                          ? "default"
                          : c.status === "Forecasting"
                          ? "purple"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
