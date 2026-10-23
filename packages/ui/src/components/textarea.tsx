import { forwardRef, useId, useRef, useState, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    hint,
    error,
    maxLength,
    showCount,
    autoResize,
    className,
    id,
    disabled,
    readOnly,
    value,
    defaultValue,
    onChange,
    ...props
  },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  const helpId = `${fieldId}-help`;
  const inner = useRef<HTMLTextAreaElement | null>(null);
  const [uncontrolledLength, setUncontrolledLength] = useState(String(defaultValue ?? '').length);
  const count = value !== undefined ? String(value).length : uncontrolledLength;
  return (
    <div className={cn('ev-field', className)} data-invalid={!!error} data-disabled={disabled || undefined}>
      {label && (
        <label className="ev-field-label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className="ev-field-control">
        <textarea
          ref={(node) => {
            inner.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          id={fieldId}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={!!error || undefined}
          aria-describedby={error || hint || showCount ? helpId : undefined}
          onChange={(event) => {
            setUncontrolledLength(event.currentTarget.value.length);
            if (autoResize && event.currentTarget) {
              event.currentTarget.style.height = 'auto';
              event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
            }
            onChange?.(event);
          }}
          {...props}
        />
      </div>
      {(error || hint || showCount) && (
        <p id={helpId} className={error ? 'ev-field-error' : 'ev-field-help'}>
          {error || hint}
          {showCount ? ` ${count}${maxLength ? ` / ${maxLength}` : ''}` : null}
        </p>
      )}
    </div>
  );
});
