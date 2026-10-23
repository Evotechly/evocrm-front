import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div data-evo="empty-state" role="status" className="evo-empty">
      <h2 className="evo-empty-title">{title}</h2>
      {description ? <p className="evo-empty-description">{description}</p> : null}
      {action ?? <EvoButton>Create</EvoButton>}
    </div>
  );
}

export const EmptyState = EvoEmptyState;
export const Empty = EvoEmptyState;
