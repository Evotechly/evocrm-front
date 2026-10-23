import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

export function EvoDataTableFilters({
  onChange,
}: {
  onChange?: (query: string) => void;
}) {
  return (
    <div data-evo="data-table-filters" className="evo-toolbar" role="search">
      <EvoInput aria-label="Filter rows" onChange={(event) => onChange?.(event.target.value)} />
      <EvoButton variant="ghost" size="sm">Clear</EvoButton>
    </div>
  );
}

export const DataTableFilters = EvoDataTableFilters;
