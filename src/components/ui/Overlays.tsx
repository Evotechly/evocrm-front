import * as D from '@radix-ui/react-dialog';
import * as P from '@radix-ui/react-popover';
import * as T from '@radix-ui/react-tooltip';
import { useRef, useState, type ReactNode } from 'react';
import { X } from '@phosphor-icons/react';
export function Dialog({
  open,
  onClose,
  title,
  children,
  description = 'Modifications locales à cette session.',
  variant = 'dialog',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  variant?: 'dialog' | 'drawer';
}) {
  const opener = useRef<HTMLElement | null>(null);
  return (
    <D.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <D.Portal>
        <D.Overlay className="modal-backdrop" />
        <D.Content
          className={`modal-content ${variant}`}
          onOpenAutoFocus={() => {
            opener.current = document.activeElement as HTMLElement | null;
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            if (opener.current?.isConnected && opener.current !== document.body)
              opener.current.focus();
            else document.querySelector<HTMLElement>('[data-page-primary]')?.focus();
          }}
        >
          <div className="modal-heading">
            <div>
              <D.Title>{title}</D.Title>
              <D.Description>{description}</D.Description>
            </div>
            <D.Close className="icon-button" aria-label="Fermer">
              <X size={20} />
            </D.Close>
          </div>
          <div className="modal-body">{children}</div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
export function Drawer(props: Omit<Parameters<typeof Dialog>[0], 'variant'>) {
  return <Dialog {...props} variant="drawer" />;
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
    <P.Root open={open} onOpenChange={setOpen}>
      <P.Trigger asChild>{trigger}</P.Trigger>
      <P.Portal>
        <P.Content
          className="popover-content"
          align="end"
          sideOffset={8}
          aria-label={label}
          onClick={(e) => {
            if (closeOnAction && (e.target as HTMLElement).closest('button')) setOpen(false);
          }}
        >
          {children}
          <P.Close className="sr-only">Fermer {label}</P.Close>
        </P.Content>
      </P.Portal>
    </P.Root>
  );
}
export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return (
    <T.Provider delayDuration={300}>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content className="tooltip" sideOffset={6}>
            {text}
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
}
export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {message && (
        <div className="toast">
          <span>{message}</span>
          <button className="icon-button" onClick={onClose} aria-label="Fermer la notification">
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
