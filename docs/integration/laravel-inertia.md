# Laravel / Inertia readiness

The standalone frontend is deliberately not a second backend application. Inertia integration should mount the same page components inside the existing Laravel layout and bind:

1. the Inertia router through `createInertiaNavigationAdapter`,
2. page props to repository contracts at the route boundary,
3. Laravel-provided permission context to action visibility,
4. the published Brandbook token package or its pinned generated CSS artifact.

Laravel remains authoritative for business rules, policies, mutations, validation, and route definitions. The frontend must not duplicate those rules or invent REST endpoints.
