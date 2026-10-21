import type { ReactNode } from "react";
import { Container } from "./Container";

// The `dark` class applies the dark-theme tokens here: BRAND.md puts key message blocks on ink.
export function PageHero({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="dark bg-background text-foreground">
      <Container className="flex max-w-3xl flex-col gap-6 py-20">
        <h1 className="text-[2rem]/10 font-bold sm:text-[2.5rem]/12">{title}</h1>
        <p className="text-lg leading-relaxed text-muted">{description}</p>
        {children}
      </Container>
    </section>
  );
}
