import { useState } from 'react';
import type { Deal } from '@/contracts/entities';
import { Button } from '@/components/ui';
import { Select } from '@/components/forms/Fields';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDzd } from '@/lib/format';
export const stages = ['Qualification', 'Proposition', 'Négociation', 'Gagné', 'Perdu'];
export const probabilities: Record<string, number> = {
  Qualification: 35,
  Proposition: 65,
  Négociation: 80,
  Gagné: 100,
  Perdu: 0,
};
export function DealCard({
  deal,
  onOpen,
  onMove,
  disabled,
}: {
  deal: Deal;
  onOpen: () => void;
  onMove: (stage: string) => void;
  disabled?: boolean;
}) {
  return (
    <article
      className="deal-card"
      draggable={!disabled}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', deal.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      aria-label={deal.name}
    >
      <div className="deal-card-top">
        <StatusBadge status={deal.stage} />
        <span className="muted">{deal.probability}%</span>
      </div>
      <button className="record-link deal-title" onClick={onOpen}>
        {deal.name}
      </button>
      <small>{deal.company}</small>
      <div className="deal-card-bottom">
        <strong className="money">{formatDzd(deal.value)}</strong>
        <span className="owner-avatar">{deal.owner}</span>
      </div>
      <Select
        label={`Étape de ${deal.name}`}
        value={deal.stage}
        disabled={disabled}
        onChange={(e) => onMove(e.target.value)}
      >
        {stages.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </Select>
    </article>
  );
}
export function KanbanBoard({
  deals,
  onMove,
  onOpen,
  onCreate,
  disabled,
}: {
  deals: Deal[];
  onMove: (id: string, stage: string) => void;
  onOpen: (deal: Deal) => void;
  onCreate: (stage: string) => void;
  disabled?: boolean;
}) {
  const [over, setOver] = useState('');
  return (
    <div className="kanban-board" role="region" aria-label="Pipeline commercial">
      {stages.map((stage) => {
        const rows = deals.filter((d) => d.stage === stage);
        const total = rows.reduce((sum, d) => sum + d.value, 0);
        return (
          <section
            key={stage}
            aria-label={stage}
            className={`kanban-column ${over === stage ? 'drop-target' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(stage);
            }}
            onDragLeave={() => setOver('')}
            onDrop={(e) => {
              e.preventDefault();
              setOver('');
              if (!disabled) onMove(e.dataTransfer.getData('text/plain'), stage);
            }}
          >
            <div className="kanban-heading">
              <h2>{stage}</h2>
              <span className="column-count">{rows.length}</span>
            </div>
            <p className="column-total money">{formatDzd(total)}</p>
            {rows.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onOpen={() => onOpen(deal)}
                onMove={(s) => onMove(deal.id, s)}
                disabled={disabled}
              />
            ))}
            {!rows.length && <p className="column-empty">Aucun deal</p>}
            <Button disabled={disabled} variant="ghost" onClick={() => onCreate(stage)}>
              + Ajouter un deal
            </Button>
            <footer className="column-footer">
              Pondéré :{' '}
              <span className="money">
                {formatDzd(rows.reduce((sum, d) => sum + (d.value * d.probability) / 100, 0))}
              </span>
            </footer>
          </section>
        );
      })}
    </div>
  );
}
