# EvoCRM frontend layout blueprint

## Reference direction

This implementation combines two CRM patterns found through the Mobbin UX MCP:

- Salesforce: persistent product navigation, global search, dense KPI/report cards, recent records, and record-centric workspaces.
- HubSpot: guided actions, task and sequence cards, visible activity feed, and a workspace that prioritizes the next action.

The dashboard is one unified EvoCRM layout, not a permanent Salesforce / HubSpot switch. It uses a 60/40 balance: HubSpot's action-first daily workflow as the primary structure, with Salesforce-style compact KPIs, pipeline intelligence, and dense execution rows. The references are adapted into EvoCRM's orange, white, dark-black, Geist, and Evotechly brand system rather than copied as a visual clone.

Representative Mobbin references:

- [Salesforce dashboard pattern](https://mobbin.com/screens/72a51b1c-7ca9-4915-bbdc-b0309946a4aa)
- [Salesforce dashboard with onboarding cards](https://mobbin.com/screens/c7ca5a7f-7b43-4134-b1bb-f6e5380bd456)
- [Salesforce record / pipeline workspace](https://mobbin.com/screens/9f3827c0-64b9-4302-a7b2-11d50ea7411a)
- [HubSpot sales workspace](https://mobbin.com/screens/87dcd39f-a9aa-461e-9fb6-5aec87d0e017)
- [HubSpot guided-actions dashboard](https://mobbin.com/screens/1f571c85-2b3e-4f10-8125-f6aac6e49748)
- [HubSpot contacts table](https://mobbin.com/screens/e683c9cf-4629-4b64-a68c-37fae7089698)

## Unified layout built

The dashboard is optimized for daily execution while keeping manager-level visibility:

- Hero workspace header with primary actions.
- Three priority cards: today's follow-ups, priority conversations, and deals to watch.
- Four compact KPIs: open pipeline, won sales, pending quotes, and conversion rate.
- Two-column pipeline intelligence plus activity and next-action feed.
- Priority deal table with customer, value, stage, owner, and next action.
- Simple Mode / Advanced Mode remains the product-level progressive-disclosure control.

## Open-source component shortlist from Shoogle DEV MCP

Shoogle returned registry candidates. Registry availability does not, by itself, guarantee the same license for every third-party registry, so confirm the license before shipping a dependency to production. The safest approach for this repository is to keep the existing local components and add only focused primitives where they remove real work.

### Foundation and interaction primitives

| Capability | Recommended open-source foundation | EvoCRM use |
| --- | --- | --- |
| Buttons, cards, badges, tabs, separators | shadcn/ui + Radix UI primitives | Shared CRM shell and data panels |
| Dialogs, drawers, popovers, dropdowns | Radix Dialog, Popover, Dropdown Menu; Vaul for mobile drawers | Create/edit flows, record peek, filters |
| Command palette | `cmdk` (already installed) or Shoogle `@extend/command` | Global search and table filter commands |
| Tooltips and accessible focus behavior | Radix Tooltip and Focus Scope | Collapsed rail and icon-only actions |
| Toasts | Sonner or Radix Toast | Save, error, import, and bulk-action feedback |
| Avatar and presence | Radix Avatar | Owners, assignees, inbox participants |
| Calendar and date selection | `react-day-picker` + Radix Popover | Tasks, quotes, deal close dates |

### CRM data components

| Component | Shoogle candidate | Install command |
| --- | --- | --- |
| Filterable, paginated data table | `@hirael/data-table` | `npx shadcn@latest add @hirael/data-table` |
| Feature-rich table with URL state | `@data-table-filters/data-table` | `npx shadcn@latest add @data-table-filters/data-table` |
| Pagination footer | `@shadcncraft/data-table-pagination` | `npx shadcn@latest add @shadcncraft/data-table-pagination` |
| Row detail side panel | `@data-table-filters/data-table-sheet` | `npx shadcn@latest add @data-table-filters/data-table-sheet` |
| Filter command palette | `@data-table-filters/data-table-filter-command` | `npx shadcn@latest add @data-table-filters/data-table-filter-command` |
| Selectable bulk-action table | `@shadcn-ui-blocks/application-pro-data-tables-selectable-bulk-table` | `npx shadcn@latest add @shadcn-ui-blocks/application-pro-data-tables-selectable-bulk-table` |
| Column visibility table | `@shadcn-ui-blocks/application-pro-data-tables-column-visibility-table` | `npx shadcn@latest add @shadcn-ui-blocks/application-pro-data-tables-column-visibility-table` |
| Expandable row detail | `@shadcn-ui-blocks/application-pro-data-tables-table-with-expandable-rows` | `npx shadcn@latest add @shadcn-ui-blocks/application-pro-data-tables-table-with-expandable-rows` |
| Inline editing | `@shadcn-ui-blocks/application-pro-data-tables-inline-edit-table` | `npx shadcn@latest add @shadcn-ui-blocks/application-pro-data-tables-inline-edit-table` |
| CSV import preview | `@shadcn-ui-blocks/application-pro-data-tables-csv-preview-table` | `npx shadcn@latest add @shadcn-ui-blocks/application-pro-data-tables-csv-preview-table` |

### Pipeline, charts, and reporting

| Component | Shoogle candidate | EvoCRM use |
| --- | --- | --- |
| Deal pipeline board | `@shadcncraft/kanban-1` | Salesforce-style stage columns with totals |
| Keyboard-accessible Kanban | `@hirael/kanban` | Drag/move deals with keyboard support |
| Drag-and-drop board | `@cult-ui/kanban-board` | Alternative board implementation |
| Pipeline duration chart | `@shadcnuikit/chart58` | Stage aging and velocity |
| Deal velocity chart | `@shadcnuikit/chart59` | Value vs. time-to-close |
| Donut / category chart | `@shadcnuikit/chart60` or Recharts | Pipeline mix and quote status |
| Accessible chart primitives | Recharts | Keep chart data in EvoCRM contracts |

### Existing EvoCRM components that should remain the base

The preview already has local equivalents for most of the product surface: `Button`, `Panel`, `StatCard`, `DataTable`, `SearchInput`, `FilterBar`, `ViewSwitcher`, `SortControl`, `Pagination`, `Drawer`, `Dialog`, `Popover`, `Tooltip`, `Toast`, `Avatar`, `StatusBadge`, `ActivityTimeline`, `KanbanBoard`, `ConversationList`, `MessageThread`, and `MessageComposer`.

These should be consolidated before adding large external blocks. The Mobbin audit specifically warned about duplicate table, command palette, drawer, toast, and inbox chrome implementations; adding a second implementation for each would make that problem worse.

## Selected component set for the unified dashboard

For the layout shown at `/dashboard`, the recommended implementation set is:

| Surface | Use now | Shoogle candidate if the local version needs replacement |
| --- | --- | --- |
| App shell and navigation | Local `Sidebar`, `Header`, `WorkspaceSwitcher` | `@intentui/sidebar` |
| Global search and quick actions | Local `CommandPalette` | `@hirael/command-palette` |
| KPI and report cards | Local `Panel` plus compact dashboard KPI markup | Recharts for richer data visualization |
| Pipeline board | Local `KanbanBoard` | `@shadcncraft/kanban-1` |
| Contacts and deals tables | Local `DataTable` | `@hirael/data-table` or `@data-table-filters/data-table` |
| Row detail and record peek | Local `Drawer` / `Dialog` | `@data-table-filters/data-table-sheet` |
| Feedback | Local `Toast` | `@cult-ui/halo-toast` (Sonner-backed) |
| Dates and filters | Local `Select`, `DatePicker`, `Popover` | Radix Popover + `react-day-picker` |

This keeps the current preview lightweight and avoids adding packages until a real capability gap appears. The Shoogle candidates are free/open-source registry options to evaluate; license metadata should still be checked before adding each third-party registry item to production.

## Suggested implementation order

1. Keep the new dashboard switch as the visual comparison surface.
2. Refactor Contacts into the shared data-workspace pattern: saved views, filter chips, bulk toolbar, column visibility, and row detail sheet.
3. Refactor Deals into the shared table/board pattern: stage totals, drag-and-drop, list/board URL state, and quick-create.
4. Add a reusable activity feed and record timeline for Contacts, Deals, Inbox, and Quotes.
5. Add only the missing primitives from the shortlist after validating keyboard, mobile, dark theme, and permission-denied states.
