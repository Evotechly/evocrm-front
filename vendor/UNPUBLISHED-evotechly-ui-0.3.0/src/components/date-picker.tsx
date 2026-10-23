import { CalendarBlank, X } from '@phosphor-icons/react';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { Calendar } from './calendar';
import { IconButton } from './icon-button';
import { Popover } from './popover';
import { cn } from '../utils/cn';

export function DatePicker({
  value,
  defaultValue,
  onChange,
  label,
  error,
  hint,
  disabled,
  min,
  max,
  disabledDates,
  locale,
  name,
  placeholder = 'Select date',
  className,
}: {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  min?: Date;
  max?: Date;
  disabledDates?: Date[];
  locale?: string;
  name?: string;
  placeholder?: string;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = useState<Date | null>(defaultValue ?? null);
  const [open, setOpen] = useState(false);
  const selected = value === undefined ? uncontrolled : value;
  const setSelected = (date: Date | null) => {
    setUncontrolled(date);
    onChange?.(date);
  };
  const display = selected
    ? selected.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
    : placeholder;

  return (
    <div className={cn('ev-field', className)} data-invalid={!!error} data-disabled={disabled || undefined}>
      {label && <span className="ev-field-label">{label}</span>}
      <input type="hidden" name={name} value={selected ? format(selected, 'yyyy-MM-dd') : ''} />
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button type="button" className="ev-select-trigger" disabled={disabled} aria-haspopup="dialog">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <CalendarBlank size={16} />
              {display}
            </span>
            {selected && (
              <IconButton
                label="Clear date"
                icon={<X size={12} />}
                size="sm"
                variant="ghost"
                tooltip={false}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelected(null);
                }}
              />
            )}
          </button>
        }
      >
        <Calendar
          mode="single"
          selected={selected ?? undefined}
          onSelect={(date) => {
            setSelected(date ?? null);
            setOpen(false);
          }}
          disabled={[
            ...(min ? [{ before: min }] : []),
            ...(max ? [{ after: max }] : []),
            ...(disabledDates ?? []),
          ]}
          defaultMonth={selected ?? undefined}
        />
      </Popover>
      {(error || hint) && <p className={error ? 'ev-field-error' : 'ev-field-help'}>{error || hint}</p>}
    </div>
  );
}

export function parseDateValue(value: string) {
  return value ? parseISO(value) : null;
}
