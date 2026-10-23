import type { ReactNode } from 'react';
import { ActivityTimeline } from '@/components/data-display/Controls';
import { Button } from '@/components/ui';

export function WorkspaceHeader({
  title,
  description,
  count,
  actions,
}: {
  title: string;
  description: string;
  count?: number;
  actions?: ReactNode;
}) {
  return (
    <div className="page-heading workspace-header">
      <div>
        <h1>
          {title}
          {count !== undefined && <span className="heading-count">{count}</span>}
        </h1>
        <p className="muted">{description}</p>
      </div>
      {actions && <div className="workspace-header-actions">{actions}</div>}
    </div>
  );
}

export function WorkspaceToolbar({
  children,
  label = 'Outils de l’espace de travail',
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="workspace-toolbar" role="toolbar" aria-label={label}>
      {children}
    </div>
  );
}

export function BulkActionBar({
  selectedCount,
  onClear,
  children,
}: {
  selectedCount: number;
  onClear: () => void;
  children?: ReactNode;
}) {
  if (!selectedCount) return null;
  return (
    <div className="selection-bar" role="status" aria-live="polite">
      <span>{selectedCount} sélectionné(s)</span>
      <div className="inline">
        {children}
        <Button onClick={onClear}>Désélectionner</Button>
      </div>
    </div>
  );
}

export function RecordActivityTimeline({
  items,
  empty = 'Aucune activité horodatée disponible.',
}: {
  items: { title: string; detail: string; time: string }[];
  empty?: string;
}) {
  return (
    <section className="record-activity" aria-label="Historique d’activité">
      <h3>Historique d’activité</h3>
      {items.length ? <ActivityTimeline items={items} /> : <p className="muted">{empty}</p>}
    </section>
  );
}
