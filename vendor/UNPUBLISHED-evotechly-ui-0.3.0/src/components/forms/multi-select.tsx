import * as React from "react";
import { EvoCheckbox } from "./checkbox";

export function EvoMultiSelect({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: { value: string; label: string }[];
  value?: string[];
  onChange?: (value: string[]) => void;
}) {
  const [internal, setInternal] = React.useState<string[]>(value ?? []);
  const selected = value ?? internal;
  const toggle = (next: string) => {
    const updated = selected.includes(next) ? selected.filter((item) => item !== next) : [...selected, next];
    setInternal(updated);
    onChange?.(updated);
  };
  return (
    <div data-evo="multi-select" className="evo-field" role="group" aria-label={label}>
      {label ? <span className="evo-label">{label}</span> : null}
      {options.map((option) => (
        <EvoCheckbox
          key={option.value}
          label={option.label}
          checked={selected.includes(option.value)}
          onCheckedChange={() => toggle(option.value)}
        />
      ))}
    </div>
  );
}

export const MultiSelect = EvoMultiSelect;
