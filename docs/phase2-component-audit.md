# EvoCRM Phase 2 component audit

Baseline: `ebddc36b74a795c2ef12aa8817725ecffd5403b4`
Branch: `feature/evocrm-phase2-workspaces`

## Decision summary

The repository already contains accessible local primitives for the certified five-screen preview. Shoogle candidates remain evaluation references; no new runtime dependency is installed in Phase 2. This avoids a second component system and preserves the existing React/Inertia integration boundary.

| Component | Current implementation | Candidate | Decision | Reason |
| --- | --- | --- | --- | --- |
| Sidebar | `src/components/navigation/Sidebar.tsx` | Intent UI | EXTEND | Existing navigation owns permissions, simple/advanced mode, theme, and the Evotechly mark. |
| Command palette | `CommandPalette` using `cmdk` | Hirael | KEEP | Existing keyboard shortcuts, focus restoration, and navigation contract are already covered by tests. |
| Kanban | `KanbanBoard` + `DealCard` | shadcncraft | EXTEND | Existing board supports stage totals, drag/drop, and a keyboard-accessible stage select. |
| Data table | `DataTable` plus semantic tables in Contacts/Deals/Quotes | Hirael / Data Table Filters | EXTEND | Local table already supports sorting, filtering, pagination, selection, loading, and error states. |
| Detail sheet | Radix `Drawer` / `Dialog` | Data Table Filters sheet | KEEP | Existing focus return, Escape handling, responsive drawer, and permission gates are in use. |
| Toast | Local `Toast` through `CrmProvider.notify` | Cult UI / Sonner | KEEP | Session-only notices are explicit and avoid claiming backend delivery. |
| Charts | CSS/SVG pipeline visuals and `MetricSparkline` | Recharts | KEEP | Current dashboard needs compact, dependency-free visuals; Recharts is reserved for a real reporting gap. |
| Date picker | Native `DatePicker` input | Radix Popover + `react-day-picker` | KEEP | Native date input is sufficient for the current contract and has lower dependency cost. |
| Workspace header | New `WorkspaceHeader` | — | ADD | Shared title, description, count, and action layout for Contacts, Deals, Inbox, and Devis. |
| Workspace toolbar | New `WorkspaceToolbar` | — | ADD | Shared labelled toolbar boundary for search, filters, views, sort, and column controls. |
| Bulk actions | New `BulkActionBar` | — | ADD | Centralizes selected-count feedback and permission-safe action placement. |
| Activity timeline | New `RecordActivityTimeline` over existing `ActivityTimeline` | — | ADD | One shared presentation for supported activity evidence across record workspaces. |

## Known limitations

- Data is session-local fixture data in this standalone frontend; no new persistence contract was introduced.
- Deal drag/drop and quick edits use the existing session mutation contract and are explicitly not backend persistence.
- Saved views are URL/local state only. Persistent saved views require a supported backend contract.
- Third-party Shoogle licenses must be rechecked before any future adoption.
