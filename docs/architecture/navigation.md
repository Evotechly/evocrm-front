# Navigation contract

The shell follows the observed EvoCRM simple-mode contract: Accueil `/dashboard`, Contacts `/crm/contacts`, Deals `/crm/deals`, Inbox `/inbox`, and Devis `/crm/quotes`, with Paramètres `/settings` at the bottom of the rail. Advanced Mode reveals Companies, Pipeline, Segments, Reports, and Outbound without changing the documented paths.

Components call `NavigationAdapter.navigate(path)` and `back()`. The standalone adapter is supplied by React Router; Laravel integration will supply an Inertia adapter. No reusable component imports React Router or Inertia directly.

Create menu paths intentionally use the documented `?create=1` query contract. The command palette is a local first pass over registered screens; production search can replace its command source without changing the UI shell.
