import * as React from "react";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export function EvoNotificationCenter({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  return (
    <EvoPopover
      content={
        <ul className="evo-timeline">
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      }
    >
      <EvoButton data-evo="notification-center" variant="ghost">
        Notifications ({items.length})
      </EvoButton>
    </EvoPopover>
  );
}

export const NotificationCenter = EvoNotificationCenter;
