# Aurora correction — reviewable revision

19 October 2026 · Branch `feature/aurora-next-foundation` · [PR #1](https://github.com/Evotechly/evocrm-front/pull/1), kept open in draft. The exact pushed commit is reported in the handback and PR head.

**F2: PENDING user visual approval and approved five-screen Figma comparison.** The previous visual treatment was explicitly rejected. Historical reports are labeled accordingly; functional PASS results never constitute design approval.

## Architecture and component changes

Restored authoritative Aurora teal identity, voltage indigo actions/focus, cool work surfaces, Geist typography and complete semantic night roles. Shared navigation, tables, cards, boards, forms and overlays use one visual layer. The full-width demonstration banner and simulation badge use accessible pink roles derived from canonical state-demo #DB2777.

Added typed `ObjectViews`, driving actual Contacts/Quotes filters and fixture-backed counts. Refined StatCard/KPICard with a `monetary` variant, shared financial/date formatting and a fixture-derived pipeline ring paired with readable stage values. Complete absolute dates display DD/MM/YYYY; money retains two decimals and Geist Mono/tabular figures. The development gallery demonstrates the monetary variant. [Component contracts](../../design-system/components.md) and [source map](../../design-system/component-source-map.md) document reuse and state ownership.

Header context receives a typed pathname from the layout boundary. Original fixtures, contracts, repositories and Inertia adapters are unchanged. React 19, TypeScript, Vite 8 and Tailwind 4 remain. No runtime dependency was added. Tailwind now scans application source only; Vite ignores tool/docs/evidence directories. CSS output decreased from 53.20 kB to 46.17 kB after excluding non-application content.

## Impeccable, Mobbin and Shoogle

Executed `npx --yes impeccable@4.6.0 install --providers=codex --project --yes`; engine0.1.15. Applied its context, direction, craft-floor, detector, independent finish review and documenter workflows. Package source, Apache-2.0 license and integrity are recorded in [package metadata](impeccable-package.json) and docs/licenses. The platform binary is installed locally and gitignored; no tool runtime ships in the CRM.

Real Mobbin MCP searches and returned-image inspection covered HubSpot contacts, deals and inbox, plus Salesforce sales summaries and record hierarchy. The quote query returned a price-book modal, which was explicitly rejected as a quote-editor reference. [Research and exact reference links](../../research/aurora-correction.md), [raw Mobbin metadata](../../research/aurora-correction-mobbin.json), [verified Brandbook source](../../research/aurora-brandbook-source.json).

No new Shoogle runtime candidate was adopted in this correction. Existing verified primitives and original components were retained. Prior real MCP discovery, upstream license checks and adoption/rejection decisions remain in [Shoogle selection](../../research/shoogle-component-selection.md) and [registry](../../design-system/shoogle-registry.md). No unverified dependency was installed.

## Five-screen checks

| Screen | Successfully executed interaction/state checks | Visual user approval |
|---|---|---|
| Dashboard | PASS — navigation, fixture rendering, state separation, all viewport/theme checks | PENDING |
| Contacts | PASS — create/edit, search/filter, columns, details, quick views | PENDING |
| Deals | PASS — drag and keyboard stage changes, totals, create, board/list | PENDING |
| Inbox | PASS — simulated replies and selected-thread separation | PENDING |
| Quotes | PASS — centime calculations, local create/preview, expiry formatting, filters, print | PENDING |

All five have populated/empty/loading/error/denied development previews. These statuses describe executed checks, not exhaustive manual certification. Mock changes remain session-local; sending is simulated. No payment or backend persistence workflow was invented.

## Screenshots and visual comparison

All 30 screen/theme/viewport captures were inspected by the independent reviewer and checked for freshness, dimensions and nonblank pixels. Two drawer captures and a print capture bring the final set to 33. [Manifest](screenshot-manifest.json), [30-screen validity checks](capture-validity.json).

| Screen | Desktop | Tablet | Mobile |
|---|---|---|---|
| Dashboard | [Light](screenshots/dashboard-1440-light.png) · [Dark](screenshots/dashboard-1440-dark.png) | [Light](screenshots/dashboard-768-light.png) · [Dark](screenshots/dashboard-768-dark.png) | [Light](screenshots/dashboard-390-light.png) · [Dark](screenshots/dashboard-390-dark.png) |
| Contacts | [Light](screenshots/contacts-1440-light.png) · [Dark](screenshots/contacts-1440-dark.png) | [Light](screenshots/contacts-768-light.png) · [Dark](screenshots/contacts-768-dark.png) | [Light](screenshots/contacts-390-light.png) · [Dark](screenshots/contacts-390-dark.png) |
| Deals | [Light](screenshots/deals-1440-light.png) · [Dark](screenshots/deals-1440-dark.png) | [Light](screenshots/deals-768-light.png) · [Dark](screenshots/deals-768-dark.png) | [Light](screenshots/deals-390-light.png) · [Dark](screenshots/deals-390-dark.png) |
| Inbox | [Light](screenshots/inbox-1440-light.png) · [Dark](screenshots/inbox-1440-dark.png) | [Light](screenshots/inbox-768-light.png) · [Dark](screenshots/inbox-768-dark.png) | [Light](screenshots/inbox-390-light.png) · [Dark](screenshots/inbox-390-dark.png) |
| Quotes | [Light](screenshots/quotes-1440-light.png) · [Dark](screenshots/quotes-1440-dark.png) | [Light](screenshots/quotes-768-light.png) · [Dark](screenshots/quotes-768-dark.png) | [Light](screenshots/quotes-390-light.png) · [Dark](screenshots/quotes-390-dark.png) |


[Drawer light](screenshots/contact-drawer-1440-light.png) · [Drawer dark](screenshots/contact-drawer-1440-dark.png) · [Quote print](screenshots/quote-print.png).

Approved Figma parity: **PENDING**. Existing Figma evidence does not establish five approved final Aurora targets. These are browser-rendered proposals, not pixel-perfect certification. Brandbook source was verified against main commit f240ffe426b1e62a086f889576102af665e301b6 and its exact DESIGN.md blob; it was not modified.

## Verification

| Check | Result |
|---|---|
| TypeScript | PASS — current production build includes tsc |
| ESLint | PASS — application checked; installed vendor tooling excluded |
| Vitest | PASS —16 tests/4 files, including centime and display regressions |
| Vite production build | PASS — [build log](build.log) |
| Browser case coverage | PASS —49 current cases have successful executions across final full run and targeted reruns |
| All 30 route/theme/viewport axe and document-overflow checks | PASS |
| Overlay focus, Escape/return and axe | PASS — independent light/dark cases |
| Impeccable finish review | ship — four scored fixes resolved; user approval remains PENDING |
| Source-derived DESIGN.md and sidecar | PASS — ten component examples |
| Updated remote CI | PENDING at report creation; observed post-push result is reported in handback; [live PR checks](https://github.com/Evotechly/evocrm-front/pull/1/checks) |
| Manual screen-reader certification | NOT RUN |

The final full local run executed48 cases:47 PASS and one90-second combined-theme overlay timeout. Its retained trace showed navigation/reloads consumed most of the budget. Replaced that group with two independent cases, setting the theme before a single navigation; both executed PASS. All original focus/axe/create-menu checks remain. Thus49 current cases are covered; this is **not a claim of one clean local49-case run**. [Per-case successful coverage](successful-coverage.json), [full final run](browser-isolated-results.json), [overlay reruns](browser-overlay-results.json), [trace summary](overlay-trace-summary.json), [quality summary](quality-results.json), [lint log](lint.log).

Earlier failures remain in the raw reports: first correction run found inbox contrast4.33:1; corrected the shared foreground. A blank dark-dashboard image was rejected by the reviewer and recaptured, and the harness gained post-axe heading/theme/font/paint readiness. Cold readiness and overly grouped state tests were corrected; a new quick-view test's pagination assumption was fixed. The first post-review run recorded46 PASS/2 readiness FAIL; tool/evidence isolation preceded the final run, whose30 image checks passed. Raw reports preserve those failures: browser-results.json, browser-rerun-results.json, browser-recapture-results.json, browser-post-review-results.json. No failed execution is relabeled PASS.

## Independent finish and remaining work

The fresh reviewer first required recapture, then identified four material fixes: monetary Mono, readable selected scopes, canonical locale display and the distinct demonstration state. All four were resolved in the scored verdict, with no visible material regression. **Disposition: ship, covering those four fixes only.** The documenter extracted token-bearing root DESIGN.md and .impeccable/design.json from finished source. [Review record](finish-review.md).

Known limits: visual approval and approved Figma comparisons remain PENDING; manual screen-reader checks are NOT RUN; native date-calendar chrome follows browser locale. The five-screen frontend remains a fixture-backed demonstration with no backend persistence or real sending. No production EvoCrm or Brandbook files changed; no merge or deployment occurred.

Recommended next wave: review this Aurora proposal, establish the five approved Figma targets and close comparison/manual accessibility gaps, then extend remaining CRM modules using the documented components and eventual Inertia integration boundary.
