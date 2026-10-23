import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export function EvoCollapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <CollapsiblePrimitive.Root data-evo="collapsible" defaultOpen={defaultOpen} className="evo-accordion-item">
      <CollapsiblePrimitive.Trigger className="evo-accordion-trigger">{title}</CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="evo-accordion-content">{children}</CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}

export const Collapsible = EvoCollapsible;
