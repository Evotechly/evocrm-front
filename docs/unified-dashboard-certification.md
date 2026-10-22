# EvoCRM unified dashboard certification

Date: 2026-10-23
Preview: http://localhost:5173/dashboard
Scope: EvoCRM F2 frontend on `feature/aurora-next-foundation`, starting from `0a9d86dbd61ebd44cdf0a8adb598352bce068c85`.

## Outcome

The dashboard is implemented as one unified EvoCRM workspace. It keeps the guided, contextual feel of HubSpot and the pipeline, KPI, and prioritisation depth associated with Salesforce without exposing a permanent Salesforce/HubSpot layout switch.

The work remains local to the feature branch. No pull request state was changed; no merge or deployment was performed.

## Implemented dashboard hierarchy

- `Accueil` / “Bonjour Mohamed” with a daily attention subtitle and date-range filter.
- Daily priorities for follow-ups, conversations, and opportunities.
- Four decision-useful KPIs: open pipeline, won revenue, pending quotes, and conversion rate.
- Pipeline intelligence with stage totals and deal cards.
- Activity feed and next actions with working task checkboxes.
- Priority deals table with value, stage, owner, and next action.
- Working navigation for Inbox, contacts, deals, quotes, reports, and pipeline actions.
- Empty-state behavior uses zero-state copy and does not invent revenue or activity.

## Design-system audit

- Geist Sans and Geist Mono are used through the existing local font assets.
- Palette uses near-white surfaces, dark black ink, semantic accessible orange text, and the requested bright orange CTA token.
- Borders use the existing neutral border roles; controls retain the existing 8px-radius vocabulary.
- No new gradients, glass effects, decorative shadows, or permanent layout-switch UI were added to the unified dashboard.
- The Evotechly logo remains in the application shell.
- Existing local primitives were reused: `Button`, `Panel`, `StatusBadge`, `Select`, `ScreenState`, and the existing CRM provider/navigation contracts.

## Component selection

The Shoogle research candidates are recorded in [the layout blueprint](./evocrm-layout-blueprint.md). No external UI dependency was added. The existing local component system already covers the certified dashboard surface; the Shoogle candidates remain optional future extraction targets and require license review before production adoption.

Selected candidates documented for future use:

- `@intentui/sidebar`
- `@hirael/command-palette`
- `@shadcncraft/kanban-1`
- `@hirael/data-table` / `@data-table-filters/data-table`
- `@data-table-filters/data-table-sheet`
- `@cult-ui/halo-toast`
- Recharts-based chart components

Dependencies added: none.

## Verification evidence

| Area | Result | Evidence |
| --- | --- | --- |
| TypeScript | PASS | `pnpm typecheck` |
| ESLint | PASS | `pnpm lint` |
| Unit/component | PASS | `pnpm test` — 18 tests passed |
| Production build | PASS | `pnpm build` — Vite build completed |
| Functional browser flow | PASS | Full Playwright suite — 52 tests passed |
| Responsive smoke | PASS | Existing F2 matrix plus dashboard check passed at 1440px, 768px, and 390px; 390px had no horizontal overflow |
| Automated accessibility | PASS | Full Playwright axe coverage reported zero violations |
| Desktop visual review | PASS | Local browser preview reviewed at `/dashboard` |
| Runtime performance | PARTIAL | Production output measured at 493.32 kB JS / 148.62 kB gzip and 54.29 kB CSS / 10.94 kB gzip; no runtime profiler or production telemetry was available |
| Backend/integration | NOT RUN | Preview uses the repository’s local CRM fixtures and does not certify Laravel/API persistence or external integrations |

## Responsive target matrix

The layout uses fluid grid columns, a horizontal overflow container for the dense priority table, and mobile rules that collapse the dashboard into a single column. The automated smoke check covers 390px. The 320px, 768px, 1024px, 1280px, and 1440px targets should receive a final browser screenshot pass in the connected product environment before release sign-off.

## Provenance

The actual checkout at `/home/mohamed/evocrm-front` was verified clean on `feature/aurora-next-foundation` at `0a9d86d` before changes were applied. The final commit SHA is recorded by Git after the commit is created and pushed.

## Production blockers

This is a frontend preview certification, not a production deployment certification. Before release, the owning repository environment must provide valid Git metadata and certify the requested branch/SHA, then run the backend integration, persistence, authenticated permission, full responsive screenshot matrix, and production performance checks. No deployment or merge was attempted.

## Changed files

- `src/pages/dashboard/DashboardPage.tsx`
- `src/pages/dashboard/UnifiedDashboardLayout.tsx` (renamed from `HubSpotLayout.tsx`)
- `src/styles/index.css`
- `src/styles/tokens.css`
- `src/tests/setup.ts`
- `src/pages/dashboard/UnifiedDashboardLayout.test.tsx`
- `tests/e2e/dashboard.spec.ts`
- `playwright.config.ts`
- `docs/evocrm-layout-blueprint.md`
- `docs/unified-dashboard-certification.md`
