import type { Metadata } from "next";
import { site } from "@/content/site";

// Next.js replaces nested metadata objects instead of merging them, and drops the
// file-based opengraph-image once a page sets its own openGraph, so every page
// repeats the shared fields and the brand image.
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.slogan}` };

export const openGraphBase = { siteName: site.name, locale: "es_ES", type: "website" as const, images: [image] };

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, title: fullTitle, description, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
