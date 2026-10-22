import { getConsent } from "./cookie-consent";

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Record<string, string>) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (getConsent() !== "accepted" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

const contactMethods = [
  ["https://wa.me/", "whatsapp"],
  ["tel:", "phone"],
  ["mailto:", "email"],
] as const;

export const contactMethod = (href: string) => contactMethods.find(([prefix]) => href.startsWith(prefix))?.[1];

// Called for every click on the page: only links to WhatsApp, phone or email become a contact_click event.
export function trackContactClick(target: EventTarget | null) {
  const href = target instanceof Element ? target.closest("a")?.getAttribute("href") : null;
  const method = href && contactMethod(href);
  if (method) trackEvent("contact_click", { method });
}
