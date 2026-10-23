import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-evo="kbd" className={cn("evo-kbd", className)} {...props} />;
}

export const Kbd = EvoKbd;
