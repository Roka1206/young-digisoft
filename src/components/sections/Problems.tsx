import { problems } from "@/content/home";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Problems() {
  return (
    <Section title={problems.title} description={problems.description}>
      <div className="grid gap-6 md:grid-cols-3">
        {problems.items.map(({ title, description, icon: Icon }, index) => (
          <Reveal key={title} delay={index * 0.1}>
            <Card className="flex h-full flex-col gap-4">
              <Icon aria-hidden className="size-8 text-action" />
              <h3 className="text-lg font-medium text-foreground">{title}</h3>
              <p className="leading-relaxed text-muted">{description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
