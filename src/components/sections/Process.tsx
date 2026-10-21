import { howWeWork } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Process() {
  return (
    <Section id="como-trabajamos" title={howWeWork.title} description={howWeWork.description} className="bg-surface">
      <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {howWeWork.steps.map((step, index) => (
          <li key={step.title}>
            <Reveal className="flex flex-col gap-2">
              <span aria-hidden className="font-mono text-[13px]/5 text-action">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium text-foreground">{step.title}</h3>
              <p className="leading-relaxed text-muted">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
