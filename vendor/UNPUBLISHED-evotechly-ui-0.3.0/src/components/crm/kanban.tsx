import * as React from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ id, title }: { id: string; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="evo-card"
      {...attributes}
      {...listeners}
    >
      {title}
    </div>
  );
}

export function EvoKanban({
  columns,
  onMove,
}: {
  columns: { id: string; title: string; cards: { id: string; title: string }[] }[];
  onMove?: (event: DragEndEvent) => void;
}) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onMove}>
      <div data-evo="kanban" className="evo-kanban">
        {columns.map((column) => (
          <section key={column.id} className="evo-kanban-col" aria-label={column.title}>
            <h3 className="evo-label">{column.title}</h3>
            <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
              {column.cards.map((card) => (
                <Card key={card.id} id={card.id} title={card.title} />
              ))}
            </SortableContext>
          </section>
        ))}
      </div>
    </DndContext>
  );
}

export const Kanban = EvoKanban;
