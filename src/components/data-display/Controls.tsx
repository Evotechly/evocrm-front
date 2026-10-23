import type { ReactNode } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/forms/Fields';
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
    <label className="search-field">
      <MagnifyingGlass size={18} aria-hidden="true" />
      <input
        type="search"
        aria-label={label}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
export function FilterBar({ children }: { children: ReactNode }) {
  return <div className="filter-bar">{children}</div>;
}
export function Pagination({
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
    <nav className="table-footer" aria-label="Pagination">
      <span>
        {total ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)}` : '0'} sur{' '}
        {total}
      </span>
      <div className="inline">
        <Button
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          aria-label="Page précédente"
        >
          ←
        </Button>
        <span>
          Page {page} / {pages}
        </span>
        <Button
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
          aria-label="Page suivante"
        >
          →
        </Button>
      </div>
    </nav>
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
    <Select label="Trier par" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
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
    <div className="segmented" aria-label="Affichage">
      {options.map((o) => (
        <button
          key={o.value}
          aria-pressed={o.value === value}
          className={o.value === value ? 'selected' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
export function ActivityTimeline({
  items,
}: {
  items: { title: string; detail: string; time: string }[];
}) {
  return (
    <ol className="activity-timeline">
      {items.map((item, i) => (
        <li key={i}>
          <span className="timeline-dot" />
          <div>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
            <small className="muted">{item.time}</small>
          </div>
        </li>
      ))}
    </ol>
  );
}
