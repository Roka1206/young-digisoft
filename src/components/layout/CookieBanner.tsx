"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cookieBanner } from "@/content/legal";
import { saveConsent, useConsent, useCookieSettingsOpen } from "@/lib/cookie-consent";

export function CookieBanner() {
  const consent = useConsent();
  const settingsOpen = useCookieSettingsOpen();
  if (consent && !settingsOpen) return null;

  return (
    <section
      aria-label={cookieBanner.label}
      data-open={settingsOpen || undefined}
      className="cookie-banner fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6"
    >
      <p className="text-sm leading-relaxed text-foreground">
        {cookieBanner.text}{" "}
        <Link href="/cookies" className="font-medium text-action underline underline-offset-2">
          {cookieBanner.link}
        </Link>
      </p>
      <div className="grid shrink-0 grid-cols-2 gap-3">
        <Button type="button" size="sm" onClick={() => saveConsent("rejected")}>
          {cookieBanner.reject}
        </Button>
        <Button type="button" size="sm" onClick={() => saveConsent("accepted")}>
          {cookieBanner.accept}
        </Button>
      </div>
    </section>
  );
}
