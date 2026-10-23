import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoTone, EvoVariant } from "../../lib/types";

export type EvoBadgeProps = React.ComponentProps<"span"> & {
  variant?: Extract<EvoVariant, "primary" | "secondary" | "outline"> | "destructive";
  tone?: EvoTone;
};

export function EvoBadge({ className, variant = "primary", tone = "neutral", ...props }: EvoBadgeProps) {
  return (
    <span
      data-evo="badge"
      data-variant={variant}
      data-tone={tone}
      className={cn(
        "evo-badge",
        variant === "secondary" && "evo-badge--secondary",
        variant === "outline" && "evo-badge--outline",
        (variant === "destructive" || tone === "danger") && "evo-badge--destructive",
        className,
      )}
      {...props}
    />
  );
}

export const Badge = EvoBadge;
