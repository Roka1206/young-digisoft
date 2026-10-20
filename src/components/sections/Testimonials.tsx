import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function Testimonials() {
  return (
    <Section id="testimonios" title="Lo que dicen nuestros clientes">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name + index} delay={index * 0.1} className="flex sm:h-full">
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
