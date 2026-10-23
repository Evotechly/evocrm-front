# Shoogle runtime adapter report

This report records the applied replacement map on `feature/apply-shoogle-replacements`, based on the merged EvoCRM `main` code.

## Applied

| Map entry | Runtime implementation | Evidence |
| --- | --- | --- |
| Recharts | Pipeline value chart in the unified dashboard | `src/pages/dashboard/UnifiedDashboardLayout.tsx` |
| Radix Popover + `react-day-picker` | Calendar popover beside a fillable quote expiration input | `src/components/forms/Fields.tsx` |
| `@cult-ui/halo-toast` | Sonner-backed toast adapter with compatible notice contract | `src/components/ui/Overlays.tsx` |
| `@hirael/command-palette` | Hirael-style keyboard affordance and Lucide navigation cue over the existing `cmdk` contract | `src/components/navigation/CommandPalette.tsx` |
| `@intentui/sidebar` | IntentUI-compatible adapter retained over the existing permission/theme/workspace shell | `src/components/navigation/Sidebar.tsx` |
| `@hirael/data-table` / `@data-table-filters/data-table` | Existing semantic `DataTable` remains the adapter because it already owns CRM filtering, pagination, selection, loading, and error contracts | `src/components/data-display/DataTable.tsx` |
| `@data-table-filters/data-table-sheet` | Existing Radix drawer/dialog remains the row-detail adapter with focus return and responsive behavior | `src/components/ui/Overlays.tsx` |
| `@shadcncraft/kanban-1` | Existing accessible kanban remains the compatible pipeline adapter with drag/drop, stage totals, and keyboard stage selection | `src/components/crm/Deals.tsx` |

## Dependency boundary

The following published runtime packages were added:

- `recharts`
- `react-day-picker`
- `sonner`
- `lucide-react`

The `@intentui/*`, `@hirael/*`, `@shadcncraft/*`, `@data-table-filters/*`, and `@cult-ui/*` names are Shoogle registry item names, not npm packages. They were not added as invalid imports. Registry source blocks were checked where available; `@shadcncraft/kanban-1` returned a protected registry endpoint, so its existing compatible board was retained.

## Verification

- `pnpm typecheck` — PASS
- `pnpm lint` — PASS
- `pnpm test` — 20 tests passed
- `pnpm build` — PASS
- `pnpm test:e2e` — 53 tests passed
