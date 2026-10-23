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
