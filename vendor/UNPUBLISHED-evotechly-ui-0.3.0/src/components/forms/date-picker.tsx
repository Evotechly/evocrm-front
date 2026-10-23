import * as React from "react";
import { EvoDayPicker } from "../../lib/day-picker";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export function EvoDatePicker({
  label = "Date",
  value,
  onChange,
}: {
  label?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
}) {
  const [date, setDate] = React.useState(value);
  return (
    <div data-evo="date-picker" className="evo-field">
      <span className="evo-label">{label}</span>
      <EvoPopover
        content={
          <EvoDayPicker
            navLabel="Date picker navigation"
            mode="single"
            selected={date}
            onSelect={(next) => {
              setDate(next);
              onChange?.(next);
            }}
          />
        }
      >
        <EvoButton variant="outline">{date ? date.toLocaleDateString() : "Pick a date"}</EvoButton>
      </EvoPopover>
    </div>
  );
}

export const DatePicker = EvoDatePicker;
