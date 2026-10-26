"use client";

import * as React from "react";
import {
  LayoutDashboard,
  GitFork,
  AlertTriangle,
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  Layers,
  Sparkles,
  Zap,
  Building2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export type NavTabId = "dashboard" | "journey" | "diagnostics" | "simulator";

interface SidebarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  isOpen: boolean;
  onClose: () => void;
  anomalyCount: number;
}

export function Sidebar({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
  anomalyCount,
}: SidebarProps) {
  const navItems = [
    {
      id: "dashboard" as NavTabId,
      label: "Dashboard",
      subtitle: "Overview & Funnel Health",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "journey" as NavTabId,
      label: "Journey Trace",
      subtitle: "Multi-Touch & Channels",
      icon: GitFork,
      badge: "5 Models",
    },
    {
      id: "diagnostics" as NavTabId,
      label: "Leakage Diagnostics",
      subtitle: "AI Root Cause Radar",
      icon: AlertTriangle,
      badge: `${anomalyCount} Critical`,
      badgeVariant: "destructive" as const,
    },
    {
      id: "simulator" as NavTabId,
      label: "Scenario Simulator",
      subtitle: "What-If Optimization",
      icon: SlidersHorizontal,
      badge: "Uplift AI",
      badgeVariant: "purple" as const,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col justify-between border-r border-slate-200/80 bg-white/95 px-4 py-5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-6">
          {/* Logo & App Brand */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-md shadow-indigo-500/25">
                <Layers className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                    FunnelPulse
                  </span>
                  <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Revenue Leakage Engine
                </p>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Analytics & Diagnostics
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    onClose();
                  }}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-150 cursor-pointer select-none",
                    isActive
                      ? "bg-indigo-50/80 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 shadow-sm border border-indigo-100 dark:border-indigo-900/50"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "rounded-lg p-1.5 transition-colors",
                        isActive
                          ? "bg-indigo-600 text-white dark:bg-indigo-500 shadow-sm"
                          : "bg-slate-100 text-slate-500 group-hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:text-slate-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-semibold leading-none">{item.label}</div>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <Badge variant={item.badgeVariant || "secondary"} className="text-[10px] px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Live Funnel Health Card */}
          <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/40 p-4 dark:border-rose-950/60 dark:from-rose-950/30 dark:via-slate-900/90 dark:to-amber-950/20 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400">
                <TrendingDown className="h-4 w-4" />
                <span>Funnel Health: At Risk</span>
              </div>
              <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                64 / 100
              </span>
            </div>

            <Progress value={64} className="h-1.5 mb-3 bg-rose-200/50 dark:bg-rose-950" indicatorClassName="bg-rose-500" />

            <div className="space-y-1.5 border-t border-rose-200/50 pt-2.5 text-xs dark:border-rose-900/40">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Realized ARR</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">$4.82M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Revenue Leaked</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">-$2.18M (31%)</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onTabChange("simulator");
                onClose();
              }}
              className="mt-3 w-full text-xs h-7.5 border-rose-300 dark:border-rose-900 text-rose-700 dark:text-rose-300 hover:bg-rose-100/70 dark:hover:bg-rose-950/50"
            >
              <Zap className="h-3 w-3 text-amber-500 mr-1" />
              Simulate Leakage Fix
            </Button>
          </div>
        </div>

        {/* Workspace Footer Profile */}
        <div className="border-t border-slate-200/80 pt-4 dark:border-slate-800/80">
          <div className="flex items-center justify-between rounded-xl p-2 hover:bg-slate-100/80 dark:hover:bg-slate-900/80 transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                AC
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  Acme Cloud SaaS
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  Enterprise Tier • Annual
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
