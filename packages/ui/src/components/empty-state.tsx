import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  compact,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('ev-empty', className)} data-compact={compact || undefined}>
      {icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {(action || secondaryAction) && (
        <div style={{ display: 'flex', gap: 8 }}>
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
