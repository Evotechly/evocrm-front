import { useId, type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react';
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
export function DatePicker(props: Omit<Parameters<typeof Input>[0], 'type'>) {
  return <Input {...props} type="date" />;
}
