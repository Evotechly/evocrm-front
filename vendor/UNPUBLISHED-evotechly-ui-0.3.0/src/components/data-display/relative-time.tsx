import * as React from "react";

function formatRelative(date: Date) {
  const delta = (date.getTime() - Date.now()) / 1000;
  const abs = Math.abs(delta);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (abs < 60) return rtf.format(Math.round(delta), "second");
  if (abs < 3600) return rtf.format(Math.round(delta / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(delta / 3600), "hour");
  return rtf.format(Math.round(delta / 86400), "day");
}

export function EvoRelativeTime({ date }: { date: string | Date }) {
  const parsed = typeof date === "string" ? new Date(date) : date;
  const [label, setLabel] = React.useState(() => formatRelative(parsed));
  React.useEffect(() => {
    const tick = () => setLabel(formatRelative(parsed));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [parsed]);
  return (
    <time data-evo="relative-time" dateTime={parsed.toISOString()} title={parsed.toLocaleString()}>
      {label}
    </time>
  );
}

export const RelativeTime = EvoRelativeTime;
