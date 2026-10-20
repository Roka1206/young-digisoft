import { expect, test } from "@playwright/test";

test("the vercel.app host redirects permanently to youngdigisoft.es", async ({ request }) => {
  const response = await request.get("/contacto", {
    headers: { host: "young-digisoft.vercel.app" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("https://youngdigisoft.es/contacto");
});

test("other hosts are not redirected", async ({ request }) => {
  const response = await request.get("/contacto", { maxRedirects: 0 });
  expect(response.status()).toBe(200);
});
