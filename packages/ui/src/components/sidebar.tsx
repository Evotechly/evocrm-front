import { CaretDown, List, SidebarSimple } from '@phosphor-icons/react';
import { useState, type ReactNode } from 'react';
import { IconButton } from './icon-button';
import { Drawer } from './drawer';
import { Tooltip } from './tooltip';
import { cn } from '../utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  active?: boolean;
  children?: SidebarItem[];
}

export function Sidebar({
  items,
  collapsed,
  onCollapsedChange,
  header,
  footer,
  className,
}: {
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const [internal, setInternal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isCollapsed = collapsed ?? internal;
  const setCollapsed = (next: boolean) => {
    setInternal(next);
    onCollapsedChange?.(next);
  };

  const nav = (
    <nav className={cn('ev-sidebar', className)} data-collapsed={isCollapsed} aria-label="Primary">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
        {header}
        <IconButton
          label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          icon={<SidebarSimple size={16} />}
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!isCollapsed)}
        />
      </div>
      {items.map((item) => (
        <SidebarEntry key={item.id} item={item} collapsed={isCollapsed} />
      ))}
      {footer}
    </nav>
  );

  return (
    <>
      <div className="ev-sidebar-desktop">{nav}</div>
      <div className="ev-sidebar-mobile" style={{ display: 'none' }} />
      <IconButton
        className="ev-sidebar-mobile-trigger"
        label="Open navigation"
        icon={<List size={18} />}
        variant="ghost"
        onClick={() => setMobileOpen(true)}
      />
      <Drawer open={mobileOpen} onOpenChange={setMobileOpen} title="Navigation" side="left">
        {nav}
      </Drawer>
    </>
  );
}

function SidebarEntry({ item, collapsed }: { item: SidebarItem; collapsed: boolean }) {
  const [open, setOpen] = useState(!!item.children?.some((child) => child.active));
  const content = (
    <a
      className="ev-sidebar-item"
      href={item.href}
      data-active={item.active || undefined}
      aria-current={item.active ? 'page' : undefined}
    >
      {item.icon}
      <span className="ev-sidebar-label">{item.label}</span>
      {item.children && (
        <button
          type="button"
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
          onClick={(event) => {
            event.preventDefault();
            setOpen((value) => !value);
          }}
          style={{ marginLeft: 'auto', background: 'none', border: 0, color: 'inherit' }}
        >
          <CaretDown size={12} />
        </button>
      )}
    </a>
  );

  return (
    <div>
      {collapsed ? <Tooltip content={item.label} side="right">{content}</Tooltip> : content}
      {item.children && open && !collapsed && (
        <div style={{ paddingLeft: 16 }}>
          {item.children.map((child) => (
            <SidebarEntry key={child.id} item={child} collapsed={false} />
          ))}
        </div>
      )}
    </div>
  );
}
