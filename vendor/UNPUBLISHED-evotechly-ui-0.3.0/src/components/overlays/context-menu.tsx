import * as React from "react";
import * as Context from "@radix-ui/react-context-menu";

export function EvoContextMenu({
  items,
  children,
}: {
  items: { label: string; shortcut?: string; onSelect?: () => void }[];
  children: React.ReactNode;
}) {
  return (
    <Context.Root>
      <Context.Trigger asChild>{children}</Context.Trigger>
      <Context.Portal>
        <Context.Content data-evo="context-menu" className="evo-context">
          {items.map((item) => (
            <Context.Item key={item.label} className="evo-menu-item" onSelect={item.onSelect}>
              {item.label}
              {item.shortcut ? <kbd className="evo-kbd">{item.shortcut}</kbd> : null}
            </Context.Item>
          ))}
        </Context.Content>
      </Context.Portal>
    </Context.Root>
  );
}

export const ContextMenu = EvoContextMenu;
