import * as React from "react";

export function EvoActivityFeed({
  items,
}: {
  items: { id: string; actor: string; action: string }[];
}) {
  return (
    <ol data-evo="activity-feed" className="evo-timeline">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.actor}</strong> {item.action}
        </li>
      ))}
    </ol>
  );
}

export const ActivityFeed = EvoActivityFeed;
