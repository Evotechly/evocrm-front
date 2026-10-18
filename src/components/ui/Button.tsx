import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft' | 'danger';
  loading?: boolean;
};
export function Button({
  children,
  variant = 'secondary',
  className = '',
  loading = false,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? 'Chargement…' : children}
    </button>
  );
}
