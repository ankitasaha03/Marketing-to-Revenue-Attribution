"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Award,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { KpiCardData } from "@/lib/types";
import { cn } from "@/lib/utils";

interface KpiOverviewProps {
  kpis: KpiCardData[];
  onSelectKpi?: (kpiId: string) => void;
}

export function KpiOverview({ kpis, onSelectKpi }: KpiOverviewProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "impressions_spend":
        return <DollarSign className="h-4 w-4 text-indigo-500" />;
      case "mqls_cpl":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "mql_sql_cvr":
        return <Target className="h-4 w-4 text-rose-500" />;
      case "won_deals_cac":
        return <Award className="h-4 w-4 text-emerald-500" />;
      case "realized_vs_leaked":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-indigo-500" />;
    }
  };

  const getBorderHighlight = (health: string) => {
    switch (health) {
      case "critical":
        return "border-rose-300/80 dark:border-rose-900/60 shadow-rose-500/5 hover:border-rose-400";
      case "warning":
        return "border-amber-300/80 dark:border-amber-900/60 hover:border-amber-400";
      case "good":
      case "excellent":
        return "border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-700";
      default:
        return "border-slate-200/80 dark:border-slate-800/80";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {kpis.map((kpi) => {
        const isCritical = kpi.health === "critical";
        return (
          <Card
            key={kpi.id}
            onClick={() => onSelectKpi?.(kpi.id)}
            className={cn(
              "relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              getBorderHighlight(kpi.health),
              isCritical && "bg-gradient-to-b from-rose-50/20 via-white to-white dark:from-rose-950/20 dark:via-slate-900 dark:to-slate-900"
            )}
          >
            {/* Top Accent Strip for Critical/Warning */}
            {isCritical && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />
            )}

            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                  {kpi.title}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  {getIcon(kpi.id)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
                    {kpi.value}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px]">
                  <span
                    className={cn(
                      "flex items-center font-semibold font-mono",
                      kpi.isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    )}
                  >
                    {kpi.trend > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                    )}
                    {kpi.trend > 0 ? "+" : ""}
                    {kpi.trend}%
                  </span>
                  <span className="text-slate-400 dark:text-slate-500 truncate">
                    vs prev month
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 truncate">
                  {kpi.subtitle}
                </span>
                {kpi.benchmark && (
                  <Badge
                    variant={
                      kpi.health === "critical"
                        ? "destructive"
                        : kpi.health === "warning"
                        ? "warning"
                        : "secondary"
                    }
                    className="text-[9px] px-1.5 py-0 h-4.5 font-medium shrink-0 ml-1"
                  >
                    {kpi.health === "critical" ? "Leak Alert" : kpi.benchmark}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
