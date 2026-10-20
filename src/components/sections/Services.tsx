import { services } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <Section
      id="servicios"
      title="Nuestros servicios"
      description="Todo lo que tu negocio necesita para digitalizarse, en un mismo sitio."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={Math.min(index, 5) * 0.05}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
