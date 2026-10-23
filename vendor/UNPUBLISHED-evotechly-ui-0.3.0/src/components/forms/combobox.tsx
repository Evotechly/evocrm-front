import * as React from "react";
import { EvoCommand, EvoCommandInput, EvoCommandItem, EvoCommandList } from "../navigation/command";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export type EvoComboboxOption = { value: string; label: string };

export function EvoCombobox({
  label,
  options,
  value,
  onValueChange,
  onSearch,
}: {
  label?: string;
  options: EvoComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (query: string) => void;
}) {
  const selected = options.find((option) => option.value === value);
  return (
    <div data-evo="combobox" className="evo-field">
      {label ? <span className="evo-label">{label}</span> : null}
      <EvoPopover
        content={
          <EvoCommand>
            <EvoCommandInput placeholder="Search" onValueChange={onSearch} />
            <EvoCommandList>
              {options.map((option) => (
                <EvoCommandItem key={option.value} value={option.value} onSelect={() => onValueChange?.(option.value)}>
                  {option.label}
                </EvoCommandItem>
              ))}
            </EvoCommandList>
          </EvoCommand>
        }
      >
        <EvoButton
          variant="outline"
          aria-label={`${label ? `${label}: ` : ""}${selected?.label ?? "Select"}`}
          aria-haspopup="listbox"
        >
          {selected?.label ?? "Select"}
        </EvoButton>
      </EvoPopover>
    </div>
  );
}

export const Combobox = EvoCombobox;
