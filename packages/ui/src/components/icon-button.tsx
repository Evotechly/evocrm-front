import { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { Button, type ButtonProps } from './button';
import { Tooltip } from './tooltip';

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leadingIcon' | 'trailingIcon'> {
  label: string;
  icon: ReactNode;
  tooltip?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, tooltip = true, className, ...props },
  ref,
) {
  const button = (
    <Button
      ref={ref}
      className={cn('ev-icon-button', className)}
      aria-label={label}
      {...props}
    >
      {icon}
    </Button>
  );
  if (!tooltip) return button;
  return (
    <Tooltip content={label} disabled={props.disabled}>
      {button}
    </Tooltip>
  );
});
