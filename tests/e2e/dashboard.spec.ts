import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('unified EvoCRM dashboard', () => {
  test('keeps the main navigation and quick actions functional', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page.getByRole('heading', { name: 'Bonjour Mohamed' })).toBeVisible();
    await expect(page.getByText('Pipeline ouvert').first()).toBeVisible();

    await page.getByRole('button', { name: 'Ouvrir l’Inbox' }).click();
    await expect(page).toHaveURL(/\/inbox$/);

    await page.goto('/dashboard');
    await page.getByRole('button', { name: 'Créer un deal' }).click();
    await expect(page).toHaveURL(/\/crm\/deals\?create=1$/);
  });

  test('does not overflow on a narrow mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/dashboard');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
    await expect(page.getByRole('heading', { name: 'Bonjour Mohamed' })).toBeVisible();
  });

  test('keeps the workspace within the viewport at the Phase 2 width matrix', async ({ page }) => {
    for (const width of [1440, 1280, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      await page.goto('/dashboard');

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBe(false);
      await expect(page.getByRole('heading', { name: 'Bonjour Mohamed' })).toBeVisible();
    }
  });

  test('has no automated WCAG violations on the populated dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
