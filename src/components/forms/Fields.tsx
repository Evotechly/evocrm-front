import { useId, useState, type ChangeEvent, type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';
import * as P from '@radix-ui/react-popover';
import { CalendarDays } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
export function Input({
  label,
  error,
  hint,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  const id = useId();
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input
        {...props}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${id}-help` : undefined}
      />
      {(error || hint) && (
        <small id={`${id}-help`} className={error ? 'field-error' : 'muted'}>
          {error || hint}
        </small>
      )}
    </label>
  );
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
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: string }) {
  return (
    <label className="checkbox">
      <input {...props} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}
type DatePickerProps = {
  label: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  hint?: string;
};

const isoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseIsoDate = (value?: string) => {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

export function DatePicker({
  label,
  value = '',
  onChange,
  disabled,
  required,
  name,
  error,
  hint,
}: DatePickerProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const selected = parseIsoDate(value);
  const emitChange = (next: string) => {
    onChange?.({ target: { value: next, name: name ?? '' } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="field date-picker-field">
      <label htmlFor={id}>{label}</label>
      <P.Root open={open} onOpenChange={setOpen}>
        <div className="date-picker-control">
          <input
            id={id}
            name={name}
            type="date"
            value={value}
            onChange={(event) => onChange?.(event)}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error || hint ? `${id}-help` : undefined}
          />
          <P.Trigger asChild>
            <button
              type="button"
              className="date-picker-trigger"
              aria-label={`Ouvrir le calendrier ${label}`}
              disabled={disabled}
            >
              <CalendarDays size={16} aria-hidden="true" />
            </button>
          </P.Trigger>
        </div>
        <P.Portal>
          <P.Content className="date-picker-popover" align="start" sideOffset={8}>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(next) => {
                emitChange(next ? isoDate(next) : '');
                setOpen(false);
              }}
            />
          </P.Content>
        </P.Portal>
      </P.Root>
      {(error || hint) && (
        <small id={`${id}-help`} className={error ? 'field-error' : 'muted'}>
          {error || hint}
        </small>
      )}
    </div>
  );
}
