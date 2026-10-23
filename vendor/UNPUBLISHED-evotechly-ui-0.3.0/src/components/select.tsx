import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretDown, Check } from '@phosphor-icons/react';
import {
  useId,
  type ChangeEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

type NativeProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children?: ReactNode;
  options?: never;
  onValueChange?: never;
};

type MenuProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  className?: string;
  children?: never;
  onChange?: never;
};

export function Select(props: NativeProps | MenuProps) {
  if ('options' in props && props.options) {
    return <MenuSelect {...props} />;
  }
  return <NativeSelect {...(props as NativeProps)} />;
}

export function NativeSelect({
  label,
  error,
  children,
  className,
  id,
  disabled,
  ...props
}: NativeProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <label className={cn('ev-field', className)} htmlFor={fieldId} data-invalid={!!error} data-disabled={disabled || undefined}>
      {label && <span className="ev-field-label">{label}</span>}
      <span className="ev-field-control">
        <select id={fieldId} aria-label={label} disabled={disabled} {...props}>
          {children}
        </select>
      </span>
      {error && <span className="ev-field-error">{error}</span>}
    </label>
  );
}

export function MenuSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Sélectionner',
  label,
  error,
  disabled,
  name,
  className,
}: MenuProps) {
  const id = useId();
  return (
    <div className={cn('ev-field', className)} data-invalid={!!error} data-disabled={disabled || undefined}>
      {label && (
        <label className="ev-field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <SelectPrimitive.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name}>
        <SelectPrimitive.Trigger id={id} className="ev-select-trigger" aria-invalid={!!error || undefined} aria-label={label}>
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <CaretDown size={14} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="ev-select-content" position="popper" sideOffset={4}>
            <SelectPrimitive.Viewport>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="ev-select-item"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator>
                    <Check size={14} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <p className="ev-field-error">{error}</p>}
    </div>
  );
}

export type { ChangeEvent };
