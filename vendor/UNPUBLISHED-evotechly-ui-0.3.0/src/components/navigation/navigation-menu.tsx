import * as React from "react";

export function EvoNavigationMenu({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav data-evo="navigation-menu" aria-label="Sections" className="evo-tabs-list">
      {items.map((item) => (
        <a key={item.label} className="evo-tabs-trigger" href={item.href ?? "#"} data-state="inactive">
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export const NavigationMenu = EvoNavigationMenu;
