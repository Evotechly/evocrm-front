import * as React from "react";

export function EvoFunnelChart({ data, label }: { data: { label: string; value: number }[]; label: string }) {
  const max = Math.max(1, ...data.map((item) => item.value));
  return (
    <figure data-evo="funnel-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 80" width="160" height="80">
        {data.map((item, index) => {
          const width = (item.value / max) * 140;
          return (
            <g key={item.label}>
              <rect x={(160 - width) / 2} y={index * 22 + 4} width={width} height={18} fill="var(--brand-actionA11y)" opacity={1 - index * 0.15} />
              <text x="80" y={index * 22 + 17} textAnchor="middle" fill="var(--brand-actionFg)" fontSize="10">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export const FunnelChart = EvoFunnelChart;
