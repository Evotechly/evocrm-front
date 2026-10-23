import * as React from "react";
import { cn } from "../../lib/cn";

export type EvoSidebarItem = { id: string; label: string; href?: string; active?: boolean };

export function EvoSidebar({
  items,
  title = "Workspace",
  className,
}: {
  items: EvoSidebarItem[];
  title?: string;
  className?: string;
}) {
  return (
    <nav data-evo="sidebar" className={cn("evo-sidebar", className)} aria-label={title}>
      <div className="evo-sidebar-header">
        <strong>{title}</strong>
      </div>
      <ul className="evo-sidebar-menu">
        {items.map((item) => (
          <li key={item.id}>
            <a className="evo-sidebar-menu-button" data-active={item.active} href={item.href ?? "#"}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const Sidebar = EvoSidebar;
