export interface NavigationAdapter {
  navigate(path: string): void;
  back(): void;
}
