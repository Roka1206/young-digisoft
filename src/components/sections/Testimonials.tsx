import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function Testimonials() {
  return (
    <section id="testimonios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
          Lo que dicen nuestros clientes
        </h2>
      </Reveal>

      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name + index} delay={index * 0.1} className="flex sm:h-full">
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
