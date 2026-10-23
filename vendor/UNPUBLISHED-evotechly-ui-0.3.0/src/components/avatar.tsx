import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg';

export function Avatar({
  src,
  alt,
  initials,
  size = 'md',
  className,
}: {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  className?: string;
}) {
  return (
    <AvatarPrimitive.Root className={cn('ev-avatar', className)} data-size={size}>
      {src && <AvatarPrimitive.Image src={src} alt={alt || initials || ''} />}
      <AvatarPrimitive.Fallback delayMs={0} aria-label={alt || initials || 'Avatar'}>
        {initials?.slice(0, 2).toUpperCase() || '?'}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export function AvatarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('ev-avatar-group', className)}>{children}</div>;
}
