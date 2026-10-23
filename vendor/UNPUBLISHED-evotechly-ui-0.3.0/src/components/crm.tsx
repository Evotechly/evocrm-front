import { MagnifyingGlass } from '@phosphor-icons/react';
import { useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Badge, type BadgeTone } from './badge';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { EmptyState } from './empty-state';
import { Input } from './input';
import { Popover } from './popover';
import { Select } from './select';
import { cn } from '../utils/cn';

export function DatePicker(props: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string; hint?: string }) {
  return <Input {...props} type="date" />;
}

export function StatusBadge({ status }: { status: string }) {
  const tone: BadgeTone = ['Actif', 'Accepté', 'Gagné'].includes(status)
    ? 'success'
    : ['Prospect', 'Proposition'].includes(status)
      ? 'warning'
      : ['Envoyé', 'Négociation'].includes(status)
        ? 'information'
        : status === 'Perdu'
          ? 'error'
          : 'neutral';
  return <Badge tone={tone}>{status}</Badge>;
}

export function SearchInput({
  value,
  onChange,
  label = 'Rechercher',
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <label className="ev-search">
      <MagnifyingGlass size={18} aria-hidden="true" />
      <input type="search" aria-label={label} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="ev-filter-bar">{children}</div>;
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
    <Select label="Trier par" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export function ViewSwitcher({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="ev-segmented" aria-label="Affichage">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          className={option.value === value ? 'selected' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function ObjectViews({
  value,
  onChange,
  options,
  caption = 'Vues rapides',
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count?: number }[];
  caption?: string;
}) {
  return (
    <div className="ev-object-views" role="group" aria-label="Vues rapides">
      <span className="ev-sr-only">{caption}</span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          className={option.value === value ? 'selected' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.count !== undefined && <span className="ev-count">{option.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function WorkspaceHeader({
  title,
  description,
  count,
  actions,
}: {
  title: string;
  description: string;
  count?: number;
  actions?: ReactNode;
}) {
  return (
    <div className="ev-page-heading">
      <div>
        <h1>
          {title}
          {count !== undefined && <span className="ev-heading-count">{count}</span>}
        </h1>
        <p className="ev-muted">{description}</p>
      </div>
      {actions && <div className="ev-page-heading-actions">{actions}</div>}
    </div>
  );
}

export function WorkspaceToolbar({
  children,
  label = 'Outils de l’espace de travail',
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="ev-toolbar" role="toolbar" aria-label={label}>
      {children}
    </div>
  );
}

export function BulkActionBar({
  selectedCount,
  onClear,
  children,
}: {
  selectedCount: number;
  onClear: () => void;
  children?: ReactNode;
}) {
  if (!selectedCount) return null;
  return (
    <div className="ev-selection-bar" role="status" aria-live="polite">
      <span>{selectedCount} sélectionné(s)</span>
      <div className="ev-inline">
        {children}
        <Button onClick={onClear}>Désélectionner</Button>
      </div>
    </div>
  );
}

export function ActivityTimeline({ items }: { items: { title: string; detail: string; time: string }[] }) {
  return (
    <ol className="ev-timeline">
      {items.map((item, index) => (
        <li key={`${item.title}-${index}`}>
          <span className="ev-timeline-dot" />
          <div>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
            <small className="ev-muted">{item.time}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function RecordActivityTimeline({
  items,
  empty = 'Aucune activité horodatée disponible.',
}: {
  items: { title: string; detail: string; time: string }[];
  empty?: string;
}) {
  return (
    <section className="ev-record-activity" aria-label="Historique d’activité">
      <h3>Historique d’activité</h3>
      {items.length ? <ActivityTimeline items={items} /> : <p className="ev-muted">{empty}</p>}
    </section>
  );
}

export function Card({
  children,
  title,
  action,
  className,
}: {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('ev-card', className)}>
      {title || action ? (
        <div className="ev-card-header">
          {title ? <h2>{title}</h2> : <span />}
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export const Panel = Card;

export function KpiCard({
  label,
  value,
  hint,
  monetary,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  monetary?: boolean;
}) {
  return (
    <article className="ev-kpi">
      <span>{label}</span>
      <strong className={monetary ? 'ev-money' : undefined}>{value}</strong>
      {hint && <small className="ev-muted">{hint}</small>}
    </article>
  );
}

export function BarChart({
  items,
}: {
  items: { label: string; value: number }[];
}) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return (
    <ul className="ev-bars" aria-label="Répartition">
      {items.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <span className="ev-bar-track">
            <span className="ev-bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
          </span>
          <strong>{item.value}</strong>
        </li>
      ))}
    </ul>
  );
}

export function StageRing({
  items,
  totalLabel,
}: {
  items: { label: string; value: number }[];
  totalLabel: string;
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  let offset = 0;
  return (
    <div className="ev-ring">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        {items.map((item, index) => {
          const length = (item.value / total) * 100;
          const dash = `${length} ${100 - length}`;
          const current = offset;
          offset += length;
          return (
            <circle
              key={item.label}
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              strokeWidth="3.2"
              strokeDasharray={dash}
              strokeDashoffset={25 - current}
              className={`ev-ring-seg ev-ring-seg-${index}`}
            />
          );
        })}
      </svg>
      <div>
        <strong>{totalLabel}</strong>
      </div>
    </div>
  );
}

export function TeamSwitcher({
  name,
  detail,
  options,
}: {
  name: string;
  detail: string;
  options?: { name: string; detail: string }[];
}) {
  return (
    <Popover
      label="Changer d’espace"
      align="start"
      trigger={
        <button type="button" className="ev-team-trigger" aria-haspopup="listbox" aria-label="Changer d’espace">
          <span className="ev-team-dot" />
          <span>
            <strong>{name}</strong>
            <small>{detail}</small>
          </span>
        </button>
      }
    >
      <ul className="ev-team-options">
        {(options ?? [{ name, detail }]).map((option) => (
          <li key={option.name}>
            <strong>{option.name}</strong>
            <small className="ev-muted">{option.detail}</small>
          </li>
        ))}
      </ul>
    </Popover>
  );
}

export function ProfileMenu({
  name,
  detail,
  initials,
  children,
}: {
  name: string;
  detail: string;
  initials: string;
  children?: ReactNode;
}) {
  return (
    <Popover
      label="Compte utilisateur"
      trigger={
        <button type="button" className="ev-profile-trigger profile-trigger" aria-label={`Compte de ${name}`}>
          <span className="ev-avatar" data-size="md">
            {initials}
          </span>
          <span>
            <strong>{name}</strong>
            <small>{detail}</small>
          </span>
        </button>
      }
    >
      <div className="menu-list">
        <strong>
          {name} · {detail}
        </strong>
        {children}
      </div>
    </Popover>
  );
}

export function NotificationCenter({
  trigger,
  empty = 'Aucune nouvelle notification dans cette démonstration.',
  children,
}: {
  trigger: ReactNode;
  empty?: string;
  children?: ReactNode;
}) {
  return (
    <Popover label="Notifications" trigger={trigger}>
      <div className="menu-list">
        <strong>Vous êtes à jour</strong>
        <p className="ev-muted">{empty}</p>
        {children}
      </div>
    </Popover>
  );
}

export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="ev-auth-card">
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export function Separator() {
  return <hr className="ev-separator" />;
}

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label className="ev-field-label" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export function NoResults({
  title = 'Aucun résultat',
  detail = 'Modifiez votre recherche ou vos filtres.',
  action,
}: {
  title?: string;
  detail?: string;
  action?: ReactNode;
}) {
  return <EmptyState title={title} description={detail} action={action} />;
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
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <nav className="ev-table-footer" aria-label="Pagination">
      <span>
        {total ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)}` : '0'} sur {total}
      </span>
      <div className="ev-inline">
        <Button variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Page précédente">
          ←
        </Button>
        <span>
          Page {page} / {pages}
        </span>
        <Button variant="secondary" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Page suivante">
          →
        </Button>
      </div>
    </nav>
  );
}

export interface DataColumn<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface RecordTableProps<T> {
  headers?: string[];
  children?: ReactNode;
  caption?: string;
  data?: T[];
  columns?: DataColumn<T>[];
  rowKey?: (row: T) => string;
  query?: string;
  matchesQuery?: (row: T, query: string) => boolean;
  filterRow?: (row: T) => boolean;
  visibleColumns?: string[];
  pageSize?: number;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}

export function RecordTable<T>({
  headers = [],
  children,
  caption = 'Données du workspace',
  data,
  columns = [],
  rowKey,
  query = '',
  matchesQuery,
  filterRow,
  visibleColumns,
  pageSize = 0,
  selectable = false,
  selectedIds,
  onSelectionChange,
  loading,
  error,
  onRetry,
}: RecordTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: 1 | -1 } | null>(null);
  const [page, setPage] = useState(1);
  const [localSelection, setLocalSelection] = useState<string[]>([]);
  const selection = selectedIds ?? localSelection;
  const setSelection = (ids: string[]) => {
    setLocalSelection(ids);
    onSelectionChange?.(ids);
  };
  if (loading)
    return (
      <div role="status" aria-busy="true" className="ev-state-surface">
        Chargement du tableau…
      </div>
    );
  if (error)
    return (
      <div role="alert" className="ev-state-surface">
        <p>{error}</p>
        {onRetry && <Button onClick={onRetry}>Réessayer</Button>}
      </div>
    );
  if (data === undefined)
    return (
      <div className="ev-table-wrap">
        <table>
          <caption className="ev-sr-only">{caption}</caption>
          <thead>
            <tr>
              {headers.map((header) => (
                <th scope="col" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  const shown = columns.filter((column) => !visibleColumns || visibleColumns.includes(column.key));
  const filtered = data.filter(
    (row) => (!filterRow || filterRow(row)) && (!query || !matchesQuery || matchesQuery(row, query)),
  );
  const sorting = columns.find((column) => column.key === sort?.key)?.sortValue;
  if (sorting && sort)
    filtered.sort((a, b) => {
      const av = sorting(a);
      const bv = sorting(b);
      return (
        (typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv), 'fr')) *
        sort.direction
      );
    });
  const size = pageSize || Math.max(1, filtered.length);
  const current = Math.min(page, Math.max(1, Math.ceil(filtered.length / size)));
  const rows = filtered.slice((current - 1) * size, current * size);
  const id = (row: T, index: number) => rowKey?.(row) ?? String(index);
  const ids = rows.map(id);
  return (
    <>
      {rows.length ? (
        <div className="ev-table-wrap">
          <table>
            <caption className="ev-sr-only">{caption}</caption>
            <thead>
              <tr>
                {selectable && (
                  <th scope="col">
                    <Checkbox
                      label="Sélectionner la page"
                      checked={ids.every((key) => selection.includes(key))}
                      onChange={() =>
                        setSelection(
                          ids.every((key) => selection.includes(key))
                            ? selection.filter((key) => !ids.includes(key))
                            : [...new Set([...selection, ...ids])],
                        )
                      }
                    />
                  </th>
                )}
                {shown.map((column) => (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      sort?.key === column.key ? (sort.direction === 1 ? 'ascending' : 'descending') : undefined
                    }
                  >
                    {column.sortValue ? (
                      <button
                        type="button"
                        className="ev-sort-header"
                        onClick={() =>
                          setSort((currentSort) => ({
                            key: column.key,
                            direction: currentSort?.key === column.key && currentSort.direction === 1 ? -1 : 1,
                          }))
                        }
                      >
                        {column.label}
                        <span aria-hidden="true">
                          {sort?.key === column.key ? (sort.direction === 1 ? ' ↑' : ' ↓') : ' ↕'}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={id(row, index)}>
                  {selectable && (
                    <td>
                      <Checkbox
                        label={`Sélectionner ${id(row, index)}`}
                        checked={selection.includes(id(row, index))}
                        onChange={() => {
                          const key = id(row, index);
                          setSelection(
                            selection.includes(key) ? selection.filter((value) => value !== key) : [...selection, key],
                          );
                        }}
                      />
                    </td>
                  )}
                  {shown.map((column) => (
                    <td key={column.key}>{column.render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoResults />
      )}
      {!!pageSize && <TablePagination page={current} total={filtered.length} pageSize={size} onChange={setPage} />}
    </>
  );
}

export const DataTable = RecordTable;
