import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leadingIcon, trailingIcon, className, id, disabled, readOnly, type = 'text', ...props },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  const helpId = `${fieldId}-help`;
  return (
    <div className={cn('ev-field', className)} data-invalid={!!error} data-disabled={disabled || undefined}>
      {label && (
        <label className="ev-field-label" htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className="ev-field-control">
        {leadingIcon}
        <input
          ref={ref}
          id={fieldId}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={!!error || undefined}
          aria-describedby={error || hint ? helpId : undefined}
          {...props}
        />
        {trailingIcon}
      </div>
      {(error || hint) && (
        <p id={helpId} className={error ? 'ev-field-error' : 'ev-field-help'}>
          {error || hint}
        </p>
      )}
    </div>
  );
});
