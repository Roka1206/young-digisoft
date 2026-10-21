import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
