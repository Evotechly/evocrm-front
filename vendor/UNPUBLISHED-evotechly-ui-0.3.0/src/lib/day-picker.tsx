import { DayPicker, type DayPickerProps } from "react-day-picker";

export type EvoDayPickerProps = DayPickerProps & {
  navLabel?: string;
};

/** Shared DayPicker with unique nav names and day labels that match visible text. */
export function EvoDayPicker({
  navLabel = "Calendar navigation",
  className = "evo-calendar",
  labels,
  ...props
}: EvoDayPickerProps) {
  return (
    <DayPicker
      className={className}
      labels={{
        labelNav: () => navLabel,
        labelDayButton: (date) => String(date.getDate()),
        labelGridcell: (date) => String(date.getDate()),
        ...labels,
      }}
      {...props}
    />
  );
}
