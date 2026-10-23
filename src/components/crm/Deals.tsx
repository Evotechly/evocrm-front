import { useState } from 'react';
import { EvoButton } from '@evotechly/ui';
import type { Deal } from '@/contracts/entities';
import { formatDzd } from '@/lib/format';
import { FieldSelect } from '@/components/crm/ui';

export const stages = ['Qualification', 'Proposition', 'Négociation', 'Gagné', 'Perdu'];
export const probabilities: Record<string, number> = {
  Qualification: 35,
  Proposition: 65,
  Négociation: 80,
  Gagné: 100,
  Perdu: 0,
};

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
  const [over, setOver] = useState<string | null>(null);
  return (
    <div className="ev-kanban" data-evo="kanban">
      {stages.map((stage) => {
        const column = deals.filter((deal) => deal.stage === stage);
        const total = column.reduce((sum, deal) => sum + deal.value, 0);
        return (
          <section
            key={stage}
            className={`ev-kanban-column ${over === stage ? 'is-over' : ''}`}
            aria-label={stage}
            onDragOver={(event) => {
              event.preventDefault();
              setOver(stage);
            }}
            onDragLeave={() => setOver((value) => (value === stage ? null : value))}
            onDrop={(event) => {
              event.preventDefault();
              const id = event.dataTransfer.getData('text/plain');
              setOver(null);
              if (id && !disabled) onMove(id, stage);
            }}
          >
            <header>
              <strong>{stage}</strong>
              <span className="money">{formatDzd(total)}</span>
            </header>
            {column.map((deal) => (
              <article
                key={deal.id}
                className="ev-deal-card"
                aria-label={deal.name}
                draggable={!disabled}
                onDragStart={(event) => event.dataTransfer.setData('text/plain', deal.id)}
              >
                <div className="ev-deal-card-top">
                  <button type="button" className="record-link" onClick={() => onOpen(deal)}>
                    {deal.name}
                  </button>
                  <span className="ev-owner" aria-hidden="true">
                    {deal.owner}
                  </span>
                </div>
                <small>{deal.company}</small>
                <strong className="money">{formatDzd(deal.value)}</strong>
                <FieldSelect
                  label={`Étape de ${deal.name}`}
                  value={deal.stage}
                  onChange={(event) => onMove(deal.id, event.target.value)}
                >
                  {stages.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </FieldSelect>
              </article>
            ))}
            <EvoButton variant="ghost" disabled={disabled} onClick={() => onCreate(stage)}>
              Ajouter
            </EvoButton>
          </section>
        );
      })}
    </div>
  );
}
