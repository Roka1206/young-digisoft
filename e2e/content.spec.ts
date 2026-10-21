import { expect, test } from "@playwright/test";

test("no page in the sitemap shows a [PENDIENTE] placeholder", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = [...sitemap.matchAll(/<loc>https:\/\/youngdigisoft\.es([^<]*)<\/loc>/g)].map(([, path]) => path || "/");
  expect(paths.length).toBeGreaterThan(0);

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator("body"), path).not.toContainText("[PENDIENTE");
  }
});
