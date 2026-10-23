import {
  Dialog as UiDialog,
  Drawer as UiDrawer,
  Popover as UiPopover,
  Tooltip as UiTooltip,
} from '@evotechly/ui';
import { useState, type ReactNode } from 'react';

export function Dialog({
  open,
  onClose,
  title,
  children,
  description = 'Modifications locales à cette session.',
  size,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: 'dialog' | 'drawer';
  size?: 'sm' | 'md' | 'lg';
}) {
  return (
    <UiDialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
      title={title}
      description={description}
      size={size}
    >
      {children}
    </UiDialog>
  );
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  description = 'Modifications locales à cette session.',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <UiDrawer
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
      title={title}
      description={description}
      side="right"
    >
      {children}
    </UiDrawer>
  );
}

export function Popover({
  trigger,
  children,
  label,
  closeOnAction = false,
}: {
  trigger: ReactNode;
  children: ReactNode;
  label: string;
  closeOnAction?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <UiPopover
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      align="end"
    >
      <div
        aria-label={label}
        onClick={(e) => {
          if (closeOnAction && (e.target as HTMLElement).closest('button')) setOpen(false);
        }}
      >
        {children}
      </div>
    </UiPopover>
  );
}

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return <UiTooltip content={text}>{children}</UiTooltip>;
}
