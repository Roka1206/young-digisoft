import { expect, test } from "@playwright/test";

test("homepage shows the hero and header logo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("banner").getByRole("link", { name: "Young Digisoft" })).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Solo aplica al proyecto/viewport mobile");
  await page.goto("/");

  // Se escopa al <header> porque el Footer también renderiza un link "Contacto"
  // (siempre presente), y contarlo junto al del header daba falsos positivos.
  const header = page.getByRole("banner");
  const menuButton = header.getByRole("button", { name: /abrir menú/i });

  // En viewport mobile el nav de escritorio está oculto vía CSS, así que dentro
  // del header no hay ningún link "Contacto" visible hasta abrir el panel móvil.
  await expect(header.getByRole("link", { name: "Contacto" })).toHaveCount(0);

  await menuButton.click();
  await expect(header.getByRole("link", { name: "Contacto" })).toHaveCount(1);

  await header.getByRole("button", { name: /cerrar menú/i }).click();
  await expect(header.getByRole("link", { name: "Contacto" })).toHaveCount(0);
});

test("back to top button appears after scrolling and returns to the top", async ({ page }) => {
  // With no choice yet, the cookie banner sits over the floating buttons on mobile.
  await page.addInitScript(() => localStorage.setItem("cookieConsent", `rejected:${Date.now()}`));
  await page.goto("/");
  const backToTop = page.getByRole("button", { name: /volver arriba/i });
  await expect(backToTop).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(backToTop).toBeVisible();

  await backToTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
});

test("theme toggle switches to dark mode", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/dark/);

  await page
    .getByRole("button", { name: /cambiar tema/i })
    .first()
    .click();
  await expect(html).toHaveClass(/dark/);
});
