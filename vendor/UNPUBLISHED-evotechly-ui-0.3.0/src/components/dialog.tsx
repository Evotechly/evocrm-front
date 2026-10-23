import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { IconButton } from './icon-button';
import { cn } from '../utils/cn';

export function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  onClose,
  title,
  description,
  children,
  size = 'md',
  trigger,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  trigger?: ReactNode;
}) {
  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={(next) => {
        onOpenChange?.(next);
        if (!next) onClose?.();
      }}
    >
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ev-overlay" />
        <DialogPrimitive.Content className={cn('ev-dialog')} data-size={size}>
          <DialogPrimitive.Title className="ev-dialog-title">{title}</DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className="ev-dialog-description">{description}</DialogPrimitive.Description>
          )}
          {children}
          <DialogPrimitive.Close asChild>
            <IconButton
              className="ev-dialog-close"
              label="Fermer"
              icon={<X size={16} />}
              variant="ghost"
              size="sm"
              tooltip={false}
              style={{ position: 'absolute', top: 16, right: 16 }}
            />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
