"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { exitIntent } from "@/content/home";
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

  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus moves into the dialog while it is open and returns to where it was when it closes.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => previous?.focus();
  }, [open]);

  const close = () => setOpen(false);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") return close();
    if (event.key !== "Tab") return;
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [])];
    const edge = event.shiftKey ? focusable[0] : focusable.at(-1);
    if (document.activeElement !== edge) return;
    event.preventDefault();
    (event.shiftKey ? focusable.at(-1) : focusable[0])?.focus();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 motion-safe:animate-fade-in"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-description"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={onKeyDown}
        className="relative w-full max-w-sm rounded-xl border border-border bg-surface p-6 text-center shadow-xl motion-safe:animate-rise"
      >
        <button
          type="button"
          onClick={close}
          aria-label={exitIntent.close}
          className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-action/10 hover:text-action"
        >
          <X aria-hidden size={16} />
        </button>
        <h2 id="exit-intent-title" className="text-xl font-medium text-foreground">
          {exitIntent.title}
        </h2>
        <p id="exit-intent-description" className="mt-2 text-sm text-muted">
          {exitIntent.description}
        </p>
        <Button href={contact.whatsappHref} className="mt-5 w-full justify-center" onClick={close}>
          {exitIntent.cta}
        </Button>
      </div>
    </div>
  );
}
