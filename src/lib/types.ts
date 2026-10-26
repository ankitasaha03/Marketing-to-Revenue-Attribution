export type DateRangeOption = "30d" | "q3_2026" | "ytd" | "12m";
export type ChannelOption = "all" | "paid_search" | "linkedin" | "content_seo" | "outbound" | "organic_social";
export type SegmentOption = "all" | "enterprise" | "mid_market" | "smb" | "growth";
export type RegionOption = "global" | "na" | "emea" | "apac";

export interface GlobalFilterState {
  dateRange: DateRangeOption;
  channel: ChannelOption;
  segment: SegmentOption;
  region: RegionOption;
}

export type FunnelStageId = "impressions" | "clicks" | "mqls" | "sqls" | "deals" | "expansion";

export interface FunnelStageData {
  id: FunnelStageId;
  name: string;
  count: number;
  conversionRate: number; // Conversion from previous stage (0 to 1)
  benchmarkRate: number; // Target or industry benchmark (0 to 1)
  avgTimeInStageDays: number; // Velocity in days
  revenueLeaked: number; // Dollar value lost due to drop-offs
  costBasis: number;
  healthStatus: "healthy" | "warning" | "critical";
  keyBottleneckReason?: string;
  dropOffVolume: number;
}

export interface KpiCardData {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  subtitle: string;
  trend: number; // percentage change, e.g. +14.2
  trendDirection: "up" | "down" | "neutral";
  isPositive: boolean;
  benchmark?: string;
  health: "excellent" | "good" | "warning" | "critical";
  category: "acquisition" | "qualification" | "conversion" | "revenue";
}

export interface AttributionItem {
  channel: string;
  firstTouch: number; // % or dollar
  lastTouch: number;
  linear: number;
  wShaped: number;
  spend: number;
  cpl: number;
  mqlVolume: number;
  sqlsGenerated: number;
  wonDeals: number;
  revenue: number;
  velocityDays: number;
  qualityScore: number; // 0 - 100
  cac: number;
  roas: number;
}

export interface AnomalyDiagnostic {
  id: string;
  stage: FunnelStageId;
  title: string;
  severity: "critical" | "high" | "medium";
  leakageValue: number;
  affectedVolume: number;
  rootCause: string;
  evidence: string;
  recommendation: string;
  suggestedSimulatorValues?: {
    mqlToSqlRate?: number;
    salesVelocityHours?: number;
    winRate?: number;
    dealSize?: number;
  };
  metrics: {
    label: string;
    value: string;
    delta?: string;
    isGood?: boolean;
  }[];
}

export interface SimulatorState {
  mqlToSqlRate: number; // e.g. 14.8 (%)
  salesFollowupHours: number; // e.g. 42 (hours)
  opportunityWinRate: number; // e.g. 16.6 (%)
  averageDealSize: number; // e.g. 57400 ($)
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  timestamp: string;
  text: string;
  suggestedAction?: {
    type: "simulate" | "filter_stage" | "view_diagnostic";
    label: string;
    payload?: any;
  };
  metricsBadges?: {
    label: string;
    value: string;
    type?: "alert" | "neutral" | "success";
  }[];
}
