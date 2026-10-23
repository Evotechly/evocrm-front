import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export function EvoCheckbox({
  label,
  id,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { label?: string }) {
  const generated = React.useId();
  const boxId = id ?? generated;
  return (
    <label className="evo-label" htmlFor={boxId}>
      <CheckboxPrimitive.Root data-evo="checkbox" id={boxId} className="evo-checkbox" {...props}>
        <CheckboxPrimitive.Indicator>✓</CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
    </label>
  );
}

export const Checkbox = EvoCheckbox;
