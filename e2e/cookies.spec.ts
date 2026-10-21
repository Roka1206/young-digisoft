import { expect, test } from "@playwright/test";

test("the cookie banner shows on the first visit and stays hidden after choosing", async ({ page }) => {
  await page.goto("/");
  const banner = page.getByRole("region", { name: "Aviso de cookies" });
  await expect(banner).toBeVisible();

  await banner.getByRole("button", { name: "Rechazar" }).click();
  await expect(banner).toBeHidden();

  await page.reload();
  await expect(banner).toBeHidden();
});

test("the footer link reopens the cookie banner", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("cookieConsent", "rejected"));
  await page.goto("/");
  await page.getByRole("button", { name: "Configurar cookies" }).click();
  await expect(page.getByRole("region", { name: "Aviso de cookies" })).toBeVisible();
});
