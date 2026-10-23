import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoTone } from "../../lib/types";

export function EvoAlert({
  title,
  description,
  tone = "neutral",
}: {
  title: string;
  description?: string;
  tone?: EvoTone;
}) {
  return (
    <div data-evo="alert" role="alert" className={cn("evo-alert", tone === "danger" && "evo-alert--destructive")}>
      <div>
        <div className="evo-alert-title">{title}</div>
        {description ? <p className="evo-alert-description">{description}</p> : null}
      </div>
    </div>
  );
}

export const Alert = EvoAlert;
