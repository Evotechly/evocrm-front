import {
  useId,
  type ChangeEvent,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from 'react';
import { Input as UiInput, Checkbox as UiCheckbox } from '@evotechly/ui';

export function Input({
  label,
  error,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return <UiInput label={label} error={error} hint={hint} {...props} />;
}

export function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: ReactNode }) {
  const id = useId();
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select {...props} id={id} aria-label={label}>
        {children}
      </select>
    </label>
  );
}

export function Checkbox({
  label,
  onChange,
  checked,
  defaultChecked,
  disabled,
  name,
  value,
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <UiCheckbox
      label={label}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      name={name}
      value={typeof value === 'string' ? value : undefined}
      onCheckedChange={(next) => {
        onChange?.({
          target: { checked: next === true },
          currentTarget: { checked: next === true },
        } as ChangeEvent<HTMLInputElement>);
      }}
    />
  );
}

export function DatePicker(props: Omit<Parameters<typeof Input>[0], 'type'>) {
  return <Input {...props} type="date" />;
}
