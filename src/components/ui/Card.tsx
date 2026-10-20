import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export const cardClasses = "rounded-xl border border-border bg-surface";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn(cardClasses, "p-6", className)} {...props} />;
}
