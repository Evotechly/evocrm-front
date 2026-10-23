import * as React from "react";

export function EvoAreaChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const path = data
    .map((value, index) => `${index === 0 ? "M" : "L"} ${(index / Math.max(1, data.length - 1)) * 160} ${64 - (value / max) * 56}`)
    .join(" ");
  return (
    <figure data-evo="area-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 64" width="160" height="64">
        <path d={`${path} L 160 64 L 0 64 Z`} fill="var(--brand-selection)" />
        <path d={path} fill="none" stroke="var(--brand-actionA11y)" strokeWidth="2" />
      </svg>
    </figure>
  );
}

export const AreaChart = EvoAreaChart;
