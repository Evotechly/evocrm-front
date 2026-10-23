import * as React from "react";

export type BrandTheme = "light" | "dark";

function readTheme(target: HTMLElement | null): BrandTheme {
  if (!target) return "light";
  return target.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

/** Reads `data-theme` from `<html>` so Sonner and overlays stay framework-agnostic. */
export function useTheme(defaultTheme: BrandTheme = "light"): BrandTheme {
  const [theme, setTheme] = React.useState<BrandTheme>(defaultTheme);

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(readTheme(root));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export function useProduct(): string {
  const [product, setProduct] = React.useState("suite");

  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setProduct(root.getAttribute("data-product") || "suite");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-product"] });
    return () => observer.disconnect();
  }, []);

  return product;
}
