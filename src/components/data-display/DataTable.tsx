import { useState, type ReactNode } from 'react';
import { Checkbox } from '@/components/forms/Fields';
import { Pagination } from './Controls';
import { NoResults } from '@/components/ui/ScreenState';
import { Button } from '@/components/ui/Button';
export interface DataColumn<T> {
  key: string;
  label: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
}
export interface DataTableProps<T> {
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
/** Compatible static shell or typed interactive table. Search/filter inputs remain caller-controlled. */
export function DataTable<T>({
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
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; direction: 1 | -1 } | null>(null),
    [page, setPage] = useState(1),
    [localSelection, setLocalSelection] = useState<string[]>([]);
  const selection = selectedIds ?? localSelection;
  const setSelection = (ids: string[]) => {
    setLocalSelection(ids);
    onSelectionChange?.(ids);
  };
  if (loading)
    return (
      <div role="status" aria-busy="true" className="state-surface">
        Chargement du tableau…
      </div>
    );
  if (error)
    return (
      <div role="alert" className="state-surface">
        <p>{error}</p>
        {onRetry && <Button onClick={onRetry}>Réessayer</Button>}
      </div>
    );
  if (data === undefined)
    return (
      <div className="table-wrap">
        <table>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {headers.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  const shown = columns.filter((c) => !visibleColumns || visibleColumns.includes(c.key));
  const filtered = data.filter(
    (row) =>
      (!filterRow || filterRow(row)) && (!query || !matchesQuery || matchesQuery(row, query)),
  );
  const sorting = columns.find((c) => c.key === sort?.key)?.sortValue;
  if (sorting && sort)
    filtered.sort((a, b) => {
      const av = sorting(a),
        bv = sorting(b);
      return (
        (typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv), 'fr')) * sort.direction
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
        <div className="table-wrap">
          <table>
            <caption className="sr-only">{caption}</caption>
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
                {shown.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={
                      sort?.key === c.key
                        ? sort.direction === 1
                          ? 'ascending'
                          : 'descending'
                        : undefined
                    }
                  >
                    {c.sortValue ? (
                      <button
                        className="sort-header"
                        onClick={() =>
                          setSort((s) => ({
                            key: c.key,
                            direction: s?.key === c.key && s.direction === 1 ? -1 : 1,
                          }))
                        }
                      >
                        {c.label}
                        <span aria-hidden="true">
                          {sort?.key === c.key ? (sort.direction === 1 ? ' ↑' : ' ↓') : ' ↕'}
                        </span>
                      </button>
                    ) : (
                      c.label
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
                            selection.includes(key)
                              ? selection.filter((v) => v !== key)
                              : [...selection, key],
                          );
                        }}
                      />
                    </td>
                  )}
                  {shown.map((c) => (
                    <td key={c.key}>{c.render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoResults />
      )}
      {!!pageSize && (
        <Pagination page={current} total={filtered.length} pageSize={size} onChange={setPage} />
      )}
    </>
  );
}
