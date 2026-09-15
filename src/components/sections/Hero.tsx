"use client";

import { motion, type Variants } from "motion/react";
import { contact, site } from "@/content/site";
import { Button } from "@/components/ui/Button";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at top, color-mix(in oklab, var(--color-brand) 14%, transparent), transparent 60%)",
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8"
      >
        <motion.span
          variants={item}
          className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-brand"
        >
          Digitalización · Tecnología · Soporte
        </motion.span>

        <motion.h1
          variants={item}
          className="font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {site.tagline}
        </motion.h1>

        <motion.p variants={item} className="max-w-2xl text-lg text-muted">
          {site.description}
        </motion.p>

        <motion.div variants={item} className="mt-2 flex flex-col gap-4 sm:flex-row">
          <Button href={contact.whatsappHref} size="lg">
            Hablemos de tu negocio
          </Button>
          <Button href="#servicios" variant="secondary" size="lg">
            Ver servicios
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
