import type { PropsWithChildren, ReactNode } from 'react';

export function Panel({ children, title, action }: PropsWithChildren<{ title?: string; action?: ReactNode }>) {
  return <section className="panel">{title || action ? <div className="panel-header">{title ? <h2>{title}</h2> : <span />}{action}</div> : null}{children}</section>;
}
