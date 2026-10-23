import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const slugs = [
  'button',
  'icon-button',
  'button-group',
  'input',
  'textarea',
  'select',
  'combobox',
  'checkbox',
  'radio-group',
  'switch',
  'date-picker',
  'sidebar',
  'topbar',
  'tabs',
  'command-menu',
  'breadcrumbs',
  'data-table',
  'badge',
  'avatar',
  'pagination',
  'empty-state',
  'skeleton',
  'dialog',
  'drawer',
  'dropdown-menu',
  'tooltip',
  'popover',
  'toast',
  'alert',
  'progress',
  'spinner',
];

const screenshotDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../docs/ui/screenshots');

async function expectNoCriticalAxe(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations.filter((v) => v.impact === 'critical')).toEqual([]);
}

test('home lists all 31 components', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Evotechly UI' })).toBeVisible();
  await expect(page.locator('.showcase-card')).toHaveCount(31);
  await expectNoCriticalAxe(page);
});

for (const slug of slugs) {
  test(`${slug} is interactive`, async ({ page }) => {
    await page.goto(`/components/${slug}`);
    await expect(page.getByRole('heading', { name: /live preview/i })).toBeVisible();

    if (slug === 'button-group') {
      await page.getByRole('button', { name: 'Day' }).click();
      await expect(page.getByRole('button', { name: 'Day' })).toHaveAttribute('data-active', 'true');
    }
    if (slug === 'select') {
      await page.getByRole('combobox', { name: 'Stage' }).click();
      await expect(page.getByRole('option', { name: 'New' })).toBeVisible();
    }
    if (slug === 'combobox') {
      await page.getByRole('button', { name: /search/i }).click();
      await expect(page.getByLabel('Owner')).toBeVisible();
    }
    if (slug === 'radio-group') {
      await page.getByText('Team').click();
      await expect(page.getByRole('radio', { name: /team/i })).toBeChecked();
    }
    if (slug === 'switch') {
      await page.getByRole('switch').click();
      await expect(page.getByRole('switch')).not.toBeChecked();
    }
    if (slug === 'date-picker') {
      await page.getByRole('button', { name: /select date|close date/i }).click();
      await expect(page.locator('.ev-calendar')).toBeVisible();
    }
    if (slug === 'tabs') {
      await page.getByRole('tab', { name: 'Won' }).click();
      await expect(page.getByText('Won records')).toBeVisible();
    }
    if (slug === 'command-menu') {
      await page.getByRole('button', { name: 'Open command menu' }).click();
      await expect(page.getByPlaceholder('Search commands')).toBeVisible();
    }
    if (slug === 'pagination') {
      await page.getByRole('button', { name: 'Next' }).click();
      await expect(page.getByRole('button', { name: '3' })).toHaveAttribute('aria-current', 'page');
    }
    if (slug === 'dialog') {
      await page.getByRole('button', { name: 'Open dialog' }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
    }
    if (slug === 'drawer') {
      await page.getByRole('button', { name: 'Open drawer' }).click();
      await expect(page.getByRole('dialog', { name: 'Filters' })).toBeVisible();
    }
    if (slug === 'dropdown-menu') {
      await page.getByRole('button', { name: 'Menu' }).click();
      await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeVisible();
    }
    if (slug === 'tooltip') {
      await page.getByRole('button', { name: 'Hover or focus' }).hover();
      await expect(page.getByRole('tooltip', { name: 'Creates a contact' })).toBeVisible();
    }
    if (slug === 'popover') {
      await page.getByRole('button', { name: 'Open popover' }).click();
      await expect(page.getByText('Collision-aware surface.')).toBeVisible();
    }
    if (slug === 'toast') {
      await page.getByRole('button', { name: 'Success' }).click();
      await expect(page.getByText('Saved')).toBeVisible();
    }

    await expectNoCriticalAxe(page);
  });
}

test('capture showcase screenshots', async ({ page }) => {
  const shots: Array<{ path: string; viewport: { width: number; height: number }; url: string; dark?: boolean; extra?: () => Promise<void> }> = [
    { path: 'home-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/' },
    { path: 'home-390-light.png', viewport: { width: 390, height: 844 }, url: '/' },
    { path: 'button-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/button' },
    { path: 'button-1440-dark.png', viewport: { width: 1440, height: 900 }, url: '/components/button', dark: true },
    { path: 'button-390-light.png', viewport: { width: 390, height: 844 }, url: '/components/button' },
    { path: 'data-table-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/data-table' },
    { path: 'sidebar-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/sidebar' },
    { path: 'date-picker-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/date-picker' },
    {
      path: 'dialog-1440-light.png',
      viewport: { width: 1440, height: 900 },
      url: '/components/dialog',
      extra: async () => {
        await page.getByRole('button', { name: 'Open dialog' }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
      },
    },
    { path: 'alert-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/alert' },
    { path: 'empty-state-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/empty-state' },
    { path: 'toast-1440-light.png', viewport: { width: 1440, height: 900 }, url: '/components/toast' },
  ];

  for (const shot of shots) {
    await page.setViewportSize(shot.viewport);
    await page.goto(shot.url);
    if (shot.dark) {
      await page.getByRole('button', { name: 'Dark mode' }).click();
    }
    if (shot.extra) await shot.extra();
    await page.screenshot({ path: path.join(screenshotDir, shot.path), fullPage: true });
  }
});
