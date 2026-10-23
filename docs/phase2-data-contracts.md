# EvoCRM Phase 2 data-contract protection

## Source of truth

The Phase 2 frontend reads from `CrmProvider`, which exposes the session-local implementation of the production-facing boundary. The mock adapter and fixtures are isolated under `src/adapters/mock` and `src/fixtures`; no fixture is promoted into a backend contract.

## Entity contracts

| Entity | Type | Supported fields used by Phase 2 |
| --- | --- | --- |
| Contact | `Contact` | `id`, `name`, `email`, `company`, `status`, `lastActivity`, `initials`, `color` |
| Deal | `Deal` | `id`, `name`, `company`, `value`, `stage`, `probability`, `owner`, `updatedAt` |
| Quote | `QuoteRecord` | Quote identity/status/amount plus `items`, `contactId`, `dealId`, `expiration` |
| Inbox thread | `ThreadRecord` | `contact`, `subject`, `preview`, `time`, `unread`, `channel`, `assignee`, `nextAction`, `messages` |
| Message | `Message` | `id`, `body`, `direction`, `time` |
| Line item | `LineItem` | `id`, `description`, `quantity`, `unitPrice` |

## Mutation and permission matrix

| Operation | Provider mutation | Permission | Failure/limitation |
| --- | --- | --- | --- |
| Contact create/edit | `setContacts` | `crm.edit` | Session-local; validation remains in form. |
| Contact selection/bulk UI | local page state | `crm.bulk` for selection controls | No unsupported bulk mutation is claimed. |
| Deal create/edit | `setDeals` | `crm.edit` | Session-local; no backend persistence claim. |
| Deal stage move | `setDeals` with existing `probabilities` | `crm.edit` | Drag/drop and select update only this session. |
| Inbox assignment/reply | `setThreads` | `desk.manage` | Reply is explicitly simulated; no external send. |
| Quote create/edit | `setQuotes` | `crm.edit` / `quotes.view` | Totals use existing quote functions; no send/payment claim. |
| Read access | `ScreenState` + `can` | Workspace-specific permission | Denied state renders without records. |

## Protected assumptions

- No API field was renamed.
- No database schema or authorization rule was changed.
- No unsupported status, financial figure, timestamp, or customer was invented.
- Persistent saved views, backend activity ingestion, and external messaging remain integration work.
