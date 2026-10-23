import { ClassValue } from 'clsx';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { PanelResizeHandle, Panel } from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Command as Command$1 } from 'cmdk';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { DateRange, DayPickerProps } from 'react-day-picker';
import { CountryCode } from 'libphonenumber-js';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ColumnDef } from '@tanstack/react-table';
import { DragEndEvent } from '@dnd-kit/core';
export { toast } from 'sonner';

declare function cn(...inputs: ClassValue[]): string;

type BrandTheme = "light" | "dark";
/** Reads `data-theme` from `<html>` so Sonner and overlays stay framework-agnostic. */
declare function useTheme(defaultTheme?: BrandTheme): BrandTheme;
declare function useProduct(): string;

declare function useIsMobile(): boolean;

type EvoSize = "sm" | "md" | "lg";
type EvoVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
type EvoTone = "neutral" | "brand" | "success" | "warning" | "danger" | "info";
type EvoCommonProps = {
    size?: EvoSize;
    variant?: EvoVariant;
    tone?: EvoTone;
    asChild?: boolean;
};

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
    tone?: "danger" | "neutral" | "brand" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type EvoButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    variant?: EvoVariant | "default";
    size?: EvoSize | "icon";
    tone?: EvoTone;
};
declare function EvoButton({ className, variant, size, tone, asChild, type, ...props }: EvoButtonProps): React.JSX.Element;
declare const Button: typeof EvoButton;

type EvoBadgeProps = React.ComponentProps<"span"> & {
    variant?: Extract<EvoVariant, "primary" | "secondary" | "outline"> | "destructive";
    tone?: EvoTone;
};
declare function EvoBadge({ className, variant, tone, ...props }: EvoBadgeProps): React.JSX.Element;
declare const Badge: typeof EvoBadge;

type EvoAvatarProps = {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: EvoSize;
    className?: string;
};
declare function EvoAvatar({ src, alt, fallback, size, className }: EvoAvatarProps): React.JSX.Element;
declare const EvoAvatarImage: React.ForwardRefExoticComponent<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
declare const EvoAvatarFallback: React.ForwardRefExoticComponent<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>>;
declare const Avatar: typeof EvoAvatar;

type EvoAvatarGroupPerson = {
    name: string;
    src?: string;
};
type EvoAvatarGroupProps = {
    people: EvoAvatarGroupPerson[];
    max?: number;
    size?: EvoSize;
};
declare function EvoAvatarGroup({ people, max, size }: EvoAvatarGroupProps): React.JSX.Element;
declare const AvatarGroup: typeof EvoAvatarGroup;

declare function EvoSeparator({ className, orientation, decorative, ...props }: React.ComponentProps<typeof SeparatorPrimitive.Root>): React.JSX.Element;
declare const Separator: typeof EvoSeparator;

declare function EvoSkeleton({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare const Skeleton: typeof EvoSkeleton;

declare function EvoKbd({ className, ...props }: React.ComponentProps<"kbd">): React.JSX.Element;
declare const Kbd: typeof EvoKbd;

declare function EvoSpinner({ size, className, ...props }: React.ComponentProps<"span"> & {
    size?: EvoSize;
}): React.JSX.Element;
declare const Spinner: typeof EvoSpinner;

declare function EvoTypography({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function EvoHeading({ level, className, ...props }: React.ComponentProps<"h2"> & {
    level?: 1 | 2 | 3 | 4;
}): React.JSX.Element;
declare function EvoText({ className, ...props }: React.ComponentProps<"p">): React.JSX.Element;
declare const Typography: typeof EvoTypography;

type EvoIconButtonProps = React.ComponentProps<typeof EvoButton> & {
    label: string;
};
declare function EvoIconButton({ label, children, ...props }: EvoIconButtonProps): React.JSX.Element;
declare const IconButton: typeof EvoIconButton;

type EvoSidebarItem = {
    id: string;
    label: string;
    href?: string;
    active?: boolean;
};
declare function EvoSidebar({ items, title, className, }: {
    items: EvoSidebarItem[];
    title?: string;
    className?: string;
}): React.JSX.Element;
declare const Sidebar: typeof EvoSidebar;

declare function EvoAppShell({ title, items, children, }: {
    title?: string;
    items?: EvoSidebarItem[];
    children?: React.ReactNode;
}): React.JSX.Element;
declare const AppShell: typeof EvoAppShell;

declare function EvoResizable({ storageKey, children, orientation, }: {
    storageKey?: string;
    orientation?: "horizontal" | "vertical";
    children: React.ReactNode;
}): React.JSX.Element;
declare function EvoResizablePanel({ children, ...props }: React.ComponentProps<typeof Panel>): React.JSX.Element;
declare function EvoResizableHandle(props: React.ComponentProps<typeof PanelResizeHandle>): React.JSX.Element;
declare const Resizable: typeof EvoResizable;

declare function EvoScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>): React.JSX.Element;
declare const ScrollArea: typeof EvoScrollArea;

declare function EvoCard({ className, ...props }: React.ComponentProps<"article">): React.JSX.Element;
declare function EvoCardHeader({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function EvoCardTitle({ className, ...props }: React.ComponentProps<"h3">): React.JSX.Element;
declare function EvoCardDescription({ className, ...props }: React.ComponentProps<"p">): React.JSX.Element;
declare function EvoCardContent({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function EvoCardFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare const Card: typeof EvoCard;

declare function EvoPageHeader({ title, description, actions, level, }: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    level?: 1 | 2 | 3;
}): React.JSX.Element;
declare const PageHeader: typeof EvoPageHeader;

declare function EvoTabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>): React.JSX.Element;
declare function EvoTabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>): React.JSX.Element;
declare function EvoTabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>): React.JSX.Element;
declare function EvoTabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): React.JSX.Element;
declare const Tabs: typeof EvoTabs;

declare function EvoAccordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>): React.JSX.Element;
declare function EvoAccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): React.JSX.Element;
declare function EvoAccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): React.JSX.Element;
declare function EvoAccordionContent({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): React.JSX.Element;
declare const Accordion: typeof EvoAccordion;

declare function EvoCollapsible({ title, children, defaultOpen, }: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}): React.JSX.Element;
declare const Collapsible: typeof EvoCollapsible;

type EvoBreadcrumbItem = {
    label: string;
    href?: string;
};
declare function EvoBreadcrumb({ items, max, }: {
    items: EvoBreadcrumbItem[];
    max?: number;
}): React.JSX.Element;
declare const Breadcrumb: typeof EvoBreadcrumb;

declare function EvoCommand({ className, ...props }: React.ComponentProps<typeof Command$1>): React.JSX.Element;
declare function EvoCommandInput(props: React.ComponentProps<typeof Command$1.Input>): React.JSX.Element;
declare function EvoCommandList(props: React.ComponentProps<typeof Command$1.List>): React.JSX.Element;
declare function EvoCommandItem(props: React.ComponentProps<typeof Command$1.Item>): React.JSX.Element;
declare function EvoCommandPalette({ open, onOpenChange, children, }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}): React.JSX.Element;
declare const Command: typeof EvoCommand;

declare function EvoNavigationMenu({ items, }: {
    items: {
        label: string;
        href?: string;
    }[];
}): React.JSX.Element;
declare const NavigationMenu: typeof EvoNavigationMenu;

declare function EvoMenubar({ items, }: {
    items: {
        label: string;
        items: {
            label: string;
            shortcut?: string;
        }[];
    }[];
}): React.JSX.Element;
declare const Menubar: typeof EvoMenubar;

declare function EvoPagination({ page, pageCount, total, pageSize, onPageChange, onPageSizeChange, }: {
    page: number;
    pageCount: number;
    total?: number;
    pageSize?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
}): React.JSX.Element;
declare const Pagination: typeof EvoPagination;

declare function EvoStepper({ steps, current, }: {
    steps: {
        label: string;
    }[];
    current?: number;
}): React.JSX.Element;
declare const Stepper: typeof EvoStepper;

type EvoInputProps = React.ComponentProps<"input"> & {
    label?: string;
};
declare function EvoInput({ label, id, className, placeholder, ...props }: EvoInputProps): React.JSX.Element;
declare const Input: typeof EvoInput;

declare function EvoTextarea({ label, id, className, onChange, ...props }: React.ComponentProps<"textarea"> & {
    label?: string;
}): React.JSX.Element;
declare const Textarea: typeof EvoTextarea;

type EvoSelectOption = {
    value: string;
    label: string;
};
declare function EvoSelect({ label, options, placeholder, defaultValue, value, onValueChange, }: {
    label?: string;
    options: EvoSelectOption[];
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
}): React.JSX.Element;
declare const Select: typeof EvoSelect;

type EvoComboboxOption = {
    value: string;
    label: string;
};
declare function EvoCombobox({ label, options, value, onValueChange, onSearch, }: {
    label?: string;
    options: EvoComboboxOption[];
    value?: string;
    onValueChange?: (value: string) => void;
    onSearch?: (query: string) => void;
}): React.JSX.Element;
declare const Combobox: typeof EvoCombobox;

declare function EvoMultiSelect({ label, options, value, onChange, }: {
    label?: string;
    options: {
        value: string;
        label: string;
    }[];
    value?: string[];
    onChange?: (value: string[]) => void;
}): React.JSX.Element;
declare const MultiSelect: typeof EvoMultiSelect;

declare function EvoTagsInput({ label, value, onChange, }: {
    label?: string;
    value?: string[];
    onChange?: (value: string[]) => void;
}): React.JSX.Element;
declare const TagsInput: typeof EvoTagsInput;

declare function EvoCheckbox({ label, id, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
    label?: string;
}): React.JSX.Element;
declare const Checkbox: typeof EvoCheckbox;

declare function EvoRadioGroup({ label, options, variant, error, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
    label?: string;
    options: {
        value: string;
        label: string;
        description?: string;
    }[];
    variant?: "inline" | "card";
    error?: string;
}): React.JSX.Element;
declare const RadioGroup: typeof EvoRadioGroup;
declare const Radio: React.ForwardRefExoticComponent<RadioGroupPrimitive.RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;

declare function EvoSwitch({ label, id, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root> & {
    label?: string;
}): React.JSX.Element;
declare const Switch: typeof EvoSwitch;

declare function EvoSlider({ label, ...props }: React.ComponentProps<typeof SliderPrimitive.Root> & {
    label?: string;
}): React.JSX.Element;
declare const Slider: typeof EvoSlider;

declare function EvoDatePicker({ label, value, onChange, }: {
    label?: string;
    value?: Date;
    onChange?: (date?: Date) => void;
}): React.JSX.Element;
declare const DatePicker: typeof EvoDatePicker;

declare function EvoDateRangePicker({ label, value, onChange, }: {
    label?: string;
    value?: DateRange;
    onChange?: (range?: DateRange) => void;
}): React.JSX.Element;
declare const DateRangePicker: typeof EvoDateRangePicker;

declare function EvoTimePicker({ label, defaultValue, value, onChange, }: {
    label?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}): React.JSX.Element;
declare const TimePicker: typeof EvoTimePicker;

declare function EvoNumberInput({ label, value, defaultValue, onChange, min, max, step, }: {
    label?: string;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
}): React.JSX.Element;
declare const NumberInput: typeof EvoNumberInput;

declare function EvoCurrencyInput({ label, currency, value, defaultValue, onChange, }: {
    label?: string;
    currency?: string;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}): React.JSX.Element;
declare const CurrencyInput: typeof EvoCurrencyInput;

declare function EvoPhoneInput({ label, defaultCountry, value, onChange, }: {
    label?: string;
    defaultCountry?: CountryCode;
    value?: string;
    onChange?: (value: string, valid: boolean) => void;
}): React.JSX.Element;
declare const PhoneInput: typeof EvoPhoneInput;

declare function EvoFileUpload({ label, onFiles, }: {
    label?: string;
    onFiles?: (files: File[]) => void;
}): React.JSX.Element;
declare const FileUpload: typeof EvoFileUpload;

declare function EvoForm({ children, onSubmit, form, }: {
    children: React.ReactNode;
    onSubmit?: (values: FieldValues) => void;
    form?: UseFormReturn<FieldValues>;
}): React.JSX.Element;
declare function EvoFormField({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
declare function EvoFormLabel(props: React.ComponentProps<"label">): React.JSX.Element;
declare function EvoFormMessage({ children }: {
    children?: React.ReactNode;
}): React.JSX.Element | null;
declare const Form: typeof EvoForm;

declare function EvoInputOtp({ length, value, onChange, }: {
    length?: number;
    value?: string;
    onChange?: (value: string) => void;
}): React.JSX.Element;
declare const InputOtp: typeof EvoInputOtp;
declare const EvoInputOTP: typeof EvoInputOtp;

declare function EvoRichText({ label, value, onChange, }: {
    label?: string;
    value?: string;
    onChange?: (markdown: string) => void;
}): React.JSX.Element;
declare const RichText: typeof EvoRichText;

declare function EvoMentionInput({ suggestions, onChange, }: {
    suggestions?: {
        id: string;
        label: string;
    }[];
    onChange?: (text: string) => void;
}): React.JSX.Element;
declare const MentionInput: typeof EvoMentionInput;

declare function EvoColorPicker({ label, value, onChange, }: {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
}): React.JSX.Element;
declare const ColorPicker: typeof EvoColorPicker;

declare function EvoRating({ label, value, onChange, max, }: {
    label?: string;
    value?: number;
    onChange?: (value: number) => void;
    max?: number;
}): React.JSX.Element;
declare const Rating: typeof EvoRating;

declare function EvoToggleGroup({ options, value, defaultValue, onValueChange, }: {
    options: {
        value: string;
        label: string;
    }[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}): React.JSX.Element;
declare const ToggleGroup: typeof EvoToggleGroup;

declare function EvoTooltip({ content, children, side, align, delayDuration, }: {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    delayDuration?: number;
}): React.JSX.Element;
declare const Tooltip: typeof EvoTooltip;

declare function EvoHoverCard({ title, description, children, }: {
    title: string;
    description?: string;
    children: React.ReactNode;
}): React.JSX.Element;
declare const HoverCard: typeof EvoHoverCard;

declare function EvoProgress({ value, label }: {
    value?: number;
    label?: string;
}): React.JSX.Element;
declare const Progress: typeof EvoProgress;

declare function EvoTimeline({ items }: {
    items: {
        title: string;
        at?: string;
        body?: string;
    }[];
}): React.JSX.Element;
declare const Timeline: typeof EvoTimeline;

type EvoTreeNode = {
    id: string;
    label: string;
    children?: EvoTreeNode[];
};
declare function EvoTreeView({ items }: {
    items: EvoTreeNode[];
}): React.JSX.Element;
declare const TreeView: typeof EvoTreeView;

declare function EvoStatus({ tone, children, className, }: {
    tone?: EvoTone;
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
declare const Status: typeof EvoStatus;

declare function EvoCopyButton({ value, label }: {
    value: string;
    label?: string;
}): React.JSX.Element;
declare const CopyButton: typeof EvoCopyButton;

declare function EvoRelativeTime({ date }: {
    date: string | Date;
}): React.JSX.Element;
declare const RelativeTime: typeof EvoRelativeTime;

declare function EvoDescriptionList({ items, }: {
    items: {
        term: string;
        description?: string;
        editable?: React.ReactNode;
    }[];
}): React.JSX.Element;
declare const DescriptionList: typeof EvoDescriptionList;

declare function EvoImage({ alt, src, caption }: {
    alt: string;
    src: string;
    caption?: string;
}): React.JSX.Element;
declare const Image: typeof EvoImage;

type EvoDataTableProps<TData> = {
    columns: ColumnDef<TData, unknown>[];
    data: TData[];
};
declare function EvoDataTable<TData>({ columns, data }: EvoDataTableProps<TData>): React.JSX.Element;
declare const DataTable: typeof EvoDataTable;

declare function EvoTable({ className, ...props }: React.ComponentProps<"table">): React.JSX.Element;
declare function EvoTableHeader(props: React.ComponentProps<"thead">): React.JSX.Element;
declare function EvoTableBody(props: React.ComponentProps<"tbody">): React.JSX.Element;
declare function EvoTableRow(props: React.ComponentProps<"tr">): React.JSX.Element;
declare function EvoTableHead(props: React.ComponentProps<"th">): React.JSX.Element;
declare function EvoTableCell(props: React.ComponentProps<"td">): React.JSX.Element;
declare const Table: typeof EvoTable;

declare function EvoDataTableFilters({ onChange, }: {
    onChange?: (query: string) => void;
}): React.JSX.Element;
declare const DataTableFilters: typeof EvoDataTableFilters;

type EvoColumnOption = {
    id: string;
    label: string;
    visible: boolean;
};
declare function EvoColumnVisibility({ columns, views, onChange, }: {
    columns: EvoColumnOption[];
    views?: {
        id: string;
        name: string;
    }[];
    onChange?: (columns: EvoColumnOption[]) => void;
}): React.JSX.Element;
declare const ColumnVisibility: typeof EvoColumnVisibility;

declare function EvoVirtualizedList({ items, height, itemHeight, }: {
    items: React.ReactNode[];
    height?: number;
    itemHeight?: number;
}): React.JSX.Element;
declare const VirtualizedList: typeof EvoVirtualizedList;

declare function EvoDataGrid({ columns, rows, onChange, }: {
    columns: {
        id: string;
        header: string;
    }[];
    rows: Array<Record<string, string>>;
    onChange?: (rows: Array<Record<string, string>>) => void;
}): React.JSX.Element;
declare const DataGrid: typeof EvoDataGrid;

declare function EvoInlineEdit({ defaultValue, onSave, }: {
    defaultValue?: string;
    onSave?: (value: string) => void;
}): React.JSX.Element;
declare const InlineEdit: typeof EvoInlineEdit;

declare function EvoAreaChart({ data, label }: {
    data: number[];
    label: string;
}): React.JSX.Element;
declare const AreaChart: typeof EvoAreaChart;

declare function EvoBarChart({ data, label }: {
    data: number[];
    label: string;
}): React.JSX.Element;
declare const BarChart: typeof EvoBarChart;

declare function EvoLineChart({ data, label }: {
    data: number[];
    label: string;
}): React.JSX.Element;
declare const LineChart: typeof EvoLineChart;

declare function EvoPieChart({ data, label }: {
    data: {
        label: string;
        value: number;
    }[];
    label: string;
}): React.JSX.Element;
declare const PieChart: typeof EvoPieChart;

declare function EvoFunnelChart({ data, label }: {
    data: {
        label: string;
        value: number;
    }[];
    label: string;
}): React.JSX.Element;
declare const FunnelChart: typeof EvoFunnelChart;

declare function EvoRadialChart({ value, label }: {
    value: number;
    label: string;
}): React.JSX.Element;
declare const RadialChart: typeof EvoRadialChart;

declare function EvoKpiCard({ label, value, delta, }: {
    label: string;
    value: string;
    delta?: string;
}): React.JSX.Element;
declare const KpiCard: typeof EvoKpiCard;
declare const StatCard: typeof EvoKpiCard;

declare function EvoSparkline({ data, label }: {
    data: number[];
    label: string;
}): React.JSX.Element;
declare const Sparkline: typeof EvoSparkline;

declare function EvoHeatmap({ values, label }: {
    values: number[];
    label: string;
}): React.JSX.Element;
declare const Heatmap: typeof EvoHeatmap;

declare function EvoAlert({ title, description, tone, }: {
    title: string;
    description?: string;
    tone?: EvoTone;
}): React.JSX.Element;
declare const Alert: typeof EvoAlert;

declare function EvoToaster(): React.JSX.Element;

declare const Toaster: typeof EvoToaster;

declare function EvoBanner({ title, action, }: {
    title: string;
    action?: React.ReactNode;
}): React.JSX.Element;
declare const Banner: typeof EvoBanner;

declare function EvoNotificationCenter({ items, }: {
    items: {
        id: string;
        title: string;
    }[];
}): React.JSX.Element;
declare const NotificationCenter: typeof EvoNotificationCenter;

declare function EvoErrorPage({ title, description, }: {
    title?: string;
    description?: string;
}): React.JSX.Element;
declare const ErrorPage: typeof EvoErrorPage;

declare function EvoDialog({ title, description, children, open, onOpenChange, trigger, }: {
    title: string;
    description?: string;
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    trigger?: React.ReactNode;
}): React.JSX.Element;
declare const Dialog: typeof EvoDialog;

declare function EvoAlertDialog({ title, description, open, onOpenChange, onConfirm, confirmLabel, trigger, }: {
    title: string;
    description?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onConfirm?: () => void;
    confirmLabel?: string;
    trigger?: React.ReactNode;
}): React.JSX.Element;
declare const AlertDialog: typeof EvoAlertDialog;

declare function EvoSheet({ title, children, open, onOpenChange, side, trigger, }: {
    title: string;
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: "left" | "right" | "bottom";
    trigger?: React.ReactNode;
}): React.JSX.Element;
declare const Sheet: typeof EvoSheet;
declare const Drawer: typeof EvoSheet;

declare function EvoPopover({ content, children, }: {
    content: React.ReactNode;
    children: React.ReactNode;
}): React.JSX.Element;
declare const Popover: typeof EvoPopover;

declare function EvoDropdownMenu({ items, children, }: {
    items: {
        label: string;
        shortcut?: string;
        onSelect?: () => void;
    }[];
    children: React.ReactNode;
}): React.JSX.Element;
declare const DropdownMenu: typeof EvoDropdownMenu;

declare function EvoContextMenu({ items, children, }: {
    items: {
        label: string;
        shortcut?: string;
        onSelect?: () => void;
    }[];
    children: React.ReactNode;
}): React.JSX.Element;
declare const ContextMenu: typeof EvoContextMenu;

declare function EvoKanban({ columns, onMove, }: {
    columns: {
        id: string;
        title: string;
        cards: {
            id: string;
            title: string;
        }[];
    }[];
    onMove?: (event: DragEndEvent) => void;
}): React.JSX.Element;
declare const Kanban: typeof EvoKanban;

declare function EvoSortableList({ items, onChange, }: {
    items: {
        id: string;
        label: string;
    }[];
    onChange?: (items: {
        id: string;
        label: string;
    }[]) => void;
}): React.JSX.Element;
declare const SortableList: typeof EvoSortableList;

type EvoDayPickerProps = DayPickerProps & {
    navLabel?: string;
};

declare function EvoCalendar(props: EvoDayPickerProps): React.JSX.Element;
declare const Calendar: typeof EvoCalendar;

declare function EvoEventCalendar({ events, }: {
    events?: {
        id: string;
        title: string;
        date: string;
    }[];
}): React.JSX.Element;
declare const EventCalendar: typeof EvoEventCalendar;

declare function EvoGantt({ items, zoom, }: {
    items: {
        id: string;
        title: string;
        start: string;
        end: string;
    }[];
    zoom?: "day" | "week" | "month";
}): React.JSX.Element;
declare const Gantt: typeof EvoGantt;

declare function EvoActivityFeed({ items, }: {
    items: {
        id: string;
        actor: string;
        action: string;
    }[];
}): React.JSX.Element;
declare const ActivityFeed: typeof EvoActivityFeed;

declare function EvoChat({ messages, }: {
    messages: {
        id: string;
        role: "user" | "assistant";
        content: string;
    }[];
}): React.JSX.Element;
declare const Chat: typeof EvoChat;

declare function EvoConversation({ threads, }: {
    threads: {
        id: string;
        title: string;
        preview: string;
    }[];
}): React.JSX.Element;
declare const Conversation: typeof EvoConversation;

declare function EvoPromptInput({ onSubmit, }: {
    onSubmit?: (value: string) => void;
}): React.JSX.Element;
declare const PromptInput: typeof EvoPromptInput;

declare function EvoEmailComposer({ templates, onSend, }: {
    templates?: string[];
    onSend?: (payload: {
        to: string[];
        subject: string;
        body: string;
    }) => void;
}): React.JSX.Element;
declare const EmailComposer: typeof EvoEmailComposer;

declare function EvoContactCard({ name, email, role, }: {
    name: string;
    email?: string;
    role?: string;
}): React.JSX.Element;
declare const ContactCard: typeof EvoContactCard;

declare function EvoWorkflowBuilder({ nodes, }: {
    nodes: {
        id: string;
        label: string;
    }[];
}): React.JSX.Element;
declare const WorkflowBuilder: typeof EvoWorkflowBuilder;

type EvoComment = {
    id: string;
    author: string;
    body: string;
    createdAt: string;
    replies?: EvoComment[];
};
declare function EvoComments({ comments }: {
    comments: EvoComment[];
}): React.JSX.Element;
declare const Comments: typeof EvoComments;

declare function EvoPricingTable({ plans, }: {
    plans: {
        id: string;
        name: string;
        price: string;
        features?: string[];
    }[];
}): React.JSX.Element;
declare const PricingTable: typeof EvoPricingTable;

declare function EvoInvoice({ number, customer, lines, }: {
    number: string;
    customer: string;
    lines: {
        label: string;
        amount: number;
    }[];
}): React.JSX.Element;
declare const Invoice: typeof EvoInvoice;

declare function EvoSignIn({ onSubmit }: {
    onSubmit?: (values: {
        email: string;
        password: string;
    }) => void;
}): React.JSX.Element;
declare const SignIn: typeof EvoSignIn;

declare function EvoSignUp({ onSubmit }: {
    onSubmit?: (values: {
        name: string;
        email: string;
    }) => void;
}): React.JSX.Element;
declare const SignUp: typeof EvoSignUp;

declare function EvoForgotPassword(): React.JSX.Element;
declare const ForgotPassword: typeof EvoForgotPassword;

declare function EvoTwoFactor({ secret, backupCodes, }: {
    secret: string;
    backupCodes?: string[];
}): React.JSX.Element;
declare const TwoFactor: typeof EvoTwoFactor;

declare function EvoAccountButton({ name, email }: {
    name: string;
    email?: string;
}): React.JSX.Element;
declare const AccountButton: typeof EvoAccountButton;

declare function EvoSettingsPage({ flags, }: {
    flags: {
        id: string;
        label: string;
        enabled: boolean;
    }[];
}): React.JSX.Element;
declare const SettingsPage: typeof EvoSettingsPage;

declare function EvoOrgSwitcher({ orgs, onCreate, }: {
    orgs: {
        id: string;
        name: string;
        role?: string;
    }[];
    onCreate?: () => void;
}): React.JSX.Element;
declare const OrgSwitcher: typeof EvoOrgSwitcher;

declare function EvoApiKeys({ keys, }: {
    keys: {
        id: string;
        name: string;
        hint: string;
    }[];
}): React.JSX.Element;
declare const ApiKeys: typeof EvoApiKeys;

declare function EvoEmptyState({ title, description, action, }: {
    title: string;
    description?: string;
    action?: React.ReactNode;
}): React.JSX.Element;
declare const EmptyState: typeof EvoEmptyState;
declare const Empty: typeof EvoEmptyState;

declare function EvoOnboarding({ steps, }: {
    steps: {
        title: string;
        done?: boolean;
    }[];
}): React.JSX.Element;
declare const Onboarding: typeof EvoOnboarding;

declare function EvoAnnouncement({ title }: {
    title: string;
}): React.JSX.Element;
declare const Announcement: typeof EvoAnnouncement;

declare function EvoFeatureTour({ steps, open, storageKey, }: {
    steps: {
        id: string;
        title: string;
        body: string;
    }[];
    open?: boolean;
    storageKey?: string;
}): React.JSX.Element | null;
declare const FeatureTour: typeof EvoFeatureTour;

export { Accordion, AccountButton, ActivityFeed, Alert, AlertDialog, Announcement, ApiKeys, AppShell, AreaChart, Avatar, AvatarGroup, Badge, Banner, BarChart, type BrandTheme, Breadcrumb, Button, Calendar, Card, Chat, Checkbox, Collapsible, ColorPicker, ColumnVisibility, Combobox, Command, Comments, ContactCard, ContextMenu, Conversation, CopyButton, CurrencyInput, DataGrid, DataTable, DataTableFilters, DatePicker, DateRangePicker, DescriptionList, Dialog, Drawer, DropdownMenu, EmailComposer, Empty, EmptyState, ErrorPage, EventCalendar, EvoAccordion, EvoAccordionContent, EvoAccordionItem, EvoAccordionTrigger, EvoAccountButton, EvoActivityFeed, EvoAlert, EvoAlertDialog, EvoAnnouncement, EvoApiKeys, EvoAppShell, EvoAreaChart, EvoAvatar, EvoAvatarFallback, EvoAvatarGroup, type EvoAvatarGroupPerson, type EvoAvatarGroupProps, EvoAvatarImage, type EvoAvatarProps, EvoBadge, type EvoBadgeProps, EvoBanner, EvoBarChart, EvoBreadcrumb, type EvoBreadcrumbItem, EvoButton, type EvoButtonProps, EvoCalendar, EvoCard, EvoCardContent, EvoCardDescription, EvoCardFooter, EvoCardHeader, EvoCardTitle, EvoChat, EvoCheckbox, EvoCollapsible, EvoColorPicker, type EvoColumnOption, EvoColumnVisibility, EvoCombobox, type EvoComboboxOption, EvoCommand, EvoCommandInput, EvoCommandItem, EvoCommandList, EvoCommandPalette, type EvoComment, EvoComments, type EvoCommonProps, EvoContactCard, EvoContextMenu, EvoConversation, EvoCopyButton, EvoCurrencyInput, EvoDataGrid, EvoDataTable, EvoDataTableFilters, type EvoDataTableProps, EvoDatePicker, EvoDateRangePicker, EvoDescriptionList, EvoDialog, EvoDropdownMenu, EvoEmailComposer, EvoEmptyState, EvoErrorPage, EvoEventCalendar, EvoFeatureTour, EvoFileUpload, EvoForgotPassword, EvoForm, EvoFormField, EvoFormLabel, EvoFormMessage, EvoFunnelChart, EvoGantt, EvoHeading, EvoHeatmap, EvoHoverCard, EvoIconButton, type EvoIconButtonProps, EvoImage, EvoInlineEdit, EvoInput, EvoInputOTP, EvoInputOtp, type EvoInputProps, EvoInvoice, EvoKanban, EvoKbd, EvoKpiCard, EvoLineChart, EvoMentionInput, EvoMenubar, EvoMultiSelect, EvoNavigationMenu, EvoNotificationCenter, EvoNumberInput, EvoOnboarding, EvoOrgSwitcher, EvoPageHeader, EvoPagination, EvoPhoneInput, EvoPieChart, EvoPopover, EvoPricingTable, EvoProgress, EvoPromptInput, EvoRadialChart, EvoRadioGroup, EvoRating, EvoRelativeTime, EvoResizable, EvoResizableHandle, EvoResizablePanel, EvoRichText, EvoScrollArea, EvoSelect, type EvoSelectOption, EvoSeparator, EvoSettingsPage, EvoSheet, EvoSidebar, type EvoSidebarItem, EvoSignIn, EvoSignUp, type EvoSize, EvoSkeleton, EvoSlider, EvoSortableList, EvoSparkline, EvoSpinner, EvoStatus, EvoStepper, EvoSwitch, EvoTable, EvoTableBody, EvoTableCell, EvoTableHead, EvoTableHeader, EvoTableRow, EvoTabs, EvoTabsContent, EvoTabsList, EvoTabsTrigger, EvoTagsInput, EvoText, EvoTextarea, EvoTimePicker, EvoTimeline, EvoToaster, EvoToggleGroup, type EvoTone, EvoTooltip, type EvoTreeNode, EvoTreeView, EvoTwoFactor, EvoTypography, type EvoVariant, EvoVirtualizedList, EvoWorkflowBuilder, FeatureTour, FileUpload, ForgotPassword, Form, FunnelChart, Gantt, Heatmap, HoverCard, IconButton, Image, InlineEdit, Input, InputOtp, Invoice, Kanban, Kbd, KpiCard, LineChart, MentionInput, Menubar, MultiSelect, NavigationMenu, NotificationCenter, NumberInput, Onboarding, OrgSwitcher, PageHeader, Pagination, PhoneInput, PieChart, Popover, PricingTable, Progress, PromptInput, RadialChart, Radio, RadioGroup, Rating, RelativeTime, Resizable, RichText, ScrollArea, Select, Separator, SettingsPage, Sheet, Sidebar, SignIn, SignUp, Skeleton, Slider, SortableList, Sparkline, Spinner, StatCard, Status, Stepper, Switch, Table, Tabs, TagsInput, Textarea, TimePicker, Timeline, Toaster, ToggleGroup, Tooltip, TreeView, TwoFactor, Typography, VirtualizedList, WorkflowBuilder, buttonVariants, cn, useIsMobile, useProduct, useTheme };
