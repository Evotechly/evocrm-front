import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/cn";

export function EvoScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root data-evo="scroll-area" className={cn("evo-scroll", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="evo-scroll-viewport">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="evo-scroll-bar">
        <ScrollAreaPrimitive.Thumb className="evo-scroll-thumb" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}

export const ScrollArea = EvoScrollArea;
