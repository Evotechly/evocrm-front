import * as React from "react";
import { EvoSidebar, type EvoSidebarItem } from "./sidebar";

export function EvoAppShell({
  title = "Workspace",
  items = [
    { id: "home", label: "Home", active: true },
    { id: "deals", label: "Deals" },
  ],
  children,
}: {
  title?: string;
  items?: EvoSidebarItem[];
  children?: React.ReactNode;
}) {
  return (
    <div data-evo="app-shell" className="evo-shell">
      <EvoSidebar title={title} items={items} />
      <div className="evo-sidebar-inset" style={{ padding: "var(--space-6)" }}>
        {children}
      </div>
    </div>
  );
}

export const AppShell = EvoAppShell;
