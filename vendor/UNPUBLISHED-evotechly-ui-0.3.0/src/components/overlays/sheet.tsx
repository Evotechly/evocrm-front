import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { EvoButton } from "../foundations/button";

export function EvoSheet({
  title,
  children,
  open,
  onOpenChange,
  side = "right",
  trigger,
}: {
  title: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
  trigger?: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="evo-overlay" />
        <DialogPrimitive.Content data-evo="sheet" className="evo-sheet" data-side={side} aria-modal="true">
          <DialogPrimitive.Title className="evo-sheet-title">{title}</DialogPrimitive.Title>
          {children}
          <DialogPrimitive.Close asChild>
            <EvoButton variant="ghost" aria-label="Close">Close</EvoButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Sheet = EvoSheet;
export const Drawer = EvoSheet;
