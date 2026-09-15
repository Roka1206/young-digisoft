import { services } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
          Nuestros servicios
        </h2>
        <p className="mt-4 text-muted">
          Todo lo que tu negocio necesita para digitalizarse, en un mismo sitio.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={Math.min(index, 5) * 0.05}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
