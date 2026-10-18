# Integration contracts

## UI boundary

`src/components` contains presentational and interaction components. They receive data and callbacks rather than Laravel globals, Inertia page props, or database clients.

## Navigation boundary

```ts
interface NavigationAdapter {
  navigate(path: string): void;
  back(): void;
}
```

`createInertiaNavigationAdapter()` maps this contract to the existing Inertia router at the integration boundary.

## Data boundary

Repositories expose typed methods such as `ContactRepository.list()` and `DealRepository.list()`. The standalone app uses `src/adapters/mock`; a Laravel integration can bind page-prop-backed or approved endpoint-backed implementations without changing screen components. No backend endpoint is invented in this repository.
