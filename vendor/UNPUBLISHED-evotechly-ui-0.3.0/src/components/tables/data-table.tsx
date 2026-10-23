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
