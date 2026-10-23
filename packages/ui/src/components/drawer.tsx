import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { IconButton } from './icon-button';
import { cn } from '../utils/cn';

export function Drawer({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  children,
  side = 'right',
  trigger,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: 'left' | 'right' | 'bottom';
  trigger?: ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ev-overlay" />
        <DialogPrimitive.Content className={cn('ev-drawer')} data-side={side} aria-describedby={undefined}>
          <DialogPrimitive.Title className="ev-dialog-title">{title}</DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className="ev-dialog-description">{description}</DialogPrimitive.Description>
          )}
          {children}
          <DialogPrimitive.Close asChild>
            <IconButton label="Close" icon={<X size={16} />} variant="ghost" size="sm" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
