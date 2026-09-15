import { expect, test } from "@playwright/test";

test("homepage shows the Young Digisoft logo", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByAltText("Young Digisoft")).toBeVisible();
});
