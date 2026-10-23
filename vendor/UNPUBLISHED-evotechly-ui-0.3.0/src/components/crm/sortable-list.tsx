import * as React from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Row({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      className="evo-task-row"
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {label}
    </div>
  );
}

export function EvoSortableList({
  items,
  onChange,
}: {
  items: { id: string; label: string }[];
  onChange?: (items: { id: string; label: string }[]) => void;
}) {
  const [rows, setRows] = React.useState(items);
  const handle = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);
    const next = arrayMove(rows, oldIndex, newIndex);
    setRows(next);
    onChange?.(next);
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handle}>
      <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
        <div data-evo="sortable-list" className="evo-timeline">
          {rows.map((row) => (
            <Row key={row.id} id={row.id} label={row.label} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export const SortableList = EvoSortableList;
