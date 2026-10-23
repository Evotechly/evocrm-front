# @evotechly/ui 0.3.0 (unpublished snapshot)

Vendored copy of Evotechly UI for EvoCRM. **Do not publish this folder.**

`0.3.0` lives on Evotechly/Brandbook draft PR #13 (`cursor/evoui-v030-a23f`, `packages/ui`). That private repo was not cloneable from this workspace, so this snapshot starts from the `0.1.0` source that already shipped in `evocrm-front` (`feature/evotechly-ui-component-library`) and is expanded for the Aurora CRM shell (212px dark sidebar, orange primary, teal selection, CRM composites).

## TODO

Switch the app dependency to the approved GitHub Packages release once Brandbook 0.3.0 is published:

```bash
pnpm add @evotechly/ui@0.3.0
```

Then delete this `vendor/UNPUBLISHED-evotechly-ui-0.3.0` folder. Keep `vercel.json` `installCommand` (it still authenticates `@evotechly` on GitHub Packages).

## Consume

```ts
import { Button, Sidebar, Topbar } from '@evotechly/ui';
import '@evotechly/ui/styles.css';
```

Set `<html data-product="crm" data-theme="light">`. CRM tokens: paper `#EAEAEA`, ink `#0D1B24`, orange `#D9500F` (primary actions only), teal for selection.
