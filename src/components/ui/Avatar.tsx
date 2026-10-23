export function Avatar({ initials, tone = 'orange' }: { initials: string; tone?: string }) {
  return (
    <span className={`avatar avatar-${tone}`} aria-label={`Avatar ${initials}`}>
      {initials}
    </span>
  );
}
