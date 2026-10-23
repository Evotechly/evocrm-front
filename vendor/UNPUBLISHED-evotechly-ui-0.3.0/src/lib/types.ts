export type EvoSize = "sm" | "md" | "lg";
export type EvoVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
export type EvoTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";

export type EvoCommonProps = {
  size?: EvoSize;
  variant?: EvoVariant;
  tone?: EvoTone;
  asChild?: boolean;
};
