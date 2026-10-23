import { CaretRight } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export function Breadcrumbs({
  items,
  overflowAfter = 4,
  className,
}: {
  items: BreadcrumbItem[];
  overflowAfter?: number;
  className?: string;
}) {
  const visible =
    items.length > overflowAfter
      ? [items[0], { label: '…' }, ...items.slice(items.length - (overflowAfter - 2))]
      : items;

  return (
    <nav className={cn('ev-breadcrumbs', className)} aria-label="Breadcrumb">
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', margin: 0, padding: 0 }}>
        {visible.map((item, index) => {
          const last = index === visible.length - 1;
          return (
            <li key={`${item.label}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {last || !item.href ? (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
              {!last && <CaretRight size={12} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
