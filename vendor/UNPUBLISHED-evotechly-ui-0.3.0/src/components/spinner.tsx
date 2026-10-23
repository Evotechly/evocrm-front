import { cn } from '../utils/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
}: {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn('ev-spinner', className)} data-size={size} role="status">
      <span className="ev-sr-only">{label}</span>
    </span>
  );
}
