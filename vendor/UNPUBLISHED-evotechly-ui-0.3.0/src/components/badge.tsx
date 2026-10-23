import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'information' | 'brand' | 'info' | 'danger';

const toneAlias: Record<BadgeTone, 'neutral' | 'success' | 'warning' | 'error' | 'information' | 'brand'> = {
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  error: 'error',
  information: 'information',
  brand: 'brand',
  info: 'information',
  danger: 'error',
};

export function Badge({
  children,
  tone = 'neutral',
  icon,
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('ev-badge', className)} data-tone={toneAlias[tone]}>
      {icon}
      {children}
    </span>
  );
}
