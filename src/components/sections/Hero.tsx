"use client";

import { motion, type Variants } from "motion/react";
import { hero } from "@/content/home";
import { contact, site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// The `dark` class applies the dark-theme tokens here: BRAND.md puts the hero on ink.
export function Hero() {
  return (
    <section className="dark bg-background text-foreground">
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-24 text-center sm:py-32"
        >
          <motion.div variants={item}>
            <Badge className="text-action">{hero.badge}</Badge>
          </motion.div>
          <motion.h1 variants={item} className="text-[2rem]/10 font-bold sm:text-[2.5rem]/12">
            {site.slogan}
          </motion.h1>
          <motion.p variants={item} className="max-w-2xl text-lg leading-relaxed text-muted">
            {site.description}
          </motion.p>
          <motion.div variants={item} className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Button href="/contacto" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href={contact.diagnosisHref} variant="secondary" size="lg">
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
