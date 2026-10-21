import type { MetadataRoute } from "next";
import type { Service } from "@/content/services";

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// No lastModified: there is no reliable per-page date, and Google ignores dates it cannot trust.
export function buildSitemap(baseUrl: string, services: Service[]): MetadataRoute.Sitemap {
  const pages: [path: string, changeFrequency: Frequency, priority: number][] = [
    ["", "monthly", 1],
    ...services.map(({ slug }): [string, Frequency, number] => [`/servicios/${slug}`, "monthly", 0.8]),
    ["/contacto", "yearly", 0.7],
    ["/aviso-legal", "yearly", 0.3],
    ["/privacidad", "yearly", 0.3],
    ["/cookies", "yearly", 0.3],
  ];
  return pages.map(([path, changeFrequency, priority]) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
