import { expect, test } from "@playwright/test";

test("the hero primary button opens the contact page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Hablemos de tu negocio" }).first().click();
  await expect(page).toHaveURL(/\/contacto$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("contact form validates and submits successfully", async ({ page }) => {
  await page.goto("/contacto");
  const form = page.locator("#contacto form");

  await form.getByRole("button", { name: /enviar mensaje/i }).click();
  await expect(form.getByText(/introduce tu nombre/i)).toBeVisible();
  await expect(form.getByText(/necesitamos tu permiso/i)).toBeVisible();

  await page.route("**/api/contact", async (route) => {
    await route.fulfill({ status: 200, json: { ok: true } });
  });

  await form.getByLabel("Nombre").fill("Ana Test");
  await form.getByLabel("Email").fill("ana@example.com");
  await form.getByLabel("Mensaje").fill("Quiero información sobre sus servicios digitales.");
  await form.getByRole("checkbox", { name: /acepto la política de privacidad/i }).check();
  await form.getByRole("button", { name: /enviar mensaje/i }).click();

  await expect(page.getByText(/¡mensaje enviado!/i)).toBeVisible();
});
