import { whyUs } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function WhyUs() {
  return (
    <Section title={whyUs.title}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.items.map(({ title, description, icon: Icon }) => (
          <Reveal key={title} className="flex flex-col gap-3">
            <Icon aria-hidden className="size-8 text-action" />
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
            <p className="leading-relaxed text-muted">{description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
