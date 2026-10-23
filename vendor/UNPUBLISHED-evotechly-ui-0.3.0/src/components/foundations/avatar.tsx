import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/cn";
import type { EvoSize } from "../../lib/types";

const sizes: Record<EvoSize, string> = { sm: "24px", md: "40px", lg: "56px" };

export type EvoAvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: EvoSize;
  className?: string;
};

export function EvoAvatar({ src, alt = "", fallback, size = "md", className }: EvoAvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-evo="avatar"
      className={cn("evo-avatar", className)}
      style={{ width: sizes[size], height: sizes[size] }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      {src ? <AvatarPrimitive.Image src={src} alt="" className="evo-avatar-image" /> : null}
      <AvatarPrimitive.Fallback aria-hidden="true">{fallback ?? alt.slice(0, 2)}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export const EvoAvatarImage = AvatarPrimitive.Image;
export const EvoAvatarFallback = AvatarPrimitive.Fallback;
export const Avatar = EvoAvatar;
