import * as React from "react";
import { cn } from "../../lib/cn";

export type EvoInputProps = React.ComponentProps<"input"> & { label?: string };

export function EvoInput({ label, id, className, placeholder, ...props }: EvoInputProps) {
  const generated = React.useId();
  const inputId = id ?? generated;
  return (
    <div data-evo="input" className="evo-field evo-floating">
      {label ? <label className="evo-label" htmlFor={inputId}>{label}</label> : null}
      <input id={inputId} className={cn("evo-input", className)} placeholder={placeholder ?? " "} {...props} />
    </div>
  );
}

export const Input = EvoInput;
