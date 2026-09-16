import { expect, test } from "@playwright/test";

const legalPages = [
  { path: "/aviso-legal", heading: "Aviso legal", titleFragment: "Aviso legal" },
  { path: "/privacidad", heading: "Política de privacidad", titleFragment: "Política de privacidad" },
  { path: "/cookies", heading: "Política de cookies", titleFragment: "Política de cookies" },
];

for (const { path, heading, titleFragment } of legalPages) {
  test(`${path} renders its heading, title and site chrome`, async ({ page }) => {
    await page.goto(path);

    await expect(page).toHaveTitle(new RegExp(titleFragment));
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.getByRole("banner").getByAltText("Young Digisoft")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
}

test("footer links navigate to the legal pages", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");

  await footer.getByRole("link", { name: "Aviso legal" }).click();
  await expect(page).toHaveURL(/\/aviso-legal$/);

  await page.goBack();
  await footer.getByRole("link", { name: "Privacidad" }).click();
  await expect(page).toHaveURL(/\/privacidad$/);

  await page.goBack();
  await footer.getByRole("link", { name: "Cookies" }).click();
  await expect(page).toHaveURL(/\/cookies$/);
});
