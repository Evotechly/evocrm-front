"""TypeScript implementations for every EvoUI 0.3.0 component."""

IMPLEMENTATIONS: dict[str, str] = {}


def add(slug: str, source: str) -> None:
    IMPLEMENTATIONS[slug] = source.strip() + "\n"


add(
    "button",
    '''
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import type { EvoSize, EvoTone, EvoVariant } from "../../lib/types";

const buttonVariants = cva("evo-btn", {
  variants: {
    variant: {
      primary: "evo-btn--primary",
      secondary: "evo-btn--secondary",
      outline: "evo-btn--outline",
      ghost: "evo-btn--ghost",
      danger: "evo-btn--danger",
      link: "evo-btn--link",
      default: "evo-btn--primary",
    },
    size: {
      sm: "evo-btn--sm",
      md: "evo-btn--md",
      lg: "evo-btn--lg",
      icon: "evo-btn--icon",
    },
    tone: {
      neutral: "",
      brand: "",
      success: "evo-tone-success",
      warning: "evo-tone-warning",
      danger: "evo-tone-danger",
      info: "evo-tone-info",
    },
  },
  defaultVariants: { variant: "primary", size: "md", tone: "neutral" },
});

export type EvoButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    variant?: EvoVariant | "default";
    size?: EvoSize | "icon";
    tone?: EvoTone;
  };

export function EvoButton({
  className,
  variant = "primary",
  size = "md",
  tone = "neutral",
  asChild = false,
  type,
  ...props
}: EvoButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-evo="button"
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-tone={tone}
      className={cn(buttonVariants({ variant, size, tone }), className)}
      type={asChild ? undefined : type ?? "button"}
      {...props}
    />
  );
}

export const Button = EvoButton;
export { buttonVariants };
''',
)

add(
    "badge",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoTone, EvoVariant } from "../../lib/types";

export type EvoBadgeProps = React.ComponentProps<"span"> & {
  variant?: Extract<EvoVariant, "primary" | "secondary" | "outline"> | "destructive";
  tone?: EvoTone;
};

export function EvoBadge({ className, variant = "primary", tone = "neutral", ...props }: EvoBadgeProps) {
  return (
    <span
      data-evo="badge"
      data-variant={variant}
      data-tone={tone}
      className={cn(
        "evo-badge",
        variant === "secondary" && "evo-badge--secondary",
        variant === "outline" && "evo-badge--outline",
        (variant === "destructive" || tone === "danger") && "evo-badge--destructive",
        className,
      )}
      {...props}
    />
  );
}

export const Badge = EvoBadge;
''',
)

add(
    "avatar",
    '''
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
    >
      {src ? <AvatarPrimitive.Image src={src} alt={alt} className="evo-avatar-image" /> : null}
      <AvatarPrimitive.Fallback aria-hidden={Boolean(src)}>{fallback ?? alt.slice(0, 2)}</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export const EvoAvatarImage = AvatarPrimitive.Image;
export const EvoAvatarFallback = AvatarPrimitive.Fallback;
export const Avatar = EvoAvatar;
''',
)

add(
    "avatar-group",
    '''
import * as React from "react";
import { EvoAvatar } from "./avatar";
import type { EvoSize } from "../../lib/types";

export type EvoAvatarGroupPerson = { name: string; src?: string };
export type EvoAvatarGroupProps = {
  people: EvoAvatarGroupPerson[];
  max?: number;
  size?: EvoSize;
};

export function EvoAvatarGroup({ people, max = 4, size = "sm" }: EvoAvatarGroupProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div data-evo="avatar-group" role="group" aria-label="People" className="evo-avatar-group">
      {shown.map((person) => (
        <EvoAvatar key={person.name} alt={person.name} src={person.src} fallback={person.name.slice(0, 2)} size={size} />
      ))}
      {extra > 0 ? <span className="evo-avatar evo-avatar-more">+{extra}</span> : null}
    </div>
  );
}

export const AvatarGroup = EvoAvatarGroup;
''',
)

add(
    "separator",
    '''
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../../lib/cn";

export function EvoSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-evo="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn("evo-separator", className)}
      {...props}
    />
  );
}

export const Separator = EvoSeparator;
''',
)

add(
    "skeleton",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoSkeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-evo="skeleton"
      role="status"
      aria-live="polite"
      className={cn("evo-skeleton", className)}
      {...props}
    />
  );
}

export const Skeleton = EvoSkeleton;
''',
)

add(
    "kbd",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return <kbd data-evo="kbd" className={cn("evo-kbd", className)} {...props} />;
}

export const Kbd = EvoKbd;
''',
)

add(
    "spinner",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoSize } from "../../lib/types";

export function EvoSpinner({
  size = "md",
  className,
  ...props
}: React.ComponentProps<"span"> & { size?: EvoSize }) {
  return (
    <span
      data-evo="spinner"
      role="status"
      className={cn("evo-spinner", `evo-spinner--${size}`, className)}
      {...props}
    />
  );
}

export const Spinner = EvoSpinner;
''',
)

add(
    "typography",
    '''
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
''',
)

add(
    "icon-button",
    '''
import * as React from "react";
import { EvoButton } from "./button";
import { EvoTooltip } from "../data-display/tooltip";

export type EvoIconButtonProps = React.ComponentProps<typeof EvoButton> & {
  label: string;
};

export function EvoIconButton({ label, children, ...props }: EvoIconButtonProps) {
  return (
    <EvoTooltip content={label}>
      <EvoButton data-evo="icon-button" size="icon" variant="ghost" aria-label={label} {...props}>
        {children}
      </EvoButton>
    </EvoTooltip>
  );
}

export const IconButton = EvoIconButton;
''',
)
