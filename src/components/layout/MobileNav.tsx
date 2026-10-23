"use client";

import { contact, navLinks } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div id="mobile-nav" className="border-t border-border bg-background motion-safe:animate-drop lg:hidden">
      <nav className="flex flex-col gap-1 px-4 py-4">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-action/10 hover:text-action"
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
    </div>
  );
}
