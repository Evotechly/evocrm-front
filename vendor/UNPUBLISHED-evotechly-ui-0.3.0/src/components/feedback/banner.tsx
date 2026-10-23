import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoBanner({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div data-evo="banner" role="status" className="evo-banner">
      <p>{title}</p>
      {action ?? <EvoButton size="sm" variant="ghost">Dismiss</EvoButton>}
    </div>
  );
}

export const Banner = EvoBanner;
