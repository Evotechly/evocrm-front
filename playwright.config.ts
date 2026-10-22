import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5173';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 90000,
  // Allow cold Vite/React initialization on shared CI workers; assertions stay bounded.
  expect: { timeout: 15000 },
  use: { baseURL, trace: 'retain-on-failure' },
  webServer:
    baseURL === 'http://127.0.0.1:5173'
      ? { command: 'pnpm dev -- --host 127.0.0.1', url: baseURL, reuseExistingServer: true }
      : undefined,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
