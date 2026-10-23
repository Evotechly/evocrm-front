import * as Radio from '@radix-ui/react-radio-group';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  description?: string;
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  options,
  orientation = 'vertical',
  disabled,
  error,
  legend,
  name,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  error?: string;
  legend?: string;
  name?: string;
  className?: string;
}) {
  return (
    <fieldset className={cn('ev-radio-group', className)} data-orientation={orientation}>
      {legend && <legend className="ev-field-label">{legend}</legend>}
      <Radio.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        name={name}
        orientation={orientation}
        aria-invalid={!!error || undefined}
      >
        {options.map((option) => (
          <label key={option.value} className="ev-radio" data-invalid={!!error}>
            <Radio.Item value={option.value} disabled={option.disabled}>
              <Radio.Indicator />
            </Radio.Item>
            <span>
              {option.label}
              {option.description && <small> {option.description}</small>}
            </span>
          </label>
        ))}
      </Radio.Root>
      {error && <p className="ev-field-error">{error}</p>}
    </fieldset>
  );
}
