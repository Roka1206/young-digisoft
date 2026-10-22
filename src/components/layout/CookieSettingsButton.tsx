"use client";

import { cookieBanner } from "@/content/legal";
import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {cookieBanner.settings}
    </button>
  );
}
