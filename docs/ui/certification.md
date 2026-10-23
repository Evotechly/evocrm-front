# Evotechly UI certification

Date: 23 October 2026, Africa/Algiers. Branch `feature/evotechly-ui-component-library`.

Automated checks are not a WCAG certification. Manual screen-reader review was not run.

## Package checks

| Check | Result | Notes |
|---|---|---|
| TypeScript `@evotechly/ui` | PASS | `pnpm --filter @evotechly/ui typecheck` |
| TypeScript root CRM | PASS | `pnpm run typecheck` |
| ESLint | PASS | `pnpm run lint` |
| Unit / interaction tests | PASS | Unit files in `packages/ui/tests` cover all 31 primitives including Tooltip, Popover, Toast |
| Accessibility (axe unit) | PASS | Form cluster plus display/feedback cluster plus overlay triggers; critical/serious empty |
| Accessibility (axe browser) | PASS | Showcase Chromium, wcag2a/aa, no critical on home + all 31 component pages |
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
| ButtonGroup | PASS | PASS | PASS | PASS | PASS |
| Input | PASS | PASS | PASS | PASS | PASS |
| Textarea | PASS | PASS | PASS | PASS | PASS |
| Select | PASS | PASS | PASS | PASS | PASS |
| Combobox | PASS | PASS | PASS | PASS | PASS |
| Checkbox | PASS | PASS | PASS | PASS | PASS |
| RadioGroup | PASS | PASS | PASS | PASS | PASS |
| Switch | PASS | PASS | PASS | PASS | PASS |
| DatePicker | PASS | PASS | PASS | PASS | PASS |
| Sidebar | PASS | PASS | PASS | PASS | PASS |
| Topbar | PASS | PASS | PASS | PASS | PASS |
| Tabs | PASS | PASS | PASS | PASS | PASS |
| CommandMenu | PASS | PASS | PASS | PASS | PASS |
| Breadcrumbs | PASS | PASS | PASS | PASS | PASS |
| DataTable | PASS | PASS | PASS | PASS | PASS |
| Badge | PASS | PASS | PASS | PASS | PASS |
| Avatar | PASS | PASS | PASS | PASS | PASS |
| Pagination | PASS | PASS | PASS | PASS | PASS |
| EmptyState | PASS | PASS | PASS | PASS | PASS |
| Skeleton | PASS | PASS | PASS | PASS | PASS |
| Dialog | PASS | PASS | PASS | PASS | PASS |
| Drawer | PASS | PASS | PASS | PASS | PASS |
| DropdownMenu | PASS | PASS | PASS | PASS | PASS |
| Tooltip | PASS | PASS | PASS | PASS | PASS |
| Popover | PASS | PASS | PASS | PASS | PASS |
| Toast | PASS | PASS | PASS | PASS | PASS |
| Alert | PASS | PASS | PASS | PASS | PASS |
| Progress | PASS | PASS | PASS | PASS | PASS |
| Spinner | PASS | PASS | PASS | PASS | PASS |

Browser accessibility is axe on each showcase page (wcag2a/aa, no critical). Unit accessibility is vitest-axe on form, display/feedback, and overlay clusters. Manual screen-reader review was not run.

## Remaining issues

- Official Brandbook repository and published `@evotechly/brand` are unavailable; tokens are a local snapshot of DESIGN.md / Aurora 1.1.0.
- Literal `ui-collection.zip` was not attached. Sources used are the extracted tree in `docs/ui-collection/` (255 files).
- Evopulse and EvoRail inherit Suite tokens until Brandbook publishes product palettes.
- Pixel visual-regression goldens are not established.
- Literal `ui-collection.zip` was not attached. Sources used are the extracted tree in `docs/ui-collection/` (255 files).
- Showcase and consumer bundles are large because they compile the library from source; the packed library itself is 46 KB ESM.
