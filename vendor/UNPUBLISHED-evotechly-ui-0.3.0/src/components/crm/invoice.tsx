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
