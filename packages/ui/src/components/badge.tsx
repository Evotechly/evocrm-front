import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'error' | 'information' | 'brand';

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
    <span className={cn('ev-badge', className)} data-tone={tone}>
      {icon}
      {children}
    </span>
  );
}
