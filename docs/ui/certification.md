# Evotechly UI certification

Date: 23 October 2026, Africa/Algiers. Branch `feature/evotechly-ui-component-library`.

Automated checks are not a WCAG certification. Manual screen-reader review was not run.

## Package checks

| Check | Result | Notes |
|---|---|---|
| TypeScript `@evotechly/ui` | PASS | `pnpm --filter @evotechly/ui typecheck` |
| TypeScript root CRM | PASS | `pnpm run typecheck` |
| ESLint | PASS | `pnpm run lint` |
| Unit / interaction tests | PASS | 20 tests in `packages/ui/tests` |
| Accessibility (axe unit) | PASS | Form cluster; critical/serious empty |
| Accessibility (axe browser) | PASS | Showcase Chromium, wcag2a/aa, no critical on 11 pages |
| Production build UI | PASS | tsup ESM + d.ts, 45.71 KB JS |
| Showcase production build | PASS | Vite |
| Consumer production build | PASS | Vite |
| Package exports | PASS | `dist/index.js` + `dist/index.d.ts` |
| Consumer tarball install | PASS | Fresh `pnpm add evotechly-ui-0.1.0.tgz` imported `Button` |
| Visual screenshots | PASS | `docs/ui/screenshots/` (not a pixel-diff suite) |
| Pixel visual regression | BLOCKED | No committed goldens for `@evotechly/ui` yet |
| Forgejo registry | BLOCKED | Not verified; npm `@evotechly/ui` 404 |
| Official Brandbook clone | BLOCKED | `Evotechly/Brandbook` not found with this token |

## Component matrix

| Component | Implemented | Unit | Accessibility | Browser | Documentation |
|---|---|---|---|---|---|
| Button | PASS | PASS | PASS | PASS | PASS |
| IconButton | PASS | PASS | PASS | PASS | PASS |
| ButtonGroup | PASS | PASS | pending | pending | PASS |
| Input | PASS | PASS | PASS | PASS | PASS |
| Textarea | PASS | PASS | pending | pending | PASS |
| Select | PASS | PASS | pending | PASS | PASS |
| Combobox | PASS | PASS | pending | pending | PASS |
| Checkbox | PASS | PASS | PASS | pending | PASS |
| RadioGroup | PASS | PASS | pending | pending | PASS |
| Switch | PASS | PASS | pending | pending | PASS |
| DatePicker | PASS | PASS | pending | PASS | PASS |
| Sidebar | PASS | PASS | pending | PASS | PASS |
| Topbar | PASS | PASS | pending | PASS | PASS |
| Tabs | PASS | PASS | pending | pending | PASS |
| CommandMenu | PASS | PASS | pending | pending | PASS |
| Breadcrumbs | PASS | PASS | pending | pending | PASS |
| DataTable | PASS | PASS | pending | PASS | PASS |
| Badge | PASS | PASS | pending | pending | PASS |
| Avatar | PASS | PASS | pending | pending | PASS |
| Pagination | PASS | PASS | pending | pending | PASS |
| EmptyState | PASS | PASS | pending | pending | PASS |
| Skeleton | PASS | PASS | pending | pending | PASS |
| Dialog | PASS | PASS | pending | PASS | PASS |
| Drawer | PASS | PASS | pending | pending | PASS |
| DropdownMenu | PASS | PASS | pending | pending | PASS |
| Tooltip | PASS | pending | pending | pending | PASS |
| Popover | PASS | pending | pending | pending | PASS |
| Toast | PASS | pending | pending | PASS | PASS |
| Alert | PASS | PASS | pending | pending | PASS |
| Progress | PASS | PASS | pending | pending | PASS |
| Spinner | PASS | PASS | pending | pending | PASS |

`pending` means that check was not executed for that component. Home listing of all 31 cards did pass in the browser.

## Remaining issues

- Official Brandbook repository and published `@evotechly/brand` are unavailable; tokens are a local snapshot of DESIGN.md / Aurora 1.1.0.
- Evopulse and EvoRail inherit Suite tokens until Brandbook publishes product palettes.
- Pixel visual-regression goldens are not established.
- Several components still need dedicated unit/browser coverage beyond the shared showcase and form-cluster axe run.
- Showcase and consumer bundles are large because they compile the library from source; the packed library itself is 46 KB ESM.
