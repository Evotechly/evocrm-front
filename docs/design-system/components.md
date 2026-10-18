# Aurora Next F2 component contracts

Interactive gallery: `/dev/components` in Vite development only. `import.meta.env.DEV` excludes the lazy gallery route/import from production. Preview controls on each screen use the same development-only guard; direct `?state=` is ignored in production. Real injected permission restrictions apply in every mode.

## Tokens and conventions

`src/styles/tokens.css` contains semantic surface, text, muted, divider, interaction, feedback, avatar foreground/background, chart, focus and inverse foreground pairs. Spacing 4/8/12/16/24/32/48, radii 8/12/16, typography 12/14/16/18/28, weights, line height, shadows and 150/220ms standard easing are named tokens. Both themes override semantic values. Reduced motion removes nonessential transitions. No raw colors in React components. Fontsource Latin Geist Sans 400/500/600/700 and Mono 400 are self-hosted; Arabic font coverage is next-wave work. Brandbook is authoritative over concept-board Inter.

## Typed props and state ownership

Every exported component has TypeScript props. All application data edits are provider-local; reload resets fixtures. Theme preference alone persists locally. Provider accepts `SessionData` and `Permission[]` for an Inertia page-prop boundary. The original repository interfaces and Inertia adapter remain intact. The app does not fetch or mutate backend endpoints.

| Component               | Props / variants                                                      | Interaction and states                                                                            |
| ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Button                  | native button props; primary, secondary, soft, ghost, danger; loading | Default type=button, disabled/loading prevents action; visible focus                              |
| Input                   | native input props, label, error, hint                                | Required/email/number native validation; aria-invalid/describedby; disabled                       |
| Select                  | native select props and options, label                                | Native arrows/typeahead/selection; disabled; stable accessible name                               |
| Checkbox                | native checked/onChange/disabled, label                               | Space toggles; associated visible or visually hidden label                                        |
| DatePicker              | Input props, native date                                              | Browser locale calendar and keyboard entry; disabled/required native states                       |
| Dialog / Drawer         | open, onClose, title, description, children; centered/right           | Radix modal semantics, portal, trapped focus, Escape, dismissal, focus return; scroll containment |
| Popover                 | trigger, children, label, closeOnAction                               | Radix positioning, Escape/outside dismissal, focus return. closeOnAction for create menu          |
| Tooltip                 | child trigger, text                                                   | Radix focus/hover, nonessential supplemental text                                                 |
| Toast                   | message, onClose                                                      | Polite atomic live region; explicit dismiss, no forced timeout                                    |
| AppSidebar              | advanced, onToggleAdvanced                                            | Exclusive aria-current; responsive drawer; collapse hides desktop nav with labeled restore button |
| WorkspaceSwitcher       | single demo workspace                                                 | Popover explains availability; no fictitious workspace switch                                     |
| AppHeader               | onOpenCommand                                                         | GlobalCreateMenu routes open actual forms; theme, notifications and session menu respond          |
| CommandPalette          | onClose                                                               | cmdk filtering, arrows, Enter, empty result; Ctrl/Cmd+K in layout; Escape closes                  |
| DataTable               | headers, children                                                     | Semantic table/th scope, local horizontal overflow; compatibility API preserved                   |
| FilterBar / SearchInput | children / value, onChange, label                                     | Controlled search, browser clear; toolbar wraps                                                   |
| Pagination              | page, total, pageSize, onChange                                       | Real slice count; previous/next disabled at bounds                                                |
| SortControl             | value, options, onChange                                              | Named sorting select; actual sort owned by screen                                                 |
| ViewSwitcher            | value, options, onChange                                              | Native buttons with aria-pressed; no misleading tab roles                                         |
| StatusBadge             | status                                                                | Text + dot, success/warning/info/danger/neutral; never color only                                 |
| Avatar                  | initials, tone                                                        | orange/indigo/teal/purple/blue/ink supported styles; semantic foreground pairs                    |
| ActivityTimeline        | title/detail/time items                                               | Ordered semantic activity, only actual fixture/session data                                       |
| KPICard / StatCard      | label,value,change,icon,tone                                          | Derived values; no invented percentage deltas                                                     |
| DealCard                | deal,onOpen,onMove,disabled                                           | Native HTML drag + labeled stage select keyboard alternative; disabled write capability           |
| KanbanBoard             | deals,onMove,onOpen,onCreate,disabled                                 | Region/columns, counts, amounts and weighted totals; empty column; drop highlight                 |
| ContactCard             | contact,onOpen                                                        | Name button opens context; company secondary                                                      |
| ContactDetailPanel      | contact,onEdit?                                                       | Readable identity, relationships, mailto, timeline; editing optional                              |
| ConversationList        | threads,activeId,onSelect                                             | Search/filter controlled externally; active pressed state and empty state                         |
| MessageThread           | messages,contact                                                      | Polite log; sent/received accessible names; wraps long replies                                    |
| MessageComposer         | onSend,disabled                                                       | Labeled textarea, empty/whitespace disabled, max 5000 chars, simulated send disclosure            |
| QuoteLineItem           | item,index,onChange,onRemove,disabled                                 | Numeric bounds, description required, centime total, dynamic remove                               |
| QuoteSummary            | items                                                                 | Deterministic total; no taxes/payments fabricated                                                 |

Loading, error, empty and denied are screen/resource states, not meaningless variants added to every atom. `ScreenState` gates before child DOM rendering; true empty uses zero records and hides contextual record UI. Forms expose native validation and duplicate email/reference errors. Quote status remains fixture status or new Brouillon; there is no invented send/payment transition.

## Compatibility limitations

Foundation entities do not model production phone/owner/city fields, configurable pipelines, property gates, saved views, imports or monetary backend centime payloads. The F2 provider is an explicit local seam, not an implementation of production persistence. Current permissions include `desk.manage` for replying/assignment, distinct from CRM edit. Backend must enforce authorization independently. See certification report for remaining acceptance gaps.

The DataTable also exposes a typed `DataColumn<T>[]`/`data` API alongside the preserved headers/children API. It supports sortable headers with aria-sort, query predicates, row filters, controlled column visibility, row selection, client pagination, loading/error/empty states and retry. The gallery exercises that API. Contacts keeps externally coordinated filters/selection for its mobile cards and detail URL state; all variants use shared field/control primitives.
