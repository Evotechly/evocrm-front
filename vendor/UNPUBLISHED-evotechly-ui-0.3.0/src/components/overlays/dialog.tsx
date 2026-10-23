import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { EvoButton } from "../foundations/button";

export function EvoDialog({
  title,
  description,
  children,
  open,
  onOpenChange,
  trigger,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="evo-overlay" />
        <DialogPrimitive.Content data-evo="dialog" className="evo-dialog" aria-modal="true">
          <DialogPrimitive.Title className="evo-dialog-title">{title}</DialogPrimitive.Title>
          {description ? <DialogPrimitive.Description className="evo-dialog-description">{description}</DialogPrimitive.Description> : null}
          {children}
          <DialogPrimitive.Close asChild>
            <EvoButton variant="ghost" size="icon" className="evo-dialog-close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </EvoButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Dialog = EvoDialog;
