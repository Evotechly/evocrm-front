# EvoCRM screen registry

Source: `Evotechly/EvoCrm/Screen/00-INDEX.md` through `11-DESIGN-GENERATION-MANIFEST.md`, read from the `main` branch on 2026-10-18. The existing application audit identifies stable screen IDs and explicitly distinguishes simple-mode runtime behavior from the full product map.

## Foundation coverage

| Screen ID | Route | Frontend status | Source spec |
| --- | --- | --- | --- |
| SCR-SHELL-001 | layout | complete | `shell/application-shell.md` |
| SCR-SHELL-002 | layout | complete | `shell/sidebar.md` |
| SCR-SHELL-003 | layout | complete | `shell/header.md` |
| OVR-SHELL-001 | command palette | complete | `overlays/command-palette.md` |
| OVR-SHELL-003 | `?create=1` | complete | `overlays/global-create-menu.md` |
| SCR-HOME-001 | `/dashboard` | complete | `home/home.md` |
| SCR-CONTACT-001 | `/crm/contacts` | complete | `contacts/contacts-list.md` |
| SCR-DEAL-001 | `/crm/deals` | complete | `deals/deals-list.md` |
| SCR-DEAL-002 | `/crm/deals/board` | complete | `deals/deals-board.md` |
| SCR-INBOX-001 | `/inbox` | complete | `inbox/inbox.md` |
| SCR-QUOTE-001 | `/crm/quotes` | complete | `quotes/quotes-list.md` |

The full registry remains the backlog source for Waves 2–10. Ticket, Ads, Warmup, Report Builder, and Ask Evo are recorded as blocked in the source audit under `simple_mode=true`; this frontend keeps them out of the simple rail while preserving their future route slots.
