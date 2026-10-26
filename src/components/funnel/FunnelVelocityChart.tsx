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
  Cell,
  Line,
  ComposedChart,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FUNNEL_VELOCITY_DATA } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export function FunnelVelocityChart() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-80 flex items-center justify-center">
        <div className="text-xs text-slate-400">Loading velocity telemetry...</div>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
        <div>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span>SDR Response Velocity vs. MQL-to-SQL Conversion Decay</span>
            <Badge variant="destructive" className="text-[10px] font-mono">
              -71% Drop-off Rate
            </Badge>
          </CardTitle>
          <CardDescription>
            Telemetry correlation between initial sales touchpoint delay and lead qualification success.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" /> Lead Volume
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Conversion %
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FUNNEL_VELOCITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                unit="%"
              />
              <RechartsTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900/95 text-xs space-y-1">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          Response Window: {label}
                        </div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-mono">
                          Lead Inflow: {data.leads} leads
                        </div>
                        <div className="text-rose-600 dark:text-rose-400 font-mono font-semibold">
                          Qualification Rate: {data.cvr}%
                        </div>
                        <div className="text-slate-400 text-[10px]">
                          Drop-off Probability: {data.dropOff}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar yAxisId="left" dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cvr"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ r: 4, fill: "#f43f5e" }}
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600 dark:bg-slate-800/50 dark:text-slate-300 flex items-center justify-between">
          <span>
            💡 <strong>Key Finding:</strong> 42% of incoming MQLs wait &gt;24 hours for first contact, where conversion rate drops below 8.5%.
          </span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-medium shrink-0 ml-2">
            Target SLA: &lt; 2h
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
