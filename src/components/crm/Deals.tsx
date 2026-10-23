import type { Deal } from '@/contracts/entities';
import { KanbanBoard as EvoKanban } from '@evotechly/ui';
import { formatDzd } from '@/lib/format';

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
  return (
    <EvoKanban
      deals={deals}
      stages={stages}
      onMove={onMove}
      onOpen={onOpen}
      onCreate={onCreate}
      disabled={disabled}
      formatValue={(deal) => formatDzd(deal.value)}
      valueAmount={(deal) => deal.value}
      formatAmount={formatDzd}
    />
  );
}
