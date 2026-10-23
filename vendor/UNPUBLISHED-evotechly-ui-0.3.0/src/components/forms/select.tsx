import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export type EvoSelectOption = { value: string; label: string };

export function EvoSelect({
  label,
  options,
  placeholder = "Select",
  defaultValue,
  value,
  onValueChange,
}: {
  label?: string;
  options: EvoSelectOption[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const id = React.useId();
  return (
    <div data-evo="select" className="evo-field">
      {label ? <label className="evo-label" htmlFor={id}>{label}</label> : null}
      <SelectPrimitive.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger id={id} className="evo-select-trigger">
          <SelectPrimitive.Value placeholder={placeholder} />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="evo-select-content">
            {options.map((option) => (
              <SelectPrimitive.Item key={option.value} value={option.value} className="evo-select-item">
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

export const Select = EvoSelect;
