import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../utils/cn';

export function Progress({
  value,
  indeterminate,
  size = 'md',
  tone = 'brand',
  label = 'Progress',
  className,
}: {
  value?: number;
  indeterminate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'brand' | 'success' | 'warning' | 'error';
  label?: string;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  return (
    <ProgressPrimitive.Root
      className={cn('ev-progress', className)}
      value={indeterminate ? undefined : clamped}
      data-size={size}
      data-tone={tone}
      data-indeterminate={indeterminate || undefined}
      aria-label={label}
    >
      <ProgressPrimitive.Indicator className="ev-progress-bar" style={indeterminate ? undefined : { width: `${clamped}%` }} />
    </ProgressPrimitive.Root>
  );
}
