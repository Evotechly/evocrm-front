import * as React from "react";

export function EvoPageHeader({
  title,
  description,
  actions,
  level = 1,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  level?: 1 | 2 | 3;
}) {
  const id = React.useId();
  const Heading = `h${level}` as "h1" | "h2" | "h3";
  return (
    <header data-evo="page-header" className="evo-page-header" aria-labelledby={id}>
      <div>
        <Heading id={id} className={`evo-heading evo-heading--${level}`}>
          <a href={`#${id}`} className="evo-anchor">{title}</a>
        </Heading>
        {description ? <p className="evo-card-description">{description}</p> : null}
      </div>
      {actions}
    </header>
  );
}

export const PageHeader = EvoPageHeader;
