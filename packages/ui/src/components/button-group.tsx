import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactElement } from 'react';
import { cn } from '../utils/cn';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  segmented?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function ButtonGroup({
  orientation = 'horizontal',
  segmented = false,
  value,
  onValueChange,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role={segmented ? 'radiogroup' : 'group'}
      className={cn('ev-button-group', className)}
      data-orientation={orientation}
      data-segmented={segmented || undefined}
      {...props}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<{ value?: string; active?: boolean; onClick?: () => void }>;
        const itemValue = element.props.value;
        return cloneElement(element, {
          active: itemValue != null ? itemValue === value : element.props.active,
          onClick: () => {
            element.props.onClick?.();
            if (itemValue != null) onValueChange?.(itemValue);
          },
        });
      })}
    </div>
  );
}
