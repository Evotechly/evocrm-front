"""Feedback, overlays, CRM, auth, and empty-state implementations."""

from gen_v030_impl import add

add(
    "alert",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";
import type { EvoTone } from "../../lib/types";

export function EvoAlert({
  title,
  description,
  tone = "neutral",
}: {
  title: string;
  description?: string;
  tone?: EvoTone;
}) {
  return (
    <div data-evo="alert" role="alert" className={cn("evo-alert", tone === "danger" && "evo-alert--destructive")}>
      <div>
        <div className="evo-alert-title">{title}</div>
        {description ? <p className="evo-alert-description">{description}</p> : null}
      </div>
    </div>
  );
}

export const Alert = EvoAlert;
''',
)

add(
    "toast",
    '''
import { Toaster, toast } from "sonner";
import { useTheme } from "../../lib/use-theme";

export function EvoToaster() {
  const theme = useTheme();
  return <Toaster data-evo="toast" className="evo-toaster" theme={theme} />;
}

export { toast };
export const Toaster = EvoToaster;
''',
)

add(
    "banner",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoBanner({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div data-evo="banner" role="status" className="evo-banner">
      <p>{title}</p>
      {action ?? <EvoButton size="sm" variant="ghost">Dismiss</EvoButton>}
    </div>
  );
}

export const Banner = EvoBanner;
''',
)

add(
    "notification-center",
    '''
import * as React from "react";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export function EvoNotificationCenter({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  return (
    <EvoPopover
      content={
        <ul className="evo-timeline">
          {items.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      }
    >
      <EvoButton data-evo="notification-center" variant="ghost" aria-label={`Notifications (${items.length})`}>
        Bell · {items.length}
      </EvoButton>
    </EvoPopover>
  );
}

export const NotificationCenter = EvoNotificationCenter;
''',
)

add(
    "error-page",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoErrorPage({
  title = "Page not found",
  description = "The record or route does not exist.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div data-evo="error-page" role="status" className="evo-empty">
      <h1 className="evo-empty-title">{title}</h1>
      <p className="evo-empty-description">{description}</p>
      <EvoButton>Back home</EvoButton>
    </div>
  );
}

export const ErrorPage = EvoErrorPage;
''',
)

add(
    "dialog",
    '''
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { EvoButton } from "../foundations/button";

export function EvoDialog({
  title,
  description,
  children,
  open,
  onOpenChange,
  trigger,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="evo-overlay" />
        <DialogPrimitive.Content data-evo="dialog" className="evo-dialog" aria-modal="true">
          <DialogPrimitive.Title className="evo-dialog-title">{title}</DialogPrimitive.Title>
          {description ? <DialogPrimitive.Description className="evo-dialog-description">{description}</DialogPrimitive.Description> : null}
          {children}
          <DialogPrimitive.Close asChild>
            <EvoButton variant="ghost" size="icon" className="evo-dialog-close" aria-label="Close">×</EvoButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Dialog = EvoDialog;
''',
)

add(
    "alert-dialog",
    '''
import * as React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { EvoButton } from "../foundations/button";

export function EvoAlertDialog({
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
  confirmLabel = "Hold to confirm",
}: {
  title: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  confirmLabel?: string;
}) {
  const [holding, setHolding] = React.useState(false);
  React.useEffect(() => {
    if (!holding) return;
    const id = window.setTimeout(() => onConfirm?.(), 800);
    return () => window.clearTimeout(id);
  }, [holding, onConfirm]);
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="evo-overlay" />
        <AlertDialog.Content data-evo="alert-dialog" className="evo-dialog">
          <AlertDialog.Title className="evo-dialog-title">{title}</AlertDialog.Title>
          {description ? <AlertDialog.Description className="evo-dialog-description">{description}</AlertDialog.Description> : null}
          <div className="evo-card-footer">
            <AlertDialog.Cancel asChild>
              <EvoButton variant="ghost">Cancel</EvoButton>
            </AlertDialog.Cancel>
            <EvoButton
              variant="danger"
              onPointerDown={() => setHolding(true)}
              onPointerUp={() => setHolding(false)}
            >
              {confirmLabel}
            </EvoButton>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export const AlertDialog = EvoAlertDialog;
''',
)

add(
    "sheet",
    '''
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { EvoButton } from "../foundations/button";

export function EvoSheet({
  title,
  children,
  open,
  onOpenChange,
  side = "right",
}: {
  title: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right" | "bottom";
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="evo-overlay" />
        <DialogPrimitive.Content data-evo="sheet" className="evo-sheet" data-side={side} aria-modal="true">
          <DialogPrimitive.Title className="evo-sheet-title">{title}</DialogPrimitive.Title>
          {children}
          <DialogPrimitive.Close asChild>
            <EvoButton variant="ghost" aria-label="Close">Close</EvoButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const Sheet = EvoSheet;
export const Drawer = EvoSheet;
''',
)

add(
    "popover",
    '''
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export function EvoPopover({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content data-evo="popover" className="evo-popover" sideOffset={8}>
          {content}
          <PopoverPrimitive.Arrow width={10} height={6} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

export const Popover = EvoPopover;
''',
)

add(
    "dropdown-menu",
    '''
import * as React from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

export function EvoDropdownMenu({
  items,
  children,
}: {
  items: { label: string; shortcut?: string; onSelect?: () => void }[];
  children: React.ReactNode;
}) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>{children}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content data-evo="dropdown-menu" className="evo-dropdown">
          {items.map((item) => (
            <Dropdown.Item key={item.label} className="evo-menu-item" onSelect={item.onSelect}>
              {item.label}
              {item.shortcut ? <span className="evo-kbd">{item.shortcut}</span> : null}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}

export const DropdownMenu = EvoDropdownMenu;
''',
)

add(
    "context-menu",
    '''
import * as React from "react";
import * as Context from "@radix-ui/react-context-menu";

export function EvoContextMenu({
  items,
  children,
}: {
  items: { label: string; shortcut?: string; onSelect?: () => void }[];
  children: React.ReactNode;
}) {
  return (
    <Context.Root>
      <Context.Trigger asChild>{children}</Context.Trigger>
      <Context.Portal>
        <Context.Content data-evo="context-menu" className="evo-context">
          {items.map((item) => (
            <Context.Item key={item.label} className="evo-menu-item" onSelect={item.onSelect}>
              {item.label}
              {item.shortcut ? <kbd className="evo-kbd">{item.shortcut}</kbd> : null}
            </Context.Item>
          ))}
        </Context.Content>
      </Context.Portal>
    </Context.Root>
  );
}

export const ContextMenu = EvoContextMenu;
''',
)

add(
    "kanban",
    '''
import * as React from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ id, title }: { id: string; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="evo-card"
      {...attributes}
      {...listeners}
    >
      {title}
    </article>
  );
}

export function EvoKanban({
  columns,
  onMove,
}: {
  columns: { id: string; title: string; cards: { id: string; title: string }[] }[];
  onMove?: (event: DragEndEvent) => void;
}) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onMove}>
      <div data-evo="kanban" className="evo-kanban">
        {columns.map((column) => (
          <section key={column.id} className="evo-kanban-col" aria-label={column.title}>
            <h3 className="evo-label">{column.title}</h3>
            <SortableContext items={column.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
              {column.cards.map((card) => (
                <Card key={card.id} id={card.id} title={card.title} />
              ))}
            </SortableContext>
          </section>
        ))}
      </div>
    </DndContext>
  );
}

export const Kanban = EvoKanban;
''',
)

add(
    "sortable-list",
    '''
import * as React from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Row({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <li
      ref={setNodeRef}
      className="evo-task-row"
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {label}
    </li>
  );
}

export function EvoSortableList({
  items,
  onChange,
}: {
  items: { id: string; label: string }[];
  onChange?: (items: { id: string; label: string }[]) => void;
}) {
  const [rows, setRows] = React.useState(items);
  const handle = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = rows.findIndex((row) => row.id === active.id);
    const newIndex = rows.findIndex((row) => row.id === over.id);
    const next = arrayMove(rows, oldIndex, newIndex);
    setRows(next);
    onChange?.(next);
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handle}>
      <SortableContext items={rows.map((row) => row.id)} strategy={verticalListSortingStrategy}>
        <ol data-evo="sortable-list" className="evo-timeline">
          {rows.map((row) => (
            <Row key={row.id} id={row.id} label={row.label} />
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  );
}

export const SortableList = EvoSortableList;
''',
)

add(
    "calendar",
    '''
import * as React from "react";
import { DayPicker } from "react-day-picker";

export function EvoCalendar(props: React.ComponentProps<typeof DayPicker>) {
  return <DayPicker data-evo="calendar" className="evo-calendar" {...props} />;
}

export const Calendar = EvoCalendar;
''',
)

add(
    "event-calendar",
    '''
import * as React from "react";
import { DayPicker } from "react-day-picker";

export function EvoEventCalendar({
  events = [],
}: {
  events?: { id: string; title: string; date: string }[];
}) {
  const modifiers = Object.fromEntries(events.map((event) => [event.id, new Date(event.date)]));
  return (
    <div data-evo="event-calendar">
      <DayPicker className="evo-calendar" modifiers={modifiers} />
      <ul className="evo-timeline">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> <time dateTime={event.date}>{event.date}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const EventCalendar = EvoEventCalendar;
''',
)

add(
    "gantt",
    '''
import * as React from "react";
import { differenceInDays, parseISO } from "date-fns";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

export function EvoGantt({
  items,
  zoom = "week",
}: {
  items: { id: string; title: string; start: string; end: string }[];
  zoom?: "day" | "week" | "month";
}) {
  const start = items.length ? parseISO(items[0].start) : new Date();
  return (
    <DndContext onDragEnd={(_event: DragEndEvent) => undefined}>
      <div data-evo="gantt" className="evo-gantt" data-zoom={zoom}>
        {items.map((item) => {
          const offset = Math.max(0, differenceInDays(parseISO(item.start), start) * (zoom === "day" ? 24 : 8));
          const width = Math.max(24, differenceInDays(parseISO(item.end), parseISO(item.start)) * (zoom === "day" ? 24 : 8));
          return (
            <div key={item.id} className="evo-gantt-row">
              <span>{item.title}</span>
              <div className="evo-gantt-bar" style={{ marginInlineStart: offset, width }}>{item.title}</div>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
}

export const Gantt = EvoGantt;
''',
)

add(
    "activity-feed",
    '''
import * as React from "react";

export function EvoActivityFeed({
  items,
}: {
  items: { id: string; actor: string; action: string }[];
}) {
  return (
    <ol data-evo="activity-feed" className="evo-timeline">
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.actor}</strong> {item.action}
        </li>
      ))}
    </ol>
  );
}

export const ActivityFeed = EvoActivityFeed;
''',
)

add(
    "chat",
    '''
import * as React from "react";

export function EvoChat({
  messages,
}: {
  messages: { id: string; role: "user" | "assistant"; content: string }[];
}) {
  return (
    <div data-evo="chat" role="log" className="evo-chat">
      {messages.map((message) => (
        <article key={message.id} data-role={message.role} className="evo-chat-bubble">
          {message.content}
        </article>
      ))}
    </div>
  );
}

export const Chat = EvoChat;
''',
)

add(
    "conversation",
    '''
import * as React from "react";

export function EvoConversation({
  threads,
}: {
  threads: { id: string; title: string; preview: string }[];
}) {
  return (
    <ul data-evo="conversation" className="evo-conversation">
      {threads.map((thread) => (
        <li key={thread.id}>
          <strong>{thread.title}</strong>
          <p className="evo-card-description">{thread.preview}</p>
        </li>
      ))}
    </ul>
  );
}

export const Conversation = EvoConversation;
''',
)

add(
    "prompt-input",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoPromptInput({
  onSubmit,
}: {
  onSubmit?: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");
  return (
    <form
      data-evo="prompt-input"
      className="evo-prompt"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
    >
      <textarea className="evo-textarea" aria-label="Prompt" value={value} onChange={(event) => setValue(event.target.value)} />
      <EvoButton type="submit">Send</EvoButton>
    </form>
  );
}

export const PromptInput = EvoPromptInput;
''',
)

add(
    "email-composer",
    '''
import * as React from "react";
import { EvoTagsInput } from "../forms/tags-input";
import { EvoInput } from "../forms/input";
import { EvoRichText } from "../forms/rich-text";
import { EvoFileUpload } from "../forms/file-upload";
import { EvoButton } from "../foundations/button";

export function EvoEmailComposer({
  templates = ["Follow up", "Intro"],
  onSend,
}: {
  templates?: string[];
  onSend?: (payload: { to: string[]; subject: string; body: string }) => void;
}) {
  const [to, setTo] = React.useState<string[]>([]);
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  return (
    <form
      data-evo="email-composer"
      className="evo-card"
      onSubmit={(event) => {
        event.preventDefault();
        onSend?.({ to, subject, body });
      }}
    >
      <EvoTagsInput label="To" value={to} onChange={setTo} />
      <EvoTagsInput label="Cc" />
      <EvoInput label="Subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
      <label className="evo-label">
        Template
        <select className="evo-input" onChange={(event) => setSubject(event.target.value)}>
          {templates.map((template) => (
            <option key={template}>{template}</option>
          ))}
        </select>
      </label>
      <EvoRichText label="Body" onChange={setBody} />
      <EvoFileUpload label="Attachments" />
      <div className="evo-card-footer">
        <EvoButton type="submit">Send</EvoButton>
        <EvoButton type="button" variant="secondary">Schedule</EvoButton>
      </div>
    </form>
  );
}

export const EmailComposer = EvoEmailComposer;
''',
)

add(
    "contact-card",
    '''
import * as React from "react";
import { EvoCard, EvoCardDescription, EvoCardFooter, EvoCardTitle } from "../layout/card";
import { EvoAvatar } from "../foundations/avatar";
import { EvoButton } from "../foundations/button";

export function EvoContactCard({
  name,
  email,
  role,
}: {
  name: string;
  email?: string;
  role?: string;
}) {
  return (
    <EvoCard data-evo="contact-card">
      <EvoAvatar fallback={name.slice(0, 2)} alt={name} />
      <EvoCardTitle>{name}</EvoCardTitle>
      <EvoCardDescription>{email}{role ? ` · ${role}` : ""}</EvoCardDescription>
      <EvoCardFooter>
        <EvoButton size="sm">Message</EvoButton>
      </EvoCardFooter>
    </EvoCard>
  );
}

export const ContactCard = EvoContactCard;
''',
)

add(
    "workflow-builder",
    '''
import * as React from "react";

export function EvoWorkflowBuilder({
  nodes,
}: {
  nodes: { id: string; label: string }[];
}) {
  return (
    <ol data-evo="workflow-builder" className="evo-workflow">
      {nodes.map((node, index) => (
        <li key={node.id}>
          <span className="evo-step-index">{index + 1}</span>
          {node.label}
        </li>
      ))}
    </ol>
  );
}

export const WorkflowBuilder = EvoWorkflowBuilder;
''',
)

add(
    "comments",
    '''
import * as React from "react";
import { EvoRelativeTime } from "../data-display/relative-time";
import { EvoButton } from "../foundations/button";

export type EvoComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  replies?: EvoComment[];
};

function Thread({ comment, onDelete }: { comment: EvoComment; onDelete?: (id: string) => void }) {
  const [editing, setEditing] = React.useState(false);
  return (
    <li>
      <strong>{comment.author}</strong> <EvoRelativeTime date={comment.createdAt} />
      {editing ? <textarea className="evo-textarea" defaultValue={comment.body} /> : <p>{comment.body}</p>}
      <div className="evo-toolbar">
        <EvoButton size="sm" variant="ghost" onClick={() => setEditing((value) => !value)}>Edit</EvoButton>
        <EvoButton size="sm" variant="ghost" onClick={() => onDelete?.(comment.id)}>Delete</EvoButton>
        <EvoButton size="sm" variant="ghost" aria-label="React">👍</EvoButton>
      </div>
      {comment.replies?.length ? (
        <ul>
          {comment.replies.map((reply) => (
            <Thread key={reply.id} comment={reply} onDelete={onDelete} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function EvoComments({ comments }: { comments: EvoComment[] }) {
  return (
    <ul data-evo="comments" className="evo-comments">
      {comments.map((comment) => (
        <Thread key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export const Comments = EvoComments;
''',
)

add(
    "pricing-table",
    '''
import * as React from "react";
import { EvoCard, EvoCardTitle } from "../layout/card";
import { EvoButton } from "../foundations/button";

export function EvoPricingTable({
  plans,
}: {
  plans: { id: string; name: string; price: string; features?: string[] }[];
}) {
  return (
    <div data-evo="pricing-table" className="evo-pricing">
      {plans.map((plan) => (
        <EvoCard key={plan.id}>
          <EvoCardTitle>{plan.name}</EvoCardTitle>
          <p className="evo-stat-value">{plan.price}</p>
          <ul>
            {(plan.features ?? []).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <EvoButton>Choose {plan.name}</EvoButton>
        </EvoCard>
      ))}
    </div>
  );
}

export const PricingTable = EvoPricingTable;
''',
)

add(
    "invoice",
    '''
import * as React from "react";
import { EvoTable, EvoTableBody, EvoTableCell, EvoTableHead, EvoTableHeader, EvoTableRow } from "../tables/table";

export function EvoInvoice({
  number,
  customer,
  lines,
}: {
  number: string;
  customer: string;
  lines: { label: string; amount: number }[];
}) {
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return (
    <article data-evo="invoice" className="evo-card">
      <h2>Invoice {number}</h2>
      <p>{customer}</p>
      <EvoTable>
        <EvoTableHeader>
          <EvoTableRow>
            <EvoTableHead>Item</EvoTableHead>
            <EvoTableHead>Amount</EvoTableHead>
          </EvoTableRow>
        </EvoTableHeader>
        <EvoTableBody>
          {lines.map((line) => (
            <EvoTableRow key={line.label}>
              <EvoTableCell>{line.label}</EvoTableCell>
              <EvoTableCell className="tabular-nums">{line.amount}</EvoTableCell>
            </EvoTableRow>
          ))}
        </EvoTableBody>
      </EvoTable>
      <p className="evo-stat-value tabular-nums">{total} DZD</p>
    </article>
  );
}

export const Invoice = EvoInvoice;
''',
)

add(
    "sign-in",
    '''
import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

export function EvoSignIn({ onSubmit }: { onSubmit?: (values: { email: string; password: string }) => void }) {
  return (
    <form
      data-evo="sign-in"
      className="evo-card"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({ email: String(data.get("email")), password: String(data.get("password")) });
      }}
    >
      <h1>Sign in</h1>
      <EvoInput name="email" type="email" label="Email" required />
      <EvoInput name="password" type="password" label="Password" required />
      <EvoButton type="submit">Continue</EvoButton>
    </form>
  );
}

export const SignIn = EvoSignIn;
''',
)

add(
    "sign-up",
    '''
import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

export function EvoSignUp({ onSubmit }: { onSubmit?: (values: { name: string; email: string }) => void }) {
  return (
    <form
      data-evo="sign-up"
      className="evo-card"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({ name: String(data.get("name")), email: String(data.get("email")) });
      }}
    >
      <h1>Create account</h1>
      <EvoInput name="name" label="Name" required />
      <EvoInput name="email" type="email" label="Email" required />
      <EvoInput name="password" type="password" label="Password" required />
      <EvoButton type="submit">Create account</EvoButton>
    </form>
  );
}

export const SignUp = EvoSignUp;
''',
)

add(
    "forgot-password",
    '''
import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

function scorePassword(value: string) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

export function EvoForgotPassword() {
  const [password, setPassword] = React.useState("");
  const score = scorePassword(password);
  return (
    <form data-evo="forgot-password" className="evo-card">
      <h1>Reset password</h1>
      <EvoInput type="email" label="Email" required />
      <EvoInput type="password" label="New password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <p className="evo-label">Strength {score}/4</p>
      <EvoButton type="submit">Reset</EvoButton>
    </form>
  );
}

export const ForgotPassword = EvoForgotPassword;
''',
)

add(
    "two-factor",
    '''
import * as React from "react";
import { EvoInputOtp } from "../forms/input-otp";
import { EvoCopyButton } from "../data-display/copy-button";
import { EvoButton } from "../foundations/button";

export function EvoTwoFactor({
  secret,
  backupCodes = ["A1B2-C3D4", "E5F6-G7H8"],
}: {
  secret: string;
  backupCodes?: string[];
}) {
  const otpauth = `otpauth://totp/EvoCRM?secret=${secret}&issuer=Evotechly`;
  return (
    <form data-evo="two-factor" className="evo-card">
      <h1>Two-factor authentication</h1>
      <p className="evo-card-description">Scan this otpauth URL or enter the secret.</p>
      <code className="evo-mono">{otpauth}</code>
      <EvoCopyButton value={secret} label="Copy secret" />
      <EvoInputOtp />
      <ul>
        {backupCodes.map((code) => (
          <li key={code} className="evo-mono">{code}</li>
        ))}
      </ul>
      <EvoButton type="submit">Verify</EvoButton>
    </form>
  );
}

export const TwoFactor = EvoTwoFactor;
''',
)

add(
    "account-button",
    '''
import * as React from "react";
import { EvoDropdownMenu } from "../overlays/dropdown-menu";
import { EvoAvatar } from "../foundations/avatar";
import { EvoButton } from "../foundations/button";

export function EvoAccountButton({ name, email }: { name: string; email?: string }) {
  return (
    <EvoDropdownMenu items={[{ label: "Profile" }, { label: "Sign out" }]}>
      <EvoButton data-evo="account-button" variant="ghost" aria-label={name}>
        <EvoAvatar fallback={name.slice(0, 2)} alt={name} size="sm" />
        {name}
        {email ? <span className="evo-card-description">{email}</span> : null}
      </EvoButton>
    </EvoDropdownMenu>
  );
}

export const AccountButton = EvoAccountButton;
''',
)

add(
    "settings-page",
    '''
import * as React from "react";
import { EvoSwitch } from "../forms/switch";

export function EvoSettingsPage({
  flags,
}: {
  flags: { id: string; label: string; enabled: boolean }[];
}) {
  return (
    <form data-evo="settings-page" className="evo-card">
      <h1>Settings</h1>
      {flags.map((flag) => (
        <EvoSwitch key={flag.id} label={flag.label} defaultChecked={flag.enabled} />
      ))}
    </form>
  );
}

export const SettingsPage = EvoSettingsPage;
''',
)

add(
    "org-switcher",
    '''
import * as React from "react";
import { EvoDropdownMenu } from "../overlays/dropdown-menu";
import { EvoButton } from "../foundations/button";
import { EvoAvatar } from "../foundations/avatar";

export function EvoOrgSwitcher({
  orgs,
  onCreate,
}: {
  orgs: { id: string; name: string; role?: string }[];
  onCreate?: () => void;
}) {
  return (
    <EvoDropdownMenu
      items={[
        ...orgs.map((org) => ({ label: `${org.name} · ${org.role ?? "Member"}` })),
        { label: "Create workspace", onSelect: onCreate },
      ]}
    >
      <EvoButton data-evo="org-switcher" variant="ghost" aria-label="Switch workspace">
        <EvoAvatar fallback={orgs[0]?.name.slice(0, 2)} alt={orgs[0]?.name ?? "Org"} size="sm" />
        {orgs[0]?.name ?? "Workspace"}
      </EvoButton>
    </EvoDropdownMenu>
  );
}

export const OrgSwitcher = EvoOrgSwitcher;
''',
)

add(
    "api-keys",
    '''
import * as React from "react";
import { EvoTable, EvoTableBody, EvoTableCell, EvoTableHead, EvoTableHeader, EvoTableRow } from "../tables/table";
import { EvoButton } from "../foundations/button";

export function EvoApiKeys({
  keys,
}: {
  keys: { id: string; name: string; hint: string }[];
}) {
  return (
    <div data-evo="api-keys">
      <EvoTable>
        <EvoTableHeader>
          <EvoTableRow>
            <EvoTableHead>Name</EvoTableHead>
            <EvoTableHead>Key</EvoTableHead>
            <EvoTableHead>Actions</EvoTableHead>
          </EvoTableRow>
        </EvoTableHeader>
        <EvoTableBody>
          {keys.map((key) => (
            <EvoTableRow key={key.id}>
              <EvoTableCell>{key.name}</EvoTableCell>
              <EvoTableCell className="evo-mono">{key.hint}</EvoTableCell>
              <EvoTableCell>
                <EvoButton size="sm" variant="ghost">Revoke</EvoButton>
              </EvoTableCell>
            </EvoTableRow>
          ))}
        </EvoTableBody>
      </EvoTable>
    </div>
  );
}

export const ApiKeys = EvoApiKeys;
''',
)

add(
    "empty-state",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div data-evo="empty-state" role="status" className="evo-empty">
      <h2 className="evo-empty-title">{title}</h2>
      {description ? <p className="evo-empty-description">{description}</p> : null}
      {action ?? <EvoButton>Create</EvoButton>}
    </div>
  );
}

export const EmptyState = EvoEmptyState;
export const Empty = EvoEmptyState;
''',
)

add(
    "onboarding",
    '''
import * as React from "react";
import { EvoCheckbox } from "../forms/checkbox";

export function EvoOnboarding({
  steps,
}: {
  steps: { title: string; done?: boolean }[];
}) {
  return (
    <ol data-evo="onboarding" className="evo-onboarding">
      {steps.map((step) => (
        <li key={step.title}>
          <EvoCheckbox label={step.title} defaultChecked={step.done} />
        </li>
      ))}
    </ol>
  );
}

export const Onboarding = EvoOnboarding;
''',
)

add(
    "announcement",
    '''
import * as React from "react";
import { EvoBanner } from "../feedback/banner";

export function EvoAnnouncement({ title }: { title: string }) {
  return <div data-evo="announcement"><EvoBanner title={title} /></div>;
}

export const Announcement = EvoAnnouncement;
''',
)

add(
    "feature-tour",
    '''
import * as React from "react";
import { EvoDialog } from "../overlays/dialog";
import { EvoButton } from "../foundations/button";

export function EvoFeatureTour({
  steps,
  open,
  storageKey = "evo-feature-tour",
}: {
  steps: { id: string; title: string; body: string }[];
  open?: boolean;
  storageKey?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(open ?? !window.localStorage?.getItem(storageKey));
  const step = steps[index];
  const finish = () => {
    window.localStorage?.setItem(storageKey, "1");
    setVisible(false);
  };
  if (!step) return null;
  return (
    <EvoDialog data-evo="feature-tour" open={visible} onOpenChange={setVisible} title={step.title} description={step.body}>
      <p className="tabular-nums">{index + 1} / {steps.length}</p>
      <div className="evo-card-footer">
        <EvoButton variant="ghost" onClick={finish}>Skip</EvoButton>
        <EvoButton
          onClick={() => {
            if (index >= steps.length - 1) finish();
            else setIndex((value) => value + 1);
          }}
        >
          Next
        </EvoButton>
      </div>
    </EvoDialog>
  );
}

export const FeatureTour = EvoFeatureTour;
''',
)
