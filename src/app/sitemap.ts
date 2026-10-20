import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { buildSitemap } from "@/lib/sitemap";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(siteUrl, services, new Date());
}
