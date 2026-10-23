import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

// Matches the column of the content below: a reading column (default), the full page width or centered sections.
const layouts = {
  column: "max-w-3xl",
  wide: "[&>*]:max-w-3xl",
  centered: "max-w-3xl items-center text-center",
};

// The `dark` class applies the dark-theme tokens here: BRAND.md puts key message blocks on ink.
export function PageHero({
  title,
  description,
  layout = "column",
  children,
}: {
  title: string;
  description: string;
  layout?: keyof typeof layouts;
  children?: ReactNode;
}) {
  return (
    <section className="dark border-b border-border bg-background text-foreground">
      <Container className={cn("flex flex-col gap-6 py-14 sm:py-20", layouts[layout])}>
        <h1 className="text-[2rem]/10 font-bold sm:text-[2.5rem]/12">{title}</h1>
        <p className="text-lg leading-relaxed text-muted">{description}</p>
        {children}
      </Container>
    </section>
  );
}
