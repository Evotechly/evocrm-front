import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = [
  'button',
  'icon-button',
  'input',
  'select',
  'data-table',
  'dialog',
  'sidebar',
  'topbar',
  'toast',
  'date-picker',
];

test('home lists all 31 components', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Evotechly UI' })).toBeVisible();
  await expect(page.locator('.showcase-card')).toHaveCount(31);
});

for (const slug of slugs) {
  test(`${slug} is interactive`, async ({ page }) => {
    await page.goto(`/components/${slug}`);
    await expect(page.getByRole('heading', { name: /live preview/i })).toBeVisible();
    if (slug === 'dialog') {
      await page.getByRole('button', { name: 'Open dialog' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
    }
    if (slug === 'toast') {
      await page.getByRole('button', { name: 'Success' }).click();
    }
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
  });
}
