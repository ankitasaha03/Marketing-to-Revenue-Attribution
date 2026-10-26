"use client";

import * as React from "react";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { Sidebar, NavTabId } from "@/components/layout/Sidebar";
import { KpiOverview } from "@/components/dashboard/KpiOverview";
import { FunnelVisual } from "@/components/funnel/FunnelVisual";
import { FunnelVelocityChart } from "@/components/funnel/FunnelVelocityChart";
import { MultiTouchAttribution } from "@/components/journey/MultiTouchAttribution";
import { LeadQualityMatrix } from "@/components/journey/LeadQualityMatrix";
import { LeakageDiagnostics } from "@/components/diagnostics/LeakageDiagnostics";
import { ScenarioSimulator } from "@/components/simulator/ScenarioSimulator";
import { FunnelAIChatbot } from "@/components/ai-chat/FunnelAIChatbot";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GlobalFilterState,
  FunnelStageId,
  SimulatorState,
  AnomalyDiagnostic,
} from "@/lib/types";
import {
  INITIAL_FILTERS,
  KPI_OVERVIEW,
  FUNNEL_STAGES,
  ANOMALIES_LIST,
  BASELINE_SIMULATOR,
} from "@/lib/mock-data";
import { Sparkles, Layers, CheckCircle2, TrendingUp, AlertTriangle, FileSpreadsheet } from "lucide-react";

export default function FunnelPulseApp() {
  const [filters, setFilters] = React.useState<GlobalFilterState>(INITIAL_FILTERS);
  const [activeTab, setActiveTab] = React.useState<NavTabId>("dashboard");
  const [selectedStageId, setSelectedStageId] = React.useState<FunnelStageId | null>(null);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [simulatorParams, setSimulatorParams] = React.useState<Partial<SimulatorState>>({});
  const [externalAiPrompt, setExternalAiPrompt] = React.useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = React.useState(false);

  // Dynamic KPI adjustments based on filters
  const dynamicKpis = React.useMemo(() => {
    // Returns modified mock figures based on date range or channel selection to feel live
    if (filters.channel === "linkedin") {
      return KPI_OVERVIEW.map((kpi) => {
        if (kpi.id === "impressions_spend") return { ...kpi, value: "$86,000", subtitle: "1.34M Imp • $64.20 CPL" };
        if (kpi.id === "mqls_cpl") return { ...kpi, value: "1,340", subtitle: "High Vol • 31% ICP Match" };
        if (kpi.id === "mql_sql_cvr") return { ...kpi, value: "7.3%", subtitle: "-74% vs Benchmark Gap" };
        if (kpi.id === "won_deals_cac") return { ...kpi, value: "12 Deals", subtitle: "CAC: $7,166 / deal" };
        if (kpi.id === "realized_vs_leaked") return { ...kpi, value: "$688k", subtitle: "Leaked: $640k" };
        return kpi;
      });
    }
    if (filters.channel === "paid_search") {
      return KPI_OVERVIEW.map((kpi) => {
        if (kpi.id === "impressions_spend") return { ...kpi, value: "$98,000", subtitle: "1.85M Imp • $82.50 CPL" };
        if (kpi.id === "mqls_cpl") return { ...kpi, value: "1,188", subtitle: "High Intent • 88% Quality" };
        if (kpi.id === "mql_sql_cvr") return { ...kpi, value: "20.4%", subtitle: "Strong Conversion" };
        if (kpi.id === "won_deals_cac") return { ...kpi, value: "41 Deals", subtitle: "CAC: $2,390 / deal" };
        if (kpi.id === "realized_vs_leaked") return { ...kpi, value: "$2.35M", subtitle: "ROAS: 24.0x" };
        return kpi;
      });
    }
    return KPI_OVERVIEW;
  }, [filters]);

  const handleSimulateFix = (anomaly: AnomalyDiagnostic) => {
    if (anomaly.suggestedSimulatorValues) {
      setSimulatorParams(anomaly.suggestedSimulatorValues);
    }
    setActiveTab("simulator");
  };

  const handleSimulateStageFix = (stageId: FunnelStageId) => {
    if (stageId === "sqls") {
      setSimulatorParams({ salesFollowupHours: 4, mqlToSqlRate: 24.5 });
    } else if (stageId === "deals") {
      setSimulatorParams({ opportunityWinRate: 22.0, averageDealSize: 62000 });
    }
    setActiveTab("simulator");
  };

  const handleAskAi = (prompt: string) => {
    setExternalAiPrompt(prompt);
    setIsChatOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        anomalyCount={ANOMALIES_LIST.length}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar with Global Filters */}
        <TopNavbar
          filters={filters}
          onFilterChange={setFilters}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
          isChatOpen={isChatOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onExportReport={() => setIsExportModalOpen(true)}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Welcome & Context Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {activeTab === "dashboard" && "Executive Funnel Overview & Value Leakage"}
                  {activeTab === "journey" && "Multi-Touch Customer Journey & Attribution"}
                  {activeTab === "diagnostics" && "AI Root-Cause Leakage Diagnostics"}
                  {activeTab === "simulator" && "What-If Scenario Revenue Uplift Engine"}
                </h1>
                <Badge variant="purple" className="text-[10px] hidden sm:inline-flex">
                  Active Filter: {filters.dateRange.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {activeTab === "dashboard" &&
                  "Observing high lead generation (3,420 MQLs) vs low revenue growth. Pinpoint where deals stall and value drops."}
                {activeTab === "journey" &&
                  "Trace user interactions from initial brand discovery across channels to pipeline velocity and Closed-Won ARR."}
                {activeTab === "diagnostics" &&
                  "Algorithmic anomaly detection isolating response latency, lead quality mismatch, and contract friction."}
                {activeTab === "simulator" &&
                  "Tune qualification rates and response velocity to project exact ARR uplift, new deals, and CAC savings."}
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => handleAskAi("Summarize current funnel leaks and provide executive recommendations")}
                className="text-xs h-8"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI Funnel Audit
              </Button>
            </div>
          </div>

          {/* TAB 1: DASHBOARD (Overview & Funnel Health) */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Executive KPI Overview Cards */}
              <KpiOverview
                kpis={dynamicKpis}
                onSelectKpi={(id) => {
                  if (id === "mql_sql_cvr" || id === "realized_vs_leaked") {
                    setSelectedStageId("sqls");
                  }
                }}
              />

              {/* Full-Funnel Stage-by-Stage Breakdown */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900/90 shadow-sm">
                <FunnelVisual
                  stages={FUNNEL_STAGES}
                  selectedStageId={selectedStageId}
                  onSelectStage={setSelectedStageId}
                  onSimulateStageFix={handleSimulateStageFix}
                />
              </div>

              {/* Velocity Decay Chart */}
              <FunnelVelocityChart />
            </div>
          )}

          {/* TAB 2: JOURNEY TRACE (Cohort & Multi-Touch Attribution) */}
          {activeTab === "journey" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <MultiTouchAttribution />
              <LeadQualityMatrix />
            </div>
          )}

          {/* TAB 3: LEAKAGE DIAGNOSTICS (AI Root Cause Analysis) */}
          {activeTab === "diagnostics" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <LeakageDiagnostics
                onSimulateFix={handleSimulateFix}
                onAskAi={handleAskAi}
                selectedStageId={selectedStageId}
              />
            </div>
          )}

          {/* TAB 4: SCENARIO SIMULATOR (What-If Optimization) */}
          {activeTab === "simulator" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <ScenarioSimulator initialState={simulatorParams} onAskAi={handleAskAi} />
            </div>
          )}
        </main>
      </div>

      {/* Contextual AI Assistant Drawer */}
      <FunnelAIChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        filters={filters}
        selectedStageId={selectedStageId}
        onApplySimulatorState={(st) => {
          setSimulatorParams(st);
          setActiveTab("simulator");
        }}
        onSelectStage={(st) => {
          setSelectedStageId(st);
          setActiveTab("dashboard");
        }}
        externalPrompt={externalAiPrompt}
        onClearExternalPrompt={() => setExternalAiPrompt(null)}
      />

      {/* Export Audit Report Modal */}
      {isExportModalOpen && (
        <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
          <DialogContent className="max-w-md" onClose={() => setIsExportModalOpen(false)}>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="purple">Executive Report</Badge>
                <span className="text-xs text-slate-400 font-mono">PDF & CSV EXPORT</span>
              </div>
              <DialogTitle>Export FunnelPulse Revenue Audit</DialogTitle>
              <DialogDescription>
                Download a board-ready executive report with multi-touch attribution, root-cause leakage diagnosis, and Q4 recovery projections.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800 space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Scope: Full Pipeline Telemetry</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {filters.dateRange.toUpperCase()}
                  </Badge>
                </div>
                <div>• Total Identified Revenue Leakage: $2.18M</div>
                <div>• Primary Bottleneck: MQL → SQL Stage (42h SDR latency)</div>
                <div>• Recommended Budget Reallocation: LinkedIn → Paid Search / ABM</div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setIsExportModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="glow"
                size="sm"
                onClick={() => {
                  window.print();
                  setIsExportModalOpen(false);
                }}
              >
                Generate PDF Memo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
