import type { PropsWithChildren } from 'react';

export function Badge({
  children,
  tone = 'neutral',
}: PropsWithChildren<{ tone?: 'neutral' | 'success' | 'warning' | 'info' | 'danger' }>) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
