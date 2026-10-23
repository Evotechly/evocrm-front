# EvoCRM Phase 2 accessibility report

Target: WCAG 2.2 AA.

## Implemented controls

- Semantic headings and labelled workspace toolbars for Contacts, Deals, Inbox, and Devis.
- Native inputs/selects for search, filters, dates, and forms.
- Existing Radix dialogs/drawers provide focus trapping, Escape close, and focus return.
- Existing `DataTable` exposes sortable column headers, selection labels, pagination labels, loading, and error states.
- Deal cards retain a keyboard-accessible stage select as an alternative to drag/drop.
- Conversation list rows expose `aria-pressed`; message history uses a labelled live log.
- Bulk selection uses labelled checkboxes and an `aria-live` status bar.
- Empty and unsupported activity states are explicit rather than visually implied.
- Existing focus-visible outline and semantic contrast tokens remain in use.

## Verification

The full repository Playwright suite is the authoritative executable check. The Phase 2 report records the exact result after execution. Automated axe coverage is evidence, not a substitute for keyboard and screen-reader review.

## Manual review checklist

- Tab from page header through toolbar, table/board, and drawer actions.
- Confirm focus return after Contacts, Deals, and Devis drawers/dialogs close.
- Confirm mobile conversation navigation does not strand focus in the hidden pane.
- Confirm reduced-motion preference does not remove essential state feedback.
- Confirm 320px layouts remain readable without requiring desktop table zoom.
