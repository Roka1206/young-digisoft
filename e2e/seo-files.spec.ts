import { expect, test } from "@playwright/test";

const siteUrl = "https://youngdigisoft.es";

test("robots.txt points to the sitemap on the production domain", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
});

test("sitemap.xml only lists URLs on the production domain", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
  expect(urls.length).toBeGreaterThan(0);
  for (const url of urls) expect(url.startsWith(siteUrl)).toBe(true);
});
