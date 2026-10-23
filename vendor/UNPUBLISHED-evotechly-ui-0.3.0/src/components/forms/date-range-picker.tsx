import * as React from "react";
import { type DateRange } from "react-day-picker";
import { EvoDayPicker } from "../../lib/day-picker";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export function EvoDateRangePicker({
  label = "Range",
  value,
  onChange,
}: {
  label?: string;
  value?: DateRange;
  onChange?: (range?: DateRange) => void;
}) {
  const [range, setRange] = React.useState(value);
  return (
    <div data-evo="date-range-picker" className="evo-field">
      <span className="evo-label">{label}</span>
      <EvoPopover
        content={
          <EvoDayPicker
            navLabel="Date range navigation"
            mode="range"
            selected={range}
            onSelect={(next) => {
              setRange(next);
              onChange?.(next);
            }}
          />
        }
      >
        <EvoButton variant="outline">
          {range?.from && range.to
            ? `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
            : "Pick a range"}
        </EvoButton>
      </EvoPopover>
    </div>
  );
}

export const DateRangePicker = EvoDateRangePicker;
