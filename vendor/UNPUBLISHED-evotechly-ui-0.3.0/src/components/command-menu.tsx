import { Command } from 'cmdk';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '../utils/cn';

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export function CommandMenu({
  open,
  onOpenChange,
  items,
  recent = [],
  placeholder = 'Rechercher une page ou une action…',
  emptyText = 'Aucun résultat.',
  title = 'Palette de commandes',
  className,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CommandItem[];
  recent?: string[];
  placeholder?: string;
  emptyText?: string;
  title?: string;
  className?: string;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = (next: boolean) => {
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const groups = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    if (recent.length) {
      map.set(
        'Recent',
        items.filter((item) => recent.includes(item.id)),
      );
    }
    for (const item of items) {
      const key = item.group || 'Commands';
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return map;
  }, [items, recent]);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="ev-overlay" />
        <DialogPrimitive.Content
          className={cn('ev-dialog ev-command', className)}
          aria-label={title}
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          <Command label="Navigation rapide">
            <Command.Input placeholder={placeholder} aria-label="Rechercher une commande" />
            <Command.List>
              <Command.Empty>{emptyText}</Command.Empty>
              {[...groups.entries()].map(([group, groupItems]) =>
                groupItems.length ? (
                  <Command.Group key={group} heading={group}>
                    {groupItems.map((item) => (
                      <Command.Item
                        key={item.id}
                        disabled={item.disabled}
                        onSelect={() => {
                          item.onSelect?.();
                          setOpen(false);
                        }}
                      >
                        {item.label}
                        {item.shortcut && <kbd style={{ marginLeft: 'auto' }}>{item.shortcut}</kbd>}
                      </Command.Item>
                    ))}
                  </Command.Group>
                ) : null,
              )}
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
