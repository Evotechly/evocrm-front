# @evotechly/ui 0.3.0 — agent notes

Unpublished snapshot consumed by EvoCRM via `workspace:*`. **Do not publish.**

Official Brandbook docs live on Evotechly/Brandbook draft PR #13 (`packages/ui/AGENTS.md`, `llms.txt`, `docs/components/`, `src/catalog.json`). That private repo was not cloneable here; this snapshot documents the surface actually shipped in `src/index.ts` and `src/catalog.json`.

## Consume

```ts
import { Button, Sidebar, DataTable, KanbanBoard } from '@evotechly/ui';
import '@evotechly/ui/styles.css';
```

Set `<html data-product="crm" data-theme="light|dark">`.

CRM tokens: paper `#EAEAEA`, ink `#0D1B24`, orange `#D9500F` (primary actions only), teal for selection. Sidebar width: 212px dark rail.

## TODO

Replace this workspace package with `@evotechly/ui@0.3.0` from GitHub Packages after Brandbook approval.
