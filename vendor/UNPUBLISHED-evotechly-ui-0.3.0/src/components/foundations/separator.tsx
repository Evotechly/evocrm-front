import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/cn";

export function EvoSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-evo="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn("evo-separator", className)}
      {...props}
    />
  );
}

export const Separator = EvoSeparator;
