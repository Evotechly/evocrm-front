import * as React from "react";
import { EvoDayPicker, type EvoDayPickerProps } from "../../lib/day-picker";

export function EvoCalendar(props: EvoDayPickerProps) {
  return (
    <div data-evo="calendar">
      <EvoDayPicker navLabel="Month navigation" {...props} />
    </div>
  );
}

export const Calendar = EvoCalendar;
