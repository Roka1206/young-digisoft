import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function Section({
  id,
  title,
  description,
  className,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={className}>
      <Container className="py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl/8 font-bold text-foreground sm:text-[1.75rem]/9">{title}</h2>
          {description && <p className="mt-4 leading-relaxed text-muted">{description}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}
