import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': '/src' } },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: [
        '**/.agents/**',
        '**/.impeccable/**',
        '**/.codex/**',
        '**/docs/**',
        '**/test-results/**',
        '**/playwright-report/**',
      ],
    },
  },
  build: { sourcemap: true },
});
