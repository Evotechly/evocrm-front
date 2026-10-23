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
