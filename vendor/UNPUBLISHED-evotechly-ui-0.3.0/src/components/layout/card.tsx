import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoCard({ className, ...props }: React.ComponentProps<"article">) {
  return <article data-evo="card" className={cn("evo-card", className)} {...props} />;
}
export function EvoCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("evo-card-header", className)} {...props} />;
}
export function EvoCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("evo-card-title", className)} {...props} />;
}
export function EvoCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("evo-card-description", className)} {...props} />;
}
export function EvoCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={className} {...props} />;
}
export function EvoCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("evo-card-footer", className)} {...props} />;
}

export const Card = EvoCard;
