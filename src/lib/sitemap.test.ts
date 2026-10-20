import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { buildSitemap } from "./sitemap";

const baseUrl = "https://youngdigisoft.es";
const lastModified = new Date("2026-10-20");
const urls = buildSitemap(baseUrl, services, lastModified).map((entry) => entry.url);

describe("buildSitemap", () => {
  it("lists the homepage, contact and legal pages", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        baseUrl,
        `${baseUrl}/contacto`,
        `${baseUrl}/aviso-legal`,
        `${baseUrl}/privacidad`,
        `${baseUrl}/cookies`,
      ])
    );
  });

  it("lists one page per service", () => {
    for (const { slug } of services) expect(urls).toContain(`${baseUrl}/servicios/${slug}`);
  });

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("gives the homepage the highest priority", () => {
    expect(buildSitemap(baseUrl, services, lastModified)[0]).toMatchObject({ url: baseUrl, priority: 1 });
  });
});
