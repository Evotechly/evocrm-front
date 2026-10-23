import { useId, type ChangeEvent, type ReactNode } from 'react';
import {
  EvoActivityFeed,
  EvoBadge,
  EvoButton,
  EvoCard,
  EvoCardContent,
  EvoCardHeader,
  EvoCardTitle,
  EvoCheckbox,
  EvoEmptyState,
  EvoInput,
  EvoStatus,
  EvoSwitch,
} from '@evotechly/ui';
import type { EvoTone } from '@evotechly/ui';

const statusTone: Record<string, EvoTone> = {
  Actif: 'success',
  Prospect: 'info',
  Inactif: 'neutral',
  Qualification: 'info',
  Proposition: 'brand',
  Négociation: 'warning',
  Gagné: 'success',
  Perdu: 'danger',
  Envoyé: 'warning',
  Accepté: 'success',
  Brouillon: 'neutral',
};

export function StatusBadge({ status }: { status: string }) {
  return <EvoStatus tone={statusTone[status] ?? 'neutral'}>{status}</EvoStatus>;
}

export function FieldSelect({
  label,
  value,
  defaultValue,
  onChange,
  children,
  required,
  disabled,
}: {
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  required?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="evo-field ev-field" data-evo="input">
      <label className="evo-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );
}

export function SearchField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <EvoInput
      label={label}
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return <EvoInput label={label} type="date" value={value} onChange={onChange} />;
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <p className="field-error" role="alert">
      {children}
    </p>
  );
}

export function Panel({
  title,
  action,
  children,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <EvoCard className="panel">
      {title ? (
        <EvoCardHeader className="panel-header">
          <EvoCardTitle>{title}</EvoCardTitle>
          {action}
        </EvoCardHeader>
      ) : null}
      <EvoCardContent>{children}</EvoCardContent>
    </EvoCard>
  );
}

export function WorkspaceHeader({
  title,
  description,
  count,
  actions,
}: {
  title: string;
  description?: string;
  count?: number;
  actions?: ReactNode;
}) {
  return (
    <header className="workspace-header evo-page-header" data-evo="page-header">
      <div>
        <h1>
          {title}
          {typeof count === 'number' ? <span className="ev-heading-count">{count}</span> : null}
        </h1>
        {description ? <p className="muted">{description}</p> : null}
      </div>
      {actions}
    </header>
  );
}

export function WorkspaceToolbar({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ev-toolbar" role="toolbar" aria-label={label}>
      {children}
    </div>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="ev-filter-bar">{children}</div>;
}

export function BulkActionBar({
  selectedCount,
  onClear,
}: {
  selectedCount: number;
  onClear: () => void;
}) {
  if (!selectedCount) return null;
  return (
    <div className="ev-selection-bar">
      <span>{selectedCount} sélectionné(s)</span>
      <EvoButton variant="ghost" onClick={onClear}>
        Désélectionner
      </EvoButton>
    </div>
  );
}

export function ObjectViews({
  value,
  onChange,
  options,
  caption,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count?: number }[];
  caption?: string;
}) {
  return (
    <div className="object-views ev-object-views" role="group" aria-label="Vues rapides">
      {options.map((option) => (
        <EvoButton
          key={option.value || option.label}
          variant="ghost"
          aria-pressed={value === option.value}
          className={value === option.value ? 'selected' : undefined}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.count != null ? <span>{option.count}</span> : null}
        </EvoButton>
      ))}
      {caption ? <span className="view-caption">{caption}</span> : null}
    </div>
  );
}

export function ViewSwitcher({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="ev-segmented" role="group" aria-label="Changer de vue">
      {options.map((option) => (
        <EvoButton
          key={option.value}
          variant="ghost"
          aria-pressed={value === option.value}
          className={value === option.value ? 'selected' : undefined}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </EvoButton>
      ))}
    </div>
  );
}

export function SortControl({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldSelect label="Trier par" value={value} onChange={(event) => onChange(event.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FieldSelect>
  );
}

export function RecordActivityTimeline({
  items,
  empty = 'Aucune activité fournie.',
}: {
  items: { title: string; detail?: string; time?: string }[];
  empty?: string;
}) {
  if (!items.length) return <p className="muted">{empty}</p>;
  return (
    <EvoActivityFeed
      items={items.map((item, index) => ({
        id: `${item.title}-${index}`,
        actor: item.title,
        action: [item.detail, item.time].filter(Boolean).join(' · '),
      }))}
    />
  );
}

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <EvoCard className="ev-auth-card">
      <EvoCardHeader>
        <EvoCardTitle>{title}</EvoCardTitle>
      </EvoCardHeader>
      <EvoCardContent>{children}</EvoCardContent>
    </EvoCard>
  );
}

export function TablePagination({
  page,
  total,
  pageSize,
  onChange,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return (
    <nav className="table-footer" aria-label="Pagination">
      <span>
        Page {page} / {pageCount}
      </span>
      <div className="inline">
        <EvoButton variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>
          Page précédente
        </EvoButton>
        <EvoButton
          variant="secondary"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
        >
          Page suivante
        </EvoButton>
      </div>
    </nav>
  );
}

export { EvoButton as Button, EvoInput as Input, EvoCheckbox as Checkbox, EvoSwitch as Switch, EvoEmptyState as EmptyState, EvoBadge as Badge };
