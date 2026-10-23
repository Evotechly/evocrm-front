import { expect, test } from '@playwright/test';

test('navigates the simple-mode primary destinations', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: /Bonjour Mohamed/ })).toBeVisible();
  await page.getByRole('button', { name: 'Contacts' }).click();
  await expect(page.getByRole('heading', { name: 'Contacts' })).toBeVisible();
  await page.getByRole('button', { name: 'Deals' }).click();
  await expect(page.getByRole('heading', { name: 'Deals' })).toBeVisible();
  await page.getByRole('button', { name: 'Inbox' }).click();
  await expect(page.getByRole('heading', { name: 'Inbox' })).toBeVisible();
});

test('opens command palette and toggles theme', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('button', { name: /Rechercher dans EvoCRM/ }).click();
  await expect(page.getByRole('dialog', { name: 'Palette de commandes' })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /Mode sombre/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
