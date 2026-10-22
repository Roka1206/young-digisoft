import { describe, expect, it } from "vitest";
import { guides } from "@/content/guides";
import { services } from "@/content/services";
import { buildSitemap } from "./sitemap";

const baseUrl = "https://youngdigisoft.es";
const urls = buildSitemap(baseUrl, services, guides).map((entry) => entry.url);

describe("buildSitemap", () => {
  it("lists the homepage, about, contact and legal pages", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        baseUrl,
        `${baseUrl}/sobre-nosotros`,
        `${baseUrl}/contacto`,
        `${baseUrl}/aviso-legal`,
        `${baseUrl}/privacidad`,
        `${baseUrl}/cookies`,
      ]),
    );
  });

  it("lists one page per service", () => {
    for (const { slug } of services) expect(urls).toContain(`${baseUrl}/servicios/${slug}`);
  });

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("lists the guides index and each guide with its real update date", () => {
    const entries = buildSitemap(baseUrl, services, guides);
    expect(urls).toContain(`${baseUrl}/guias`);
    for (const { slug, updatedAt } of guides) {
      expect(entries).toContainEqual(
        expect.objectContaining({ url: `${baseUrl}/guias/${slug}`, lastModified: updatedAt }),
      );
    }
  });

  it("publishes lastmod only for guides", () => {
    const dated = buildSitemap(baseUrl, services, guides).filter((entry) => "lastModified" in entry);
    for (const { url } of dated) expect(url).toContain("/guias/");
  });

  it("gives the homepage the highest priority", () => {
    expect(buildSitemap(baseUrl, services, guides)[0]).toMatchObject({ url: baseUrl, priority: 1 });
  });
});
