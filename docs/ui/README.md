# @evotechly/ui

Evotechly component library for Brandbook 2.0. Version `0.1.0` is prepared but not published.

## Why this lives in evocrm-front

`https://github.com/Evotechly/Brandbook` was not cloneable with this workspace token (`repository not found`). `@evotechly/brand@2.0.0` is not on npm. Tokens are a local workspace package generated from the verified Aurora DESIGN.md snapshot recorded in `docs/research/aurora-brandbook-source.json`.

Do not treat this as a silent substitute for the official Brandbook repository. When Brandbook is reachable, move `packages/brand` and `packages/ui` there and replace the workspace dependency with the published package.

## Install (workspace)

```bash
pnpm install
pnpm --filter @evotechly/brand build
pnpm --filter @evotechly/ui build
```

Consumer apps:

```ts
import '@evotechly/ui/styles.css';
import { EvotechlyUIProvider, Button } from '@evotechly/ui';
```

## Install from a packed tarball

```bash
pnpm --filter @evotechly/ui build
pnpm --filter @evotechly/ui pack
# in another app
pnpm add ./evotechly-ui-0.1.0.tgz
```

`examples/consumer` is the out-of-tree integration surface. It uses the workspace package during development and `scripts/verify-consumer-tarball.sh` for a packed install.

## Themes

`EvotechlyUIProvider` sets `data-theme` (`light` | `dark`) and `data-product` (`suite` | `evocrm` | `evopulse` | `evorail`). Evopulse and EvoRail inherit Suite tokens until Brandbook publishes product palettes.

## Showcase

```bash
pnpm --filter @evotechly/ui-showcase dev
```

http://localhost:5174
