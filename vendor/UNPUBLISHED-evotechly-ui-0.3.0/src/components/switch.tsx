import * as SwitchPrimitive from '@radix-ui/react-switch';
import { useId } from 'react';
import { cn } from '../utils/cn';

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  label,
  description,
  name,
  className,
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  name?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <label className={cn('ev-switch', className)} data-checked={checked} data-disabled={disabled || undefined} htmlFor={id}>
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
      >
        <SwitchPrimitive.Thumb className="ev-switch-thumb" />
      </SwitchPrimitive.Root>
      {(label || description) && (
        <span className="ev-switch-copy">
          {label}
          {description && <small>{description}</small>}
        </span>
      )}
    </label>
  );
}
