"""Layout, navigation, and overlay implementations."""

from gen_v030_impl import add

add(
    "sidebar",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";

export type EvoSidebarItem = { id: string; label: string; href?: string; active?: boolean };

export function EvoSidebar({
  items,
  title = "EvoCRM",
  className,
}: {
  items: EvoSidebarItem[];
  title?: string;
  className?: string;
}) {
  return (
    <nav data-evo="sidebar" className={cn("evo-sidebar", className)} aria-label="Primary">
      <div className="evo-sidebar-header">
        <strong>{title}</strong>
      </div>
      <ul className="evo-sidebar-menu">
        {items.map((item) => (
          <li key={item.id}>
            <a className="evo-sidebar-menu-button" data-active={item.active} href={item.href ?? "#"}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const Sidebar = EvoSidebar;
''',
)

add(
    "app-shell",
    '''
import * as React from "react";
import { EvoSidebar, type EvoSidebarItem } from "./sidebar";

export function EvoAppShell({
  title = "Workspace",
  items = [
    { id: "home", label: "Home", active: true },
    { id: "deals", label: "Deals" },
  ],
  children,
}: {
  title?: string;
  items?: EvoSidebarItem[];
  children?: React.ReactNode;
}) {
  return (
    <div data-evo="app-shell" className="evo-shell">
      <EvoSidebar title={title} items={items} />
      <main className="evo-sidebar-inset" style={{ padding: "var(--space-6)" }}>
        {children}
      </main>
    </div>
  );
}

export const AppShell = EvoAppShell;
''',
)

add(
    "resizable",
    '''
import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export function EvoResizable({
  storageKey,
  children,
  orientation = "horizontal",
}: {
  storageKey?: string;
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}) {
  return (
    <PanelGroup
      data-evo="resizable"
      autoSaveId={storageKey}
      direction={orientation}
      className="evo-resizable"
    >
      {children}
    </PanelGroup>
  );
}

export function EvoResizablePanel({ children, ...props }: React.ComponentProps<typeof Panel>) {
  return <Panel {...props}>{children}</Panel>;
}

export function EvoResizableHandle(props: React.ComponentProps<typeof PanelResizeHandle>) {
  return <PanelResizeHandle className="evo-resize-handle" aria-label="Resize panels" {...props} />;
}

export const Resizable = EvoResizable;
''',
)

add(
    "scroll-area",
    '''
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/cn";

export function EvoScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root data-evo="scroll-area" className={cn("evo-scroll", className)} {...props}>
      <ScrollAreaPrimitive.Viewport className="evo-scroll-viewport">{children}</ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="evo-scroll-bar">
        <ScrollAreaPrimitive.Thumb className="evo-scroll-thumb" />
      </ScrollAreaPrimitive.Scrollbar>
    </ScrollAreaPrimitive.Root>
  );
}

export const ScrollArea = EvoScrollArea;
''',
)

add(
    "card",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoCard({ className, ...props }: React.ComponentProps<"article">) {
  return <article data-evo="card" className={cn("evo-card", className)} {...props} />;
}
export function EvoCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("evo-card-header", className)} {...props} />;
}
export function EvoCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("evo-card-title", className)} {...props} />;
}
export function EvoCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("evo-card-description", className)} {...props} />;
}
export function EvoCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={className} {...props} />;
}
export function EvoCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("evo-card-footer", className)} {...props} />;
}

export const Card = EvoCard;
''',
)

add(
    "page-header",
    '''
import * as React from "react";

export function EvoPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  const id = React.useId();
  return (
    <header data-evo="page-header" className="evo-page-header" aria-labelledby={id}>
      <div>
        <h1 id={id} className="evo-heading evo-heading--1">
          <a href={`#${id}`} className="evo-anchor">{title}</a>
        </h1>
        {description ? <p className="evo-card-description">{description}</p> : null}
      </div>
      {actions}
    </header>
  );
}

export const PageHeader = EvoPageHeader;
''',
)

add(
    "tabs",
    '''
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/cn";

export function EvoTabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-evo="tabs" className={className} {...props} />;
}
export function EvoTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("evo-tabs-list", className)} {...props} />;
}
export function EvoTabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return <TabsPrimitive.Trigger className={cn("evo-tabs-trigger", className)} {...props} />;
}
export function EvoTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("evo-tabs-content", className)} {...props} />;
}

export const Tabs = EvoTabs;
''',
)

add(
    "accordion",
    '''
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "../../lib/cn";

export function EvoAccordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-evo="accordion" {...props} />;
}
export function EvoAccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("evo-accordion-item", className)} {...props} />;
}
export function EvoAccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger className={cn("evo-accordion-trigger", className)} {...props}>
        {children}
        <span aria-hidden>▾</span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
export function EvoAccordionContent({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content className={cn("evo-accordion-content", className)} {...props} />;
}

export const Accordion = EvoAccordion;
''',
)

add(
    "collapsible",
    '''
import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export function EvoCollapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <CollapsiblePrimitive.Root data-evo="collapsible" defaultOpen={defaultOpen} className="evo-accordion-item">
      <CollapsiblePrimitive.Trigger className="evo-accordion-trigger">{title}</CollapsiblePrimitive.Trigger>
      <CollapsiblePrimitive.Content className="evo-accordion-content">{children}</CollapsiblePrimitive.Content>
    </CollapsiblePrimitive.Root>
  );
}

export const Collapsible = EvoCollapsible;
''',
)

add(
    "breadcrumb",
    '''
import * as React from "react";

export type EvoBreadcrumbItem = { label: string; href?: string };

export function EvoBreadcrumb({
  items,
  max = 4,
}: {
  items: EvoBreadcrumbItem[];
  max?: number;
}) {
  const overflow = items.length > max;
  const head = overflow ? items[0] : null;
  const tail = overflow ? items.slice(-(max - 1)) : items;
  return (
    <nav data-evo="breadcrumb" className="evo-breadcrumb" aria-label="breadcrumb">
      <ol className="evo-breadcrumb-list">
        {head ? (
          <li className="evo-breadcrumb-item">
            <a className="evo-breadcrumb-link" href={head.href}>{head.label}</a>
            <span className="evo-breadcrumb-sep">/</span>
          </li>
        ) : null}
        {overflow ? (
          <li className="evo-breadcrumb-item">
            <details>
              <summary aria-label="More breadcrumbs">…</summary>
              <ol>
                {items.slice(1, -(max - 1)).map((item) => (
                  <li key={item.label}>{item.href ? <a href={item.href}>{item.label}</a> : item.label}</li>
                ))}
              </ol>
            </details>
            <span className="evo-breadcrumb-sep">/</span>
          </li>
        ) : null}
        {tail.map((item, index) => {
          const last = index === tail.length - 1;
          return (
            <li key={item.label} className="evo-breadcrumb-item">
              {last || !item.href ? (
                <span className="evo-breadcrumb-page" aria-current={last ? "page" : undefined}>{item.label}</span>
              ) : (
                <a className="evo-breadcrumb-link" href={item.href}>{item.label}</a>
              )}
              {!last ? <span className="evo-breadcrumb-sep">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const Breadcrumb = EvoBreadcrumb;
''',
)

add(
    "command",
    '''
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "../../lib/cn";
import { EvoDialog } from "../overlays/dialog";

export function EvoCommand({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-evo="command" className={cn("evo-command", className)} {...props} />;
}
export function EvoCommandInput(props: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="evo-command-input-wrap">
      <CommandPrimitive.Input className="evo-command-input" {...props} />
    </div>
  );
}
export function EvoCommandList(props: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List className="evo-command-list" {...props} />;
}
export function EvoCommandItem(props: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item className="evo-command-item" {...props} />;
}
export function EvoCommandPalette({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <EvoDialog open={open} onOpenChange={onOpenChange} title="Command palette">
      <EvoCommand>{children}</EvoCommand>
    </EvoDialog>
  );
}

export const Command = EvoCommand;
''',
)

add(
    "navigation-menu",
    '''
import * as React from "react";

export function EvoNavigationMenu({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav data-evo="navigation-menu" aria-label="Sections" className="evo-tabs-list">
      {items.map((item) => (
        <a key={item.label} className="evo-tabs-trigger" href={item.href ?? "#"} data-state="inactive">
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export const NavigationMenu = EvoNavigationMenu;
''',
)

add(
    "menubar",
    '''
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

export function EvoMenubar({
  items,
}: {
  items: { label: string; items: { label: string; shortcut?: string }[] }[];
}) {
  return (
    <MenubarPrimitive.Root data-evo="menubar" className="evo-menubar">
      {items.map((menu) => (
        <MenubarPrimitive.Menu key={menu.label}>
          <MenubarPrimitive.Trigger className="evo-btn evo-btn--ghost evo-btn--sm">{menu.label}</MenubarPrimitive.Trigger>
          <MenubarPrimitive.Portal>
            <MenubarPrimitive.Content className="evo-dropdown">
              {menu.items.map((item) => (
                <MenubarPrimitive.Item key={item.label} className="evo-menu-item">
                  {item.label}
                  {item.shortcut ? <span className="evo-kbd">{item.shortcut}</span> : null}
                </MenubarPrimitive.Item>
              ))}
            </MenubarPrimitive.Content>
          </MenubarPrimitive.Portal>
        </MenubarPrimitive.Menu>
      ))}
    </MenubarPrimitive.Root>
  );
}

export const Menubar = EvoMenubar;
''',
)

add(
    "pagination",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoPagination({
  page,
  pageCount,
  total,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageCount: number;
  total?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}) {
  return (
    <nav data-evo="pagination" className="evo-pagination" aria-label="Pagination">
      <ul className="evo-pagination-list">
        <li>
          <EvoButton size="sm" variant="outline" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}>
            Previous
          </EvoButton>
        </li>
        <li>
          <span className="tabular-nums" aria-current="page">
            {page} / {pageCount}
          </span>
        </li>
        <li>
          <EvoButton size="sm" variant="outline" disabled={page >= pageCount} onClick={() => onPageChange?.(page + 1)}>
            Next
          </EvoButton>
        </li>
        <li>
          <label className="evo-label">
            Page size
            <select
              className="evo-input"
              style={{ width: 72, height: 28 }}
              value={pageSize}
              onChange={(event) => onPageSizeChange?.(Number(event.target.value))}
            >
              {[10, 25, 50].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        </li>
        {total != null ? <li className="tabular-nums">{total} rows</li> : null}
      </ul>
    </nav>
  );
}

export const Pagination = EvoPagination;
''',
)

add(
    "stepper",
    '''
import * as React from "react";

export function EvoStepper({
  steps,
  current = 0,
}: {
  steps: { label: string }[];
  current?: number;
}) {
  return (
    <ol data-evo="stepper" className="evo-stepper">
      {steps.map((step, index) => (
        <li key={step.label} data-state={index === current ? "current" : index < current ? "done" : "todo"}>
          <span className="evo-step-index" aria-hidden>{index + 1}</span>
          {step.label}
        </li>
      ))}
    </ol>
  );
}

export const Stepper = EvoStepper;
''',
)
