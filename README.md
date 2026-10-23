# EvoCRM Front

Standalone React 19 + TypeScript frontend foundation for EvoCRM 2.0. The repository is intentionally independent from the Laravel/Inertia application and keeps UI, contracts, data adapters, and navigation replaceable.

## Development

`@evotechly/ui` and `@evotechly/brand` are private packages on GitHub Packages (`https://npm.pkg.github.com`). Local installs and Vercel builds need **`NODE_AUTH_TOKEN`**: a GitHub classic personal access token with `read:packages`. The project `.npmrc` reads that env var and never stores a token.

```bash
export NODE_AUTH_TOKEN=ghp_your_classic_token_with_read_packages
pnpm install --frozen-lockfile
pnpm run dev
```

If the lockfile was generated without registry auth, regenerate it after setting the token:

```bash
export NODE_AUTH_TOKEN=ghp_your_classic_token_with_read_packages
# pnpm 11 does not expand ${NODE_AUTH_TOKEN} from the project .npmrc (it ignores
# committed registry credentials). npm and Vercel do expand it. For local pnpm:
pnpm config set "//npm.pkg.github.com/:_authToken" "$NODE_AUTH_TOKEN"
pnpm install
```

This PR could not regenerate `pnpm-lock.yaml` against GitHub Packages (no `read:packages` token in this environment). After you set `NODE_AUTH_TOKEN`, run `pnpm install` and commit the updated lockfile so `pnpm install --frozen-lockfile` matches `@evotechly/ui@0.1.0` and `@evotechly/brand@^2.0.0`.

On Vercel, add `NODE_AUTH_TOKEN` as a project environment variable (same classic token, `read:packages`) so installs can reach `https://npm.pkg.github.com`. Vercel’s npm client expands `${NODE_AUTH_TOKEN}` from `.npmrc`.

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

The app consumes published **Design System 2.0** packages:

- `@evotechly/ui@0.1.0` — React primitives (`import { Button } from '@evotechly/ui'`, `import '@evotechly/ui/styles.css'`)
- `@evotechly/brand@^2.0.0` — tokens (`@evotechly/brand/tokens.css`, Tailwind `@evotechly/brand/theme.css`)

Set `<html data-product="crm" data-theme="light">`. EvoCRM palette from DS 2.0: paper `#EAEAEA`, ink `#0D1B24`, orange `#D9500F`. Do not use retired hexes (`#EC6025`, `#111111`, `#000000`, `#2E3A45`, and the rest of Brandbook `RETIRED.md`).

Shared primitives (buttons, inputs, checkboxes, dialogs, drawers, popovers, tooltips, toasts, badges, avatars, empty states) come from `@evotechly/ui`. CRM-specific composites, native selects/date fields, and the typed DataTable stay local because their APIs are not a straight swap. Details are in the adoption PR.

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
