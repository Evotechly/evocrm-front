import { Badge } from './Badge';
export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      tone={
        ['Actif', 'Accepté', 'Gagné'].includes(status)
          ? 'success'
          : ['Prospect', 'Proposition'].includes(status)
            ? 'warning'
            : ['Envoyé', 'Négociation'].includes(status)
              ? 'info'
              : status === 'Perdu'
                ? 'danger'
                : 'neutral'
      }
    >
      {status}
    </Badge>
  );
}
