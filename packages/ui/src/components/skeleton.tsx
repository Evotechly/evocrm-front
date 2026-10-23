import { cn } from '../utils/cn';

export function Skeleton({
  variant = 'text',
  className,
  style,
}: {
  variant?: 'text' | 'avatar' | 'card' | 'table';
  className?: string;
  style?: React.CSSProperties;
}) {
  if (variant === 'avatar') return <span className={cn('ev-skeleton', className)} style={{ width: 32, height: 32, borderRadius: '50%', ...style }} />;
  if (variant === 'card') return <span className={cn('ev-skeleton', className)} style={{ width: '100%', height: 120, ...style }} />;
  if (variant === 'table') {
    return (
      <div className={className} aria-hidden>
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="ev-skeleton" style={{ display: 'block', height: 16, marginBottom: 8 }} />
        ))}
      </div>
    );
  }
  return <span className={cn('ev-skeleton', className)} style={{ width: '100%', height: 12, ...style }} />;
}
