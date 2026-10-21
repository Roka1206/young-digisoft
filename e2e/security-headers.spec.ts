import { expect, test } from "@playwright/test";

test("pages are served with the security headers", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).toContain(
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
});

test("the API route also gets the security headers", async ({ request }) => {
  const headers = (await request.get("/api/contact")).headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
});

for (const path of ["/", "/contacto", "/servicios/web"]) {
  test(`${path} loads without Content Security Policy violations`, async ({ page }) => {
    const violations: string[] = [];
    page.on("console", (message) => {
      if (message.text().includes("Content Security Policy")) violations.push(message.text());
    });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    expect(violations).toEqual([]);
  });
}
