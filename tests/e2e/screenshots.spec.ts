import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const outDir = 'docs/screenshots';

test('captures key CRM screens for the DS 2.0 package adoption', async ({ page }) => {
  mkdirSync(outDir, { recursive: true });
  page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /Bonjour Mohamed/ })).toBeVisible();
  await page.screenshot({ path: `${outDir}/dashboard.png`, fullPage: true });

  await page.goto('/crm/contacts');
  await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
  await page.screenshot({ path: `${outDir}/contacts.png`, fullPage: true });

  await page.goto('/crm/deals/board');
  await expect(page.getByRole('heading', { name: 'Deals' })).toBeVisible();
  await page.screenshot({ path: `${outDir}/deals.png`, fullPage: true });

  await page.goto('/inbox');
  await expect(page.getByRole('heading', { name: 'Inbox' })).toBeVisible();
  await page.screenshot({ path: `${outDir}/inbox.png`, fullPage: true });
});
