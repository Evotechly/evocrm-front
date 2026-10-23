import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export function EvoVirtualizedList({
  items,
  height = 240,
  itemHeight = 36,
}: {
  items: React.ReactNode[];
  height?: number;
  itemHeight?: number;
}) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
  });
  return (
    <div data-evo="virtualized-list" ref={parentRef} className="evo-virtual" style={{ height }} role="list">
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((row) => (
          <div
            key={row.key}
            role="listitem"
            style={{ position: "absolute", top: 0, transform: `translateY(${row.start}px)`, height: row.size, width: "100%" }}
          >
            {items[row.index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export const VirtualizedList = EvoVirtualizedList;
