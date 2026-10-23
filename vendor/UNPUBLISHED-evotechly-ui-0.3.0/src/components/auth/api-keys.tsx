import * as React from "react";
import { EvoTable, EvoTableBody, EvoTableCell, EvoTableHead, EvoTableHeader, EvoTableRow } from "../tables/table";
import { EvoButton } from "../foundations/button";

export function EvoApiKeys({
  keys,
}: {
  keys: { id: string; name: string; hint: string }[];
}) {
  return (
    <div data-evo="api-keys">
      <EvoTable>
        <EvoTableHeader>
          <EvoTableRow>
            <EvoTableHead>Name</EvoTableHead>
            <EvoTableHead>Key</EvoTableHead>
            <EvoTableHead>Actions</EvoTableHead>
          </EvoTableRow>
        </EvoTableHeader>
        <EvoTableBody>
          {keys.map((key) => (
            <EvoTableRow key={key.id}>
              <EvoTableCell>{key.name}</EvoTableCell>
              <EvoTableCell className="evo-mono">{key.hint}</EvoTableCell>
              <EvoTableCell>
                <EvoButton size="sm" variant="ghost">Revoke</EvoButton>
              </EvoTableCell>
            </EvoTableRow>
          ))}
        </EvoTableBody>
      </EvoTable>
    </div>
  );
}

export const ApiKeys = EvoApiKeys;
