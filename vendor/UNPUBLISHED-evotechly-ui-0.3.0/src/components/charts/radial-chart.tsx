import * as React from "react";

export function EvoRadialChart({ value, label }: { value: number; label: string }) {
  const offset = 126 - (126 * value) / 100;
  return (
    <figure data-evo="radial-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 48 48" width="48" height="48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--surfaceSunken)" strokeWidth="6" />
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--brand-actionA11y)" strokeWidth="6" strokeDasharray="126" strokeDashoffset={offset} />
        <text x="24" y="28" textAnchor="middle" className="tabular-nums" fill="var(--text)" fontSize="10">{value}</text>
      </svg>
    </figure>
  );
}

export const RadialChart = EvoRadialChart;
