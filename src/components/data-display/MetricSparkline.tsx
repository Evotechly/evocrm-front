export function MetricSparkline({ values, tone = 'orange' }: { values: number[]; tone?: string }) {
  const width = 160;
  const height = 42;
  const max = Math.max(0, ...values);
  const min = Math.min(0, ...values);
  const points = values
    .map(
      (value, index) =>
        `${(index / Math.max(1, values.length - 1)) * width},${height - ((value - min) / (max - min || 1)) * (height - 6) - 3}`,
    )
    .join(' ');
  return (
    <svg className={`sparkline ${tone}`} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
