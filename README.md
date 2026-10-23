# EvoCRM Front

Standalone React 19 + TypeScript frontend foundation for EvoCRM 2.0. The repository is intentionally independent from the Laravel/Inertia application and keeps UI, contracts, data adapters, and navigation replaceable.

## Development

`@evotechly/ui` and `@evotechly/brand` are private packages on GitHub Packages (`https://npm.pkg.github.com`). This branch vendors an unpublished **0.3.0** snapshot under `vendor/` (`workspace:*`) so the app can ship the Aurora shell without publishing.

## TODO — switch to GitHub Packages `@evotechly/ui@0.3.0`

`0.3.0` is **not published**. Do not publish the vendor folder. After Brandbook draft PR #13 is approved:

```bash
pnpm add @evotechly/ui@0.3.0
```

Then delete `vendor/UNPUBLISHED-evotechly-ui-0.3.0` and point the app at the registry package. Keep `vercel.json` `installCommand` (it still authenticates `@evotechly` on GitHub Packages).

Until then, `pnpm install` resolves `@evotechly/ui` and `@evotechly/brand` from the workspace. The committed `.npmrc` keeps the `@evotechly` registry mapping for the future switch. pnpm 11.25.0 does not expand `${NODE_AUTH_TOKEN}` from that file, so write a GitHub classic PAT with `read:packages` into your user config when you consume the published packages (never commit the token):

```bash
export NODE_AUTH_TOKEN=ghp_your_classic_token_with_read_packages
pnpm config set "//npm.pkg.github.com/:_authToken" "$NODE_AUTH_TOKEN"
pnpm install --frozen-lockfile
pnpm run dev
```

Vercel uses the same `pnpm config set` step in `vercel.json` `installCommand`, reading `NODE_AUTH_TOKEN` from the project environment variables.

Open [http://localhost:5173](http://localhost:5173).

Quality commands: `pnpm run typecheck`, `pnpm run lint`, `pnpm run test`, `pnpm run build`, and `pnpm run test:e2e`.

## Architecture

- `src/contracts` — domain, screen, and permission contracts shared with future Inertia integration.
- `src/adapters/mock` — local fixtures and repositories used by the standalone app.
- `src/adapters/inertia` — integration seam; no backend endpoints are invented here.
- `src/components` — router-agnostic Aurora UI and CRM building blocks.
- `src/pages` — route-level compositions for documented screen IDs.
- `docs/architecture` — source-of-truth traceability to EvoCrm/Screen and Brandbook.

The initial shell follows the documented `simple_mode=true` navigation: Accueil, Contacts, Deals, Inbox, Quotes, plus Settings. Advanced Mode reveals the remaining documented product areas without changing the underlying route contract.

## Design system

The app consumes **EvoUI 0.3.0** (vendored Brandbook PR #13 `packages/ui`, unpublished) and Brand 2.0 tokens:

- `@evotechly/ui@0.3.0` — workspace snapshot of the official 113-component library (`import { EvoButton, EvoInput } from '@evotechly/ui'`, `import '@evotechly/ui/styles.css'`, catalog in `@evotechly/ui/catalog.json`). CRM-only blocks live in `src/components/crm` as compositions of those primitives.
- `@evotechly/brand@2.0.0` — workspace snapshot (`@evotechly/brand/tokens.css`, `@evotechly/brand/theme.css`)

Set `<html data-product="crm" data-theme="light">`. Aurora CRM shell: 212px dark sidebar + light workspace, paper `#EAEAEA`, ink `#0D1B24`, orange `#D9500F` for primary actions only, teal for selection. Do not use retired hexes (`#EC6025`, `#111111`, `#000000`, `#2E3A45`, and the rest of Brandbook `RETIRED.md`).

Production copy is French. Demo organisations: Clinique El Djazair, Hôpital Ibn Sina, Cabinet Dr. Amrani, Pharmacie Centrale.

## Integration strategy

Standalone development provides a `RouterNavigationAdapter` and mock repositories. Production will provide an Inertia navigation adapter and page-prop-backed repositories at the application boundary. Components do not import Inertia, Laravel globals, or production endpoints.

## Aurora Next F2

The first visual treatment was rejected. The current [Aurora correction](docs/certification/aurora-correction/report.md) restores Brandbook identity with Impeccable and real Mobbin HubSpot/Salesforce research. User visual approval remains pending.

Five interactive mock screens share a session-data provider, capability gates, semantic light/dark tokens, accessible overlays and typed CRM components. Edits reset on reload; no backend persistence or external message sending is simulated as real.

- Interactive development gallery: `/dev/components`.
- Development states: `?state=empty|loading|error|denied`; create: `?create=1` on Contacts, Deals and Quotes.
- [Component contracts](docs/design-system/components.md), [source map](docs/design-system/component-source-map.md), [baseline audit](docs/certification/f2-baseline-audit.md).
- [Visual certification](docs/certification/f2-visual-report.md) and [F2 report](docs/certification/f2-report.md).

Use Node 22.12+ and pnpm 11.25.0. The production build excludes the gallery/state preview controls. The provided Figma reference is a concept direction; approved five-screen parity remains pending.
