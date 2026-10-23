import * as React from "react";
import { EvoCheckbox } from "../forms/checkbox";
import { EvoButton } from "../foundations/button";

export type EvoColumnOption = { id: string; label: string; visible: boolean };

export function EvoColumnVisibility({
  columns,
  views = [],
  onChange,
}: {
  columns: EvoColumnOption[];
  views?: { id: string; name: string }[];
  onChange?: (columns: EvoColumnOption[]) => void;
}) {
  const [internal, setInternal] = React.useState(columns);
  return (
    <fieldset data-evo="column-visibility" className="evo-field">
      <legend className="evo-field-legend">Columns</legend>
      {internal.map((column, index) => (
        <EvoCheckbox
          key={column.id}
          label={column.label}
          checked={column.visible}
          onCheckedChange={(checked) => {
            const next = internal.map((item, itemIndex) =>
              itemIndex === index ? { ...item, visible: Boolean(checked) } : item,
            );
            setInternal(next);
            onChange?.(next);
          }}
        />
      ))}
      {views.length ? (
        <div className="evo-toolbar">
          {views.map((view) => (
            <EvoButton key={view.id} size="sm" variant="ghost">{view.name}</EvoButton>
          ))}
        </div>
      ) : null}
    </fieldset>
  );
}

export const ColumnVisibility = EvoColumnVisibility;
