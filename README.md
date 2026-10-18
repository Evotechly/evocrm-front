# EvoCRM Front

Standalone React 19 + TypeScript frontend foundation for EvoCRM 2.0. The repository is intentionally independent from the Laravel/Inertia application and keeps UI, contracts, data adapters, and navigation replaceable.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Quality commands: `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build`, and `npm run test:e2e`.

## Architecture

- `src/contracts` — domain, screen, and permission contracts shared with future Inertia integration.
- `src/adapters/mock` — local fixtures and repositories used by the standalone app.
- `src/adapters/inertia` — integration seam; no backend endpoints are invented here.
- `src/components` — router-agnostic Aurora UI and CRM building blocks.
- `src/pages` — route-level compositions for documented screen IDs.
- `docs/architecture` — source-of-truth traceability to EvoCrm/Screen and Brandbook.

The initial shell follows the documented `simple_mode=true` navigation: Accueil, Contacts, Deals, Inbox, Quotes, plus Settings. Advanced Mode reveals the remaining documented product areas without changing the underlying route contract.

## Design system

Aurora tokens are synchronized from Evotechly Brandbook `main` at the documented source snapshot recorded in `docs/design-system/aurora.md`. The first foundation uses semantic CSS variables; component code does not hardcode Brandbook colors.

## Integration strategy

Standalone development provides a `RouterNavigationAdapter` and mock repositories. Production will provide an Inertia navigation adapter and page-prop-backed repositories at the application boundary. Components do not import Inertia, Laravel globals, or production endpoints.
