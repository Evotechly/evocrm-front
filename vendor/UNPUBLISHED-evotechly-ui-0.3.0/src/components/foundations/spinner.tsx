import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoSize } from "../../lib/types";

export function EvoSpinner({
  size = "md",
  className,
  ...props
}: React.ComponentProps<"span"> & { size?: EvoSize }) {
  return (
    <span
      data-evo="spinner"
      role="status"
      className={cn("evo-spinner", `evo-spinner--${size}`, className)}
      {...props}
    />
  );
}

export const Spinner = EvoSpinner;
