"use client";

import { cookieBanner } from "@/content/legal";
import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={openCookieSettings} className="transition-colors hover:text-action">
      {cookieBanner.settings}
    </button>
  );
}
