import * as Menu from '@radix-ui/react-dropdown-menu';
import { CaretRight, Check } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export function DropdownMenu({
  trigger,
  children,
  open,
  onOpenChange,
}: {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Menu.Root open={open} onOpenChange={onOpenChange}>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Content className={cn('ev-menu')} sideOffset={6} align="start">
          {children}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function DropdownMenuItem({
  children,
  disabled,
  onSelect,
  destructive,
}: {
  children: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
  destructive?: boolean;
}) {
  return (
    <Menu.Item className="ev-menu-item" disabled={disabled} onSelect={onSelect} data-destructive={destructive}>
      {children}
    </Menu.Item>
  );
}

export function DropdownMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
}: {
  children: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Menu.CheckboxItem className="ev-menu-item" checked={checked} onCheckedChange={onCheckedChange} disabled={disabled}>
      <Menu.ItemIndicator>
        <Check size={14} />
      </Menu.ItemIndicator>
      {children}
    </Menu.CheckboxItem>
  );
}

export function DropdownMenuRadioGroup({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <Menu.RadioGroup value={value} onValueChange={onValueChange}>
      {children}
    </Menu.RadioGroup>
  );
}

export function DropdownMenuRadioItem({ value, children, disabled }: { value: string; children: ReactNode; disabled?: boolean }) {
  return (
    <Menu.RadioItem className="ev-menu-item" value={value} disabled={disabled}>
      <Menu.ItemIndicator>
        <Check size={14} />
      </Menu.ItemIndicator>
      {children}
    </Menu.RadioItem>
  );
}

export function DropdownMenuSeparator() {
  return <Menu.Separator className="ev-menu-separator" />;
}

export function DropdownMenuSub({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <Menu.Sub>
      <Menu.SubTrigger className="ev-menu-item">
        {trigger}
        <CaretRight size={12} style={{ marginLeft: 'auto' }} />
      </Menu.SubTrigger>
      <Menu.Portal>
        <Menu.SubContent className="ev-menu">{children}</Menu.SubContent>
      </Menu.Portal>
    </Menu.Sub>
  );
}
