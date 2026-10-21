import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-[13px]/5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
