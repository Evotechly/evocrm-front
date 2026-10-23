import { clsx } from 'clsx';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Command as Command$1 } from 'cmdk';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { DayPicker } from 'react-day-picker';
import { getCountries, AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';
import { useForm, FormProvider } from 'react-hook-form';
import { OTPInput, OTPInputContext } from 'input-otp';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useReactTable, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import * as Context from '@radix-ui/react-context-menu';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { parseISO, differenceInDays } from 'date-fns';

// src/lib/cn.ts
function cn(...inputs) {
  return clsx(inputs);
}
function readTheme(target) {
  if (!target) return "light";
  return target.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function useTheme(defaultTheme = "light") {
  const [theme, setTheme] = React.useState(defaultTheme);
  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(readTheme(root));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}
function useProduct() {
  const [product, setProduct] = React.useState("suite");
  React.useEffect(() => {
    const root = document.documentElement;
    const sync = () => setProduct(root.getAttribute("data-product") || "suite");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-product"] });
    return () => observer.disconnect();
  }, []);
  return product;
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}
var buttonVariants = cva("evo-btn", {
  variants: {
    variant: {
      primary: "evo-btn--primary",
      secondary: "evo-btn--secondary",
      outline: "evo-btn--outline",
      ghost: "evo-btn--ghost",
      danger: "evo-btn--danger",
      link: "evo-btn--link",
      default: "evo-btn--primary"
    },
    size: {
      sm: "evo-btn--sm",
      md: "evo-btn--md",
      lg: "evo-btn--lg",
      icon: "evo-btn--icon"
    },
    tone: {
      neutral: "",
      brand: "",
      success: "evo-tone-success",
      warning: "evo-tone-warning",
      danger: "evo-tone-danger",
      info: "evo-tone-info"
    }
  },
  defaultVariants: { variant: "primary", size: "md", tone: "neutral" }
});
function EvoButton({
  className,
  variant = "primary",
  size = "md",
  tone = "neutral",
  asChild = false,
  type,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-evo": "button",
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      "data-tone": tone,
      className: cn(buttonVariants({ variant, size, tone }), className),
      type: asChild ? void 0 : type ?? "button",
      ...props
    }
  );
}
var Button = EvoButton;
function EvoBadge({ className, variant = "primary", tone = "neutral", ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-evo": "badge",
      "data-variant": variant,
      "data-tone": tone,
      className: cn(
        "evo-badge",
        variant === "secondary" && "evo-badge--secondary",
        variant === "outline" && "evo-badge--outline",
        (variant === "destructive" || tone === "danger") && "evo-badge--destructive",
        className
      ),
      ...props
    }
  );
}
var Badge = EvoBadge;
var sizes = { sm: "24px", md: "40px", lg: "56px" };
function EvoAvatar({ src, alt = "", fallback, size = "md", className }) {
  return /* @__PURE__ */ jsxs(
    AvatarPrimitive.Root,
    {
      "data-evo": "avatar",
      className: cn("evo-avatar", className),
      style: { width: sizes[size], height: sizes[size] },
      role: alt ? "img" : void 0,
      "aria-label": alt || void 0,
      "aria-hidden": alt ? void 0 : true,
      children: [
        src ? /* @__PURE__ */ jsx(AvatarPrimitive.Image, { src, alt: "", className: "evo-avatar-image" }) : null,
        /* @__PURE__ */ jsx(AvatarPrimitive.Fallback, { "aria-hidden": "true", children: fallback ?? alt.slice(0, 2) })
      ]
    }
  );
}
var EvoAvatarImage = AvatarPrimitive.Image;
var EvoAvatarFallback = AvatarPrimitive.Fallback;
var Avatar = EvoAvatar;
function EvoAvatarGroup({ people, max = 4, size = "sm" }) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return /* @__PURE__ */ jsxs("div", { "data-evo": "avatar-group", role: "group", "aria-label": "People", className: "evo-avatar-group", children: [
    shown.map((person) => /* @__PURE__ */ jsx(EvoAvatar, { alt: person.name, src: person.src, fallback: person.name.slice(0, 2), size }, person.name)),
    extra > 0 ? /* @__PURE__ */ jsxs("span", { className: "evo-avatar evo-avatar-more", children: [
      "+",
      extra
    ] }) : null
  ] });
}
var AvatarGroup = EvoAvatarGroup;
function EvoSeparator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-evo": "separator",
      decorative,
      orientation,
      className: cn("evo-separator", className),
      ...props
    }
  );
}
var Separator = EvoSeparator;
function EvoSkeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-evo": "skeleton",
      role: "status",
      "aria-live": "polite",
      className: cn("evo-skeleton", className),
      ...props
    }
  );
}
var Skeleton = EvoSkeleton;
function EvoKbd({ className, ...props }) {
  return /* @__PURE__ */ jsx("kbd", { "data-evo": "kbd", className: cn("evo-kbd", className), ...props });
}
var Kbd = EvoKbd;
function EvoSpinner({
  size = "md",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-evo": "spinner",
      role: "status",
      className: cn("evo-spinner", `evo-spinner--${size}`, className),
      ...props
    }
  );
}
var Spinner = EvoSpinner;
function EvoTypography({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "typography", className: cn("evo-prose", className), ...props });
}
function EvoHeading({
  level = 2,
  className,
  ...props
}) {
  const Tag = `h${level}`;
  return /* @__PURE__ */ jsx(Tag, { className: cn("evo-heading", `evo-heading--${level}`, className), ...props });
}
function EvoText({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("evo-text", className), ...props });
}
var Typography = EvoTypography;
function EvoTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, { delayDuration, children: /* @__PURE__ */ jsxs(TooltipPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Content, { "data-evo": "tooltip", side, align, className: "evo-tooltip", children: content }) })
  ] }) });
}
var Tooltip = EvoTooltip;
function EvoIconButton({ label, children, ...props }) {
  return /* @__PURE__ */ jsx(EvoTooltip, { content: label, children: /* @__PURE__ */ jsx(EvoButton, { "data-evo": "icon-button", size: "icon", variant: "ghost", "aria-label": label, ...props, children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children }) }) });
}
var IconButton = EvoIconButton;
function EvoSidebar({
  items,
  title = "Workspace",
  className
}) {
  return /* @__PURE__ */ jsxs("nav", { "data-evo": "sidebar", className: cn("evo-sidebar", className), "aria-label": title, children: [
    /* @__PURE__ */ jsx("div", { className: "evo-sidebar-header", children: /* @__PURE__ */ jsx("strong", { children: title }) }),
    /* @__PURE__ */ jsx("ul", { className: "evo-sidebar-menu", children: items.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "evo-sidebar-menu-button", "data-active": item.active, href: item.href ?? "#", children: item.label }) }, item.id)) })
  ] });
}
var Sidebar = EvoSidebar;
function EvoAppShell({
  title = "Workspace",
  items = [
    { id: "home", label: "Home", active: true },
    { id: "deals", label: "Deals" }
  ],
  children
}) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "app-shell", className: "evo-shell", children: [
    /* @__PURE__ */ jsx(EvoSidebar, { title, items }),
    /* @__PURE__ */ jsx("div", { className: "evo-sidebar-inset", style: { padding: "var(--space-6)" }, children })
  ] });
}
var AppShell = EvoAppShell;
function EvoResizable({
  storageKey,
  children,
  orientation = "horizontal"
}) {
  return /* @__PURE__ */ jsx(
    PanelGroup,
    {
      "data-evo": "resizable",
      autoSaveId: storageKey,
      direction: orientation,
      className: "evo-resizable",
      children
    }
  );
}
function EvoResizablePanel({ children, ...props }) {
  return /* @__PURE__ */ jsx(Panel, { ...props, children });
}
function EvoResizableHandle(props) {
  return /* @__PURE__ */ jsx(PanelResizeHandle, { className: "evo-resize-handle", "aria-label": "Resize panels", ...props });
}
var Resizable = EvoResizable;
function EvoScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, { "data-evo": "scroll-area", className: cn("evo-scroll", className), ...props, children: [
    /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "evo-scroll-viewport", children }),
    /* @__PURE__ */ jsx(ScrollAreaPrimitive.Scrollbar, { orientation: "vertical", className: "evo-scroll-bar", children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.Thumb, { className: "evo-scroll-thumb" }) })
  ] });
}
var ScrollArea = EvoScrollArea;
function EvoCard({ className, ...props }) {
  return /* @__PURE__ */ jsx("article", { "data-evo": "card", className: cn("evo-card", className), ...props });
}
function EvoCardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("evo-card-header", className), ...props });
}
function EvoCardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("h3", { className: cn("evo-card-title", className), ...props });
}
function EvoCardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx("p", { className: cn("evo-card-description", className), ...props });
}
function EvoCardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className, ...props });
}
function EvoCardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("evo-card-footer", className), ...props });
}
var Card = EvoCard;
function EvoPageHeader({
  title,
  description,
  actions,
  level = 1
}) {
  const id = React.useId();
  const Heading = `h${level}`;
  return /* @__PURE__ */ jsxs("header", { "data-evo": "page-header", className: "evo-page-header", "aria-labelledby": id, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Heading, { id, className: `evo-heading evo-heading--${level}`, children: /* @__PURE__ */ jsx("a", { href: `#${id}`, className: "evo-anchor", children: title }) }),
      description ? /* @__PURE__ */ jsx("p", { className: "evo-card-description", children: description }) : null
    ] }),
    actions
  ] });
}
var PageHeader = EvoPageHeader;
function EvoTabs({ className, ...props }) {
  return /* @__PURE__ */ jsx(TabsPrimitive.Root, { "data-evo": "tabs", className, ...props });
}
function EvoTabsList({ className, ...props }) {
  return /* @__PURE__ */ jsx(TabsPrimitive.List, { className: cn("evo-tabs-list", className), ...props });
}
function EvoTabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx(TabsPrimitive.Trigger, { className: cn("evo-tabs-trigger", className), ...props });
}
function EvoTabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(TabsPrimitive.Content, { className: cn("evo-tabs-content", className), ...props });
}
var Tabs = EvoTabs;
function EvoAccordion(props) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-evo": "accordion", ...props });
}
function EvoAccordionItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Item, { className: cn("evo-accordion-item", className), ...props });
}
function EvoAccordionTrigger({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { children: /* @__PURE__ */ jsxs(AccordionPrimitive.Trigger, { className: cn("evo-accordion-trigger", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "\u25BE" })
  ] }) });
}
function EvoAccordionContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Content, { className: cn("evo-accordion-content", className), ...props });
}
var Accordion = EvoAccordion;
function EvoCollapsible({
  title,
  children,
  defaultOpen = false
}) {
  return /* @__PURE__ */ jsxs(CollapsiblePrimitive.Root, { "data-evo": "collapsible", defaultOpen, className: "evo-accordion-item", children: [
    /* @__PURE__ */ jsx(CollapsiblePrimitive.Trigger, { className: "evo-accordion-trigger", children: title }),
    /* @__PURE__ */ jsx(CollapsiblePrimitive.Content, { className: "evo-accordion-content", children })
  ] });
}
var Collapsible = EvoCollapsible;
function EvoBreadcrumb({
  items,
  max = 4
}) {
  const overflow = items.length > max;
  const head = overflow ? items[0] : null;
  const tail = overflow ? items.slice(-(max - 1)) : items;
  return /* @__PURE__ */ jsx("nav", { "data-evo": "breadcrumb", className: "evo-breadcrumb", "aria-label": "breadcrumb", children: /* @__PURE__ */ jsxs("ol", { className: "evo-breadcrumb-list", children: [
    head ? /* @__PURE__ */ jsxs("li", { className: "evo-breadcrumb-item", children: [
      /* @__PURE__ */ jsx("a", { className: "evo-breadcrumb-link", href: head.href, children: head.label }),
      /* @__PURE__ */ jsx("span", { className: "evo-breadcrumb-sep", children: "/" })
    ] }) : null,
    overflow ? /* @__PURE__ */ jsxs("li", { className: "evo-breadcrumb-item", children: [
      /* @__PURE__ */ jsxs("details", { children: [
        /* @__PURE__ */ jsx("summary", { "aria-label": "More breadcrumbs", children: "\u2026" }),
        /* @__PURE__ */ jsx("ol", { children: items.slice(1, -(max - 1)).map((item) => /* @__PURE__ */ jsx("li", { children: item.href ? /* @__PURE__ */ jsx("a", { href: item.href, children: item.label }) : item.label }, item.label)) })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "evo-breadcrumb-sep", children: "/" })
    ] }) : null,
    tail.map((item, index) => {
      const last = index === tail.length - 1;
      return /* @__PURE__ */ jsxs("li", { className: "evo-breadcrumb-item", children: [
        last || !item.href ? /* @__PURE__ */ jsx("span", { className: "evo-breadcrumb-page", "aria-current": last ? "page" : void 0, children: item.label }) : /* @__PURE__ */ jsx("a", { className: "evo-breadcrumb-link", href: item.href, children: item.label }),
        !last ? /* @__PURE__ */ jsx("span", { className: "evo-breadcrumb-sep", children: "/" }) : null
      ] }, item.label);
    })
  ] }) });
}
var Breadcrumb = EvoBreadcrumb;
function EvoDialog({
  title,
  description,
  children,
  open,
  onOpenChange,
  trigger
}) {
  return /* @__PURE__ */ jsxs(DialogPrimitive.Root, { open, onOpenChange, children: [
    trigger ? /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
      /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "evo-overlay" }),
      /* @__PURE__ */ jsxs(DialogPrimitive.Content, { "data-evo": "dialog", className: "evo-dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ jsx(DialogPrimitive.Title, { className: "evo-dialog-title", children: title }),
        description ? /* @__PURE__ */ jsx(DialogPrimitive.Description, { className: "evo-dialog-description", children: description }) : null,
        children,
        /* @__PURE__ */ jsx(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx(EvoButton, { variant: "ghost", size: "icon", className: "evo-dialog-close", "aria-label": "Close", children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\xD7" }) }) })
      ] })
    ] })
  ] });
}
var Dialog = EvoDialog;
function EvoCommand({ className, ...props }) {
  return /* @__PURE__ */ jsx(Command$1, { "data-evo": "command", "aria-label": "Command palette", className: cn("evo-command", className), ...props });
}
function EvoCommandInput(props) {
  return /* @__PURE__ */ jsx("div", { className: "evo-command-input-wrap", children: /* @__PURE__ */ jsx(Command$1.Input, { className: "evo-command-input", "aria-label": "Search commands", ...props }) });
}
function EvoCommandList(props) {
  return /* @__PURE__ */ jsx(Command$1.List, { className: "evo-command-list", ...props });
}
function EvoCommandItem(props) {
  return /* @__PURE__ */ jsx(Command$1.Item, { className: "evo-command-item", ...props });
}
function EvoCommandPalette({
  open,
  onOpenChange,
  children
}) {
  return /* @__PURE__ */ jsx(EvoDialog, { open, onOpenChange, title: "Command palette", children: /* @__PURE__ */ jsx(EvoCommand, { children }) });
}
var Command = EvoCommand;
function EvoNavigationMenu({
  items
}) {
  return /* @__PURE__ */ jsx("nav", { "data-evo": "navigation-menu", "aria-label": "Sections", className: "evo-tabs-list", children: items.map((item) => /* @__PURE__ */ jsx("a", { className: "evo-tabs-trigger", href: item.href ?? "#", "data-state": "inactive", children: item.label }, item.label)) });
}
var NavigationMenu = EvoNavigationMenu;
function EvoMenubar({
  items
}) {
  return /* @__PURE__ */ jsx(MenubarPrimitive.Root, { "data-evo": "menubar", className: "evo-menubar", children: items.map((menu) => /* @__PURE__ */ jsxs(MenubarPrimitive.Menu, { children: [
    /* @__PURE__ */ jsx(MenubarPrimitive.Trigger, { className: "evo-btn evo-btn--ghost evo-btn--sm", children: menu.label }),
    /* @__PURE__ */ jsx(MenubarPrimitive.Portal, { children: /* @__PURE__ */ jsx(MenubarPrimitive.Content, { className: "evo-dropdown", children: menu.items.map((item) => /* @__PURE__ */ jsxs(MenubarPrimitive.Item, { className: "evo-menu-item", children: [
      item.label,
      item.shortcut ? /* @__PURE__ */ jsx("span", { className: "evo-kbd", children: item.shortcut }) : null
    ] }, item.label)) }) })
  ] }, menu.label)) });
}
var Menubar = EvoMenubar;
function EvoPagination({
  page,
  pageCount,
  total,
  pageSize = 10,
  onPageChange,
  onPageSizeChange
}) {
  return /* @__PURE__ */ jsx("nav", { "data-evo": "pagination", className: "evo-pagination", "aria-label": "Pagination", children: /* @__PURE__ */ jsxs("ul", { className: "evo-pagination-list", children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "outline", disabled: page <= 1, onClick: () => onPageChange?.(page - 1), children: "Previous" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("span", { className: "tabular-nums", "aria-current": "page", children: [
      page,
      " / ",
      pageCount
    ] }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "outline", disabled: page >= pageCount, onClick: () => onPageChange?.(page + 1), children: "Next" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { className: "evo-label", children: [
      "Page size",
      /* @__PURE__ */ jsx(
        "select",
        {
          className: "evo-input",
          style: { width: 72, height: 28 },
          value: pageSize,
          onChange: (event) => onPageSizeChange?.(Number(event.target.value)),
          children: [10, 25, 50].map((size) => /* @__PURE__ */ jsx("option", { value: size, children: size }, size))
        }
      )
    ] }) }),
    total != null ? /* @__PURE__ */ jsxs("li", { className: "tabular-nums", children: [
      total,
      " rows"
    ] }) : null
  ] }) });
}
var Pagination = EvoPagination;
function EvoStepper({
  steps,
  current = 0
}) {
  return /* @__PURE__ */ jsx("ol", { "data-evo": "stepper", className: "evo-stepper", children: steps.map((step, index) => /* @__PURE__ */ jsxs("li", { "data-state": index === current ? "current" : index < current ? "done" : "todo", children: [
    /* @__PURE__ */ jsx("span", { className: "evo-step-index", "aria-hidden": true, children: index + 1 }),
    step.label
  ] }, step.label)) });
}
var Stepper = EvoStepper;
function EvoInput({ label, id, className, placeholder, ...props }) {
  const generated = React.useId();
  const inputId = id ?? generated;
  return /* @__PURE__ */ jsxs("div", { "data-evo": "input", className: "evo-field evo-floating", children: [
    label ? /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: inputId, children: label }) : null,
    /* @__PURE__ */ jsx("input", { id: inputId, className: cn("evo-input", className), placeholder: placeholder ?? " ", ...props })
  ] });
}
var Input = EvoInput;
function EvoTextarea({
  label,
  id,
  className,
  onChange,
  ...props
}) {
  const generated = React.useId();
  const areaId = id ?? generated;
  const ref = React.useRef(null);
  const resize = () => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  };
  return /* @__PURE__ */ jsxs("div", { "data-evo": "textarea", className: "evo-field", children: [
    label ? /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: areaId, children: label }) : null,
    /* @__PURE__ */ jsx(
      "textarea",
      {
        ref,
        id: areaId,
        className: cn("evo-textarea", className),
        onChange: (event) => {
          resize();
          onChange?.(event);
        },
        ...props
      }
    )
  ] });
}
var Textarea = EvoTextarea;
function EvoSelect({
  label,
  options,
  placeholder = "Select",
  defaultValue,
  value,
  onValueChange
}) {
  const id = React.useId();
  return /* @__PURE__ */ jsxs("div", { "data-evo": "select", className: "evo-field", children: [
    label ? /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: id, children: label }) : null,
    /* @__PURE__ */ jsxs(SelectPrimitive.Root, { defaultValue, value, onValueChange, children: [
      /* @__PURE__ */ jsx(SelectPrimitive.Trigger, { id, className: "evo-select-trigger", children: /* @__PURE__ */ jsx(SelectPrimitive.Value, { placeholder }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(SelectPrimitive.Content, { className: "evo-select-content", children: options.map((option) => /* @__PURE__ */ jsx(SelectPrimitive.Item, { value: option.value, className: "evo-select-item", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children: option.label }) }, option.value)) }) })
    ] })
  ] });
}
var Select = EvoSelect;
function EvoPopover({
  content,
  children
}) {
  return /* @__PURE__ */ jsxs(PopoverPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsxs(PopoverPrimitive.Content, { "data-evo": "popover", className: "evo-popover", sideOffset: 8, children: [
      content,
      /* @__PURE__ */ jsx(PopoverPrimitive.Arrow, { width: 10, height: 6 })
    ] }) })
  ] });
}
var Popover = EvoPopover;
function EvoCombobox({
  label,
  options,
  value,
  onValueChange,
  onSearch
}) {
  const selected = options.find((option) => option.value === value);
  return /* @__PURE__ */ jsxs("div", { "data-evo": "combobox", className: "evo-field", children: [
    label ? /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }) : null,
    /* @__PURE__ */ jsx(
      EvoPopover,
      {
        content: /* @__PURE__ */ jsxs(EvoCommand, { children: [
          /* @__PURE__ */ jsx(EvoCommandInput, { placeholder: "Search", onValueChange: onSearch }),
          /* @__PURE__ */ jsx(EvoCommandList, { children: options.map((option) => /* @__PURE__ */ jsx(EvoCommandItem, { value: option.value, onSelect: () => onValueChange?.(option.value), children: option.label }, option.value)) })
        ] }),
        children: /* @__PURE__ */ jsx(
          EvoButton,
          {
            variant: "outline",
            "aria-label": `${label ? `${label}: ` : ""}${selected?.label ?? "Select"}`,
            "aria-haspopup": "listbox",
            children: selected?.label ?? "Select"
          }
        )
      }
    )
  ] });
}
var Combobox = EvoCombobox;
function EvoCheckbox({
  label,
  id,
  ...props
}) {
  const generated = React.useId();
  const boxId = id ?? generated;
  return /* @__PURE__ */ jsxs("label", { className: "evo-label", htmlFor: boxId, children: [
    /* @__PURE__ */ jsx(CheckboxPrimitive.Root, { "data-evo": "checkbox", id: boxId, className: "evo-checkbox", ...props, children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { children: "\u2713" }) }),
    label
  ] });
}
var Checkbox = EvoCheckbox;
function EvoMultiSelect({
  label,
  options,
  value,
  onChange
}) {
  const [internal, setInternal] = React.useState(value ?? []);
  const selected = value ?? internal;
  const toggle = (next) => {
    const updated = selected.includes(next) ? selected.filter((item) => item !== next) : [...selected, next];
    setInternal(updated);
    onChange?.(updated);
  };
  return /* @__PURE__ */ jsxs("div", { "data-evo": "multi-select", className: "evo-field", role: "group", "aria-label": label, children: [
    label ? /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }) : null,
    options.map((option) => /* @__PURE__ */ jsx(
      EvoCheckbox,
      {
        label: option.label,
        checked: selected.includes(option.value),
        onCheckedChange: () => toggle(option.value)
      },
      option.value
    ))
  ] });
}
var MultiSelect = EvoMultiSelect;
function EvoTagsInput({
  label,
  value,
  onChange
}) {
  const [internal, setInternal] = React.useState(value ?? []);
  const tags = value ?? internal;
  const commit = (next) => {
    setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsxs("div", { "data-evo": "tags-input", className: "evo-field", children: [
    label ? /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: "evo-tags", children: label }) : null,
    /* @__PURE__ */ jsxs("div", { className: "evo-tags", children: [
      tags.map((tag) => /* @__PURE__ */ jsxs("button", { type: "button", className: "evo-badge", onClick: () => commit(tags.filter((item) => item !== tag)), children: [
        tag,
        " \xD7"
      ] }, tag)),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "evo-tags",
          className: "evo-input",
          onKeyDown: (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const next = event.currentTarget.value.trim();
              if (next) commit([...tags, next]);
              event.currentTarget.value = "";
            }
          }
        }
      )
    ] })
  ] });
}
var TagsInput = EvoTagsInput;
function EvoRadioGroup({
  label,
  options,
  variant = "inline",
  error,
  ...props
}) {
  return /* @__PURE__ */ jsxs("fieldset", { "data-evo": "radio-group", className: "evo-field", "data-invalid": Boolean(error), children: [
    label ? /* @__PURE__ */ jsx("legend", { className: "evo-field-legend", children: label }) : null,
    /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, { className: variant === "card" ? "evo-radio-cards" : "evo-radio-group", ...props, children: options.map((option) => /* @__PURE__ */ jsxs("label", { className: variant === "card" ? "evo-radio-card" : "evo-label", "data-disabled": props.disabled, children: [
      /* @__PURE__ */ jsx(RadioGroupPrimitive.Item, { value: option.value, className: "evo-radio", disabled: props.disabled, children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, {}) }),
      /* @__PURE__ */ jsxs("span", { children: [
        option.label,
        option.description ? /* @__PURE__ */ jsx("small", { className: "evo-field-description", children: option.description }) : null
      ] })
    ] }, option.value)) }),
    error ? /* @__PURE__ */ jsx("p", { className: "evo-field-message", "data-invalid": "true", children: error }) : null
  ] });
}
var RadioGroup = EvoRadioGroup;
var Radio = RadioGroupPrimitive.Item;
function EvoSwitch({
  label,
  id,
  ...props
}) {
  const generated = React.useId();
  const switchId = id ?? generated;
  return /* @__PURE__ */ jsxs("label", { className: "evo-label", htmlFor: switchId, children: [
    /* @__PURE__ */ jsx(SwitchPrimitive.Root, { "data-evo": "switch", id: switchId, className: "evo-switch", ...props, children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: "evo-switch-thumb" }) }),
    label
  ] });
}
var Switch = EvoSwitch;
function EvoSlider({
  label,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "slider", className: "evo-field", children: [
    label ? /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }) : null,
    /* @__PURE__ */ jsxs(SliderPrimitive.Root, { className: "evo-slider", "aria-label": label, ...props, children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "evo-slider-track", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "evo-slider-range" }) }),
      (props.defaultValue ?? props.value ?? [0]).map((_, index) => /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "evo-slider-thumb", "aria-label": `${label ?? "Value"} ${index + 1}` }, index))
    ] })
  ] });
}
var Slider = EvoSlider;
function EvoDayPicker({
  navLabel = "Calendar navigation",
  className = "evo-calendar",
  labels,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      className,
      labels: {
        labelNav: () => navLabel,
        labelDayButton: (date) => String(date.getDate()),
        labelGridcell: (date) => String(date.getDate()),
        ...labels
      },
      ...props
    }
  );
}
function EvoDatePicker({
  label = "Date",
  value,
  onChange
}) {
  const [date, setDate] = React.useState(value);
  return /* @__PURE__ */ jsxs("div", { "data-evo": "date-picker", className: "evo-field", children: [
    /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx(
      EvoPopover,
      {
        content: /* @__PURE__ */ jsx(
          EvoDayPicker,
          {
            navLabel: "Date picker navigation",
            mode: "single",
            selected: date,
            onSelect: (next) => {
              setDate(next);
              onChange?.(next);
            }
          }
        ),
        children: /* @__PURE__ */ jsx(EvoButton, { variant: "outline", children: date ? date.toLocaleDateString() : "Pick a date" })
      }
    )
  ] });
}
var DatePicker = EvoDatePicker;
function EvoDateRangePicker({
  label = "Range",
  value,
  onChange
}) {
  const [range, setRange] = React.useState(value);
  return /* @__PURE__ */ jsxs("div", { "data-evo": "date-range-picker", className: "evo-field", children: [
    /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx(
      EvoPopover,
      {
        content: /* @__PURE__ */ jsx(
          EvoDayPicker,
          {
            navLabel: "Date range navigation",
            mode: "range",
            selected: range,
            onSelect: (next) => {
              setRange(next);
              onChange?.(next);
            }
          }
        ),
        children: /* @__PURE__ */ jsx(EvoButton, { variant: "outline", children: range?.from && range.to ? `${range.from.toLocaleDateString()} \u2013 ${range.to.toLocaleDateString()}` : "Pick a range" })
      }
    )
  ] });
}
var DateRangePicker = EvoDateRangePicker;
function EvoTimePicker({
  label = "Time",
  defaultValue,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "time-picker", children: /* @__PURE__ */ jsx(
    EvoInput,
    {
      type: "time",
      label,
      defaultValue,
      value,
      onChange: (event) => onChange?.(event.target.value)
    }
  ) });
}
var TimePicker = EvoTimePicker;
function EvoNumberInput({
  label,
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  const set = (next) => {
    const clamped = Math.min(max ?? next, Math.max(min ?? next, next));
    setInternal(clamped);
    onChange?.(clamped);
  };
  return /* @__PURE__ */ jsxs("div", { "data-evo": "number-input", className: "evo-stepper-field", children: [
    label ? /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }) : null,
    /* @__PURE__ */ jsxs("div", { className: "evo-btn-group", "data-orientation": "horizontal", children: [
      /* @__PURE__ */ jsx(EvoButton, { variant: "outline", "aria-label": "Decrease", onClick: () => set(current - step), children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "-" }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "evo-input tabular-nums",
          type: "number",
          "aria-label": label ?? "Number",
          value: current,
          min,
          max,
          step,
          onChange: (event) => set(Number(event.target.value))
        }
      ),
      /* @__PURE__ */ jsx(EvoButton, { variant: "outline", "aria-label": "Increase", onClick: () => set(current + step), children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "+" }) })
    ] })
  ] });
}
var NumberInput = EvoNumberInput;
function EvoCurrencyInput({
  label = "Amount",
  currency = "DZD",
  value,
  defaultValue = 0,
  onChange
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  return /* @__PURE__ */ jsxs("div", { "data-evo": "currency-input", className: "evo-field", children: [
    /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: "evo-currency", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "evo-affix", children: [
      /* @__PURE__ */ jsx("span", { className: "evo-affix-label", children: currency }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "evo-currency",
          className: "evo-input tabular-nums",
          inputMode: "decimal",
          value: current,
          onChange: (event) => {
            const next = Number(event.target.value);
            setInternal(next);
            onChange?.(next);
          }
        }
      )
    ] })
  ] });
}
var CurrencyInput = EvoCurrencyInput;
var COUNTRIES = getCountries();
function EvoPhoneInput({
  label = "Phone",
  defaultCountry = "DZ",
  value,
  onChange
}) {
  const [country, setCountry] = React.useState(defaultCountry);
  const [internal, setInternal] = React.useState(value ?? "");
  const formatted = new AsYouType(country).input(internal);
  const parsed = parsePhoneNumberFromString(internal, country);
  return /* @__PURE__ */ jsxs("div", { "data-evo": "phone-input", className: "evo-field", children: [
    /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: "evo-phone", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "evo-affix", children: [
      /* @__PURE__ */ jsx(
        "select",
        {
          "aria-label": "Country",
          className: "evo-input",
          style: { width: 88 },
          value: country,
          onChange: (event) => setCountry(event.target.value),
          children: COUNTRIES.map((code) => /* @__PURE__ */ jsx("option", { value: code, children: code }, code))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "evo-phone",
          className: "evo-input",
          value: formatted,
          "aria-invalid": internal ? !parsed?.isValid() : void 0,
          onChange: (event) => {
            setInternal(event.target.value);
            const next = parsePhoneNumberFromString(event.target.value, country);
            onChange?.(event.target.value, Boolean(next?.isValid()));
          }
        }
      )
    ] })
  ] });
}
var PhoneInput = EvoPhoneInput;
function EvoFileUpload({
  label = "Upload files",
  onFiles
}) {
  const [files, setFiles] = React.useState([]);
  const id = React.useId();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-evo": "file-upload",
      className: "evo-empty",
      onDragOver: (event) => event.preventDefault(),
      onDrop: (event) => {
        event.preventDefault();
        const next = Array.from(event.dataTransfer.files);
        setFiles(next);
        onFiles?.(next);
      },
      children: [
        /* @__PURE__ */ jsx("label", { className: "evo-label", htmlFor: id, children: label }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id,
            type: "file",
            multiple: true,
            onChange: (event) => {
              const next = Array.from(event.target.files ?? []);
              setFiles(next);
              onFiles?.(next);
            }
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "evo-empty-description", children: files.length ? `${files.length} file(s)` : "Drop files or browse" })
      ]
    }
  );
}
var FileUpload = EvoFileUpload;
function EvoForm({
  children,
  onSubmit,
  form
}) {
  const inner = useForm();
  const methods = form ?? inner;
  return /* @__PURE__ */ jsx(FormProvider, { ...methods, children: /* @__PURE__ */ jsx("form", { "data-evo": "form", className: "evo-field-group", onSubmit: methods.handleSubmit((values) => onSubmit?.(values)), children }) });
}
function EvoFormField({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "evo-field", children });
}
function EvoFormLabel(props) {
  return /* @__PURE__ */ jsx("label", { className: "evo-label", ...props });
}
function EvoFormMessage({ children }) {
  return children ? /* @__PURE__ */ jsx("p", { className: "evo-form-message", children }) : null;
}
var Form = EvoForm;
function Slot2({ index }) {
  const context = React.useContext(OTPInputContext);
  const slot = context?.slots?.[index];
  return /* @__PURE__ */ jsx("div", { className: "evo-otp-slot", "data-active": slot?.isActive, children: slot?.char });
}
function EvoInputOtp({
  length = 6,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsx(
    OTPInput,
    {
      "data-evo": "input-otp",
      maxLength: length,
      value,
      onChange,
      "aria-label": "One-time code",
      containerClassName: "evo-otp",
      render: ({ slots }) => /* @__PURE__ */ jsx("div", { className: "evo-otp", role: "group", "aria-label": "One-time code", children: slots.map((_, index) => /* @__PURE__ */ jsx(Slot2, { index }, index)) })
    }
  );
}
var InputOtp = EvoInputOtp;
var EvoInputOTP = EvoInputOtp;
function EvoRichText({
  label = "Editor",
  value,
  onChange
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value ?? "<p></p>",
    immediatelyRender: false,
    editorProps: { attributes: { "aria-label": label } },
    onUpdate: ({ editor: instance }) => onChange?.(instance.getText())
  });
  return /* @__PURE__ */ jsxs("div", { "data-evo": "rich-text", className: "evo-field", children: [
    /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "evo-editor-toolbar", role: "toolbar", "aria-label": "Formatting", children: [
      /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", onClick: () => editor?.chain().focus().toggleBold().run(), children: "Bold" }),
      /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", onClick: () => editor?.chain().focus().toggleItalic().run(), children: "Italic" }),
      /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", onClick: () => editor?.chain().focus().toggleBulletList().run(), children: "List" })
    ] }),
    /* @__PURE__ */ jsx(EditorContent, { editor, className: "evo-editor" })
  ] });
}
var RichText = EvoRichText;
function EvoMentionInput({
  suggestions = [],
  onChange
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: { class: "evo-mention" },
        suggestion: {
          items: ({ query }) => suggestions.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
        }
      })
    ],
    content: "<p></p>",
    immediatelyRender: false,
    editorProps: { attributes: { "aria-label": "Mention people or records" } },
    onUpdate: ({ editor: instance }) => onChange?.(instance.getText())
  });
  return /* @__PURE__ */ jsxs("div", { "data-evo": "mention-input", className: "evo-field", children: [
    /* @__PURE__ */ jsx("label", { className: "evo-label", children: "Mention" }),
    /* @__PURE__ */ jsx(EditorContent, { editor, className: "evo-editor" })
  ] });
}
var MentionInput = EvoMentionInput;
var SWATCHES = [
  { id: "brand", label: "Brand", css: "var(--brand-actionA11y)" },
  { id: "success", label: "Success", css: "var(--success)" },
  { id: "warning", label: "Warning", css: "var(--warning)" },
  { id: "danger", label: "Danger", css: "var(--danger)" },
  { id: "info", label: "Info", css: "var(--info)" }
];
function EvoColorPicker({
  label = "Color",
  value,
  onChange
}) {
  const [internal, setInternal] = React.useState(value ?? "brand");
  const current = value ?? internal;
  const selected = SWATCHES.find((swatch) => swatch.id === current) ?? SWATCHES[0];
  const set = (next) => {
    setInternal(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsxs("div", { "data-evo": "color-picker", className: "evo-field", children: [
    /* @__PURE__ */ jsx("span", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx(
      EvoPopover,
      {
        content: /* @__PURE__ */ jsx("div", { className: "evo-swatches", children: SWATCHES.map((swatch) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": swatch.label,
            className: "evo-swatch",
            style: { background: swatch.css },
            onClick: () => set(swatch.id)
          },
          swatch.id
        )) }),
        children: /* @__PURE__ */ jsx(EvoButton, { variant: "outline", children: selected.label })
      }
    )
  ] });
}
var ColorPicker = EvoColorPicker;
function EvoRating({
  label = "Rating",
  value = 0,
  onChange,
  max = 5
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "rating", role: "radiogroup", "aria-label": label, className: "evo-rating", children: Array.from({ length: max }, (_, index) => {
    const score = index + 1;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": value === score,
        "aria-label": `${score} of ${max}`,
        className: "evo-star",
        "data-on": score <= value,
        onClick: () => onChange?.(score),
        children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u2605" })
      },
      score
    );
  }) });
}
var Rating = EvoRating;
function EvoToggleGroup({
  options,
  value,
  defaultValue,
  onValueChange
}) {
  return /* @__PURE__ */ jsx(
    ToggleGroupPrimitive.Root,
    {
      "data-evo": "toggle-group",
      type: "single",
      className: "evo-btn-group",
      value,
      defaultValue,
      onValueChange,
      children: options.map((option) => /* @__PURE__ */ jsx(ToggleGroupPrimitive.Item, { value: option.value, className: "evo-btn evo-btn--outline evo-btn--sm", children: option.label }, option.value))
    }
  );
}
var ToggleGroup = EvoToggleGroup;
function EvoHoverCard({
  title,
  description,
  children
}) {
  return /* @__PURE__ */ jsxs(HoverCardPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(HoverCardPrimitive.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(HoverCardPrimitive.Portal, { children: /* @__PURE__ */ jsxs(HoverCardPrimitive.Content, { "data-evo": "hover-card", className: "evo-popover evo-card", style: { minWidth: 220 }, children: [
      /* @__PURE__ */ jsx("strong", { children: title }),
      description ? /* @__PURE__ */ jsx("p", { className: "evo-card-description", children: description }) : null
    ] }) })
  ] });
}
var HoverCard = EvoHoverCard;
function EvoProgress({ value = 0, label }) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "progress", className: "evo-field", children: [
    label ? /* @__PURE__ */ jsxs("div", { className: "evo-label", children: [
      label,
      " ",
      /* @__PURE__ */ jsxs("span", { className: "tabular-nums", children: [
        value,
        "%"
      ] })
    ] }) : null,
    /* @__PURE__ */ jsx(ProgressPrimitive.Root, { value, className: "evo-progress", "aria-label": label ?? "Progress", children: /* @__PURE__ */ jsx(ProgressPrimitive.Indicator, { className: "evo-progress-indicator", style: { transform: `translateX(-${100 - value}%)` } }) })
  ] });
}
var Progress = EvoProgress;
function EvoTimeline({ items }) {
  return /* @__PURE__ */ jsx("ol", { "data-evo": "timeline", className: "evo-timeline", children: items.map((item) => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("strong", { children: item.title }),
    item.at ? /* @__PURE__ */ jsx("time", { dateTime: item.at, children: item.at }) : null,
    item.body ? /* @__PURE__ */ jsx("p", { className: "evo-card-description", children: item.body }) : null
  ] }, item.title)) });
}
var Timeline = EvoTimeline;
function Node({ node }) {
  if (!node.children?.length) {
    return /* @__PURE__ */ jsx("li", { role: "treeitem", children: node.label });
  }
  return /* @__PURE__ */ jsxs("li", { role: "treeitem", "aria-expanded": "true", children: [
    node.label,
    /* @__PURE__ */ jsx("ul", { role: "group", children: node.children.map((child) => /* @__PURE__ */ jsx(Node, { node: child }, child.id)) })
  ] });
}
function EvoTreeView({ items }) {
  return /* @__PURE__ */ jsx("ul", { "data-evo": "tree-view", role: "tree", className: "evo-tree", children: items.map((item) => /* @__PURE__ */ jsx(Node, { node: item }, item.id)) });
}
var TreeView = EvoTreeView;
function EvoStatus({
  tone = "neutral",
  children,
  className
}) {
  return /* @__PURE__ */ jsxs("span", { "data-evo": "status", "data-tone": tone, className: cn("evo-status", `evo-tone-${tone}`, className), children: [
    /* @__PURE__ */ jsx("span", { className: "evo-status-dot", "aria-hidden": true }),
    children
  ] });
}
var Status = EvoStatus;
function EvoCopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = React.useState(false);
  return /* @__PURE__ */ jsx(
    EvoButton,
    {
      "data-evo": "copy-button",
      variant: "outline",
      size: "sm",
      onClick: async () => {
        await navigator.clipboard?.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      },
      children: copied ? "Copied" : label
    }
  );
}
var CopyButton = EvoCopyButton;
function formatRelative(date) {
  const delta = (date.getTime() - Date.now()) / 1e3;
  const abs = Math.abs(delta);
  const rtf = new Intl.RelativeTimeFormat(void 0, { numeric: "auto" });
  if (abs < 60) return rtf.format(Math.round(delta), "second");
  if (abs < 3600) return rtf.format(Math.round(delta / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(delta / 3600), "hour");
  return rtf.format(Math.round(delta / 86400), "day");
}
function EvoRelativeTime({ date }) {
  const parsed = typeof date === "string" ? new Date(date) : date;
  const [label, setLabel] = React.useState(() => formatRelative(parsed));
  React.useEffect(() => {
    const tick = () => setLabel(formatRelative(parsed));
    tick();
    const id = window.setInterval(tick, 3e4);
    return () => window.clearInterval(id);
  }, [parsed]);
  return /* @__PURE__ */ jsx("time", { "data-evo": "relative-time", dateTime: parsed.toISOString(), title: parsed.toLocaleString(), children: label });
}
var RelativeTime = EvoRelativeTime;
function EvoDescriptionList({
  items
}) {
  return /* @__PURE__ */ jsx("dl", { "data-evo": "description-list", className: "evo-dl", children: items.map((item) => /* @__PURE__ */ jsxs("div", { className: "evo-dl-row", children: [
    /* @__PURE__ */ jsx("dt", { children: item.term }),
    /* @__PURE__ */ jsxs("dd", { children: [
      item.editable ?? item.description ?? /* @__PURE__ */ jsx("span", { className: "evo-card-description", children: "\u2014" }),
      item.description ? /* @__PURE__ */ jsx(EvoCopyButton, { value: item.description, label: "Copy" }) : null
    ] })
  ] }, item.term)) });
}
var DescriptionList = EvoDescriptionList;
function EvoImage({ alt, src, caption }) {
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "image", className: "evo-media", children: [
    /* @__PURE__ */ jsx("img", { alt, src, role: "img" }),
    caption ? /* @__PURE__ */ jsx("figcaption", { className: "evo-card-description", children: caption }) : null
  ] });
}
var Image2 = EvoImage;
function EvoTable({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "evo-table-wrap", children: /* @__PURE__ */ jsx("table", { "data-evo": "table", className: cn("evo-table", className), ...props }) });
}
function EvoTableHeader(props) {
  return /* @__PURE__ */ jsx("thead", { ...props });
}
function EvoTableBody(props) {
  return /* @__PURE__ */ jsx("tbody", { ...props });
}
function EvoTableRow(props) {
  return /* @__PURE__ */ jsx("tr", { ...props });
}
function EvoTableHead(props) {
  return /* @__PURE__ */ jsx("th", { scope: "col", ...props });
}
function EvoTableCell(props) {
  return /* @__PURE__ */ jsx("td", { ...props });
}
var Table = EvoTable;
function EvoDataTable({ columns, data }) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
  return /* @__PURE__ */ jsxs("div", { "data-evo": "data-table", children: [
    /* @__PURE__ */ jsx(EvoInput, { "aria-label": "Filter", value: globalFilter, onChange: (event) => setGlobalFilter(event.target.value) }),
    /* @__PURE__ */ jsxs(EvoTable, { children: [
      /* @__PURE__ */ jsx(EvoTableHeader, { children: table.getHeaderGroups().map((group) => /* @__PURE__ */ jsx(EvoTableRow, { children: group.headers.map((header) => /* @__PURE__ */ jsx(EvoTableHead, { children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }, group.id)) }),
      /* @__PURE__ */ jsx(EvoTableBody, { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(EvoTableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(EvoTableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
    ] })
  ] });
}
var DataTable = EvoDataTable;
function EvoDataTableFilters({
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "data-table-filters", className: "evo-toolbar", role: "search", children: [
    /* @__PURE__ */ jsx(EvoInput, { "aria-label": "Filter rows", onChange: (event) => onChange?.(event.target.value) }),
    /* @__PURE__ */ jsx(EvoButton, { variant: "ghost", size: "sm", children: "Clear" })
  ] });
}
var DataTableFilters = EvoDataTableFilters;
function EvoColumnVisibility({
  columns,
  views = [],
  onChange
}) {
  const [internal, setInternal] = React.useState(columns);
  return /* @__PURE__ */ jsxs("fieldset", { "data-evo": "column-visibility", className: "evo-field", children: [
    /* @__PURE__ */ jsx("legend", { className: "evo-field-legend", children: "Columns" }),
    internal.map((column, index) => /* @__PURE__ */ jsx(
      EvoCheckbox,
      {
        label: column.label,
        checked: column.visible,
        onCheckedChange: (checked) => {
          const next = internal.map(
            (item, itemIndex) => itemIndex === index ? { ...item, visible: Boolean(checked) } : item
          );
          setInternal(next);
          onChange?.(next);
        }
      },
      column.id
    )),
    views.length ? /* @__PURE__ */ jsx("div", { className: "evo-toolbar", children: views.map((view) => /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", children: view.name }, view.id)) }) : null
  ] });
}
var ColumnVisibility = EvoColumnVisibility;
function EvoVirtualizedList({
  items,
  height = 240,
  itemHeight = 36
}) {
  const parentRef = React.useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight
  });
  return /* @__PURE__ */ jsx("div", { "data-evo": "virtualized-list", ref: parentRef, className: "evo-virtual", style: { height }, role: "list", children: /* @__PURE__ */ jsx("div", { style: { height: virtualizer.getTotalSize(), position: "relative" }, children: virtualizer.getVirtualItems().map((row) => /* @__PURE__ */ jsx(
    "div",
    {
      role: "listitem",
      style: { position: "absolute", top: 0, transform: `translateY(${row.start}px)`, height: row.size, width: "100%" },
      children: items[row.index]
    },
    row.key
  )) }) });
}
var VirtualizedList = EvoVirtualizedList;
function EvoInlineEdit({
  defaultValue = "",
  onSave
}) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  if (!editing) {
    return /* @__PURE__ */ jsx("button", { "data-evo": "inline-edit", type: "button", className: "evo-inline-edit", onClick: () => setEditing(true), children: value || "Edit" });
  }
  return /* @__PURE__ */ jsxs("span", { "data-evo": "inline-edit", className: "evo-toolbar", children: [
    /* @__PURE__ */ jsx("input", { className: "evo-input", value, onChange: (event) => setValue(event.target.value), "aria-label": "Edit value" }),
    /* @__PURE__ */ jsx(EvoButton, { size: "sm", onClick: () => {
      onSave?.(value);
      setEditing(false);
    }, children: "Save" })
  ] });
}
var InlineEdit = EvoInlineEdit;
function EvoDataGrid({
  columns,
  rows,
  onChange
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "data-grid", className: "evo-table-wrap", children: /* @__PURE__ */ jsxs("table", { className: "evo-table", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("th", { scope: "col", children: column.header }, column.id)) }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((row, rowIndex) => /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
      EvoInlineEdit,
      {
        defaultValue: row[column.id] ?? "",
        onSave: (value) => {
          const next = rows.map((item, index) => index === rowIndex ? { ...item, [column.id]: value } : item);
          onChange?.(next);
        }
      }
    ) }, column.id)) }, row.id ?? rowIndex)) })
  ] }) });
}
var DataGrid = EvoDataGrid;
function EvoAreaChart({ data, label }) {
  const max = Math.max(1, ...data);
  const path = data.map((value, index) => `${index === 0 ? "M" : "L"} ${index / Math.max(1, data.length - 1) * 160} ${64 - value / max * 56}`).join(" ");
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "area-chart", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsxs("svg", { role: "img", "aria-label": label, viewBox: "0 0 160 64", width: "160", height: "64", children: [
      /* @__PURE__ */ jsx("path", { d: `${path} L 160 64 L 0 64 Z`, fill: "var(--brand-selection)" }),
      /* @__PURE__ */ jsx("path", { d: path, fill: "none", stroke: "var(--brand-actionA11y)", strokeWidth: "2" })
    ] })
  ] });
}
var AreaChart = EvoAreaChart;
function EvoBarChart({ data, label }) {
  const max = Math.max(1, ...data);
  const width = 160 / data.length;
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "bar-chart", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx("svg", { role: "img", "aria-label": label, viewBox: "0 0 160 64", width: "160", height: "64", children: data.map((value, index) => /* @__PURE__ */ jsx(
      "rect",
      {
        x: index * width + 2,
        y: 64 - value / max * 56,
        width: Math.max(4, width - 4),
        height: value / max * 56,
        fill: "var(--brand-actionA11y)"
      },
      index
    )) })
  ] });
}
var BarChart = EvoBarChart;
function EvoLineChart({ data, label }) {
  const max = Math.max(1, ...data);
  const path = data.map((value, index) => `${index === 0 ? "M" : "L"} ${index / Math.max(1, data.length - 1) * 160} ${64 - value / max * 56}`).join(" ");
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "line-chart", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx("svg", { role: "img", "aria-label": label, viewBox: "0 0 160 64", width: "160", height: "64", children: /* @__PURE__ */ jsx("path", { d: path, fill: "none", stroke: "var(--brand-actionA11y)", strokeWidth: "2" }) })
  ] });
}
var LineChart = EvoLineChart;
function EvoPieChart({ data, label }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let angle = 0;
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "pie-chart", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx("svg", { role: "img", "aria-label": label, viewBox: "0 0 64 64", width: "64", height: "64", children: data.map((item) => {
      const slice = item.value / total * Math.PI * 2;
      const start = angle;
      angle += slice;
      const x1 = 32 + Math.cos(start) * 28;
      const y1 = 32 + Math.sin(start) * 28;
      const x2 = 32 + Math.cos(angle) * 28;
      const y2 = 32 + Math.sin(angle) * 28;
      const large = slice > Math.PI ? 1 : 0;
      return /* @__PURE__ */ jsx(
        "path",
        {
          d: `M32 32 L ${x1} ${y1} A 28 28 0 ${large} 1 ${x2} ${y2} Z`,
          fill: "var(--brand-actionA11y)",
          opacity: 0.4 + item.value / total * 0.6
        },
        item.label
      );
    }) })
  ] });
}
var PieChart = EvoPieChart;
function EvoFunnelChart({ data, label }) {
  const max = Math.max(1, ...data.map((item) => item.value));
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "funnel-chart", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx("svg", { role: "img", "aria-label": label, viewBox: "0 0 160 80", width: "160", height: "80", children: data.map((item, index) => {
      const width = item.value / max * 140;
      return /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("rect", { x: (160 - width) / 2, y: index * 22 + 4, width, height: 18, fill: "var(--brand-actionA11y)", opacity: 1 - index * 0.15 }),
        /* @__PURE__ */ jsx("text", { x: "80", y: index * 22 + 17, textAnchor: "middle", fill: "var(--brand-actionFg)", fontSize: "10", children: item.label })
      ] }, item.label);
    }) })
  ] });
}
var FunnelChart = EvoFunnelChart;
function EvoRadialChart({ value, label }) {
  const offset = 126 - 126 * value / 100;
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "radial-chart", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsxs("svg", { role: "img", "aria-label": label, viewBox: "0 0 48 48", width: "48", height: "48", children: [
      /* @__PURE__ */ jsx("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "var(--surfaceSunken)", strokeWidth: "6" }),
      /* @__PURE__ */ jsx("circle", { cx: "24", cy: "24", r: "20", fill: "none", stroke: "var(--brand-actionA11y)", strokeWidth: "6", strokeDasharray: "126", strokeDashoffset: offset }),
      /* @__PURE__ */ jsx("text", { x: "24", y: "28", textAnchor: "middle", className: "tabular-nums", fill: "var(--text)", fontSize: "10", children: value })
    ] })
  ] });
}
var RadialChart = EvoRadialChart;
function EvoKpiCard({
  label,
  value,
  delta
}) {
  return /* @__PURE__ */ jsxs(EvoCard, { "data-evo": "kpi-card", children: [
    /* @__PURE__ */ jsx(EvoCardDescription, { children: label }),
    /* @__PURE__ */ jsx(EvoCardTitle, { className: "evo-stat-value", children: value }),
    delta ? /* @__PURE__ */ jsx("p", { className: "tabular-nums", children: delta }) : null
  ] });
}
var KpiCard = EvoKpiCard;
var StatCard = EvoKpiCard;
function EvoSparkline({ data, label }) {
  const max = Math.max(1, ...data);
  const path = data.map((value, index) => `${index === 0 ? "M" : "L"} ${index / Math.max(1, data.length - 1) * 80} ${24 - value / max * 20}`).join(" ");
  return /* @__PURE__ */ jsx("svg", { "data-evo": "sparkline", role: "img", "aria-label": label, viewBox: "0 0 80 24", width: "80", height: "24", children: /* @__PURE__ */ jsx("path", { d: path, fill: "none", stroke: "var(--brand-actionA11y)", strokeWidth: "2" }) });
}
var Sparkline = EvoSparkline;
function EvoHeatmap({ values, label }) {
  const max = Math.max(1, ...values);
  return /* @__PURE__ */ jsxs("figure", { "data-evo": "heatmap", className: "evo-chart", children: [
    /* @__PURE__ */ jsx("figcaption", { className: "evo-label", children: label }),
    /* @__PURE__ */ jsx("svg", { role: "img", "aria-label": label, viewBox: `0 0 ${values.length * 14} 14`, height: "14", children: values.map((value, index) => /* @__PURE__ */ jsx("rect", { x: index * 14, y: "0", width: "12", height: "12", rx: "2", fill: "var(--brand-actionA11y)", opacity: value / max || 0.15 }, index)) })
  ] });
}
var Heatmap = EvoHeatmap;
function EvoAlert({
  title,
  description,
  tone = "neutral"
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "alert", role: "alert", className: cn("evo-alert", tone === "danger" && "evo-alert--destructive"), children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "evo-alert-title", children: title }),
    description ? /* @__PURE__ */ jsx("p", { className: "evo-alert-description", children: description }) : null
  ] }) });
}
var Alert = EvoAlert;
function EvoToaster() {
  const theme = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      "data-evo": "toast",
      className: "evo-toaster",
      theme,
      containerAriaLabel: "Toast notifications"
    }
  );
}
var Toaster = EvoToaster;
function EvoBanner({
  title,
  action
}) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "banner", role: "status", className: "evo-banner", children: [
    /* @__PURE__ */ jsx("p", { children: title }),
    action ?? /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", children: "Dismiss" })
  ] });
}
var Banner = EvoBanner;
function EvoNotificationCenter({
  items
}) {
  return /* @__PURE__ */ jsx(
    EvoPopover,
    {
      content: /* @__PURE__ */ jsx("ul", { className: "evo-timeline", children: items.map((item) => /* @__PURE__ */ jsx("li", { children: item.title }, item.id)) }),
      children: /* @__PURE__ */ jsxs(EvoButton, { "data-evo": "notification-center", variant: "ghost", children: [
        "Notifications (",
        items.length,
        ")"
      ] })
    }
  );
}
var NotificationCenter = EvoNotificationCenter;
function EvoErrorPage({
  title = "Page not found",
  description = "The record or route does not exist."
}) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "error-page", role: "status", className: "evo-empty", children: [
    /* @__PURE__ */ jsx("h2", { className: "evo-empty-title", children: title }),
    /* @__PURE__ */ jsx("p", { className: "evo-empty-description", children: description }),
    /* @__PURE__ */ jsx(EvoButton, { children: "Back home" })
  ] });
}
var ErrorPage = EvoErrorPage;
function EvoAlertDialog({
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
  confirmLabel = "Hold to confirm",
  trigger
}) {
  const [holding, setHolding] = React.useState(false);
  React.useEffect(() => {
    if (!holding) return;
    const id = window.setTimeout(() => onConfirm?.(), 800);
    return () => window.clearTimeout(id);
  }, [holding, onConfirm]);
  return /* @__PURE__ */ jsxs(AlertDialogPrimitive.Root, { open, onOpenChange, children: [
    trigger ? /* @__PURE__ */ jsx(AlertDialogPrimitive.Trigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs(AlertDialogPrimitive.Portal, { children: [
      /* @__PURE__ */ jsx(AlertDialogPrimitive.Overlay, { className: "evo-overlay" }),
      /* @__PURE__ */ jsxs(AlertDialogPrimitive.Content, { "data-evo": "alert-dialog", className: "evo-dialog", children: [
        /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, { className: "evo-dialog-title", children: title }),
        description ? /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, { className: "evo-dialog-description", children: description }) : null,
        /* @__PURE__ */ jsxs("div", { className: "evo-card-footer", children: [
          /* @__PURE__ */ jsx(AlertDialogPrimitive.Cancel, { asChild: true, children: /* @__PURE__ */ jsx(EvoButton, { variant: "ghost", children: "Cancel" }) }),
          /* @__PURE__ */ jsx(
            EvoButton,
            {
              variant: "danger",
              onPointerDown: () => setHolding(true),
              onPointerUp: () => setHolding(false),
              children: confirmLabel
            }
          )
        ] })
      ] })
    ] })
  ] });
}
var AlertDialog = EvoAlertDialog;
function EvoSheet({
  title,
  children,
  open,
  onOpenChange,
  side = "right",
  trigger
}) {
  return /* @__PURE__ */ jsxs(DialogPrimitive.Root, { open, onOpenChange, children: [
    trigger ? /* @__PURE__ */ jsx(DialogPrimitive.Trigger, { asChild: true, children: trigger }) : null,
    /* @__PURE__ */ jsxs(DialogPrimitive.Portal, { children: [
      /* @__PURE__ */ jsx(DialogPrimitive.Overlay, { className: "evo-overlay" }),
      /* @__PURE__ */ jsxs(DialogPrimitive.Content, { "data-evo": "sheet", className: "evo-sheet", "data-side": side, "aria-modal": "true", children: [
        /* @__PURE__ */ jsx(DialogPrimitive.Title, { className: "evo-sheet-title", children: title }),
        children,
        /* @__PURE__ */ jsx(DialogPrimitive.Close, { asChild: true, children: /* @__PURE__ */ jsx(EvoButton, { variant: "ghost", "aria-label": "Close", children: "Close" }) })
      ] })
    ] })
  ] });
}
var Sheet = EvoSheet;
var Drawer = EvoSheet;
function EvoDropdownMenu({
  items,
  children
}) {
  return /* @__PURE__ */ jsxs(Dropdown.Root, { children: [
    /* @__PURE__ */ jsx(Dropdown.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(Dropdown.Portal, { children: /* @__PURE__ */ jsx(Dropdown.Content, { "data-evo": "dropdown-menu", className: "evo-dropdown", children: items.map((item) => /* @__PURE__ */ jsxs(Dropdown.Item, { className: "evo-menu-item", onSelect: item.onSelect, children: [
      item.label,
      item.shortcut ? /* @__PURE__ */ jsx("span", { className: "evo-kbd", children: item.shortcut }) : null
    ] }, item.label)) }) })
  ] });
}
var DropdownMenu = EvoDropdownMenu;
function EvoContextMenu({
  items,
  children
}) {
  return /* @__PURE__ */ jsxs(Context.Root, { children: [
    /* @__PURE__ */ jsx(Context.Trigger, { asChild: true, children }),
    /* @__PURE__ */ jsx(Context.Portal, { children: /* @__PURE__ */ jsx(Context.Content, { "data-evo": "context-menu", className: "evo-context", children: items.map((item) => /* @__PURE__ */ jsxs(Context.Item, { className: "evo-menu-item", onSelect: item.onSelect, children: [
      item.label,
      item.shortcut ? /* @__PURE__ */ jsx("kbd", { className: "evo-kbd", children: item.shortcut }) : null
    ] }, item.label)) }) })
  ] });
}
var ContextMenu = EvoContextMenu;
function Card2({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: setNodeRef,
      style: { transform: CSS.Transform.toString(transform), transition },
      className: "evo-card",
      ...attributes,
      ...listeners,
      children: title
    }
  );
}
function EvoKanban({
  columns,
  onMove
}) {
  return /* @__PURE__ */ jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: onMove, children: /* @__PURE__ */ jsx("div", { "data-evo": "kanban", className: "evo-kanban", children: columns.map((column) => /* @__PURE__ */ jsxs("section", { className: "evo-kanban-col", "aria-label": column.title, children: [
    /* @__PURE__ */ jsx("h3", { className: "evo-label", children: column.title }),
    /* @__PURE__ */ jsx(SortableContext, { items: column.cards.map((card) => card.id), strategy: verticalListSortingStrategy, children: column.cards.map((card) => /* @__PURE__ */ jsx(Card2, { id: card.id, title: card.title }, card.id)) })
  ] }, column.id)) }) });
}
var Kanban = EvoKanban;
function Row({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: setNodeRef,
      className: "evo-task-row",
      style: { transform: CSS.Transform.toString(transform), transition },
      ...attributes,
      ...listeners,
      children: label
    }
  );
}
function EvoSortableList({
  items,
  onChange
}) {
  const [rows, setRows] = React.useState(items);
  const handle = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);
    const next = arrayMove(rows, oldIndex, newIndex);
    setRows(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: handle, children: /* @__PURE__ */ jsx(SortableContext, { items: rows.map((row) => row.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsx("div", { "data-evo": "sortable-list", className: "evo-timeline", children: rows.map((row) => /* @__PURE__ */ jsx(Row, { id: row.id, label: row.label }, row.id)) }) }) });
}
var SortableList = EvoSortableList;
function EvoCalendar(props) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "calendar", children: /* @__PURE__ */ jsx(EvoDayPicker, { navLabel: "Month navigation", ...props }) });
}
var Calendar = EvoCalendar;
function EvoEventCalendar({
  events = []
}) {
  const modifiers = Object.fromEntries(events.map((event) => [event.id, new Date(event.date)]));
  return /* @__PURE__ */ jsxs("div", { "data-evo": "event-calendar", children: [
    /* @__PURE__ */ jsx(EvoDayPicker, { navLabel: "Event month navigation", modifiers }),
    /* @__PURE__ */ jsx("ul", { className: "evo-timeline", children: events.map((event) => /* @__PURE__ */ jsxs("li", { children: [
      /* @__PURE__ */ jsx("strong", { children: event.title }),
      " ",
      /* @__PURE__ */ jsx("time", { dateTime: event.date, children: event.date })
    ] }, event.id)) })
  ] });
}
var EventCalendar = EvoEventCalendar;
function EvoGantt({
  items,
  zoom = "week"
}) {
  const start = items.length ? parseISO(items[0].start) : /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsx(DndContext, { onDragEnd: (_event) => void 0, children: /* @__PURE__ */ jsx("div", { "data-evo": "gantt", className: "evo-gantt", "data-zoom": zoom, children: items.map((item) => {
    const offset = Math.max(0, differenceInDays(parseISO(item.start), start) * (zoom === "day" ? 24 : 8));
    const width = Math.max(24, differenceInDays(parseISO(item.end), parseISO(item.start)) * (zoom === "day" ? 24 : 8));
    return /* @__PURE__ */ jsxs("div", { className: "evo-gantt-row", children: [
      /* @__PURE__ */ jsx("span", { children: item.title }),
      /* @__PURE__ */ jsx("div", { className: "evo-gantt-bar", style: { marginInlineStart: offset, width }, children: item.title })
    ] }, item.id);
  }) }) });
}
var Gantt = EvoGantt;
function EvoActivityFeed({
  items
}) {
  return /* @__PURE__ */ jsx("ol", { "data-evo": "activity-feed", className: "evo-timeline", children: items.map((item) => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("strong", { children: item.actor }),
    " ",
    item.action
  ] }, item.id)) });
}
var ActivityFeed = EvoActivityFeed;
function EvoChat({
  messages
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "chat", role: "log", className: "evo-chat", children: messages.map((message) => /* @__PURE__ */ jsx("article", { "data-role": message.role, className: "evo-chat-bubble", children: message.content }, message.id)) });
}
var Chat = EvoChat;
function EvoConversation({
  threads
}) {
  return /* @__PURE__ */ jsx("ul", { "data-evo": "conversation", className: "evo-conversation", children: threads.map((thread) => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("strong", { children: thread.title }),
    /* @__PURE__ */ jsx("p", { className: "evo-card-description", children: thread.preview })
  ] }, thread.id)) });
}
var Conversation = EvoConversation;
function EvoPromptInput({
  onSubmit
}) {
  const [value, setValue] = React.useState("");
  return /* @__PURE__ */ jsxs(
    "form",
    {
      "data-evo": "prompt-input",
      className: "evo-prompt",
      onSubmit: (event) => {
        event.preventDefault();
        onSubmit?.(value);
      },
      children: [
        /* @__PURE__ */ jsx("textarea", { className: "evo-textarea", "aria-label": "Prompt", value, onChange: (event) => setValue(event.target.value) }),
        /* @__PURE__ */ jsx(EvoButton, { type: "submit", children: "Send" })
      ]
    }
  );
}
var PromptInput = EvoPromptInput;
function EvoEmailComposer({
  templates = ["Follow up", "Intro"],
  onSend
}) {
  const [to, setTo] = React.useState([]);
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  return /* @__PURE__ */ jsxs(
    "form",
    {
      "data-evo": "email-composer",
      className: "evo-card",
      onSubmit: (event) => {
        event.preventDefault();
        onSend?.({ to, subject, body });
      },
      children: [
        /* @__PURE__ */ jsx(EvoTagsInput, { label: "To", value: to, onChange: setTo }),
        /* @__PURE__ */ jsx(EvoTagsInput, { label: "Cc" }),
        /* @__PURE__ */ jsx(EvoInput, { label: "Subject", value: subject, onChange: (event) => setSubject(event.target.value) }),
        /* @__PURE__ */ jsxs("label", { className: "evo-label", children: [
          "Template",
          /* @__PURE__ */ jsx("select", { className: "evo-input", onChange: (event) => setSubject(event.target.value), children: templates.map((template) => /* @__PURE__ */ jsx("option", { children: template }, template)) })
        ] }),
        /* @__PURE__ */ jsx(EvoRichText, { label: "Body", onChange: setBody }),
        /* @__PURE__ */ jsx(EvoFileUpload, { label: "Attachments" }),
        /* @__PURE__ */ jsxs("div", { className: "evo-card-footer", children: [
          /* @__PURE__ */ jsx(EvoButton, { type: "submit", children: "Send" }),
          /* @__PURE__ */ jsx(EvoButton, { type: "button", variant: "secondary", children: "Schedule" })
        ] })
      ]
    }
  );
}
var EmailComposer = EvoEmailComposer;
function EvoContactCard({
  name,
  email,
  role
}) {
  return /* @__PURE__ */ jsxs(EvoCard, { "data-evo": "contact-card", children: [
    /* @__PURE__ */ jsx(EvoAvatar, { fallback: name.slice(0, 2), alt: name }),
    /* @__PURE__ */ jsx(EvoCardTitle, { children: name }),
    /* @__PURE__ */ jsxs(EvoCardDescription, { children: [
      email,
      role ? ` \xB7 ${role}` : ""
    ] }),
    /* @__PURE__ */ jsx(EvoCardFooter, { children: /* @__PURE__ */ jsx(EvoButton, { size: "sm", children: "Message" }) })
  ] });
}
var ContactCard = EvoContactCard;
function EvoWorkflowBuilder({
  nodes
}) {
  return /* @__PURE__ */ jsx("ol", { "data-evo": "workflow-builder", className: "evo-workflow", children: nodes.map((node, index) => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("span", { className: "evo-step-index", children: index + 1 }),
    node.label
  ] }, node.id)) });
}
var WorkflowBuilder = EvoWorkflowBuilder;
function Thread({ comment, onDelete }) {
  const [editing, setEditing] = React.useState(false);
  return /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("strong", { children: comment.author }),
    " ",
    /* @__PURE__ */ jsx(EvoRelativeTime, { date: comment.createdAt }),
    editing ? /* @__PURE__ */ jsx("textarea", { className: "evo-textarea", defaultValue: comment.body }) : /* @__PURE__ */ jsx("p", { children: comment.body }),
    /* @__PURE__ */ jsxs("div", { className: "evo-toolbar", children: [
      /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", onClick: () => setEditing((value) => !value), children: "Edit" }),
      /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", onClick: () => onDelete?.(comment.id), children: "Delete" }),
      /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", "aria-label": "React", children: "\u{1F44D}" })
    ] }),
    comment.replies?.length ? /* @__PURE__ */ jsx("ul", { children: comment.replies.map((reply) => /* @__PURE__ */ jsx(Thread, { comment: reply, onDelete }, reply.id)) }) : null
  ] });
}
function EvoComments({ comments }) {
  return /* @__PURE__ */ jsx("ul", { "data-evo": "comments", className: "evo-comments", children: comments.map((comment) => /* @__PURE__ */ jsx(Thread, { comment }, comment.id)) });
}
var Comments = EvoComments;
function EvoPricingTable({
  plans
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "pricing-table", className: "evo-pricing", children: plans.map((plan) => /* @__PURE__ */ jsxs(EvoCard, { children: [
    /* @__PURE__ */ jsx(EvoCardTitle, { children: plan.name }),
    /* @__PURE__ */ jsx("p", { className: "evo-stat-value", children: plan.price }),
    /* @__PURE__ */ jsx("ul", { children: (plan.features ?? []).map((feature) => /* @__PURE__ */ jsx("li", { children: feature }, feature)) }),
    /* @__PURE__ */ jsxs(EvoButton, { children: [
      "Choose ",
      plan.name
    ] })
  ] }, plan.id)) });
}
var PricingTable = EvoPricingTable;
function EvoInvoice({
  number,
  customer,
  lines
}) {
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return /* @__PURE__ */ jsxs("article", { "data-evo": "invoice", className: "evo-card", children: [
    /* @__PURE__ */ jsxs("h2", { children: [
      "Invoice ",
      number
    ] }),
    /* @__PURE__ */ jsx("p", { children: customer }),
    /* @__PURE__ */ jsxs(EvoTable, { children: [
      /* @__PURE__ */ jsx(EvoTableHeader, { children: /* @__PURE__ */ jsxs(EvoTableRow, { children: [
        /* @__PURE__ */ jsx(EvoTableHead, { children: "Item" }),
        /* @__PURE__ */ jsx(EvoTableHead, { children: "Amount" })
      ] }) }),
      /* @__PURE__ */ jsx(EvoTableBody, { children: lines.map((line) => /* @__PURE__ */ jsxs(EvoTableRow, { children: [
        /* @__PURE__ */ jsx(EvoTableCell, { children: line.label }),
        /* @__PURE__ */ jsx(EvoTableCell, { className: "tabular-nums", children: line.amount })
      ] }, line.label)) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "evo-stat-value tabular-nums", children: [
      total,
      " DZD"
    ] })
  ] });
}
var Invoice = EvoInvoice;
function EvoSignIn({ onSubmit }) {
  return /* @__PURE__ */ jsxs(
    "form",
    {
      "data-evo": "sign-in",
      className: "evo-card",
      onSubmit: (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({ email: String(data.get("email")), password: String(data.get("password")) });
      },
      children: [
        /* @__PURE__ */ jsx("h2", { children: "Sign in" }),
        /* @__PURE__ */ jsx(EvoInput, { name: "email", type: "email", label: "Email", required: true }),
        /* @__PURE__ */ jsx(EvoInput, { name: "password", type: "password", label: "Password", required: true }),
        /* @__PURE__ */ jsx(EvoButton, { type: "submit", children: "Continue" })
      ]
    }
  );
}
var SignIn = EvoSignIn;
function EvoSignUp({ onSubmit }) {
  return /* @__PURE__ */ jsxs(
    "form",
    {
      "data-evo": "sign-up",
      className: "evo-card",
      onSubmit: (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({ name: String(data.get("name")), email: String(data.get("email")) });
      },
      children: [
        /* @__PURE__ */ jsx("h2", { children: "Create account" }),
        /* @__PURE__ */ jsx(EvoInput, { name: "name", label: "Name", required: true }),
        /* @__PURE__ */ jsx(EvoInput, { name: "email", type: "email", label: "Email", required: true }),
        /* @__PURE__ */ jsx(EvoInput, { name: "password", type: "password", label: "Password", required: true }),
        /* @__PURE__ */ jsx(EvoButton, { type: "submit", children: "Create account" })
      ]
    }
  );
}
var SignUp = EvoSignUp;
function scorePassword(value) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}
function EvoForgotPassword() {
  const [password, setPassword] = React.useState("");
  const score = scorePassword(password);
  return /* @__PURE__ */ jsxs("form", { "data-evo": "forgot-password", className: "evo-card", children: [
    /* @__PURE__ */ jsx("h2", { children: "Reset password" }),
    /* @__PURE__ */ jsx(EvoInput, { type: "email", label: "Email", required: true }),
    /* @__PURE__ */ jsx(EvoInput, { type: "password", label: "New password", value: password, onChange: (event) => setPassword(event.target.value) }),
    /* @__PURE__ */ jsxs("p", { className: "evo-label", children: [
      "Strength ",
      score,
      "/4"
    ] }),
    /* @__PURE__ */ jsx(EvoButton, { type: "submit", children: "Reset" })
  ] });
}
var ForgotPassword = EvoForgotPassword;
function EvoTwoFactor({
  secret,
  backupCodes = ["A1B2-C3D4", "E5F6-G7H8"]
}) {
  const otpauth = `otpauth://totp/EvoCRM?secret=${secret}&issuer=Evotechly`;
  return /* @__PURE__ */ jsxs("form", { "data-evo": "two-factor", className: "evo-card", children: [
    /* @__PURE__ */ jsx("h2", { children: "Two-factor authentication" }),
    /* @__PURE__ */ jsx("p", { className: "evo-card-description", children: "Scan this otpauth URL or enter the secret." }),
    /* @__PURE__ */ jsx("code", { className: "evo-mono", children: otpauth }),
    /* @__PURE__ */ jsx(EvoCopyButton, { value: secret, label: "Copy secret" }),
    /* @__PURE__ */ jsx(EvoInputOtp, {}),
    /* @__PURE__ */ jsx("ul", { children: backupCodes.map((code) => /* @__PURE__ */ jsx("li", { className: "evo-mono", children: code }, code)) }),
    /* @__PURE__ */ jsx(EvoButton, { type: "submit", children: "Verify" })
  ] });
}
var TwoFactor = EvoTwoFactor;
function EvoAccountButton({ name, email }) {
  return /* @__PURE__ */ jsx(EvoDropdownMenu, { items: [{ label: "Profile" }, { label: "Sign out" }], children: /* @__PURE__ */ jsxs(EvoButton, { "data-evo": "account-button", variant: "ghost", children: [
    /* @__PURE__ */ jsx(EvoAvatar, { fallback: name.slice(0, 2), alt: "", size: "sm" }),
    name,
    email ? /* @__PURE__ */ jsx("span", { className: "evo-card-description", children: email }) : null
  ] }) });
}
var AccountButton = EvoAccountButton;
function EvoSettingsPage({
  flags
}) {
  return /* @__PURE__ */ jsxs("form", { "data-evo": "settings-page", className: "evo-card", children: [
    /* @__PURE__ */ jsx("h2", { children: "Settings" }),
    flags.map((flag) => /* @__PURE__ */ jsx(EvoSwitch, { label: flag.label, defaultChecked: flag.enabled }, flag.id))
  ] });
}
var SettingsPage = EvoSettingsPage;
function EvoOrgSwitcher({
  orgs,
  onCreate
}) {
  return /* @__PURE__ */ jsx(
    EvoDropdownMenu,
    {
      items: [
        ...orgs.map((org) => ({ label: `${org.name} \xB7 ${org.role ?? "Member"}` })),
        { label: "Create workspace", onSelect: onCreate }
      ],
      children: /* @__PURE__ */ jsxs(EvoButton, { "data-evo": "org-switcher", variant: "ghost", children: [
        /* @__PURE__ */ jsx(EvoAvatar, { fallback: orgs[0]?.name.slice(0, 2), alt: "", size: "sm" }),
        orgs[0]?.name ?? "Workspace"
      ] })
    }
  );
}
var OrgSwitcher = EvoOrgSwitcher;
function EvoApiKeys({
  keys
}) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "api-keys", children: /* @__PURE__ */ jsxs(EvoTable, { children: [
    /* @__PURE__ */ jsx(EvoTableHeader, { children: /* @__PURE__ */ jsxs(EvoTableRow, { children: [
      /* @__PURE__ */ jsx(EvoTableHead, { children: "Name" }),
      /* @__PURE__ */ jsx(EvoTableHead, { children: "Key" }),
      /* @__PURE__ */ jsx(EvoTableHead, { children: "Actions" })
    ] }) }),
    /* @__PURE__ */ jsx(EvoTableBody, { children: keys.map((key) => /* @__PURE__ */ jsxs(EvoTableRow, { children: [
      /* @__PURE__ */ jsx(EvoTableCell, { children: key.name }),
      /* @__PURE__ */ jsx(EvoTableCell, { className: "evo-mono", children: key.hint }),
      /* @__PURE__ */ jsx(EvoTableCell, { children: /* @__PURE__ */ jsx(EvoButton, { size: "sm", variant: "ghost", children: "Revoke" }) })
    ] }, key.id)) })
  ] }) });
}
var ApiKeys = EvoApiKeys;
function EvoEmptyState({
  title,
  description,
  action
}) {
  return /* @__PURE__ */ jsxs("div", { "data-evo": "empty-state", role: "status", className: "evo-empty", children: [
    /* @__PURE__ */ jsx("h2", { className: "evo-empty-title", children: title }),
    description ? /* @__PURE__ */ jsx("p", { className: "evo-empty-description", children: description }) : null,
    action ?? /* @__PURE__ */ jsx(EvoButton, { children: "Create" })
  ] });
}
var EmptyState = EvoEmptyState;
var Empty = EvoEmptyState;
function EvoOnboarding({
  steps
}) {
  return /* @__PURE__ */ jsx("ol", { "data-evo": "onboarding", className: "evo-onboarding", children: steps.map((step) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(EvoCheckbox, { label: step.title, defaultChecked: step.done }) }, step.title)) });
}
var Onboarding = EvoOnboarding;
function EvoAnnouncement({ title }) {
  return /* @__PURE__ */ jsx("div", { "data-evo": "announcement", children: /* @__PURE__ */ jsx(EvoBanner, { title }) });
}
var Announcement = EvoAnnouncement;
function EvoFeatureTour({
  steps,
  open = false,
  storageKey = "evo-feature-tour"
}) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(open);
  React.useEffect(() => {
    setVisible(open);
  }, [open]);
  const step = steps[index];
  const finish = () => {
    window.localStorage?.setItem(storageKey, "1");
    setVisible(false);
  };
  if (!step) return null;
  return /* @__PURE__ */ jsx("div", { "data-evo": "feature-tour", children: /* @__PURE__ */ jsxs(EvoDialog, { open: visible, onOpenChange: setVisible, title: step.title, description: step.body, children: [
    /* @__PURE__ */ jsxs("p", { className: "tabular-nums", children: [
      index + 1,
      " / ",
      steps.length
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "evo-card-footer", children: [
      /* @__PURE__ */ jsx(EvoButton, { variant: "ghost", onClick: finish, children: "Skip" }),
      /* @__PURE__ */ jsx(
        EvoButton,
        {
          onClick: () => {
            if (index >= steps.length - 1) finish();
            else setIndex((value) => value + 1);
          },
          children: "Next"
        }
      )
    ] })
  ] }) });
}
var FeatureTour = EvoFeatureTour;

export { Accordion, AccountButton, ActivityFeed, Alert, AlertDialog, Announcement, ApiKeys, AppShell, AreaChart, Avatar, AvatarGroup, Badge, Banner, BarChart, Breadcrumb, Button, Calendar, Card, Chat, Checkbox, Collapsible, ColorPicker, ColumnVisibility, Combobox, Command, Comments, ContactCard, ContextMenu, Conversation, CopyButton, CurrencyInput, DataGrid, DataTable, DataTableFilters, DatePicker, DateRangePicker, DescriptionList, Dialog, Drawer, DropdownMenu, EmailComposer, Empty, EmptyState, ErrorPage, EventCalendar, EvoAccordion, EvoAccordionContent, EvoAccordionItem, EvoAccordionTrigger, EvoAccountButton, EvoActivityFeed, EvoAlert, EvoAlertDialog, EvoAnnouncement, EvoApiKeys, EvoAppShell, EvoAreaChart, EvoAvatar, EvoAvatarFallback, EvoAvatarGroup, EvoAvatarImage, EvoBadge, EvoBanner, EvoBarChart, EvoBreadcrumb, EvoButton, EvoCalendar, EvoCard, EvoCardContent, EvoCardDescription, EvoCardFooter, EvoCardHeader, EvoCardTitle, EvoChat, EvoCheckbox, EvoCollapsible, EvoColorPicker, EvoColumnVisibility, EvoCombobox, EvoCommand, EvoCommandInput, EvoCommandItem, EvoCommandList, EvoCommandPalette, EvoComments, EvoContactCard, EvoContextMenu, EvoConversation, EvoCopyButton, EvoCurrencyInput, EvoDataGrid, EvoDataTable, EvoDataTableFilters, EvoDatePicker, EvoDateRangePicker, EvoDescriptionList, EvoDialog, EvoDropdownMenu, EvoEmailComposer, EvoEmptyState, EvoErrorPage, EvoEventCalendar, EvoFeatureTour, EvoFileUpload, EvoForgotPassword, EvoForm, EvoFormField, EvoFormLabel, EvoFormMessage, EvoFunnelChart, EvoGantt, EvoHeading, EvoHeatmap, EvoHoverCard, EvoIconButton, EvoImage, EvoInlineEdit, EvoInput, EvoInputOTP, EvoInputOtp, EvoInvoice, EvoKanban, EvoKbd, EvoKpiCard, EvoLineChart, EvoMentionInput, EvoMenubar, EvoMultiSelect, EvoNavigationMenu, EvoNotificationCenter, EvoNumberInput, EvoOnboarding, EvoOrgSwitcher, EvoPageHeader, EvoPagination, EvoPhoneInput, EvoPieChart, EvoPopover, EvoPricingTable, EvoProgress, EvoPromptInput, EvoRadialChart, EvoRadioGroup, EvoRating, EvoRelativeTime, EvoResizable, EvoResizableHandle, EvoResizablePanel, EvoRichText, EvoScrollArea, EvoSelect, EvoSeparator, EvoSettingsPage, EvoSheet, EvoSidebar, EvoSignIn, EvoSignUp, EvoSkeleton, EvoSlider, EvoSortableList, EvoSparkline, EvoSpinner, EvoStatus, EvoStepper, EvoSwitch, EvoTable, EvoTableBody, EvoTableCell, EvoTableHead, EvoTableHeader, EvoTableRow, EvoTabs, EvoTabsContent, EvoTabsList, EvoTabsTrigger, EvoTagsInput, EvoText, EvoTextarea, EvoTimePicker, EvoTimeline, EvoToaster, EvoToggleGroup, EvoTooltip, EvoTreeView, EvoTwoFactor, EvoTypography, EvoVirtualizedList, EvoWorkflowBuilder, FeatureTour, FileUpload, ForgotPassword, Form, FunnelChart, Gantt, Heatmap, HoverCard, IconButton, Image2 as Image, InlineEdit, Input, InputOtp, Invoice, Kanban, Kbd, KpiCard, LineChart, MentionInput, Menubar, MultiSelect, NavigationMenu, NotificationCenter, NumberInput, Onboarding, OrgSwitcher, PageHeader, Pagination, PhoneInput, PieChart, Popover, PricingTable, Progress, PromptInput, RadialChart, Radio, RadioGroup, Rating, RelativeTime, Resizable, RichText, ScrollArea, Select, Separator, SettingsPage, Sheet, Sidebar, SignIn, SignUp, Skeleton, Slider, SortableList, Sparkline, Spinner, StatCard, Status, Stepper, Switch, Table, Tabs, TagsInput, Textarea, TimePicker, Timeline, Toaster, ToggleGroup, Tooltip, TreeView, TwoFactor, Typography, VirtualizedList, WorkflowBuilder, buttonVariants, cn, useIsMobile, useProduct, useTheme };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map