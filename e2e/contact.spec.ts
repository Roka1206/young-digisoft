import { expect, test, type Page } from "@playwright/test";

const fillAndSubmit = async (page: Page, status: number) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status, json: {} }));
  const form = page.locator("#contacto form");
  await form.getByLabel("Nombre").fill("Ana Test");
  await form.getByLabel("Email").fill("ana@example.com");
  await form.getByLabel("Mensaje").fill("Quiero información sobre sus servicios digitales.");
  await form.getByRole("checkbox", { name: /acepto la política de privacidad/i }).check();
  await form.getByRole("button", { name: /enviar mensaje/i }).click();
};

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

  await fillAndSubmit(page, 200);
  await expect(page.locator("#contacto").getByRole("status")).toContainText(/¡mensaje enviado!/i);
});

test("contact form offers WhatsApp when sending fails", async ({ page }) => {
  await page.goto("/contacto");
  await fillAndSubmit(page, 502);

  const alert = page.locator("#contacto").getByRole("alert");
  await expect(alert).toContainText(/no se pudo enviar/i);
  await expect(alert.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", /wa\.me/);
});
