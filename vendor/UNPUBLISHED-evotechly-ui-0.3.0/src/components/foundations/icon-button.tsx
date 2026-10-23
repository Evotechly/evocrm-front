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
        <span aria-hidden="true">{children}</span>
      </EvoButton>
    </EvoTooltip>
  );
}

export const IconButton = EvoIconButton;
