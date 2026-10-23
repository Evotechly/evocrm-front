import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoErrorPage({
  title = "Page not found",
  description = "The record or route does not exist.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div data-evo="error-page" role="status" className="evo-empty">
      <h2 className="evo-empty-title">{title}</h2>
      <p className="evo-empty-description">{description}</p>
      <EvoButton>Back home</EvoButton>
    </div>
  );
}

export const ErrorPage = EvoErrorPage;
