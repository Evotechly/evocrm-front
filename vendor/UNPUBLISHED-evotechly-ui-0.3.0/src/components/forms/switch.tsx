import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export function EvoSwitch({
  label,
  id,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { label?: string }) {
  const generated = React.useId();
  const switchId = id ?? generated;
  return (
    <label className="evo-label" htmlFor={switchId}>
      <SwitchPrimitive.Root data-evo="switch" id={switchId} className="evo-switch" {...props}>
        <SwitchPrimitive.Thumb className="evo-switch-thumb" />
      </SwitchPrimitive.Root>
      {label}
    </label>
  );
}

export const Switch = EvoSwitch;
