import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export function EvoRadioGroup({
  label,
  options,
  variant = "inline",
  error,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  label?: string;
  options: { value: string; label: string; description?: string }[];
  variant?: "inline" | "card";
  error?: string;
}) {
  return (
    <fieldset data-evo="radio-group" className="evo-field" data-invalid={Boolean(error)}>
      {label ? <legend className="evo-field-legend">{label}</legend> : null}
      <RadioGroupPrimitive.Root className={variant === "card" ? "evo-radio-cards" : "evo-radio-group"} {...props}>
        {options.map((option) => (
          <label key={option.value} className={variant === "card" ? "evo-radio-card" : "evo-label"} data-disabled={props.disabled}>
            <RadioGroupPrimitive.Item value={option.value} className="evo-radio" disabled={props.disabled}>
              <RadioGroupPrimitive.Indicator />
            </RadioGroupPrimitive.Item>
            <span>
              {option.label}
              {option.description ? <small className="evo-field-description">{option.description}</small> : null}
            </span>
          </label>
        ))}
      </RadioGroupPrimitive.Root>
      {error ? <p className="evo-field-message" data-invalid="true">{error}</p> : null}
    </fieldset>
  );
}

export const RadioGroup = EvoRadioGroup;
export const Radio = RadioGroupPrimitive.Item;
