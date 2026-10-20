import { Quote } from "lucide-react";
import type { Testimonial } from "@/content/testimonials";
import { Card } from "./Card";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="w-[85vw] shrink-0 snap-center sm:w-auto sm:shrink">
      <figure className="flex h-full flex-col gap-4">
        <Quote className="text-action" size={28} />
        <blockquote className="flex-1 text-sm text-foreground/90">“{testimonial.quote}”</blockquote>
        <figcaption>
          <p className="font-medium text-sm text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </figcaption>
      </figure>
    </Card>
  );
}
