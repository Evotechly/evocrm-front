import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function EvoResizable({
  storageKey,
  children,
  orientation = "horizontal",
}: {
  storageKey?: string;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}) {
  return (
    <PanelGroup
      data-evo="resizable"
      autoSaveId={storageKey}
      direction={orientation}
      className="evo-resizable"
    >
      {children}
    </PanelGroup>
  );
}

export function EvoResizablePanel({ children, ...props }: React.ComponentProps<typeof Panel>) {
  return <Panel {...props}>{children}</Panel>;
}

export function EvoResizableHandle(props: React.ComponentProps<typeof PanelResizeHandle>) {
  return <PanelResizeHandle className="evo-resize-handle" aria-label="Resize panels" {...props} />;
}

export const Resizable = EvoResizable;
