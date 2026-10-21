import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/content/site";
import { openGraphBase } from "@/lib/metadata";
import { hideChosenBannerScript } from "@/lib/cookie-consent-script";
import { businessJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/site-url";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/ui/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.homeTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    ...openGraphBase,
    title: site.homeTitle,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.homeTitle,
    description: site.description,
  },
  verification: {
    google: "U7n98bB_imQkDR-LW5hXE5MAn9HjJGSebxGptgJrRpk",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: hideChosenBannerScript }} />
        <JsonLd data={businessJsonLd()} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* First in the DOM so keyboard users reach the choice first; it is fixed to the bottom visually. */}
          <CookieBanner />
          {children}
          <WhatsAppButton />
        </ThemeProvider>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
