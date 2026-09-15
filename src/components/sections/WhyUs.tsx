import { CheckCircle2 } from "lucide-react";
import { whyUs } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <section id="por-que-elegirnos" className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            Por qué elegirnos
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {whyUs.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.1} className="flex flex-col items-center gap-3 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <CheckCircle2 size={24} />
              </span>
              <h3 className="font-heading text-lg text-foreground">{reason.title}</h3>
              <p className="text-sm text-muted">{reason.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
