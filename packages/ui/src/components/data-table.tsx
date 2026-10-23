import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { EmptyState } from './empty-state';
import { Input } from './input';
import { Pagination } from './pagination';
import { Skeleton } from './skeleton';
import { cn } from '../utils/cn';

export function DataTable<T>({
  data,
  columns,
  loading,
  emptyTitle = 'No results',
  emptyDescription = 'Nothing matches the current filters.',
  pageSize = 8,
  className,
}: {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  pageSize?: number;
  className?: string;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const selectionColumn = useMemo<ColumnDef<T, unknown>>(
    () => ({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          label={<span className="ev-sr-only">Select all</span>}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          label={<span className="ev-sr-only">Select row</span>}
        />
      ),
    }),
    [],
  );

  const table = useReactTable({
    data,
    columns: [selectionColumn, ...columns],
    state: { sorting, globalFilter, rowSelection, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  if (loading) return <Skeleton variant="table" className={className} />;

  return (
    <div className={cn(className)}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <Input
          type="search"
          label="Filter table"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Search"
        />
        {table.getAllLeafColumns().map((column) =>
          column.id === 'select' ? null : (
            <Button
              key={column.id}
              size="sm"
              variant={column.getIsVisible() ? 'secondary' : 'ghost'}
              onClick={() => column.toggleVisibility()}
            >
              {column.id}
            </Button>
          ),
        )}
      </div>
      <div className="ev-table-wrap">
        <table className="ev-table">
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={
                      header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : header.column.getIsSorted() === 'desc'
                          ? 'descending'
                          : header.column.getCanSort()
                            ? 'none'
                            : undefined
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getAllLeafColumns().length}>
                  <EmptyState title={emptyTitle} description={emptyDescription} compact />
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} data-selected={row.getIsSelected() || undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={table.getState().pagination.pageIndex + 1}
        pageCount={table.getPageCount() || 1}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </div>
  );
}
