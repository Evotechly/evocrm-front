import { Avatar as UiAvatar } from '@evotechly/ui';

export function Avatar({ initials }: { initials: string; tone?: string }) {
  return <UiAvatar initials={initials} alt={`Avatar ${initials}`} />;
}
