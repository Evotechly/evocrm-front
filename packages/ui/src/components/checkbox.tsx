import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from '@phosphor-icons/react';
import { useId, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  error?: string;
  label?: ReactNode;
  description?: string;
  name?: string;
  value?: string;
  className?: string;
}

export function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  error,
  label,
  description,
  name,
  value,
  className,
}: CheckboxProps) {
  const id = useId();
  return (
    <div className={cn('ev-check', className)} data-invalid={!!error}>
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        value={value}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        <CheckboxPrimitive.Indicator>
          {checked === 'indeterminate' ? <Minus size={12} /> : <Check size={12} />}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {(label || description) && (
        <label htmlFor={id}>
          {label}
          {description && <small>{description}</small>}
        </label>
      )}
      {error && (
        <p id={`${id}-error`} className="ev-field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function CheckboxGroup({
  children,
  orientation = 'vertical',
  legend,
  className,
}: {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  legend?: string;
  className?: string;
}) {
  return (
    <fieldset className={cn('ev-checkbox-group', className)} data-orientation={orientation}>
      {legend && <legend className="ev-field-label">{legend}</legend>}
      {children}
    </fieldset>
  );
}
