import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

export function EvoProgress({ value = 0, label }: { value?: number; label?: string }) {
  return (
    <div data-evo="progress" className="evo-field">
      {label ? <div className="evo-label">{label} <span className="tabular-nums">{value}%</span></div> : null}
      <ProgressPrimitive.Root value={value} className="evo-progress" aria-label={label ?? "Progress"}>
        <ProgressPrimitive.Indicator className="evo-progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} />
      </ProgressPrimitive.Root>
    </div>
  );
}

export const Progress = EvoProgress;
