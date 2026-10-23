import type { ReactNode } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from './breadcrumbs';
import { Input } from './input';
import { cn } from '../utils/cn';

export function Topbar({
  title,
  breadcrumbs,
  search,
  onSearch,
  actions,
  notifications,
  account,
  className,
}: {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  search?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  notifications?: ReactNode;
  account?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('ev-topbar', className)}>
      <div>
        {title && <h1 className="ev-topbar-title">{title}</h1>}
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
      {onSearch && (
        <Input
          type="search"
          label="Search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search"
          className="ev-topbar-search"
        />
      )}
      <div className="ev-topbar-slots">
        {actions}
        {notifications}
        {account}
      </div>
    </header>
  );
}
