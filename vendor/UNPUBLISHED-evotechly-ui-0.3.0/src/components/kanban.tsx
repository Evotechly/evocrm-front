import { useState, type ReactNode } from 'react';
import { Button } from './button';
import { Select } from './select';
import { StatusBadge } from './crm';
import { cn } from '../utils/cn';

export interface KanbanCardModel {
  id: string;
  name: string;
  company: string;
  value: ReactNode;
  stage: string;
  probability: number;
  owner: string;
}

export function KanbanCard({
  deal,
  onOpen,
  onMove,
  disabled,
  stages,
}: {
  deal: KanbanCardModel;
  onOpen: () => void;
  onMove: (stage: string) => void;
  disabled?: boolean;
  stages: string[];
}) {
  return (
    <article
      className="ev-deal-card"
      draggable={!disabled}
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', deal.id);
        event.dataTransfer.effectAllowed = 'move';
      }}
      aria-label={deal.name}
    >
      <div className="ev-deal-card-top">
        <StatusBadge status={deal.stage} />
        <span className="ev-muted">{deal.probability}%</span>
      </div>
      <button type="button" className="ev-record-link" onClick={onOpen}>
        {deal.name}
      </button>
      <small>{deal.company}</small>
      <div className="ev-deal-card-bottom">
        <strong className="ev-money">{deal.value}</strong>
        <span className="ev-owner">{deal.owner}</span>
      </div>
      <Select
        label={`Étape de ${deal.name}`}
        value={deal.stage}
        disabled={disabled}
        onChange={(event) => onMove(event.target.value)}
      >
        {stages.map((stage) => (
          <option key={stage}>{stage}</option>
        ))}
      </Select>
    </article>
  );
}

export function KanbanBoard<T extends KanbanCardModel>({
  deals,
  stages,
  onMove,
  onOpen,
  onCreate,
  disabled,
  formatValue,
  valueAmount,
  formatAmount,
}: {
  deals: T[];
  stages: string[];
  onMove: (id: string, stage: string) => void;
  onOpen: (deal: T) => void;
  onCreate?: (stage: string) => void;
  disabled?: boolean;
  formatValue: (deal: T) => ReactNode;
  valueAmount?: (deal: T) => number;
  formatAmount?: (value: number) => ReactNode;
}) {
  const [over, setOver] = useState('');
  return (
    <div className="ev-kanban" role="region" aria-label="Pipeline commercial">
      {stages.map((stage) => {
        const rows = deals.filter((deal) => deal.stage === stage);
        const total = valueAmount ? rows.reduce((sum, deal) => sum + valueAmount(deal), 0) : 0;
        const weighted = valueAmount
          ? rows.reduce((sum, deal) => sum + (valueAmount(deal) * deal.probability) / 100, 0)
          : 0;
        return (
          <section
            key={stage}
            className={cn('ev-kanban-column', over === stage && 'is-over')}
            role="region"
            aria-label={stage}
            onDragOver={(event) => {
              event.preventDefault();
              setOver(stage);
            }}
            onDrop={(event) => {
              event.preventDefault();
              onMove(event.dataTransfer.getData('text/plain'), stage);
              setOver('');
            }}
            onDragLeave={() => setOver('')}
          >
            <header>
              <strong>{stage}</strong>
              <span className="column-count">{rows.length}</span>
            </header>
            {formatAmount && valueAmount && <p className="ev-money">{formatAmount(total)}</p>}
            {rows.map((deal) => (
              <KanbanCard
                key={deal.id}
                deal={{ ...deal, value: formatValue(deal) }}
                stages={stages}
                disabled={disabled}
                onOpen={() => onOpen(deal)}
                onMove={(next) => onMove(deal.id, next)}
              />
            ))}
            {!rows.length && <p className="ev-muted">Aucun deal</p>}
            {onCreate && (
              <Button variant="ghost" disabled={disabled} onClick={() => onCreate(stage)}>
                + Ajouter un deal
              </Button>
            )}
            {formatAmount && valueAmount && (
              <footer>
                Pondéré : <span className="ev-money">{formatAmount(weighted)}</span>
              </footer>
            )}
          </section>
        );
      })}
    </div>
  );
}
