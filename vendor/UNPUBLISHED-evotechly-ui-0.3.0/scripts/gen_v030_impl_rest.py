"""Data display, tables, charts, feedback, overlays, CRM, auth, empty."""

from gen_v030_impl import add

add(
    "tooltip",
    '''
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function EvoTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content data-evo="tooltip" side={side} align={align} className="evo-tooltip">
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export const Tooltip = EvoTooltip;
''',
)

add(
    "hover-card",
    '''
import * as React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

export function EvoHoverCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content data-evo="hover-card" className="evo-popover evo-card" style={{ minWidth: 220 }}>
          <strong>{title}</strong>
          {description ? <p className="evo-card-description">{description}</p> : null}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export const HoverCard = EvoHoverCard;
''',
)

add(
    "progress",
    '''
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

export function EvoProgress({ value = 0, label }: { value?: number; label?: string }) {
  return (
    <div data-evo="progress" className="evo-field">
      {label ? <div className="evo-label">{label} <span className="tabular-nums">{value}%</span></div> : null}
      <ProgressPrimitive.Root value={value} className="evo-progress">
        <ProgressPrimitive.Indicator className="evo-progress-indicator" style={{ transform: `translateX(-${100 - value}%)` }} />
      </ProgressPrimitive.Root>
    </div>
  );
}

export const Progress = EvoProgress;
''',
)

add(
    "timeline",
    '''
import * as React from "react";

export function EvoTimeline({ items }: { items: { title: string; at?: string; body?: string }[] }) {
  return (
    <ol data-evo="timeline" className="evo-timeline">
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>
          {item.at ? <time dateTime={item.at}>{item.at}</time> : null}
          {item.body ? <p className="evo-card-description">{item.body}</p> : null}
        </li>
      ))}
    </ol>
  );
}

export const Timeline = EvoTimeline;
''',
)

add(
    "tree-view",
    '''
import * as React from "react";

export type EvoTreeNode = { id: string; label: string; children?: EvoTreeNode[] };

function Node({ node }: { node: EvoTreeNode }) {
  if (!node.children?.length) {
    return <li role="treeitem">{node.label}</li>;
  }
  return (
    <li role="treeitem" aria-expanded="true">
      {node.label}
      <ul role="group">
        {node.children.map((child) => (
          <Node key={child.id} node={child} />
        ))}
      </ul>
    </li>
  );
}

export function EvoTreeView({ items }: { items: EvoTreeNode[] }) {
  return (
    <ul data-evo="tree-view" role="tree" className="evo-tree">
      {items.map((item) => (
        <Node key={item.id} node={item} />
      ))}
    </ul>
  );
}

export const TreeView = EvoTreeView;
''',
)

add(
    "status",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoTone } from "../../lib/types";

export function EvoStatus({
  tone = "neutral",
  children,
  className,
}: {
  tone?: EvoTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span data-evo="status" data-tone={tone} className={cn("evo-status", `evo-tone-${tone}`, className)}>
      <span className="evo-status-dot" aria-hidden />
      {children}
    </span>
  );
}

export const Status = EvoStatus;
''',
)

add(
    "copy-button",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoCopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <EvoButton
      data-evo="copy-button"
      variant="outline"
      size="sm"
      onClick={async () => {
        await navigator.clipboard?.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? "Copied" : label}
    </EvoButton>
  );
}

export const CopyButton = EvoCopyButton;
''',
)

add(
    "relative-time",
    '''
import * as React from "react";

function formatRelative(date: Date) {
  const delta = (date.getTime() - Date.now()) / 1000;
  const abs = Math.abs(delta);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (abs < 60) return rtf.format(Math.round(delta), "second");
  if (abs < 3600) return rtf.format(Math.round(delta / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(delta / 3600), "hour");
  return rtf.format(Math.round(delta / 86400), "day");
}

export function EvoRelativeTime({ date }: { date: string | Date }) {
  const parsed = typeof date === "string" ? new Date(date) : date;
  const [label, setLabel] = React.useState(() => formatRelative(parsed));
  React.useEffect(() => {
    const tick = () => setLabel(formatRelative(parsed));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [parsed]);
  return (
    <time data-evo="relative-time" dateTime={parsed.toISOString()} title={parsed.toLocaleString()}>
      {label}
    </time>
  );
}

export const RelativeTime = EvoRelativeTime;
''',
)

add(
    "description-list",
    '''
import * as React from "react";
import { EvoCopyButton } from "./copy-button";

export function EvoDescriptionList({
  items,
}: {
  items: { term: string; description?: string; editable?: React.ReactNode }[];
}) {
  return (
    <dl data-evo="description-list" className="evo-dl">
      {items.map((item) => (
        <div key={item.term} className="evo-dl-row">
          <dt>{item.term}</dt>
          <dd>
            {item.editable ?? item.description ?? <span className="evo-card-description">—</span>}
            {item.description ? <EvoCopyButton value={item.description} label="Copy" /> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export const DescriptionList = EvoDescriptionList;
''',
)

add(
    "image",
    '''
import * as React from "react";

export function EvoImage({ alt, src, caption }: { alt: string; src: string; caption?: string }) {
  return (
    <figure data-evo="image" className="evo-media">
      <img alt={alt} src={src} />
      {caption ? <figcaption className="evo-card-description">{caption}</figcaption> : null}
    </figure>
  );
}

export const Image = EvoImage;
''',
)

add(
    "data-table",
    '''
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { EvoTable, EvoTableBody, EvoTableCell, EvoTableHead, EvoTableHeader, EvoTableRow } from "./table";
import { EvoInput } from "../forms/input";

export type EvoDataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
};

export function EvoDataTable<TData>({ columns, data }: EvoDataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div data-evo="data-table">
      <EvoInput aria-label="Filter" value={globalFilter} onChange={(event) => setGlobalFilter(event.target.value)} />
      <EvoTable>
        <EvoTableHeader>
          {table.getHeaderGroups().map((group) => (
            <EvoTableRow key={group.id}>
              {group.headers.map((header) => (
                <EvoTableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </EvoTableHead>
              ))}
            </EvoTableRow>
          ))}
        </EvoTableHeader>
        <EvoTableBody>
          {table.getRowModel().rows.map((row) => (
            <EvoTableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <EvoTableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</EvoTableCell>
              ))}
            </EvoTableRow>
          ))}
        </EvoTableBody>
      </EvoTable>
    </div>
  );
}

export const DataTable = EvoDataTable;
''',
)

add(
    "table",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="evo-table-wrap">
      <table data-evo="table" className={cn("evo-table", className)} {...props} />
    </div>
  );
}
export function EvoTableHeader(props: React.ComponentProps<"thead">) {
  return <thead {...props} />;
}
export function EvoTableBody(props: React.ComponentProps<"tbody">) {
  return <tbody {...props} />;
}
export function EvoTableRow(props: React.ComponentProps<"tr">) {
  return <tr {...props} />;
}
export function EvoTableHead(props: React.ComponentProps<"th">) {
  return <th scope="col" {...props} />;
}
export function EvoTableCell(props: React.ComponentProps<"td">) {
  return <td {...props} />;
}

export const Table = EvoTable;
''',
)

add(
    "data-table-filters",
    '''
import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

export function EvoDataTableFilters({
  onChange,
}: {
  onChange?: (query: string) => void;
}) {
  return (
    <div data-evo="data-table-filters" className="evo-toolbar" role="search">
      <EvoInput aria-label="Filter rows" onChange={(event) => onChange?.(event.target.value)} />
      <EvoButton variant="ghost" size="sm">Clear</EvoButton>
    </div>
  );
}

export const DataTableFilters = EvoDataTableFilters;
''',
)

add(
    "column-visibility",
    '''
import * as React from "react";
import { EvoCheckbox } from "../forms/checkbox";
import { EvoButton } from "../foundations/button";

export type EvoColumnOption = { id: string; label: string; visible: boolean };

export function EvoColumnVisibility({
  columns,
  views = [],
  onChange,
}: {
  columns: EvoColumnOption[];
  views?: { id: string; name: string }[];
  onChange?: (columns: EvoColumnOption[]) => void;
}) {
  const [internal, setInternal] = React.useState(columns);
  return (
    <fieldset data-evo="column-visibility" className="evo-field">
      <legend className="evo-field-legend">Columns</legend>
      {internal.map((column, index) => (
        <EvoCheckbox
          key={column.id}
          label={column.label}
          checked={column.visible}
          onCheckedChange={(checked) => {
            const next = internal.map((item, itemIndex) =>
              itemIndex === index ? { ...item, visible: Boolean(checked) } : item,
            );
            setInternal(next);
            onChange?.(next);
          }}
        />
      ))}
      {views.length ? (
        <div className="evo-toolbar">
          {views.map((view) => (
            <EvoButton key={view.id} size="sm" variant="ghost">{view.name}</EvoButton>
          ))}
        </div>
      ) : null}
    </fieldset>
  );
}

export const ColumnVisibility = EvoColumnVisibility;
''',
)

add(
    "virtualized-list",
    '''
import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export function EvoVirtualizedList({
  items,
  height = 240,
  itemHeight = 36,
}: {
  items: React.ReactNode[];
  height?: number;
  itemHeight?: number;
}) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
  });
  return (
    <div data-evo="virtualized-list" ref={parentRef} className="evo-virtual" style={{ height }} role="list">
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((row) => (
          <div
            key={row.key}
            role="listitem"
            style={{ position: "absolute", top: 0, transform: `translateY(${row.start}px)`, height: row.size, width: "100%" }}
          >
            {items[row.index]}
          </div>
        ))}
      </div>
    </div>
  );
}

export const VirtualizedList = EvoVirtualizedList;
''',
)

add(
    "data-grid",
    '''
import * as React from "react";
import { EvoInlineEdit } from "./inline-edit";

export function EvoDataGrid({
  columns,
  rows,
  onChange,
}: {
  columns: { id: string; header: string }[];
  rows: Array<Record<string, string>>;
  onChange?: (rows: Array<Record<string, string>>) => void;
}) {
  return (
    <div data-evo="data-grid" role="grid" className="evo-table-wrap">
      <table className="evo-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col">{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex}>
              {columns.map((column) => (
                <td key={column.id} role="gridcell">
                  <EvoInlineEdit
                    defaultValue={row[column.id] ?? ""}
                    onSave={(value) => {
                      const next = rows.map((item, index) => (index === rowIndex ? { ...item, [column.id]: value } : item));
                      onChange?.(next);
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const DataGrid = EvoDataGrid;
''',
)

add(
    "inline-edit",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoInlineEdit({
  defaultValue = "",
  onSave,
}: {
  defaultValue?: string;
  onSave?: (value: string) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  if (!editing) {
    return (
      <button data-evo="inline-edit" type="button" className="evo-inline-edit" onClick={() => setEditing(true)}>
        {value || "Edit"}
      </button>
    );
  }
  return (
    <span data-evo="inline-edit" className="evo-toolbar">
      <input className="evo-input" value={value} onChange={(event) => setValue(event.target.value)} aria-label="Edit value" />
      <EvoButton size="sm" onClick={() => { onSave?.(value); setEditing(false); }}>Save</EvoButton>
    </span>
  );
}

export const InlineEdit = EvoInlineEdit;
''',
)


def chart_svg(kind: str, extra: str = "") -> str:
    return f'''
import * as React from "react";

export function Evo{kind}({{
  data = [],
  label,
  value,
}}: {{
  data?: number[] | {{ label: string; value: number }}[];
  label: string;
  value?: number;
}}) {{
  const points = Array.isArray(data) && typeof data[0] === "number"
    ? (data as number[])
    : (data as {{ label: string; value: number }}[]).map((item) => item.value);
  const max = Math.max(1, ...points, value ?? 0);
  return (
    <figure data-evo="{kind.lower().replace("chart", "-chart").replace("--", "-")}" className="evo-chart">
      <figcaption className="evo-label">{{label}}</figcaption>
      <svg role="img" aria-label={{label}} viewBox="0 0 160 64" width="160" height="64">
        {extra}
      </svg>
    </figure>
  );
}}

export const {kind} = Evo{kind};
'''


add(
    "area-chart",
    '''
import * as React from "react";

export function EvoAreaChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const path = data
    .map((value, index) => `${index === 0 ? "M" : "L"} ${(index / Math.max(1, data.length - 1)) * 160} ${64 - (value / max) * 56}`)
    .join(" ");
  return (
    <figure data-evo="area-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 64" width="160" height="64">
        <path d={`${path} L 160 64 L 0 64 Z`} fill="var(--brand-selection)" />
        <path d={path} fill="none" stroke="var(--brand-actionA11y)" strokeWidth="2" />
      </svg>
    </figure>
  );
}

export const AreaChart = EvoAreaChart;
''',
)

add(
    "bar-chart",
    '''
import * as React from "react";

export function EvoBarChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const width = 160 / data.length;
  return (
    <figure data-evo="bar-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 64" width="160" height="64">
        {data.map((value, index) => (
          <rect
            key={index}
            x={index * width + 2}
            y={64 - (value / max) * 56}
            width={Math.max(4, width - 4)}
            height={(value / max) * 56}
            fill="var(--brand-actionA11y)"
          />
        ))}
      </svg>
    </figure>
  );
}

export const BarChart = EvoBarChart;
''',
)

add(
    "line-chart",
    '''
import * as React from "react";

export function EvoLineChart({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const path = data
    .map((value, index) => `${index === 0 ? "M" : "L"} ${(index / Math.max(1, data.length - 1)) * 160} ${64 - (value / max) * 56}`)
    .join(" ");
  return (
    <figure data-evo="line-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 64" width="160" height="64">
        <path d={path} fill="none" stroke="var(--brand-actionA11y)" strokeWidth="2" />
      </svg>
    </figure>
  );
}

export const LineChart = EvoLineChart;
''',
)

add(
    "pie-chart",
    '''
import * as React from "react";

export function EvoPieChart({ data, label }: { data: { label: string; value: number }[]; label: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let angle = 0;
  return (
    <figure data-evo="pie-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 64 64" width="64" height="64">
        {data.map((item) => {
          const slice = (item.value / total) * Math.PI * 2;
          const start = angle;
          angle += slice;
          const x1 = 32 + Math.cos(start) * 28;
          const y1 = 32 + Math.sin(start) * 28;
          const x2 = 32 + Math.cos(angle) * 28;
          const y2 = 32 + Math.sin(angle) * 28;
          const large = slice > Math.PI ? 1 : 0;
          return (
            <path
              key={item.label}
              d={`M32 32 L ${x1} ${y1} A 28 28 0 ${large} 1 ${x2} ${y2} Z`}
              fill="var(--brand-actionA11y)"
              opacity={0.4 + (item.value / total) * 0.6}
            />
          );
        })}
      </svg>
    </figure>
  );
}

export const PieChart = EvoPieChart;
''',
)

add(
    "funnel-chart",
    '''
import * as React from "react";

export function EvoFunnelChart({ data, label }: { data: { label: string; value: number }[]; label: string }) {
  const max = Math.max(1, ...data.map((item) => item.value));
  return (
    <figure data-evo="funnel-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 160 80" width="160" height="80">
        {data.map((item, index) => {
          const width = (item.value / max) * 140;
          return (
            <g key={item.label}>
              <rect x={(160 - width) / 2} y={index * 22 + 4} width={width} height={18} fill="var(--brand-actionA11y)" opacity={1 - index * 0.15} />
              <text x="80" y={index * 22 + 17} textAnchor="middle" fill="var(--brand-actionFg)" fontSize="10">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export const FunnelChart = EvoFunnelChart;
''',
)

add(
    "radial-chart",
    '''
import * as React from "react";

export function EvoRadialChart({ value, label }: { value: number; label: string }) {
  const offset = 126 - (126 * value) / 100;
  return (
    <figure data-evo="radial-chart" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox="0 0 48 48" width="48" height="48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--surfaceSunken)" strokeWidth="6" />
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--brand-actionA11y)" strokeWidth="6" strokeDasharray="126" strokeDashoffset={offset} />
        <text x="24" y="28" textAnchor="middle" className="tabular-nums" fill="var(--text)" fontSize="10">{value}</text>
      </svg>
    </figure>
  );
}

export const RadialChart = EvoRadialChart;
''',
)

add(
    "kpi-card",
    '''
import * as React from "react";
import { EvoCard, EvoCardDescription, EvoCardTitle } from "../layout/card";

export function EvoKpiCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <EvoCard data-evo="kpi-card">
      <EvoCardDescription>{label}</EvoCardDescription>
      <EvoCardTitle className="evo-stat-value">{value}</EvoCardTitle>
      {delta ? <p className="tabular-nums">{delta}</p> : null}
    </EvoCard>
  );
}

export const KpiCard = EvoKpiCard;
export const StatCard = EvoKpiCard;
''',
)

add(
    "sparkline",
    '''
import * as React from "react";

export function EvoSparkline({ data, label }: { data: number[]; label: string }) {
  const max = Math.max(1, ...data);
  const path = data
    .map((value, index) => `${index === 0 ? "M" : "L"} ${(index / Math.max(1, data.length - 1)) * 80} ${24 - (value / max) * 20}`)
    .join(" ");
  return (
    <svg data-evo="sparkline" role="img" aria-label={label} viewBox="0 0 80 24" width="80" height="24">
      <path d={path} fill="none" stroke="var(--brand-actionA11y)" strokeWidth="2" />
    </svg>
  );
}

export const Sparkline = EvoSparkline;
''',
)

add(
    "heatmap",
    '''
import * as React from "react";

export function EvoHeatmap({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(1, ...values);
  return (
    <figure data-evo="heatmap" className="evo-chart">
      <figcaption className="evo-label">{label}</figcaption>
      <svg role="img" aria-label={label} viewBox={`0 0 ${values.length * 14} 14`} height="14">
        {values.map((value, index) => (
          <rect key={index} x={index * 14} y="0" width="12" height="12" rx="2" fill="var(--brand-actionA11y)" opacity={(value / max) || 0.15} />
        ))}
      </svg>
    </figure>
  );
}

export const Heatmap = EvoHeatmap;
''',
)
