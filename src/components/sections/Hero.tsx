"use client";

import { motion, type Variants } from "motion/react";
import { contact, site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
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
    <section>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8"
      >
        <motion.div variants={item}>
          <Badge>Digitalización · Tecnología · Soporte</Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-bold text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {site.slogan}
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
