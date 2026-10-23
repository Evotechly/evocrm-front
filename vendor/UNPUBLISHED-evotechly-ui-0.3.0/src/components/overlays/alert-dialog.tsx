import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { EvoButton } from "../foundations/button";

export function EvoAlertDialog({
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
  confirmLabel = "Hold to confirm",
  trigger,
}: {
  title: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  trigger?: React.ReactNode;
}) {
  const [holding, setHolding] = React.useState(false);
  React.useEffect(() => {
    if (!holding) return;
    const id = window.setTimeout(() => onConfirm?.(), 800);
    return () => window.clearTimeout(id);
  }, [holding, onConfirm]);
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger> : null}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="evo-overlay" />
        <AlertDialogPrimitive.Content data-evo="alert-dialog" className="evo-dialog">
          <AlertDialogPrimitive.Title className="evo-dialog-title">{title}</AlertDialogPrimitive.Title>
          {description ? <AlertDialogPrimitive.Description className="evo-dialog-description">{description}</AlertDialogPrimitive.Description> : null}
          <div className="evo-card-footer">
            <AlertDialogPrimitive.Cancel asChild>
              <EvoButton variant="ghost">Cancel</EvoButton>
            </AlertDialogPrimitive.Cancel>
            <EvoButton
              variant="danger"
              onPointerDown={() => setHolding(true)}
              onPointerUp={() => setHolding(false)}
            >
              {confirmLabel}
            </EvoButton>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

export const AlertDialog = EvoAlertDialog;
