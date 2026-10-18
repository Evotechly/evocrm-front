import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5173';
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 90000,
  use: { baseURL, trace: 'on-first-retry' },
  webServer:
    baseURL === 'http://127.0.0.1:5173'
      ? { command: 'npm run dev -- --host 127.0.0.1', url: baseURL, reuseExistingServer: true }
      : undefined,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
