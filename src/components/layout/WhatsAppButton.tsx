"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappHrefForPath } from "@/lib/whatsapp-links";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHrefForPath(usePathname())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex size-14 items-center justify-center rounded-full bg-action text-action-fg shadow-lg transition-colors hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <WhatsAppIcon aria-hidden className="size-7" />
    </a>
  );
}
