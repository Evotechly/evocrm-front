import * as React from "react";
import { EvoCopyButton } from "./copy-button";

export function EvoDescriptionList({
  items,
}: {
  items: { term: string; description?: string; editable?: React.ReactNode }[];
}) {
  return (
    <dl data-evo="description-list" className="evo-dl">
      {items.map((item) => (
        <div key={item.term} className="evo-dl-row">
          <dt>{item.term}</dt>
          <dd>
            {item.editable ?? item.description ?? <span className="evo-card-description">—</span>}
            {item.description ? <EvoCopyButton value={item.description} label="Copy" /> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export const DescriptionList = EvoDescriptionList;
