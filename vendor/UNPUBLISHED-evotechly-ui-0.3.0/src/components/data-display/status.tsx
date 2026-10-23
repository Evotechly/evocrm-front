import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoTone } from "../../lib/types";

export function EvoStatus({
  tone = "neutral",
  children,
  className,
}: {
  tone?: EvoTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span data-evo="status" data-tone={tone} className={cn("evo-status", `evo-tone-${tone}`, className)}>
      <span className="evo-status-dot" aria-hidden />
      {children}
    </span>
  );
}

export const Status = EvoStatus;
