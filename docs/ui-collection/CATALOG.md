# Evotechly UI — collected components (2026-10-23)

Sources: **Fluid Functionalism** (FF, MIT, github.com/mickadesign/fluid-functionalism, Base UI + Radix flavors, motion springs) and **shadcn/ui** (MIT, new-york-v4, Radix). Discovery via **Shoogle MCP** (https://mcp.shoogle.dev/mcp, no auth; tools: search_registry_items, search_registry_items_scoped). Raw search results: components/shoogle/search-results.json.
**coss UI (@coss)** matched almost everything on Shoogle but the cosscom/coss repo is **AGPL-3.0** → link-only, no source collected.
Token fit: all collected items style via shadcn CSS vars (--primary, --background, --border…) → map to Brandbook 2.0 semantic vars; no product hex needed. FF icons use a slot system with an **icons-phosphor** adapter (collected). FF expects Inter (opsz) for weight animation → swap for Geist (recalibrate or disable weight shift).

| Component | Chosen source | Link | License | Deps | A11y primitive | Animation | Token fit | Status |
|---|---|---|---|---|---|---|---|---|
| Button | FF base/button | https://www.fluidfunctionalism.com/r/base/button.json | MIT | motion, @base-ui/react, cva | Base UI | press scale spring | yes | collected |
| IconButton | FF base/button (icon size) | https://www.fluidfunctionalism.com/r/base/button.json | MIT | same | Base UI | same | yes | collected (variant of Button) |
| ButtonGroup | shadcn button-group | https://ui.shadcn.com/r/styles/new-york-v4/button-group.json | MIT | cn | native role=group | none | yes | collected |
| Input | shadcn input (+FF input-group/input-copy/input-message) | https://ui.shadcn.com/r/styles/new-york-v4/input.json | MIT | cn | native | none | yes | collected |
| Textarea | shadcn textarea | https://ui.shadcn.com/r/styles/new-york-v4/textarea.json | MIT | cn | native | none | yes | collected |
| Select | FF base/select | https://www.fluidfunctionalism.com/r/base/select.json | MIT | base-ui, motion, cva | Base UI Select | fluid hover, spring popup | yes | collected |
| Combobox | FF base/combobox | https://www.fluidfunctionalism.com/r/base/combobox.json | MIT | base-ui, motion | Base UI Combobox | fluid hover | yes | collected |
| Checkbox | FF base/checkbox-group | https://www.fluidfunctionalism.com/r/base/checkbox-group.json | MIT | base-ui, motion | Base UI | merged selection bg | yes | collected (group; no single checkbox) |
| RadioGroup | FF base/radio-group | https://www.fluidfunctionalism.com/r/base/radio-group.json | MIT | base-ui, motion | Base UI | merged selection bg | yes | collected |
| Switch | FF base/switch | https://www.fluidfunctionalism.com/r/base/switch.json | MIT | base-ui, motion | Base UI | thumb spring | yes | collected |
| DatePicker | shadcn calendar (+popover) | https://ui.shadcn.com/r/styles/new-york-v4/calendar.json | MIT | react-day-picker, date-fns | react-day-picker | none | yes | collected (calendar only; picker = calendar+popover composition) |
| Sidebar | FF base/sidebar + blocks | https://www.fluidfunctionalism.com/r/base/sidebar.json | MIT | base-ui, motion, cva | Base UI | collapse, fluid hover | yes | collected |
| Topbar | FF sidebar-inset-topbar (block) | https://www.fluidfunctionalism.com/r/sidebar-inset-topbar.json | MIT | — | native | — | yes | collected (block) |
| Tabs | FF base/tabs + base/tabs-subtle | https://www.fluidfunctionalism.com/r/base/tabs.json | MIT | base-ui, motion | Base UI Tabs | sliding indicator | yes | collected |
| Breadcrumbs | shadcn breadcrumb | https://ui.shadcn.com/r/styles/new-york-v4/breadcrumb.json | MIT | radix-ui | nav/aria-current | none | yes | collected |
| CommandMenu | FF command-menu (+shadcn command/cmdk) | https://www.fluidfunctionalism.com/r/command-menu.json | MIT | motion | custom (FF) / cmdk | fluid hover | yes | collected |
| DataTable | FF table + shadcn table | https://www.fluidfunctionalism.com/r/table.json | MIT | motion | native table | row hover | yes | collected (no sorting/selection logic; add TanStack Table) |
| Badge | FF badge | https://www.fluidfunctionalism.com/r/badge.json | MIT | cva | — | none | yes | collected |
| Avatar | shadcn avatar | https://ui.shadcn.com/r/styles/new-york-v4/avatar.json | MIT | radix-ui | Radix Avatar | none | yes | collected |
| Pagination | shadcn pagination | https://ui.shadcn.com/r/styles/new-york-v4/pagination.json | MIT | cn | nav | none | yes | collected |
| EmptyState | shadcn empty | https://ui.shadcn.com/r/styles/new-york-v4/empty.json | MIT | cn | — | none | yes | collected |
| Skeleton | shadcn skeleton | https://ui.shadcn.com/r/styles/new-york-v4/skeleton.json | MIT | cn | — | pulse | yes | collected |
| Dialog | FF base/dialog | https://www.fluidfunctionalism.com/r/base/dialog.json | MIT | base-ui, motion | Base UI Dialog | spring enter / tween exit | yes | collected |
| Drawer | FF base/mobile-drawer + shadcn drawer (vaul) | https://www.fluidfunctionalism.com/r/base/mobile-drawer.json | MIT | base-ui, motion / vaul | Base UI / vaul | sheet spring | yes | collected |
| Popover | shadcn popover | https://ui.shadcn.com/r/styles/new-york-v4/popover.json | MIT | radix-ui | Radix Popover | fade/zoom | yes | collected (FF has popup lib only) |
| DropdownMenu | FF base/dropdown | https://www.fluidfunctionalism.com/r/base/dropdown.json | MIT | base-ui, motion | Base UI Menu | fluid hover | yes | collected |
| Tooltip | FF base/tooltip | https://www.fluidfunctionalism.com/r/base/tooltip.json | MIT | base-ui, motion | Base UI Tooltip | spring | yes | collected |
| Toast | shadcn sonner | https://ui.shadcn.com/r/styles/new-york-v4/sonner.json | MIT (sonner MIT) | sonner, next-themes | sonner (aria-live) | slide | yes (drop next-themes) | collected |
| Alert | shadcn alert (+FF banner) | https://ui.shadcn.com/r/styles/new-york-v4/alert.json | MIT | cn | role=alert | none | yes | collected |
| Progress | shadcn progress | https://ui.shadcn.com/r/styles/new-york-v4/progress.json | MIT | radix-ui | Radix Progress | width transition | yes | collected |
| Spinner | shadcn spinner (+FF thinking-indicator) | https://ui.shadcn.com/r/styles/new-york-v4/spinner.json | MIT | cva | role=status | spin | yes | collected |

Link-only (AGPL, not collected): coss UI equivalents for every row, e.g. https://coss.com/ui/r/<name>.json (button, toast, date-picker particles p-date-picker-*, etc.).
Extra FF items collected: accordion, slider, scroll-area, card, banner, typography/type-scale, surfaces/tokens themes, springs, use-fluid-hover, icon providers (phosphor/tabler/hugeicons/untitledui), sidebar blocks, chat/AI items.
