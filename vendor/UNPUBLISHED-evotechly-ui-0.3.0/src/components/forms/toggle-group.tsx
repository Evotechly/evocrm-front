import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

export function EvoToggleGroup({
  options,
  value,
  defaultValue,
  onValueChange,
}: {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <ToggleGroupPrimitive.Root
      data-evo="toggle-group"
      type="single"
      className="evo-btn-group"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <ToggleGroupPrimitive.Item key={option.value} value={option.value} className="evo-btn evo-btn--outline evo-btn--sm">
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  );
}

export const ToggleGroup = EvoToggleGroup;
