# @evotechly/ui

EvoUI **0.3.0** — 113 React components for Evotechly Design System 2.0, classified in 12 categories.

The library does not depend on EvoCRM. Style comes from Brandbook tokens. Activate a product with `<html data-product="crm" data-theme="light">`.

## Install

```bash
npm install @evotechly/ui@0.3.0 @evotechly/brand@^2.0.0
```

```ts
import "@evotechly/ui/styles.css";
import { EvoButton } from "@evotechly/ui";
```

`dist/styles.css` inlines DS 2.0 tokens. Agents: read [AGENTS.md](./AGENTS.md) and [llms.txt](./llms.txt). Index: [src/catalog.json](./src/catalog.json). Attribution: [NOTICE](./NOTICE).

## Scripts

```bash
npm test
npm run test:e2e
npm run build
npm run dev
```

Showcase: `npm run dev` → http://127.0.0.1:4177
