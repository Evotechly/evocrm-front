import * as React from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

export function EvoDropdownMenu({
  items,
  children,
}: {
  items: { label: string; shortcut?: string; onSelect?: () => void }[];
  children: React.ReactNode;
}) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>{children}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content data-evo="dropdown-menu" className="evo-dropdown">
          {items.map((item) => (
            <Dropdown.Item key={item.label} className="evo-menu-item" onSelect={item.onSelect}>
              {item.label}
              {item.shortcut ? <span className="evo-kbd">{item.shortcut}</span> : null}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

export const DropdownMenu = EvoDropdownMenu;
