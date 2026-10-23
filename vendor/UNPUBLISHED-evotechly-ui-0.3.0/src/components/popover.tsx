import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useState, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export function Popover({
  trigger,
  children,
  open,
  onOpenChange,
  side = 'bottom',
  align = 'end',
  label,
  closeOnAction = false,
}: {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  label?: string;
  closeOnAction?: boolean;
}) {
  const [internal, setInternal] = useState(false);
  const isOpen = open ?? internal;
  const setOpen = (next: boolean) => {
    setInternal(next);
    onOpenChange?.(next);
  };
  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content className={cn('ev-popover')} side={side} align={align} sideOffset={8}>
          <div
            aria-label={label}
            onClick={(event) => {
              if (closeOnAction && (event.target as HTMLElement).closest('button')) setOpen(false);
            }}
          >
            {children}
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
