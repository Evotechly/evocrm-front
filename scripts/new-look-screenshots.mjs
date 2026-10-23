import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const pages = [
  ['login', '/login'],
  ['dashboard', '/dashboard'],
  ['contacts', '/crm/contacts'],
  ['deals', '/crm/deals'],
  ['pipeline', '/crm/deals/board'],
  ['inbox', '/inbox'],
  ['quotes', '/crm/quotes'],
  ['settings', '/settings'],
];

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5173';

await mkdir('docs/screenshots', { recursive: true });
const browser = await chromium.launch();

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  await context.addInitScript((mode) => {
    localStorage.setItem('evocrm-theme', mode);
    localStorage.setItem('evotechly-ui-theme', JSON.stringify({ mode, product: 'crm' }));
  }, theme);
  const page = await context.newPage();
  for (const [name, route] of pages) {
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    await page.locator('html').waitFor();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    });
    const path = `docs/screenshots/new-look-${name}-${theme}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log(path);
  }
  await context.close();
}

await browser.close();
