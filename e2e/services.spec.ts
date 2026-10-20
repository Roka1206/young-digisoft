import { expect, test } from "@playwright/test";
import { services } from "../src/content/services";

for (const service of services) {
  test(`/servicios/${service.slug} shows the service and its prices`, async ({ page }) => {
    await page.goto(`/servicios/${service.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: service.name })).toBeVisible();
    await expect(page.getByRole("heading", { level: 3, name: service.plans[0].name })).toBeVisible();
  });
}

test("an unknown service returns the 404 page", async ({ page }) => {
  const response = await page.goto("/servicios/no-existe");
  expect(response?.status()).toBe(404);
});

test("offer cards on the homepage link to their service page", async ({ page }) => {
  await page.goto("/");
  await page.locator("#servicios").getByRole("link", { name: "Ver detalles" }).first().click();
  await expect(page).toHaveURL(/\/servicios\/web$/);
});
