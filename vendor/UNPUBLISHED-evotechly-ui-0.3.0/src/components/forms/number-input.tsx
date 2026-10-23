import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoNumberInput({
  label,
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
}: {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  const set = (next: number) => {
    const clamped = Math.min(max ?? next, Math.max(min ?? next, next));
    setInternal(clamped);
    onChange?.(clamped);
  };
  return (
    <div data-evo="number-input" className="evo-stepper-field">
      {label ? <span className="evo-label">{label}</span> : null}
      <div className="evo-btn-group" data-orientation="horizontal">
        <EvoButton variant="outline" aria-label="Decrease" onClick={() => set(current - step)}>
          <span aria-hidden="true">-</span>
        </EvoButton>
        <input
          className="evo-input tabular-nums"
          type="number"
          aria-label={label ?? "Number"}
          value={current}
          min={min}
          max={max}
          step={step}
          onChange={(event) => set(Number(event.target.value))}
        />
        <EvoButton variant="outline" aria-label="Increase" onClick={() => set(current + step)}>
          <span aria-hidden="true">+</span>
        </EvoButton>
      </div>
    </div>
  );
}

export const NumberInput = EvoNumberInput;
