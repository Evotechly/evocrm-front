import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../lib/cn";
import { EvoDialog } from "../overlays/dialog";

export function EvoCommand({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-evo="command" aria-label="Command palette" className={cn("evo-command", className)} {...props} />;
}
export function EvoCommandInput(props: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="evo-command-input-wrap">
      <CommandPrimitive.Input className="evo-command-input" aria-label="Search commands" {...props} />
    </div>
  );
}
export function EvoCommandList(props: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className="evo-command-list" {...props} />;
}
export function EvoCommandItem(props: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item className="evo-command-item" {...props} />;
}
export function EvoCommandPalette({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <EvoDialog open={open} onOpenChange={onOpenChange} title="Command palette">
      <EvoCommand>{children}</EvoCommand>
    </EvoDialog>
  );
}

export const Command = EvoCommand;
