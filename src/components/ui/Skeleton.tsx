import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={cn("animate-pulse rounded-xl bg-border/60", className)}
    />
  );
}
