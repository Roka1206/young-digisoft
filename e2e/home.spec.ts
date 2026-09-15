import { expect, test } from "@playwright/test";

test("homepage shows the hero and header logo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("banner").getByAltText("Young Digisoft")).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Solo aplica al proyecto/viewport mobile");
  await page.goto("/");

  // En viewport mobile el nav de escritorio está oculto vía CSS, así que el único
  // link "Contacto" accesible es el del panel móvil.
  const menuButton = page.getByRole("button", { name: /abrir menú/i });
  await menuButton.click();
  await expect(page.getByRole("link", { name: "Contacto" })).toHaveCount(1);

  await page.getByRole("button", { name: /cerrar menú/i }).click();
  await expect(page.getByRole("link", { name: "Contacto" })).toHaveCount(0);
});

test("back to top button appears after scrolling and returns to the top", async ({ page }) => {
  await page.goto("/");
  const backToTop = page.getByRole("button", { name: /volver arriba/i });
  await expect(backToTop).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, 1200));
  await expect(backToTop).toBeVisible();

  await backToTop.click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeLessThan(50);
});

test("theme toggle switches to dark mode", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole("button", { name: /cambiar tema/i }).first().click();
  await expect(html).toHaveClass(/dark/);
});

test("contact form validates and submits successfully", async ({ page }) => {
  await page.goto("/");
  const form = page.locator("#contacto form");

  await form.getByRole("button", { name: /enviar mensaje/i }).click();
  await expect(form.getByText(/introduce tu nombre/i)).toBeVisible();

  await page.route("**/api/contact", async (route) => {
    await route.fulfill({ status: 200, json: { ok: true } });
  });

  await form.getByLabel("Nombre").fill("Ana Test");
  await form.getByLabel("Email").fill("ana@example.com");
  await form.getByLabel("Mensaje").fill("Quiero información sobre sus servicios digitales.");
  await form.getByRole("button", { name: /enviar mensaje/i }).click();

  await expect(page.getByText(/¡mensaje enviado!/i)).toBeVisible();
});
