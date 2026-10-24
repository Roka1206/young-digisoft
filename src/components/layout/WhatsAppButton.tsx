"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappHrefForPath } from "@/lib/whatsapp-links";
import { uiText } from "@/content/ui";

export function WhatsAppButton() {
  return (
    <aside aria-label={uiText.quickContact}>
      <a
        href={whatsappHrefForPath(usePathname())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={uiText.whatsappButton}
        className="fixed right-6 bottom-6 z-40 inline-flex size-14 items-center justify-center rounded-full bg-action text-action-fg shadow-lg transition-colors hover:bg-action-hover focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
      >
        <WhatsAppIcon aria-hidden className="size-7" />
      </a>
    </aside>
  );
}
