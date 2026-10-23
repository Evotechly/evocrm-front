import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export function EvoPopover({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content data-evo="popover" className="evo-popover" sideOffset={8}>
          {content}
          <PopoverPrimitive.Arrow width={10} height={6} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export const Popover = EvoPopover;
