# EvoCRM Phase 2 workspace architecture

## Authority and boundary

The authoritative application for this branch is the standalone React/Vite frontend in `Evotechly/evocrm-front`. It uses the same typed contracts and provider boundary intended for the future Inertia adapter. The repository does not contain a second implementation to synchronize in this phase.

The application boundary is:

```text
App
└── BrowserRouter
    ├── ThemeProvider
    ├── RouterNavigationProvider
    └── CrmProvider
        └── AppRouter
            ├── Dashboard
            ├── Contacts
            ├── Deals / Pipeline
            ├── Inbox
            └── Devis
```

`CrmProvider` owns session-local records, mutations, notices, and permission checks. Pages compose the provider with local UI primitives; no page creates a second data or design-system layer.

## Shared workspace foundation

`src/components/workspace/Workspace.tsx` provides the deliberately small shared layer:

- `WorkspaceHeader`: title, description, optional record count, and primary/secondary actions.
- `WorkspaceToolbar`: labelled toolbar boundary for search, filters, saved views, sort, column visibility, and view switching.
- `BulkActionBar`: selected-record feedback and clear action; callers remain responsible for permission-safe actions.
- `RecordActivityTimeline`: common activity presentation backed by the existing `ActivityTimeline` primitive. Empty evidence is stated explicitly instead of fabricated.

The existing local components remain the implementation for tables, drawers, dialogs, popovers, kanban, conversation lists, message threads, quote line items, status badges, and screen states.

## Workspace mapping

| Workspace | Shared foundation | Specialized surface |
| --- | --- | --- |
| Contacts | Header, toolbar, views, bulk bar, drawer, activity timeline | Contact table/mobile cards and contact form |
| Deals | Header, toolbar, view switcher, drawer, activity timeline | Kanban board, stage mutation, deal form |
| Inbox | Header, toolbar, permission state, activity timeline | Conversation list, message thread, composer, CRM context |
| Devis | Header, toolbar, views, drawers/dialogs, activity timeline | Quote calculations, line-item editor, print preview |
| Dashboard | Existing certified unified layout | KPIs, pipeline intelligence, next actions |

## State model

Every page remains wrapped in `ScreenState`, which provides populated, loading, empty, error, and permission-denied behavior through the existing development preview state and provider permissions. Workspace filtering never fabricates a record to avoid an empty state.

## Interaction contracts

- Search and filters are caller-controlled and operate on the current provider records.
- Views and filters do not claim persistence; URL state is used where the route already supports it.
- Drawer/dialog focus behavior remains owned by the existing Radix overlay wrappers.
- Deal stage changes use `setDeals`, `can('crm.edit')`, and the existing probability map.
- Inbox sends are labelled simulations and never claim external delivery.
- Quote totals use the existing `lineTotal` and `quoteTotal` functions without new tax, discount, or rounding logic.
