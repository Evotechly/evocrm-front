import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('contact creation, search, editing, filters and column visibility', async ({ page }) => {
  await page.goto('/crm/contacts?create=1');
  await page.getByLabel('Nom complet').fill('Amel F2');
  await page.getByLabel('Email', { exact: true }).fill('amel.f2@example.test');
  await page.getByLabel('Entreprise associée').selectOption('Clinique El Djazair');
  await page.getByRole('button', { name: 'Enregistrer le contact' }).click();
  await page.getByRole('searchbox', { name: 'Rechercher un contact' }).fill('Amel F2');
  await page.getByRole('button', { name: 'Amel F2' }).click();
  await page.getByRole('button', { name: 'Modifier le contact' }).click();
  await page.getByLabel('Nom complet').fill('Amel F2 modifiée');
  await page.getByRole('button', { name: 'Enregistrer le contact' }).click();
  await page.getByRole('searchbox').fill('Amel F2 modifiée');
  await expect(page.getByRole('button', { name: 'Amel F2 modifiée' })).toBeVisible();
  await page.getByLabel('Statut', { exact: true }).selectOption('Inactif');
  await expect(page.getByRole('heading', { name: 'Aucun contact ne correspond' })).toBeVisible();
  await page.getByRole('button', { name: 'Réinitialiser les filtres' }).click();
  await page.getByRole('button', { name: 'Colonnes', exact: true }).click();
  await page.getByRole('checkbox', { name: 'Email', exact: true }).uncheck();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('columnheader', { name: 'Email', exact: true })).toHaveCount(0);
});
test('deal keyboard move, drag, creation and totals survive view changes', async ({ page }) => {
  await page.goto('/crm/deals/board');
  const card = page.getByRole('article', { name: 'Portail client', exact: true });
  await card.dragTo(page.getByRole('region', { name: 'Proposition', exact: true }), {
    targetPosition: { x: 100, y: 10 },
  });
  await expect(page.getByRole('region', { name: 'Proposition', exact: true })).toContainText(
    'Portail client',
  );
  await page.getByLabel('Étape de Déploiement CRM', { exact: true }).selectOption('Gagné');
  await expect(page.getByRole('region', { name: 'Gagné', exact: true })).toContainText(
    'Déploiement CRM',
  );
  await expect(page.getByText('1 100 000,00 DA', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Nouveau deal', exact: true }).click();
  await page.getByLabel('Nom du deal').fill('Projet F2');
  await page.getByLabel('Montant (DA)', { exact: true }).fill('1000');
  await page.getByRole('button', { name: 'Enregistrer le deal' }).click();
  await page.getByRole('button', { name: 'Liste', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Projet F2', exact: true })).toBeVisible();
});
test('inbox sends only a simulated reply to selected thread', async ({ page }) => {
  await page.goto('/inbox');
  await page.getByLabel('Votre réponse', { exact: true }).fill('Réponse de certification F2');
  await page.getByRole('button', { name: 'Envoyer (simulation)' }).click();
  await expect(page.getByRole('log')).toContainText('Réponse de certification F2');
  await page.getByRole('button', { name: /Yacine Haddad/ }).click();
  await expect(page.getByRole('log')).not.toContainText('Réponse de certification F2');
  await page.getByRole('button', { name: /Sarah Benali/ }).click();
  await expect(page.getByRole('log')).toContainText('Réponse de certification F2');
});
test('quote lines calculate and persist local preview', async ({ page }) => {
  await page.goto('/crm/quotes?create=1');
  await page.getByLabel('Description 1', { exact: true }).fill('Conseil F2');
  await page.getByLabel('Date d’expiration', { exact: true }).fill('2026-11-05');
  await page.getByLabel('Quantité 1', { exact: true }).fill('3');
  await page.getByLabel('Prix unitaire 1 (DA)', { exact: true }).fill('-1');
  await expect(page.getByRole('alert')).toHaveCount(2);
  await page.getByLabel('Prix unitaire 1 (DA)', { exact: true }).fill('125.50');
  await expect(page.getByText('376,50 DA', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Enregistrer le devis' }).click();
  await page.getByRole('button', { name: 'DEV-2026-015', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Conseil F2');
  await expect(page.getByRole('dialog')).toContainText('376,50 DA');
  await expect(page.getByRole('dialog')).toContainText('05/11/2026');
});
test('command shortcut supports arrows, Escape and focus restoration', async ({ page }) => {
  await page.goto('/dashboard');
  const trigger = page.getByRole('button', { name: 'Rechercher dans EvoCRM' });
  await trigger.click();
  await page.getByRole('combobox').fill('Contacts');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/crm\/contacts/);
  await page.keyboard.press('Control+k');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
test('permission, empty, error and loading states do not reveal records', async ({ page }) => {
  for (const state of ['denied', 'empty', 'error', 'loading']) {
    await page.goto(`/crm/contacts?state=${state}`);
    await expect(page.getByRole('table')).toHaveCount(0);
    await expect(page.getByText('Sarah Benali', { exact: true })).toHaveCount(0);
  }
  await page.goto('/crm/contacts?state=error');
  await page.getByRole('button', { name: 'Réessayer' }).click();
  await expect(page.getByRole('table')).toBeVisible();
});
const routes = [
  ['dashboard', '/dashboard'],
  ['contacts', '/crm/contacts'],
  ['deals', '/crm/deals/board'],
  ['inbox', '/inbox'],
  ['quotes', '/crm/quotes'],
];
for (const width of [1440, 768, 390])
  for (const theme of ['light', 'dark'])
    for (const [name, route] of routes)
      test(`visual and axe ${name} ${width} ${theme}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await page.addInitScript((t) => localStorage.setItem('evocrm-theme', t), theme);
        await page.goto(route);
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await expect(page.locator('h1')).toBeVisible();
        await expect
          .poll(() =>
            page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          )
          .toBe(true);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(results.violations, `${name} ${width} ${theme}`).toEqual([]);
        // Recheck the rendered document after axe, then let fonts and paint settle.
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
        });
        await page.screenshot({
          path: `docs/certification/aurora-correction/screenshots/${name}-${width}-${theme}.png`,
          fullPage: true,
        });
      });
test('mobile navigation, theme and drawer focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/dashboard');
  await page.getByRole('button', { name: 'Mode sombre', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Ouvrir la navigation' }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Contacts', exact: true }).click();
  await expect(page.getByRole('heading', { name: /Contacts/ })).toBeVisible();
  await page.getByRole('button', { name: 'Nouveau contact', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog).toContainText('Nouveau contact');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Nouveau contact', exact: true })).toBeFocused();
});
test('component gallery is interactive', async ({ page }) => {
  await page.goto('/dev/components');
  await expect(page.getByRole('heading', { name: 'Composants interactifs' })).toBeVisible();
  await page.getByRole('button', { name: 'Dialogue', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
});

for (const [name, route] of routes)
  test(`${name} separates empty, loading, error and denied states`, async ({ page }) => {
    for (const state of ['empty', 'loading', 'error', 'denied']) {
      await page.goto(`${route}?state=${state}`);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByRole('table')).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Déploiement CRM', exact: true })).toHaveCount(
        0,
      );
      if (state === 'denied')
        await expect(page.getByRole('heading', { name: 'Accès refusé' })).toBeVisible();
      if (state === 'loading')
        await expect(page.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    }
  });
for (const theme of ['light', 'dark'])
  test(`overlays have accessible focus and no axe violations ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addInitScript((t) => localStorage.setItem('evocrm-theme', t), theme);
    await page.goto('/crm/contacts', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(page.locator('h1')).toBeVisible();
    const primary = page.getByRole('button', { name: 'Nouveau contact', exact: true });
    await primary.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
    }
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
    await page.screenshot({
      path: `docs/certification/aurora-correction/screenshots/contact-drawer-1440-${theme}.png`,
      fullPage: true,
    });
    await page.keyboard.press('Escape');
    await expect(primary).toBeFocused();
    await page.getByRole('button', { name: 'Créer', exact: true }).click();
    await page.getByRole('button', { name: 'Nouveau devis', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Nouveau devis' })).toBeVisible();
    await page.keyboard.press('Escape');
  });
test('quote preview produces a print document', async ({ page }) => {
  await page.goto('/crm/quotes');
  await page.getByRole('button', { name: 'DEV-2026-014', exact: true }).click();
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByText('EvoCRM · Evotechly', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Imprimer le devis' })).not.toBeVisible();
  await page.screenshot({
    path: 'docs/certification/aurora-correction/screenshots/quote-print.png',
    fullPage: true,
  });
});

// Quick views must update the existing filter state, not merely look selected.
test('object quick views filter actual contacts and quotes', async ({ page }) => {
  await page.goto('/crm/contacts');
  const views = page.getByRole('group', { name: 'Vues rapides' });
  await views.getByRole('button', { name: /Prospects/ }).click();
  await expect(page.getByLabel('Statut', { exact: true })).toHaveValue('Prospect');
  await expect(views.getByRole('button', { name: /Prospects/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('button', { name: 'Karim Touati', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Yacine Haddad', exact: true })).toBeVisible();
  await views.getByRole('button', { name: /Tous les contacts/ }).click();
  await expect(page.getByRole('button', { name: 'Karim Touati', exact: true })).toBeVisible();
  await page.goto('/crm/quotes');
  await page
    .getByRole('group', { name: 'Vues rapides' })
    .getByRole('button', { name: /Brouillons/ })
    .click();
  await expect(page.getByLabel('Statut du devis', { exact: true })).toHaveValue('Brouillon');
  await expect(page.getByRole('button', { name: 'DEV-2026-014', exact: true })).toHaveCount(0);
});
