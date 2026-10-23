import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const shots = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "docs", "screenshots");

const combos = [
  { product: "crm", theme: "light" },
  { product: "crm", theme: "dark" },
] as const;

async function assertShowcase(page: Page) {
  await expect(page.getByRole("heading", { name: "All components" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save deal" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Email" }).first()).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Accept" }).first()).toBeVisible();
  await expect(page.getByRole("switch", { name: "Alerts" })).toBeVisible();
  await expect(page.getByRole("table").first()).toBeVisible();
}

test.describe("EvoUI 0.3.0 showcase", () => {
  for (const { product, theme } of combos) {
    test(`${product} ${theme} renders and is axe-clean`, async ({ page }) => {
      await page.goto(`/?product=${product}&theme=${theme}`);
      await assertShowcase(page);
      await expect(page.locator("html")).toHaveAttribute("data-product", product);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

      mkdirSync(shots, { recursive: true });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.getByRole("heading", { name: "All components" }).scrollIntoViewIfNeeded();
      await page.screenshot({
        path: join(shots, `evoui-030-${product}-${theme}.png`),
        fullPage: false,
      });
      await page.locator('[aria-label="Forms and inputs"]').scrollIntoViewIfNeeded();
      await page.screenshot({
        path: join(shots, `evoui-030-${product}-${theme}-forms.png`),
        fullPage: false,
      });
      await page.locator('[aria-label="CRM domain"]').scrollIntoViewIfNeeded();
      await page.screenshot({
        path: join(shots, `evoui-030-${product}-${theme}-crm.png`),
        fullPage: false,
      });
    });
  }
});
