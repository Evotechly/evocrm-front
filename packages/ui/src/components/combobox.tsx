import { CaretDown, X } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { cn } from '../utils/cn';
import { Popover } from './popover';
import { Spinner } from './spinner';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export function Combobox({
  options,
  value,
  defaultValue = '',
  onValueChange,
  placeholder = 'Search',
  label,
  error,
  loading,
  disabled,
  emptyText = 'No results',
  className,
}: {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  emptyText?: string;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const selected = value ?? uncontrolled;
  const setSelected = (next: string) => {
    setUncontrolled(next);
    onValueChange?.(next);
  };
  const filtered = useMemo(
    () => options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );
  const selectedLabel = options.find((option) => option.value === selected)?.label;

  return (
    <div className={cn('ev-field', className)} data-invalid={!!error} data-disabled={disabled || undefined}>
      {label && <span className="ev-field-label">{label}</span>}
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={
          <button type="button" className="ev-combobox-trigger" disabled={disabled} aria-expanded={open}>
            <span>{selectedLabel || placeholder}</span>
            <span style={{ display: 'inline-flex', gap: 4 }}>
              {selected && (
                <span
                  role="button"
                  tabIndex={0}
                  aria-label="Clear selection"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelected('');
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelected('');
                    }
                  }}
                >
                  <X size={12} />
                </span>
              )}
              <CaretDown size={14} />
            </span>
          </button>
        }
      >
        <div className="ev-combobox-content">
          <input
            className="ev-field-control"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={label || placeholder}
            autoFocus
          />
          {loading && <Spinner size="sm" />}
          {!loading && filtered.length === 0 && <p className="ev-field-help">{emptyText}</p>}
          {filtered.map((option) => (
            <button
              key={option.value}
              type="button"
              className="ev-combobox-item"
              disabled={option.disabled}
              data-highlighted={option.value === selected || undefined}
              onClick={() => {
                setSelected(option.value);
                setOpen(false);
                setQuery('');
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Popover>
      {error && <p className="ev-field-error">{error}</p>}
    </div>
  );
}
