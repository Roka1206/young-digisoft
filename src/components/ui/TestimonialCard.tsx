import { Quote } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full w-[85vw] shrink-0 snap-center flex-col gap-4 rounded-2xl border border-border bg-surface p-6 sm:w-auto sm:shrink">
      <Quote className="text-brand" size={28} />
      <blockquote className="flex-1 text-sm text-foreground/90">
        “{testimonial.quote}”
      </blockquote>
      <figcaption>
        <p className="font-heading text-sm text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted">{testimonial.role}</p>
      </figcaption>
    </figure>
  );
}
