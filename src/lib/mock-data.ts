import {
  GlobalFilterState,
  FunnelStageData,
  KpiCardData,
  AttributionItem,
  AnomalyDiagnostic,
  SimulatorState,
} from "./types";

export const BASELINE_SIMULATOR: SimulatorState = {
  mqlToSqlRate: 14.8, // 14.8%
  salesFollowupHours: 42, // 42h
  opportunityWinRate: 16.6, // 16.6%
  averageDealSize: 57400, // $57,400
};

export const INITIAL_FILTERS: GlobalFilterState = {
  dateRange: "30d",
  channel: "all",
  segment: "all",
  region: "global",
};

export const FUNNEL_STAGES: FunnelStageData[] = [
  {
    id: "impressions",
    name: "Ad Impressions",
    count: 4250000,
    conversionRate: 1.0,
    benchmarkRate: 1.0,
    avgTimeInStageDays: 0.05,
    revenueLeaked: 0,
    costBasis: 245800,
    healthStatus: "healthy",
    dropOffVolume: 4082000,
  },
  {
    id: "clicks",
    name: "Qualified Clicks",
    count: 168000,
    conversionRate: 0.0395, // 3.95% CTR
    benchmarkRate: 0.032,
    avgTimeInStageDays: 0.1,
    revenueLeaked: 142000,
    costBasis: 245800,
    healthStatus: "healthy",
    dropOffVolume: 164580,
  },
  {
    id: "mqls",
    name: "Marketing Leads (MQL)",
    count: 3420,
    conversionRate: 0.0204, // 2.04% CVR
    benchmarkRate: 0.018,
    avgTimeInStageDays: 4.2,
    revenueLeaked: 420000,
    costBasis: 245800,
    healthStatus: "warning",
    keyBottleneckReason: "Lead volume inflated by low-intent eBook downloads from paid social.",
    dropOffVolume: 2914,
  },
  {
    id: "sqls",
    name: "Sales Opps (SQL)",
    count: 506,
    conversionRate: 0.148, // 14.8% vs benchmark 28.0%
    benchmarkRate: 0.28,
    avgTimeInStageDays: 12.4,
    revenueLeaked: 1240000,
    costBasis: 185000,
    healthStatus: "critical",
    keyBottleneckReason: "Critical leak: Avg SDR response time is 42.6 hours. 68% of drop-offs go cold before first touch.",
    dropOffVolume: 422,
  },
  {
    id: "deals",
    name: "Closed-Won Deals",
    count: 84,
    conversionRate: 0.166, // 16.6% win rate
    benchmarkRate: 0.24,
    avgTimeInStageDays: 38.5,
    revenueLeaked: 520000,
    costBasis: 125000,
    healthStatus: "warning",
    keyBottleneckReason: "Mid-Market evaluation delays; 42% lost at legal/procurement due to annual payment rigidity.",
    dropOffVolume: 12,
  },
  {
    id: "expansion",
    name: "Expanded Accounts",
    count: 72,
    conversionRate: 0.857,
    benchmarkRate: 0.82,
    avgTimeInStageDays: 90.0,
    revenueLeaked: 0,
    costBasis: 45000,
    healthStatus: "healthy",
    dropOffVolume: 12,
  },
];

export const KPI_OVERVIEW: KpiCardData[] = [
  {
    id: "impressions_spend",
    title: "Impressions & Ad Spend",
    value: "$245,800",
    numericValue: 245800,
    subtitle: "4.25M Imp • $57.80 CPM",
    trend: 14.2,
    trendDirection: "up",
    isPositive: true,
    benchmark: "Budget on track",
    health: "good",
    category: "acquisition",
  },
  {
    id: "mqls_cpl",
    title: "Qualified Leads (MQLs)",
    value: "3,420",
    numericValue: 3420,
    subtitle: "Cost per Lead: $71.87",
    trend: 22.4,
    trendDirection: "up",
    isPositive: true,
    benchmark: "Target: 2,800 MQLs (+22%)",
    health: "good",
    category: "qualification",
  },
  {
    id: "mql_sql_cvr",
    title: "MQL → SQL Conversion Rate",
    value: "14.8%",
    numericValue: 0.148,
    subtitle: "Benchmark: 28.0% (-47% gap)",
    trend: -8.6,
    trendDirection: "down",
    isPositive: false,
    benchmark: "Critical Revenue Leak",
    health: "critical",
    category: "qualification",
  },
  {
    id: "won_deals_cac",
    title: "Closed-Won Deals & CAC",
    value: "84 Deals",
    numericValue: 84,
    subtitle: "Blended CAC: $2,926 / deal",
    trend: 3.7,
    trendDirection: "up",
    isPositive: false,
    benchmark: "CAC target: $2,400",
    health: "warning",
    category: "conversion",
  },
  {
    id: "realized_vs_leaked",
    title: "Realized ARR vs Leakage",
    value: "$4.82M",
    numericValue: 4820000,
    subtitle: "Revenue Leaked: $2.18M (31.1%)",
    trend: -12.4,
    trendDirection: "down",
    isPositive: false,
    benchmark: "Potential ARR: $7.00M",
    health: "critical",
    category: "revenue",
  },
];

export const ATTRIBUTION_DATA: AttributionItem[] = [
  {
    channel: "Paid Search (Google)",
    firstTouch: 32,
    lastTouch: 41,
    linear: 36,
    wShaped: 38,
    spend: 98000,
    cpl: 82.5,
    mqlVolume: 1188,
    sqlsGenerated: 242,
    wonDeals: 41,
    revenue: 2353400,
    velocityDays: 28,
    qualityScore: 88,
    cac: 2390,
    roas: 24.0,
  },
  {
    channel: "LinkedIn Ads",
    firstTouch: 38,
    lastTouch: 11,
    linear: 24,
    wShaped: 21,
    spend: 86000,
    cpl: 64.2,
    mqlVolume: 1340,
    sqlsGenerated: 98,
    wonDeals: 12,
    revenue: 688800,
    velocityDays: 54,
    qualityScore: 42,
    cac: 7166,
    roas: 8.0,
  },
  {
    channel: "Content Marketing / SEO",
    firstTouch: 16,
    lastTouch: 22,
    linear: 19,
    wShaped: 21,
    spend: 26000,
    cpl: 54.0,
    mqlVolume: 481,
    sqlsGenerated: 94,
    wonDeals: 18,
    revenue: 1033200,
    velocityDays: 32,
    qualityScore: 84,
    cac: 1444,
    roas: 39.7,
  },
  {
    channel: "Outbound SDR",
    firstTouch: 8,
    lastTouch: 19,
    linear: 14,
    wShaped: 15,
    spend: 23000,
    cpl: 115.0,
    mqlVolume: 200,
    sqlsGenerated: 58,
    wonDeals: 11,
    revenue: 631400,
    velocityDays: 24,
    qualityScore: 92,
    cac: 2090,
    roas: 27.5,
  },
  {
    channel: "Organic Social & Direct",
    firstTouch: 6,
    lastTouch: 7,
    linear: 7,
    wShaped: 5,
    spend: 12800,
    cpl: 60.6,
    mqlVolume: 211,
    sqlsGenerated: 14,
    wonDeals: 2,
    revenue: 114800,
    velocityDays: 45,
    qualityScore: 56,
    cac: 6400,
    roas: 9.0,
  },
];

export const ANOMALIES_LIST: AnomalyDiagnostic[] = [
  {
    id: "diag-1",
    stage: "sqls",
    title: "Slow SDR Follow-up (>36 Hours) Bleeds $1.24M",
    severity: "critical",
    leakageValue: 1240000,
    affectedVolume: 1840,
    rootCause:
      "Leads contacted after 36 hours experience a 71% drop in SQL conversion. Current team median response time is 42.6 hours on inbound forms due to manual routing.",
    evidence:
      "When response time is <2 hours, MQL-to-SQL is 31.4%. When response time exceeds 24 hours, conversion plunges to 8.2%.",
    recommendation:
      "Deploy automated routing rules in HubSpot/Salesforce with Slack instant alert notifications to reduce initial outreach to <2 hours.",
    suggestedSimulatorValues: {
      salesVelocityHours: 4,
      mqlToSqlRate: 24.5,
    },
    metrics: [
      { label: "Median Response", value: "42.6 hrs", delta: "+38 hrs vs SLA", isGood: false },
      { label: "Conv. Rate (<2h)", value: "31.4%", isGood: true },
      { label: "Conv. Rate (>36h)", value: "7.9%", isGood: false },
      { label: "Lost Pipeline Value", value: "$1,240,000", isGood: false },
    ],
  },
  {
    id: "diag-2",
    stage: "mqls",
    title: "LinkedIn Ad Target Mismatch (Low ICP Fit)",
    severity: "critical",
    leakageValue: 640000,
    affectedVolume: 920,
    rootCause:
      "Sponsored content campaign 'Q3 Whitepaper' is optimized for downloads instead of buyer persona. 62% of leads are junior individual contributors with no buying authority.",
    evidence:
      "LinkedIn generates 38% of all MQLs ($86k spend) but only 12 closed deals (CAC $7,166 vs company target of $2,400).",
    recommendation:
      "Shift 40% of LinkedIn budget toward Account-Based Marketing (ABM) matched audience targeting VP+ engineering and finance titles.",
    suggestedSimulatorValues: {
      mqlToSqlRate: 19.5,
      winRate: 18.5,
    },
    metrics: [
      { label: "Total LinkedIn Spend", value: "$86,000" },
      { label: "ICP Fit Score", value: "31%", delta: "-49% vs search", isGood: false },
      { label: "Disqualified at Demo", value: "68.4%", isGood: false },
      { label: "CAC Disparity", value: "$7,166", delta: "+244% higher", isGood: false },
    ],
  },
  {
    id: "diag-3",
    stage: "deals",
    title: "Contract Payment Terms Friction at Procurement",
    severity: "high",
    leakageValue: 520000,
    affectedVolume: 24,
    rootCause:
      "Enterprise deals stall at negotiation because Acme insists on annual upfront invoicing, driving 38% of late-stage opportunities to cancel or postpone to next fiscal year.",
    evidence:
      "14 deals with combined ARR of $780k sat in 'Contract Sent' status for over 45 days before slipping.",
    recommendation:
      "Introduce flexible quarterly billing with a 6% APR financing incentive or automated credit-card billing for contracts under $60k.",
    suggestedSimulatorValues: {
      winRate: 22.0,
      dealSize: 61000,
    },
    metrics: [
      { label: "Deals Stalled in Legal", value: "14 Opps" },
      { label: "Avg Contract Delay", value: "48 days", isGood: false },
      { label: "Procurement Drop-off", value: "38.2%", isGood: false },
      { label: "Recoverable ARR", value: "$520,000", isGood: true },
    ],
  },
  {
    id: "diag-4",
    stage: "mqls",
    title: "Content Marketing Automated Nurture Black Hole",
    severity: "medium",
    leakageValue: 280000,
    affectedVolume: 480,
    rootCause:
      "Organic eBook & webinar registrants receive zero automated email touchpoints before SDR outreach 10 days later.",
    evidence:
      "Lead engagement drops 82% within 72 hours of download without a triggered email sequence.",
    recommendation:
      "Launch a 3-touch personalized nurture sequence highlighting customer ROI case studies within 15 minutes of asset download.",
    suggestedSimulatorValues: {
      mqlToSqlRate: 17.5,
    },
    metrics: [
      { label: "Unnurtured Leads", value: "480 Leads" },
      { label: "Avg Follow-up Delay", value: "9.8 days", isGood: false },
      { label: "Opt-out / Unopened", value: "74%", isGood: false },
      { label: "Potential Pipeline", value: "$280,000", isGood: true },
    ],
  },
];

export const FUNNEL_VELOCITY_DATA = [
  { name: "< 1 Hour", cvr: 34.2, leads: 320, dropOff: 12 },
  { name: "1 - 4 Hours", cvr: 29.8, leads: 480, dropOff: 18 },
  { name: "4 - 12 Hours", cvr: 21.5, leads: 640, dropOff: 35 },
  { name: "12 - 24 Hours", cvr: 14.1, leads: 820, dropOff: 58 },
  { name: "24 - 48 Hours", cvr: 8.5, leads: 610, dropOff: 72 },
  { name: "> 48 Hours", cvr: 4.8, leads: 550, dropOff: 86 },
];

export const COHORT_DATA = [
  { cohort: "May 2026", mqls: 2950, sqls: 472, cvr: "16.0%", cycle: "34d", arr: "$3.95M", status: "Closed" },
  { cohort: "Jun 2026", mqls: 3120, sqls: 485, cvr: "15.5%", cycle: "36d", arr: "$4.15M", status: "Closed" },
  { cohort: "Jul 2026", mqls: 3280, sqls: 502, cvr: "15.3%", cycle: "39d", arr: "$4.40M", status: "Closed" },
  { cohort: "Aug 2026", mqls: 3390, sqls: 495, cvr: "14.6%", cycle: "41d", arr: "$4.55M", status: "Closed" },
  { cohort: "Sep 2026", mqls: 3420, sqls: 506, cvr: "14.8%", cycle: "42d", arr: "$4.82M", status: "Active" },
  { cohort: "Oct (Proj)", mqls: 3650, sqls: 520, cvr: "14.2%", cycle: "44d", arr: "$5.10M", status: "Forecasting" },
];

export const PROMPT_CHIPS = [
  "Why is LinkedIn CPC high but conversion low?",
  "Summarize Q3 revenue drop-offs and root causes",
  "How can we improve MQL to SQL conversion by 15%?",
  "What is our projected ARR if sales follow-up drops to under 4 hours?",
  "Which channel produces the highest lifetime customer value?",
];
