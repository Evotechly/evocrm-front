import * as React from "react";

export function EvoSparkline({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const path = data
    .map((value, index) => `${index === 0 ? "M" : "L"} ${(index / Math.max(1, data.length - 1)) * 80} ${24 - (value / max) * 20}`)
    .join(" ");
  return (
    <svg data-evo="sparkline" role="img" aria-label={label} viewBox="0 0 80 24" width="80" height="24">
      <path d={path} fill="none" stroke="var(--brand-actionA11y)" strokeWidth="2" />
    </svg>
  );
}

export const Sparkline = EvoSparkline;
