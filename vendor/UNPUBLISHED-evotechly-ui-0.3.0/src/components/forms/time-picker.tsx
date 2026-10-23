import * as React from "react";
import { EvoInput } from "./input";

export function EvoTimePicker({
  label = "Time",
  defaultValue,
  value,
  onChange,
}: {
  label?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div data-evo="time-picker">
      <EvoInput
        type="time"
        label={label}
        defaultValue={defaultValue}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
}

export const TimePicker = EvoTimePicker;
