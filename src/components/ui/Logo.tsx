import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-lg font-bold text-foreground", className)}>
      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand dark:bg-transparent">
        <span
          aria-hidden
          className="size-8 bg-brand-fg [mask:url(/brand/logo-mark.svg)_center/70%_no-repeat] dark:bg-brand dark:[mask-size:contain]"
        />
      </span>
      {site.name}
    </span>
  );
}
