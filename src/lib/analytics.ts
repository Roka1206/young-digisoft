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
