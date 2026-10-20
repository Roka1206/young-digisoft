import { CheckCircle2 } from "lucide-react";
import { whyUs } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function WhyUs() {
  return (
    <Section id="por-que-elegirnos" title="Por qué elegirnos" className="bg-surface">
      <div className="grid gap-8 sm:grid-cols-3">
        {whyUs.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 0.1} className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-action/10 text-action">
              <CheckCircle2 size={24} />
            </span>
            <h3 className="font-medium text-lg text-foreground">{reason.title}</h3>
            <p className="text-sm text-muted">{reason.description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
