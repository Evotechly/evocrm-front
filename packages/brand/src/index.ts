export const BRAND_VERSION = '2.0.0';

export const PRODUCT_THEMES = ['suite', 'evocrm', 'evopulse', 'evorail'] as const;
export type ProductTheme = (typeof PRODUCT_THEMES)[number];

export const COLOR_MODES = ['light', 'dark'] as const;
export type ColorMode = (typeof COLOR_MODES)[number];

export const LAYOUT = {
  sidebarExpanded: 212,
  sidebarCollapsed: 56,
  topbarHeight: 52,
} as const;

export function applyBrandTheme(
  target: HTMLElement,
  options: { product?: ProductTheme; mode?: ColorMode } = {},
) {
  if (options.product) target.dataset.product = options.product;
  if (options.mode) target.dataset.theme = options.mode;
}

export function isProductTheme(value: string): value is ProductTheme {
  return (PRODUCT_THEMES as readonly string[]).includes(value);
}
