> Historical evidence: the user rejected this visual design on 19 October 2026. Earlier PASS labels do not constitute visual approval. See the [Aurora correction and fresh evidence](aurora-correction/report.md).

# F2 visual certification — 2026-10-18

Overall approved-design parity: **PENDING**. Browser evidence is real, not a claim of pixel-perfect equivalence.

## Figma evidence and status

Figma MCP access PASS. `get_design_context` read node [24:3](https://www.figma.com/design/sJvwnlvGMe8D1Th86CVF9U/?node-id=24-3) with screenshot. Its own label is **Concept direction only**. It specifies restraint, relationships, keyboard speed, business outcomes, Ink/Orange/hairline and 8px radii. It uses Inter; Brandbook explicitly requires Geist with Inter fallback, so Geist wins.

The wider file was inspected with metadata for page 0:1. It also contains a static visual handoff of earlier **captured runtime** screens. These are image-based references, not approved editable Aurora Next screen designs. Context and render retrieved individually for all five below. No image from Figma is used as app UI. No screen artwork was traced or copied.

| Screen    | Figma node / local reference render                                                                                | Observed comparison                                                                                                                                                                                                                                                                                    | Approval |
| --------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| Dashboard | [25:70](https://www.figma.com/design/sJvwnlvGMe8D1Th86CVF9U/?node-id=25-70), [render](figma-runtime-dashboard.png) | Earlier capture has KPI row, monthly activity, donut pipeline, recent deals and activation. F2 keeps metric/action hierarchy but replaces unsupported revenue history with fixture-derived distribution bars; clearer tasks and pending quotes. F2 data differs intentionally from production capture. | PENDING  |
| Contacts  | [25:83](https://www.figma.com/design/sJvwnlvGMe8D1Th86CVF9U/?node-id=25-83), [render](figma-runtime-contacts.png)  | Earlier capture is a dense 15-row list with saved views, phone, owner, import/duplicates. F2 uses existing five fixtures, native filters, 3-row pagination for demonstrable interactions and a detail drawer; mobile becomes cards. Production-only fields/actions remain integration work.            | PENDING  |
| Deals     | [25:148](https://www.figma.com/design/sJvwnlvGMe8D1Th86CVF9U/?node-id=25-148), [render](figma-runtime-deals.png)   | Earlier capture has six configurable columns and attention queue. F2 keeps economics above board and stage totals/weighted footers, exposes native keyboard stage change. Four original fixture stages plus empty Lost; not the production pipeline model.                                             | PENDING  |
| Inbox     | [25:266](https://www.figma.com/design/sJvwnlvGMe8D1Th86CVF9U/?node-id=25-266), [render](figma-runtime-inbox.png)   | Capture shows folders, threads and no-selection state. F2 shows local queues/channel filters, selected message thread and customer context; mobile list/thread switch. Channel connectors and tickets are absent from F2 scope.                                                                        | PENDING  |
| Quotes    | [25:220](https://www.figma.com/design/sJvwnlvGMe8D1Th86CVF9U/?node-id=25-220), [render](figma-runtime-quotes.png)  | Capture is a sparse quote list with views and filters. F2 adds meaningful local line editing, centime totals, relationship selection and printable preview; no sending/payment fabrication.                                                                                                            | PENDING  |

[Concept render](figma-direction-24-3.png) · [File structure evidence](figma-file-structure.xml).

## Browser evidence

Playwright captures five screens × three widths × two themes, full-page at a 1000px viewport height. Desktop 1440, tablet 768, mobile 390. The interaction suite additionally captures create drawers and print layout. Screenshot filenames map exactly to the route/theme/width in tests/e2e/f2.spec.ts. Desktop pipeline uses local horizontal board scroll; only the visible viewport columns are pictured. Contact desktop table and quote table retain local horizontal scrolling where needed; contact mobile cards avoid wide identity rows.

| Screen    | Desktop                                                                                     | Tablet                                                                                    | Mobile                                                                                    |
| --------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Dashboard | [Light](screenshots/dashboard-1440-light.png) / [Dark](screenshots/dashboard-1440-dark.png) | [Light](screenshots/dashboard-768-light.png) / [Dark](screenshots/dashboard-768-dark.png) | [Light](screenshots/dashboard-390-light.png) / [Dark](screenshots/dashboard-390-dark.png) |
| Contacts  | [Light](screenshots/contacts-1440-light.png) / [Dark](screenshots/contacts-1440-dark.png)   | [Light](screenshots/contacts-768-light.png) / [Dark](screenshots/contacts-768-dark.png)   | [Light](screenshots/contacts-390-light.png) / [Dark](screenshots/contacts-390-dark.png)   |
| Deals     | [Light](screenshots/deals-1440-light.png) / [Dark](screenshots/deals-1440-dark.png)         | [Light](screenshots/deals-768-light.png) / [Dark](screenshots/deals-768-dark.png)         | [Light](screenshots/deals-390-light.png) / [Dark](screenshots/deals-390-dark.png)         |
| Inbox     | [Light](screenshots/inbox-1440-light.png) / [Dark](screenshots/inbox-1440-dark.png)         | [Light](screenshots/inbox-768-light.png) / [Dark](screenshots/inbox-768-dark.png)         | [Light](screenshots/inbox-390-light.png) / [Dark](screenshots/inbox-390-dark.png)         |
| Quotes    | [Light](screenshots/quotes-1440-light.png) / [Dark](screenshots/quotes-1440-dark.png)       | [Light](screenshots/quotes-768-light.png) / [Dark](screenshots/quotes-768-dark.png)       | [Light](screenshots/quotes-390-light.png) / [Dark](screenshots/quotes-390-dark.png)       |

## Review criteria and remaining differences

- Typography: self-hosted Geist Sans and Mono; readable 13px rows, 28px titles, restrained micro labels. Concept Inter intentionally superseded by Brandbook.
- Spacing/alignment: consistent shell gutters, shared panel borders, 8px utility radius; tablet collapses desktop nav; mobile header retains theme/search/create.
- Colors: light/dark semantic surfaces and foreground pairs. Primary actions use ink; orange is reserved for product mark, active hairline, chart and sparse cues. Dark sent messages and avatars use inverse text pairs.
- Density: deliberately fewer fixture records than production screenshot; table page size 3 demonstrates paging. This is not a production-scale data certification.
- Overlays: Radix focus management, Escape/outside dismissal, scroll containment and opener restoration; monetary forms have no bounce.
- Responsive: no document-level horizontal overflow. Kanban and wide tables may scroll locally. Touch drag support is not claimed; stage selects are the mobile/keyboard path.
- Accessibility: automated WCAG-tagged axe scans and keyboard/focus tests are documented in f2-report.md. Manual screen-reader certification and Safari/Firefox checks are NOT RUN.

Approval of these proposed compositions, true revenue-history fixtures, and signed-off mobile/dark design references remain needed to close visual certification. No metric diff or pixel-perfect parity is claimed against raster runtime captures.

Additional mobile conversation evidence: [light thread and simulated reply](screenshots/inbox-thread-390-light.png) / [dark thread and simulated reply](screenshots/inbox-thread-390-dark.png). Both executed at 390px with reply insertion asserted and zero axe violations; [machine results](mobile-inbox-checks.json).
