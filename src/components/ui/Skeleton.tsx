import { cn } from "@/lib/cn";
import { uiText } from "@/content/ui";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div role="status" aria-label={uiText.loading} className={cn("animate-pulse rounded-xl bg-border/60", className)} />
  );
}
