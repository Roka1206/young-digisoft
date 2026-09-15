"use client";

import { AnimatePresence, motion } from "motion/react";
import { contact, navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="border-t border-border bg-background md:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-brand/10 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-4 border-t border-border px-4 py-4">
            <Button href={contact.whatsappHref} onClick={onClose}>
              Hablemos de tu negocio
            </Button>
            <SocialLinks />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
