import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const outDir = 'docs/screenshots';

const pages = [
  ['login', '/login', /Connexion EvoCRM/],
  ['dashboard', '/dashboard', /Bonjour Mohamed/],
  ['contacts', '/crm/contacts', /Contacts/],
  ['deals', '/crm/deals', /Deals/],
  ['pipeline', '/crm/deals/board', /Pipeline/],
  ['inbox', '/inbox', /Inbox/],
  ['quotes', '/crm/quotes', /Devis/],
  ['settings', '/settings', /Paramètres/],
] as const;

test('captures new-look CRM screens in light and dark', async ({ page }) => {
  mkdirSync(outDir, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const theme of ['light', 'dark'] as const) {
    await page.addInitScript((value) => localStorage.setItem('evocrm-theme', value), theme);
    for (const [name, route, heading] of pages) {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
      await page.screenshot({ path: `${outDir}/new-look-${name}-${theme}.png`, fullPage: true });
    }
  }

  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /Bonjour Mohamed/ })).toBeVisible();
  await page.screenshot({ path: `${outDir}/dashboard.png`, fullPage: true });
  await page.goto('/crm/contacts');
  await page.screenshot({ path: `${outDir}/contacts.png`, fullPage: true });
  await page.goto('/crm/deals/board');
  await page.screenshot({ path: `${outDir}/deals.png`, fullPage: true });
  await page.goto('/inbox');
  await page.screenshot({ path: `${outDir}/inbox.png`, fullPage: true });
});
