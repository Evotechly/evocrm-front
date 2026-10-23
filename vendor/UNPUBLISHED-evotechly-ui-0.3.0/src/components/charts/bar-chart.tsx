import * as React from "react";

export function EvoBarChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const width = 160 / data.length;
  return (
    <figure data-evo="bar-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 64" width="160" height="64">
        {data.map((value, index) => (
          <rect
            key={index}
            x={index * width + 2}
            y={64 - (value / max) * 56}
            width={Math.max(4, width - 4)}
            height={(value / max) * 56}
            fill="var(--brand-actionA11y)"
          />
        ))}
      </svg>
    </figure>
  );
}

export const BarChart = EvoBarChart;
