import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

export function EvoHoverCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <HoverCardPrimitive.Root>
      <HoverCardPrimitive.Trigger asChild>{children}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content data-evo="hover-card" className="evo-popover evo-card" style={{ minWidth: 220 }}>
          <strong>{title}</strong>
          {description ? <p className="evo-card-description">{description}</p> : null}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

export const HoverCard = EvoHoverCard;
