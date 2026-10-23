import type { ReactNode } from 'react';
import { EmptyState as UiEmptyState } from '@evotechly/ui';

export function EmptyState({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return <UiEmptyState title={title} description={detail} action={action} />;
}
