import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Spinner } from './spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'soft' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variantAlias: Record<ButtonVariant, 'primary' | 'secondary' | 'ghost' | 'destructive'> = {
  primary: 'primary',
  secondary: 'secondary',
  ghost: 'ghost',
  destructive: 'destructive',
  soft: 'secondary',
  danger: 'destructive',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  active?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leadingIcon,
    trailingIcon,
    active,
    className,
    disabled,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn('ev-button', className)}
      data-variant={variantAlias[variant]}
      data-size={size}
      data-loading={loading || undefined}
      data-active={active || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner size="sm" label="Loading" /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});
