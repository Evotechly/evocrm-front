import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
} from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export type AlertTone = 'information' | 'success' | 'warning' | 'destructive';

const icons = {
  information: Info,
  success: CheckCircle,
  warning: Warning,
  destructive: WarningCircle,
};

export function Alert({
  tone = 'information',
  title,
  description,
  action,
  className,
}: {
  tone?: AlertTone;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  const Icon = icons[tone];
  return (
    <div className={cn('ev-alert', className)} data-tone={tone} role="alert">
      <Icon size={18} />
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
