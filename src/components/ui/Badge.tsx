import type { ReactNode } from 'react';
import { Badge as UiBadge, type BadgeTone } from '@evotechly/ui';

type AppTone = 'neutral' | 'success' | 'warning' | 'info' | 'danger';

const toneMap: Record<AppTone, BadgeTone> = {
  neutral: 'neutral',
  success: 'success',
  warning: 'warning',
  info: 'information',
  danger: 'error',
};

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: AppTone;
}) {
  return <UiBadge tone={toneMap[tone]}>{children}</UiBadge>;
}
