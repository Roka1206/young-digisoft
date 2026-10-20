import { ChevronDown } from "lucide-react";
import type { FaqItem as FaqEntry } from "@/content/faq";
import { cn } from "@/lib/cn";
import { cardClasses } from "./Card";

export function FaqItem({ item }: { item: FaqEntry }) {
  return (
    <details className={cn(cardClasses, "group")}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl p-5 font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action [&::-webkit-details-marker]:hidden">
        {item.question}
        <ChevronDown aria-hidden className="size-5 shrink-0 text-action transition-transform group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-3 px-5 pb-5 leading-relaxed text-muted">
        {item.answer.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </details>
  );
}
