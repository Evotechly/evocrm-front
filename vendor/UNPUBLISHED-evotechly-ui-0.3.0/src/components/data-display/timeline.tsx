import * as React from "react";

export function EvoTimeline({ items }: { items: { title: string; at?: string; body?: string }[] }) {
  return (
    <ol data-evo="timeline" className="evo-timeline">
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>
          {item.at ? <time dateTime={item.at}>{item.at}</time> : null}
          {item.body ? <p className="evo-card-description">{item.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export const Timeline = EvoTimeline;
