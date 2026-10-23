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
    <div data-evo="data-grid" className="evo-table-wrap">
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
                <td key={column.id}>
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
