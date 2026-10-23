import * as React from "react";

export function EvoHeatmap({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(1, ...values);
  return (
    <figure data-evo="heatmap" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox={`0 0 ${values.length * 14} 14`} height="14">
        {values.map((value, index) => (
          <rect key={index} x={index * 14} y="0" width="12" height="12" rx="2" fill="var(--brand-actionA11y)" opacity={(value / max) || 0.15} />
        ))}
      </svg>
    </figure>
  );
}

export const Heatmap = EvoHeatmap;
