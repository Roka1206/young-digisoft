import { expect, test } from "@playwright/test";

test("unknown route shows the custom 404 page and links back home", async ({ page }) => {
  const response = await page.goto("/esta-pagina-no-existe");
  expect(response?.status()).toBe(404);

  await expect(page.getByText("404")).toBeVisible();
  await expect(page.getByRole("heading", { name: /no hemos encontrado esta página/i })).toBeVisible();

  await page.getByRole("link", { name: "Volver al inicio" }).click();
  await expect(page).toHaveURL(/\/$/);
});
