"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "yd_exit_intent_shown";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage puede no estar disponible (modo privado, etc.)
    }
    if (alreadyShown) return;

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 0) return;
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // no-op
      }
      document.removeEventListener("mouseleave", onMouseLeave);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center shadow-xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand/10 hover:text-brand"
            >
              <X size={16} />
            </button>
            <h3 id="exit-intent-title" className="font-heading text-xl text-foreground">
              ¿Ya te vas?
            </h3>
            <p className="mt-2 text-sm text-muted">
              Cuéntanos qué necesita tu negocio y te preparamos un presupuesto sin compromiso.
            </p>
            <Button
              href={contact.whatsappHref}
              className="mt-5 w-full justify-center"
              onClick={close}
            >
              Hablar por WhatsApp
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
