import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & { variant?: 'primary' | 'secondary' | 'ghost' | 'soft' };
export function Button({ children, variant = 'secondary', className = '', ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}
