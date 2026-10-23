# EvoUI 0.3.0 — agent contract

React component library for Evotechly Design System 2.0. One package, many products. **Do not depend on EvoCRM or any product app.**

## Install

```bash
npm install @evotechly/ui@0.3.0 @evotechly/brand@^2.0.0
```

```tsx
import "@evotechly/ui/styles.css";
import { EvoButton, EvoInput } from "@evotechly/ui";
```

Activate a product on the document:

```html
<html data-product="crm" data-theme="light">
```

`data-product` values: `suite`, `crm`, `track`, `stock`, `scan`, `archive`, `finance`, `hr`, `commerce`, `compta`, `paie`, `project`.  
`data-theme`: `light` | `dark`.

## Import paths

- Package entry: `@evotechly/ui`
- Styles: `@evotechly/ui/styles.css` (tokens inlined at build)
- Catalog: `@evotechly/ui/catalog.json` or `packages/ui/src/catalog.json`
- Per-component docs: `packages/ui/docs/components/<slug>.md`
- Source: `packages/ui/src/components/<category>/<slug>.tsx`

Every component is exported as `EvoName` and as an unprefixed alias (`Button`, `Input`, …).

## API

Shared props (when the control supports them):

| Prop | Values | Notes |
|------|--------|-------|
| `size` | `sm` `md` `lg` | 28 / 36 / 44 |
| `variant` | `primary` `secondary` `outline` `ghost` `danger` `link` | One primary CTA per view |
| `tone` | `neutral` `brand` `success` `warning` `danger` `info` | Never color alone |
| `asChild` | boolean | Radix Slot on triggers |

## Tokens (MUST)

- Page / paper: `--bg` / `--surface` / `--brand-paper`
- Body: `--text`
- Primary fill: `--brand-actionA11y` + `--brand-actionFg`
- Brand text on surface: `--brand-text`
- Focus: 2px `--brand-action` with 2px offset (inputs: 3px `--brand-selection`)
- Geist / Geist Mono. 4pt grid. Radii 4 / 6 / 8 / 12
- CRM locked pair: paper `#EAEAEA`, ink `#0D1B24`, orange `#D9500F` via `data-product="crm"`

## MUST

- MUST use tokens, never raw hex in product UI.
- MUST set `data-product` + `data-theme`.
- MUST label icon-only controls (`aria-label` or `EvoIconButton label`).
- MUST keep dialogs modal (`aria-modal`, titled, focus trap).
- MUST honor `prefers-reduced-motion`.

## NEVER

- NEVER hard-code hex / rgb / `bg-[#…]` for brand or neutrals.
- NEVER import from an EvoCRM app package.
- NEVER add AGPL code or three.js.
- NEVER edit generated Brandbook token files.
- NEVER publish, merge to `main`, or move the `v2.0.0` tag from this package bump.

## Categories (113)

Foundations 10 · Layout & shell 9 · Navigation 6 · Forms & inputs 24 · Data display 10 · Tables 7 · Charts & KPIs 9 · Feedback 5 · Overlays 6 · CRM domain 15 · Auth & settings 8 · Empty & onboarding 4

See `src/catalog.json` for slugs, licenses, and registry URLs.

## Commands

```bash
npm test --prefix packages/ui
npm run test:e2e --prefix packages/ui
npm run build --prefix packages/ui
```
