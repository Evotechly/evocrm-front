import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

export function EvoSlider({
  label,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { label?: string }) {
  return (
    <div data-evo="slider" className="evo-field">
      {label ? <span className="evo-label">{label}</span> : null}
      <SliderPrimitive.Root className="evo-slider" aria-label={label} {...props}>
        <SliderPrimitive.Track className="evo-slider-track">
          <SliderPrimitive.Range className="evo-slider-range" />
        </SliderPrimitive.Track>
        {(props.defaultValue ?? props.value ?? [0]).map((_, index) => (
          <SliderPrimitive.Thumb key={index} className="evo-slider-thumb" aria-label={`${label ?? "Value"} ${index + 1}`} />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

export const Slider = EvoSlider;
