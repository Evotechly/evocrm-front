import * as React from "react";

export type EvoBreadcrumbItem = { label: string; href?: string };

export function EvoBreadcrumb({
  items,
  max = 4,
}: {
  items: EvoBreadcrumbItem[];
  max?: number;
}) {
  const overflow = items.length > max;
  const head = overflow ? items[0] : null;
  const tail = overflow ? items.slice(-(max - 1)) : items;
  return (
    <nav data-evo="breadcrumb" className="evo-breadcrumb" aria-label="breadcrumb">
      <ol className="evo-breadcrumb-list">
        {head ? (
          <li className="evo-breadcrumb-item">
            <a className="evo-breadcrumb-link" href={head.href}>{head.label}</a>
            <span className="evo-breadcrumb-sep">/</span>
          </li>
        ) : null}
        {overflow ? (
          <li className="evo-breadcrumb-item">
            <details>
              <summary aria-label="More breadcrumbs">…</summary>
              <ol>
                {items.slice(1, -(max - 1)).map((item) => (
                  <li key={item.label}>{item.href ? <a href={item.href}>{item.label}</a> : item.label}</li>
                ))}
              </ol>
            </details>
            <span className="evo-breadcrumb-sep">/</span>
          </li>
        ) : null}
        {tail.map((item, index) => {
          const last = index === tail.length - 1;
          return (
            <li key={item.label} className="evo-breadcrumb-item">
              {last || !item.href ? (
                <span className="evo-breadcrumb-page" aria-current={last ? "page" : undefined}>{item.label}</span>
              ) : (
                <a className="evo-breadcrumb-link" href={item.href}>{item.label}</a>
              )}
              {!last ? <span className="evo-breadcrumb-sep">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const Breadcrumb = EvoBreadcrumb;
