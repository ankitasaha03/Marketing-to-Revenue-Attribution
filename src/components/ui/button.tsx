import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "glow" | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default:
        "bg-indigo-600 text-white shadow hover:bg-indigo-700 active:scale-[0.98] dark:bg-indigo-500 dark:hover:bg-indigo-600 focus-visible:ring-indigo-500",
      secondary:
        "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 active:scale-[0.98] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700/80 focus-visible:ring-slate-400",
      outline:
        "border border-slate-200 bg-transparent shadow-sm hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] dark:border-slate-800 dark:hover:bg-slate-800/60 dark:hover:text-slate-100 dark:text-slate-300 focus-visible:ring-slate-400",
      ghost:
        "hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] dark:hover:bg-slate-800/60 dark:hover:text-slate-100 dark:text-slate-300 focus-visible:ring-slate-400",
      destructive:
        "bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:scale-[0.98] dark:bg-rose-500/90 dark:hover:bg-rose-600 focus-visible:ring-rose-500",
      glow:
        "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-95 active:scale-[0.98] focus-visible:ring-purple-500",
      subtle:
        "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-900/50",
    };

    const sizes = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs font-medium",
      lg: "h-11 rounded-lg px-6 text-base font-medium",
      icon: "h-9 w-9 p-0 flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
