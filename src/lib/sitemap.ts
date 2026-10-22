import type { MetadataRoute } from "next";
import type { Guide } from "@/content/guides";
import type { Service } from "@/content/services";

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

// Only guides carry lastModified: they have a real update date; other pages have none Google could trust.
export function buildSitemap(baseUrl: string, services: Service[], guides: Guide[]): MetadataRoute.Sitemap {
  const pages: [path: string, changeFrequency: Frequency, priority: number][] = [
    ["", "monthly", 1],
    ...services.map(({ slug }): [string, Frequency, number] => [`/servicios/${slug}`, "monthly", 0.8]),
    ["/guias", "monthly", 0.7],
    ["/contacto", "yearly", 0.7],
    ["/aviso-legal", "yearly", 0.3],
    ["/privacidad", "yearly", 0.3],
    ["/cookies", "yearly", 0.3],
  ];
  return [
    ...pages.map(([path, changeFrequency, priority]) => ({ url: `${baseUrl}${path}`, changeFrequency, priority })),
    ...guides.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/guias/${slug}`,
      lastModified: updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
