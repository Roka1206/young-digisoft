import type { CSSProperties } from "react";
import { hero } from "@/content/home";
import { contact, site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const rise = "motion-safe:animate-rise";
const stagger = (index: number): CSSProperties => ({ animationDelay: `${100 + index * 120}ms` });

// The `dark` class applies the dark-theme tokens here: BRAND.md puts the hero on ink.
export function Hero() {
  return (
    <section className="dark border-b border-border bg-background text-foreground">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-16 text-center sm:py-32">
          <div className={rise} style={stagger(0)}>
            <Badge className="text-balance text-action">{hero.badge}</Badge>
          </div>
          <h1 className={`${rise} text-[2rem]/10 font-bold sm:text-[2.5rem]/12`} style={stagger(1)}>
            {site.descriptor}
          </h1>
          <p className={`${rise} max-w-2xl text-lg leading-relaxed text-muted`} style={stagger(2)}>
            {site.description}
          </p>
          <div className={`${rise} mt-2 flex flex-col gap-4 sm:flex-row`} style={stagger(3)}>
            <Button href="/contacto" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href={contact.diagnosisHref} variant="secondary" size="lg">
              {hero.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
