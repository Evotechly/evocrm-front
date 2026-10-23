import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoInlineEdit({
  defaultValue = "",
  onSave,
}: {
  defaultValue?: string;
  onSave?: (value: string) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  if (!editing) {
    return (
      <button data-evo="inline-edit" type="button" className="evo-inline-edit" onClick={() => setEditing(true)}>
        {value || "Edit"}
      </button>
    );
  }
  return (
    <span data-evo="inline-edit" className="evo-toolbar">
      <input className="evo-input" value={value} onChange={(event) => setValue(event.target.value)} aria-label="Edit value" />
      <EvoButton size="sm" onClick={() => { onSave?.(value); setEditing(false); }}>Save</EvoButton>
    </span>
  );
}

export const InlineEdit = EvoInlineEdit;
