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
  expect(headers["strict-transport-security"]).toBe("max-age=63072000; includeSubDomains");
});

test("the API route also gets the security headers", async ({ request }) => {
  const headers = (await request.get("/api/contact")).headers();
  expect(headers["x-content-type-options"]).toBe("nosniff");
});

test("security.txt tells researchers how to report a vulnerability", async ({ request }) => {
  const response = await request.get("/.well-known/security.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Contact: mailto:info@youngdigisoft.es");
  expect(new Date(body.match(/^Expires: (.+)$/m)![1]).getTime()).toBeGreaterThan(Date.now());
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
