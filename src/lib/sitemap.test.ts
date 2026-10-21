import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { buildSitemap } from "./sitemap";

const baseUrl = "https://youngdigisoft.es";
const urls = buildSitemap(baseUrl, services).map((entry) => entry.url);

describe("buildSitemap", () => {
  it("lists the homepage, contact and legal pages", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        baseUrl,
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

  it("does not publish a lastmod date", () => {
    for (const entry of buildSitemap(baseUrl, services)) expect(entry).not.toHaveProperty("lastModified");
  });

  it("gives the homepage the highest priority", () => {
    expect(buildSitemap(baseUrl, services)[0]).toMatchObject({ url: baseUrl, priority: 1 });
  });
});
