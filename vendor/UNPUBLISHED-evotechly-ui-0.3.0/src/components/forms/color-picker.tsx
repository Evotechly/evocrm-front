import * as React from "react";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

const SWATCHES = [
  { id: "brand", label: "Brand", css: "var(--brand-actionA11y)" },
  { id: "success", label: "Success", css: "var(--success)" },
  { id: "warning", label: "Warning", css: "var(--warning)" },
  { id: "danger", label: "Danger", css: "var(--danger)" },
  { id: "info", label: "Info", css: "var(--info)" },
] as const;

export function EvoColorPicker({
  label = "Color",
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internal, setInternal] = React.useState(value ?? "brand");
  const current = value ?? internal;
  const selected = SWATCHES.find((swatch) => swatch.id === current) ?? SWATCHES[0];
  const set = (next: string) => {
    setInternal(next);
    onChange?.(next);
  };
  return (
    <div data-evo="color-picker" className="evo-field">
      <span className="evo-label">{label}</span>
      <EvoPopover
        content={
          <div className="evo-swatches">
            {SWATCHES.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                aria-label={swatch.label}
                className="evo-swatch"
                style={{ background: swatch.css }}
                onClick={() => set(swatch.id)}
              />
            ))}
          </div>
        }
      >
        <EvoButton variant="outline">{selected.label}</EvoButton>
      </EvoPopover>
    </div>
  );
}

export const ColorPicker = EvoColorPicker;
