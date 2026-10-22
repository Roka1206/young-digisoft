"use client";

import Script from "next/script";
import { useEffect } from "react";
import { trackContactClick } from "@/lib/analytics";
import { useConsent } from "@/lib/cookie-consent";

export function GoogleAnalytics() {
  const consent = useConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const onClick = (event: MouseEvent) => trackContactClick(event.target);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!gaId || consent !== "accepted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
