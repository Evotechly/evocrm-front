import * as React from "react";
import { differenceInDays, parseISO } from "date-fns";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

export function EvoGantt({
  items,
  zoom = "week",
}: {
  items: { id: string; title: string; start: string; end: string }[];
  zoom?: "day" | "week" | "month";
}) {
  const start = items.length ? parseISO(items[0].start) : new Date();
  return (
    <DndContext onDragEnd={(_event: DragEndEvent) => undefined}>
      <div data-evo="gantt" className="evo-gantt" data-zoom={zoom}>
        {items.map((item) => {
          const offset = Math.max(0, differenceInDays(parseISO(item.start), start) * (zoom === "day" ? 24 : 8));
          const width = Math.max(24, differenceInDays(parseISO(item.end), parseISO(item.start)) * (zoom === "day" ? 24 : 8));
          return (
            <div key={item.id} className="evo-gantt-row">
              <span>{item.title}</span>
              <div className="evo-gantt-bar" style={{ marginInlineStart: offset, width }}>{item.title}</div>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}

export const Gantt = EvoGantt;
