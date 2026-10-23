import * as React from "react";

export function EvoPieChart({ data, label }: { data: { label: string; value: number }[]; label: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let angle = 0;
  return (
    <figure data-evo="pie-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 64 64" width="64" height="64">
        {data.map((item) => {
          const slice = (item.value / total) * Math.PI * 2;
          const start = angle;
          angle += slice;
          const x1 = 32 + Math.cos(start) * 28;
          const y1 = 32 + Math.sin(start) * 28;
          const x2 = 32 + Math.cos(angle) * 28;
          const y2 = 32 + Math.sin(angle) * 28;
          const large = slice > Math.PI ? 1 : 0;
          return (
            <path
              key={item.label}
              d={`M32 32 L ${x1} ${y1} A 28 28 0 ${large} 1 ${x2} ${y2} Z`}
              fill="var(--brand-actionA11y)"
              opacity={0.4 + (item.value / total) * 0.6}
            />
          );
        })}
      </svg>
    </figure>
  );
}

export const PieChart = EvoPieChart;
