import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoTypography({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-evo="typography" className={cn("evo-prose", className)} {...props} />;
}

export function EvoHeading({
  level = 2,
  className,
  ...props
}: React.ComponentProps<"h2"> & { level?: 1 | 2 | 3 | 4 }) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return <Tag className={cn("evo-heading", `evo-heading--${level}`, className)} {...props} />;
}

export function EvoText({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("evo-text", className)} {...props} />;
}

export const Typography = EvoTypography;
