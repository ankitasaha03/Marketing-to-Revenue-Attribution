"use client";

import * as React from "react";
import {
  Calendar,
  Globe2,
  Filter,
  Users2,
  Sparkles,
  Sun,
  Moon,
  Download,
  Activity,
  Layers,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectOption } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GlobalFilterState, DateRangeOption, ChannelOption, SegmentOption, RegionOption } from "@/lib/types";

interface TopNavbarProps {
  filters: GlobalFilterState;
  onFilterChange: (filters: GlobalFilterState) => void;
  onToggleChat: () => void;
  isChatOpen: boolean;
  onToggleSidebar?: () => void;
  onExportReport: () => void;
}

export function TopNavbar({
  filters,
  onFilterChange,
  onToggleChat,
  isChatOpen,
  onToggleSidebar,
  onExportReport,
}: TopNavbarProps) {
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    // Default to dark mode for sleek SaaS look
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const dateOptions: SelectOption[] = [
    { value: "30d", label: "Last 30 Days" },
    { value: "q3_2026", label: "Q3 2026" },
    { value: "ytd", label: "Year-to-Date" },
    { value: "12m", label: "Trailing 12 Months" },
  ];

  const channelOptions: SelectOption[] = [
    { value: "all", label: "All Channels (Blended)" },
    { value: "paid_search", label: "Paid Search (Google)" },
    { value: "linkedin", label: "LinkedIn Ads (Paid)" },
    { value: "content_seo", label: "Content Marketing / SEO" },
    { value: "outbound", label: "Outbound SDR" },
    { value: "organic_social", label: "Organic Social & Direct" },
  ];

  const segmentOptions: SelectOption[] = [
    { value: "all", label: "All Segments" },
    { value: "enterprise", label: "Enterprise ($100k+)" },
    { value: "mid_market", label: "Mid-Market ($25k-$100k)" },
    { value: "smb", label: "SMB (<$25k)" },
    { value: "growth", label: "Growth Startups" },
  ];

  const regionOptions: SelectOption[] = [
    { value: "global", label: "Global (All Regions)" },
    { value: "na", label: "North America (AMER)" },
    { value: "emea", label: "Europe & MEA" },
    { value: "apac", label: "Asia-Pacific" },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 sm:px-6 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 transition-colors">
      {/* Left: Mobile Menu & Platform Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>AI Realtime Engine Active</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <Activity className="h-3 w-3 text-indigo-500" />
            <span>18ms latency</span>
          </div>
        </div>
      </div>

      {/* Middle: Active Global Filters */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-[55vw]">
        {/* Date Filter */}
        <Select
          value={filters.dateRange}
          onValueChange={(val) => onFilterChange({ ...filters, dateRange: val as DateRangeOption })}
          options={dateOptions}
          icon={<Calendar className="h-3.5 w-3.5 text-indigo-500" />}
        />

        {/* Channel Filter */}
        <Select
          value={filters.channel}
          onValueChange={(val) => onFilterChange({ ...filters, channel: val as ChannelOption })}
          options={channelOptions}
          icon={<Filter className="h-3.5 w-3.5 text-purple-500" />}
          className="hidden md:inline-block"
        />

        {/* Segment Filter */}
        <Select
          value={filters.segment}
          onValueChange={(val) => onFilterChange({ ...filters, segment: val as SegmentOption })}
          options={segmentOptions}
          icon={<Users2 className="h-3.5 w-3.5 text-sky-500" />}
          className="hidden lg:inline-block"
        />

        {/* Region Filter */}
        <Select
          value={filters.region}
          onValueChange={(val) => onFilterChange({ ...filters, region: val as RegionOption })}
          options={regionOptions}
          icon={<Globe2 className="h-3.5 w-3.5 text-emerald-500" />}
          className="hidden xl:inline-block"
        />
      </div>

      {/* Right: Actions, Theme Toggle, AI Drawer Trigger */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExportReport}
          className="hidden sm:inline-flex text-xs h-8"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export Audit</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-8 w-8 text-slate-600 dark:text-slate-300"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </Button>

        {/* AI Chatbot Assistant Toggle Button */}
        <Button
          variant="glow"
          size="sm"
          onClick={onToggleChat}
          className="h-8 text-xs font-semibold gap-1.5 px-3 relative"
        >
          <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
          <span className="hidden sm:inline">Ask AI Assistant</span>
          <span className="sm:hidden">AI</span>
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
          </span>
        </Button>
      </div>
    </header>
  );
}
