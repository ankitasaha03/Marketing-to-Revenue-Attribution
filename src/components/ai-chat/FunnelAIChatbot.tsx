"use client";

import * as React from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Zap,
  TrendingDown,
  ChevronRight,
  Sliders,
  RotateCcw,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChatMessage, GlobalFilterState, FunnelStageId } from "@/lib/types";
import { PROMPT_CHIPS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface FunnelAIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  filters: GlobalFilterState;
  selectedStageId: FunnelStageId | null;
  onApplySimulatorState?: (state: any) => void;
  onSelectStage?: (stageId: FunnelStageId) => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

export function FunnelAIChatbot({
  isOpen,
  onClose,
  filters,
  selectedStageId,
  onApplySimulatorState,
  onSelectStage,
  externalPrompt,
  onClearExternalPrompt,
}: FunnelAIChatbotProps) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "ai",
      timestamp: "Just now",
      text: "👋 Hello! I am your **FunnelPulse AI Revenue Analyst**. I have indexed your full customer journey telemetry.\n\n⚠️ **Critical Finding:** Management's concern is verified—while top-of-funnel MQLs surged **+22.4%**, your **MQL → SQL conversion is only 14.8%** (vs 28.0% benchmark). Over **$1.24M in revenue is leaking** primarily due to slow SDR initial outreach (>36h) and low ICP qualification from LinkedIn paid social.\n\nHow can I help you diagnose or optimize your funnel today?",
      metricsBadges: [
        { label: "MQL Inflow", value: "3,420 (+22%)", type: "neutral" },
        { label: "MQL→SQL Gap", value: "14.8% (-47% vs bm)", type: "alert" },
        { label: "Est. Leaked ARR", value: "$2.18M", type: "alert" },
      ],
      suggestedAction: {
        type: "filter_stage",
        label: "Inspect SQL Stage Bottleneck",
        payload: "sqls",
      },
    },
  ]);

  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle external prompt injection from buttons
  React.useEffect(() => {
    if (externalPrompt) {
      handleSendPrompt(externalPrompt);
      onClearExternalPrompt?.();
    }
  }, [externalPrompt]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: promptText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI contextual analytical inference
    setTimeout(() => {
      const aiResponse = generateContextualResponse(promptText, filters, selectedStageId);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 850);
  };

  const generateContextualResponse = (
    prompt: string,
    currentFilters: GlobalFilterState,
    stageFocus: FunnelStageId | null
  ): ChatMessage => {
    const p = prompt.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (p.includes("linkedin") || p.includes("cpc")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: time,
        text: `### LinkedIn Performance Root-Cause Analysis\n\nWhile LinkedIn generated **1,340 MQLs** at an apparent bargain **$64.20 CPL**, downstream data reveals a severe quality trap:\n\n1. **ICP Title Mismatch:** 68% of downloaders are junior ICs or non-decision makers without procurement authority.\n2. **Downstream Conversion:** Only **12 closed deals** resulting in a Blended CAC of **$7,166**—nearly **3x higher** than company targets.\n3. **Comparison:** Paid Search produced 41 deals at $2,390 CAC, while Content Marketing yielded an astonishing 39.7x ROAS.\n\n**Prescriptive Recommendation:** Shift $35,000 of monthly LinkedIn budget into account-matched ABM targeting VP+ roles and expand high-intent Paid Search keywords.`,
        metricsBadges: [
          { label: "LinkedIn CAC", value: "$7,166", type: "alert" },
          { label: "Search CAC", value: "$2,390", type: "success" },
          { label: "Disqualification", value: "68.4%", type: "alert" },
        ],
        suggestedAction: {
          type: "simulate",
          label: "Simulate ABM Reallocation (+ $640k ARR)",
          payload: { mqlToSqlRate: 20.0, winRate: 19.0 },
        },
      };
    }

    if (p.includes("follow-up") || p.includes("4 hours") || p.includes("sdr")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: time,
        text: `### Response Latency Modeling (Target: < 4 Hours)\n\nTelemetry establishes a near-linear decay in lead willingness to book a sales demo as time elapses:\n\n- **< 1 Hour Contact:** 34.2% qualification rate\n- **1 to 4 Hours Contact:** 29.8% qualification rate\n- **Current Reality (42.6h):** 7.9% qualification rate\n\nIf SDR response latency is compressed to **under 4 hours**, modeled qualification increases from **14.8% to 24.5%**, converting approximately **330 additional SQLs** and **+$1.24M in recovered ARR** without increasing marketing ad spend!`,
        metricsBadges: [
          { label: "Current Response", value: "42.6 hrs", type: "alert" },
          { label: "Projected Uplift", value: "+$1.24M ARR", type: "success" },
          { label: "Additional SQLs", value: "+330", type: "success" },
        ],
        suggestedAction: {
          type: "simulate",
          label: "Apply <4h Follow-up SLA in Simulator",
          payload: { salesFollowupHours: 4, mqlToSqlRate: 24.5 },
        },
      };
    }

    if (p.includes("q3") || p.includes("drop-off") || p.includes("summarize")) {
      return {
        id: `ai-${Date.now()}`,
        sender: "ai",
        timestamp: time,
        text: `### Executive Q3 Revenue Leakage Audit\n\nOut of **$7.00M in potential pipeline ARR**, the company only captured **$4.82M**, leaking **$2.18M (31.1%)** across three core stages:\n\n- **Leak 1 (Stage: SQL - $1.24M):** 42-hour median sales response time on inbound forms causes 68% of warm leads to go unresponsive.\n- **Leak 2 (Stage: MQL - $640k):** Influx of unqualified LinkedIn eBook downloads skewing lead metrics without pipeline value.\n- **Leak 3 (Stage: Won Deals - $520k):** Rigid annual upfront payment terms causing late-stage deal abandonment in procurement.\n\n**Action Plan:** Automating inbound routing, tightening ICP matching, and offering quarterly terms will recapture over **$1.85M ARR** in Q4.`,
        metricsBadges: [
          { label: "Realized ARR", value: "$4.82M", type: "neutral" },
          { label: "Leaked ARR", value: "$2.18M (31%)", type: "alert" },
          { label: "Recapture Potential", value: "$1.85M", type: "success" },
        ],
        suggestedAction: {
          type: "simulate",
          label: "Load Q4 Revenue Recovery Plan",
          payload: { mqlToSqlRate: 22.0, salesFollowupHours: 4, opportunityWinRate: 20.0 },
        },
      };
    }

    // Default intelligent response
    return {
      id: `ai-${Date.now()}`,
      sender: "ai",
      timestamp: time,
      text: `### Strategic Analysis for "${prompt}"\n\nAnalyzing active parameters (${currentFilters.dateRange.toUpperCase()} • Channel: ${currentFilters.channel} • Segment: ${currentFilters.segment}):\n\n1. **Core Observation:** Top-of-funnel spend is healthy and efficient ($71.87 CPL), but mid-funnel transition efficiency is 47% below benchmark.\n2. **Fastest Lever:** Every 5% gain in MQL-to-SQL qualification generates **$420,000 in incremental ARR** with zero additional ad dollars required.\n3. **Recommended Immediate Action:** Implement round-robin Slack notifications for SDRs to achieve sub-2-hour first touch on Tier-1 enterprise leads.`,
      metricsBadges: [
        { label: "Incremental ARR / 5%", value: "+$420k", type: "success" },
        { label: "Target Qualification", value: "24.0%", type: "neutral" },
      ],
      suggestedAction: {
        type: "simulate",
        label: "Simulate +5% Qualification Gain",
        payload: { mqlToSqlRate: 19.8 },
      },
    };
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200/90 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-800/90 dark:bg-slate-950/95 animate-in slide-in-from-right duration-250">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-slate-200/80 px-4 dark:border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-sm text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                FunnelPulse AI Assistant
              </span>
              <span className="rounded bg-emerald-500/10 px-1 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                Online
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Context-Aware Revenue Intelligence
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Close assistant"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              className={cn("flex flex-col space-y-1.5", isAi ? "items-start" : "items-end")}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1">
                {isAi ? <Bot className="h-3 w-3 text-indigo-500" /> : <User className="h-3 w-3" />}
                <span>{isAi ? "FunnelPulse AI" : "You"}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={cn(
                  "rounded-2xl p-3.5 text-xs leading-relaxed max-w-[92%]",
                  isAi
                    ? "border border-slate-200/80 bg-white text-slate-800 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    : "bg-indigo-600 text-white font-medium shadow-xs"
                )}
              >
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.text.split("\n\n").map((paragraph, i) => (
                    <p key={i}>
                      {paragraph.startsWith("###") ? (
                        <strong className="block text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {paragraph.replace("###", "").trim()}
                        </strong>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>

                {/* Metrics Badges if present */}
                {msg.metricsBadges && msg.metricsBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800">
                    {msg.metricsBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[10px] font-mono font-semibold",
                          badge.type === "alert"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300"
                            : badge.type === "success"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                        )}
                      >
                        {badge.label}: {badge.value}
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Action Button if present */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => {
                        if (msg.suggestedAction?.type === "simulate") {
                          onApplySimulatorState?.(msg.suggestedAction.payload);
                        } else if (msg.suggestedAction?.type === "filter_stage") {
                          onSelectStage?.(msg.suggestedAction.payload);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/80 dark:text-indigo-300 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
                    >
                      <Zap className="h-3 w-3 text-amber-500" />
                      <span>{msg.suggestedAction.label}</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-spin" />
            <span>Analyzing active telemetry and calculating models...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="border-t border-slate-200/60 bg-slate-50/70 p-2.5 dark:border-slate-800/60 dark:bg-slate-900/60">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 px-1">
          Suggested Inquiries
        </div>
        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
          {PROMPT_CHIPS.slice(0, 3).map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(chip)}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer truncate max-w-full"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-slate-200/80 p-3 dark:border-slate-800/80 bg-white dark:bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(input);
          }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about CAC, MQL leaks, or Q4 forecast..."
            className="text-xs h-9"
          />
          <Button type="submit" size="icon" variant="default" className="h-9 w-9 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </aside>
  );
}
