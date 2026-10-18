import type { NavigationAdapter } from '@/adapters/navigation';

export interface InertiaRouterLike { visit(url: string): void; back(): void; }
export function createInertiaNavigationAdapter(router: InertiaRouterLike): NavigationAdapter {
  return { navigate: (path) => router.visit(path), back: () => router.back() };
}
