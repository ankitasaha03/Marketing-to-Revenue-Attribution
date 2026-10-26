import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FunnelPulse AI | Full-Funnel Revenue Leakage & Multi-Touch Attribution",
  description:
    "AI-powered revenue leakage and customer journey analytics platform that traces user paths from campaign exposure through qualification, deal close, and expansion.",
  keywords: [
    "Revenue Leakage",
    "Customer Journey Analytics",
    "Multi-Touch Attribution",
    "Funnel Intelligence",
    "B2B SaaS Analytics",
    "MQL to SQL Conversion",
    "What-If Revenue Simulator",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-sans selection:bg-indigo-500/30 selection:text-indigo-400">
        {children}
      </body>
    </html>
  );
}
