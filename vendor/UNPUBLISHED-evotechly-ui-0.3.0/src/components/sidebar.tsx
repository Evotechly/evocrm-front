import { List, SidebarSimple } from '@phosphor-icons/react';
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
  onSelect?: () => void;
  children?: SidebarItem[];
}

export function Sidebar({
  items,
  collapsed,
  onCollapsedChange,
  header,
  footer,
  className,
  mobileOpen,
  onMobileOpenChange,
}: {
  items: SidebarItem[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}) {
  const [internal, setInternal] = useState(false);
  const [internalMobile, setInternalMobile] = useState(false);
  const isCollapsed = collapsed ?? internal;
  const isMobile = mobileOpen ?? internalMobile;
  const setCollapsed = (next: boolean) => {
    setInternal(next);
    onCollapsedChange?.(next);
  };
  const setMobile = (next: boolean) => {
    setInternalMobile(next);
    onMobileOpenChange?.(next);
  };

  const nav = (
    <nav className={cn('ev-sidebar', className)} data-collapsed={isCollapsed} aria-label="Navigation principale">
      <div className="ev-sidebar-header">
        {header}
      </div>
      <div className="ev-sidebar-items">
        {items.map((item) => (
          <SidebarEntry
            key={item.id}
            item={item}
            collapsed={isCollapsed}
            onNavigate={() => setMobile(false)}
          />
        ))}
      </div>
      {footer && <div className="ev-sidebar-footer">{footer}</div>}
    </nav>
  );

  return (
    <>
      <div className="ev-sidebar-desktop">{nav}</div>
      <IconButton
        className="ev-sidebar-mobile-trigger"
        label="Ouvrir la navigation"
        icon={<List size={18} />}
        variant="ghost"
        onClick={() => setMobile(true)}
      />
      <IconButton
        className="ev-sidebar-collapse-trigger"
        label={isCollapsed ? 'Développer la navigation' : 'Réduire la navigation'}
        icon={<SidebarSimple size={18} />}
        variant="ghost"
        onClick={() => setCollapsed(!isCollapsed)}
      />
      <Drawer open={isMobile} onOpenChange={setMobile} title="Navigation" description="Votre espace de travail EvoCRM" side="left">
        {nav}
      </Drawer>
    </>
  );
}

function SidebarEntry({
  item,
  collapsed,
  onNavigate,
}: {
  item: SidebarItem;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(!!item.children?.some((child) => child.active));
  const activate = () => {
    item.onSelect?.();
    onNavigate();
  };
  const content = item.onSelect ? (
    <button
      type="button"
      className="ev-sidebar-item"
      data-active={item.active || undefined}
      aria-current={item.active ? 'page' : undefined}
      onClick={activate}
    >
      {item.icon}
      <span className="ev-sidebar-label">{item.label}</span>
    </button>
  ) : (
    <a
      className="ev-sidebar-item"
      href={item.href}
      data-active={item.active || undefined}
      aria-current={item.active ? 'page' : undefined}
    >
      {item.icon}
      <span className="ev-sidebar-label">{item.label}</span>
    </a>
  );

  return (
    <div>
      {collapsed ? (
        <Tooltip content={item.label} side="right">
          {content}
        </Tooltip>
      ) : (
        content
      )}
      {item.children && open && !collapsed && (
        <div className="ev-sidebar-children">
          {item.children.map((child) => (
            <SidebarEntry key={child.id} item={child} collapsed={false} onNavigate={onNavigate} />
          ))}
        </div>
      )}
      {item.children && !collapsed && (
        <button type="button" className="ev-sr-only" onClick={() => setOpen((value) => !value)}>
          {open ? 'Réduire' : 'Développer'} {item.label}
        </button>
      )}
    </div>
  );
}
