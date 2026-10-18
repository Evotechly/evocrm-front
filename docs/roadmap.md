# EvoCRM frontend roadmap

| Wave | Scope | Dependencies | Acceptance gate | Status |
| --- | --- | --- | --- | --- |
| 0 | repo, contracts, adapters, source traceability | EvoCrm Screen + Brandbook | typecheck/lint/test/build/CI | in progress |
| 1 | Aurora shell, simple/advanced navigation, theme, command/create menus | Wave 0 | responsive shell + smoke tests | in progress |
| 2 | Dashboard, Contacts, Companies | Wave 1, entity props | populated list/detail/import states | planned |
| 3 | Deals, Pipeline, Inbox, Quotes | contacts + deal contracts | list/board/thread/quote workflows | foundation partial |
| 4 | Leads, Activities, Tickets, Segments | permissions + record contracts | blocked/simple-mode states | planned |
| 5 | Workflows and Automation | activity/event contracts | builder states and permission tests | planned |
| 6 | Outbound and Marketing | mailbox/sequence contracts | send/draft/suppression states | planned |
| 7 | Reports, Analytics, Ads | EvoViz catalog + capabilities | chart accessibility and blocked Ads | planned |
| 8 | Settings, Administration, Permissions | Inertia permission props | owner/admin/member matrices | planned |
| 9 | Auth, public screens, remaining overlays | Laravel guest/public routes | auth and public acceptance flows | planned |
| 10 | responsive, accessibility, visual tests, integration readiness | all prior waves | Playwright + a11y + integration certification | planned |

Each wave must add screen IDs, dependencies, component requirements, mock contracts, interactions, acceptance criteria, automated tests, and a completion update. The source Screen registry is the exhaustive backlog; the table above is the dependency-level release plan.
