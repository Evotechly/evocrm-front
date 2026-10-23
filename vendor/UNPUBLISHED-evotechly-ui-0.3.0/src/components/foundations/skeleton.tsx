import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-evo="skeleton"
      role="status"
      aria-live="polite"
      className={cn("evo-skeleton", className)}
      {...props}
    />
  );
}

export const Skeleton = EvoSkeleton;
