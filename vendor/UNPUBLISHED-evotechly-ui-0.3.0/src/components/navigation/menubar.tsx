import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

export function EvoMenubar({
  items,
}: {
  items: { label: string; items: { label: string; shortcut?: string }[] }[];
}) {
  return (
    <MenubarPrimitive.Root data-evo="menubar" className="evo-menubar">
      {items.map((menu) => (
        <MenubarPrimitive.Menu key={menu.label}>
          <MenubarPrimitive.Trigger className="evo-btn evo-btn--ghost evo-btn--sm">{menu.label}</MenubarPrimitive.Trigger>
          <MenubarPrimitive.Portal>
            <MenubarPrimitive.Content className="evo-dropdown">
              {menu.items.map((item) => (
                <MenubarPrimitive.Item key={item.label} className="evo-menu-item">
                  {item.label}
                  {item.shortcut ? <span className="evo-kbd">{item.shortcut}</span> : null}
                </MenubarPrimitive.Item>
              ))}
            </MenubarPrimitive.Content>
          </MenubarPrimitive.Portal>
        </MenubarPrimitive.Menu>
      ))}
    </MenubarPrimitive.Root>
  );
}

export const Menubar = EvoMenubar;
