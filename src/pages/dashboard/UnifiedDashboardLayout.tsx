import {
  ArrowRight,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  Lightning,
  Plus,
  TrendUp,
} from '@phosphor-icons/react';
import type { Deal, Quote } from '@/contracts/entities';
import { Button, Panel } from '@/components/ui';
import { DataTable } from '@/components/data-display/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDzd } from '@/lib/format';

type Task = { id: string; title: string; company: string };

export function UnifiedDashboardLayout({
  deals,
  open,
  pending,
  tasks,
  done,
  total,
  conversionRate,
  wonTotal,
  priorityConversations = 0,
  onToggleTask,
  onNavigate,
  empty,
}: {
  deals: Deal[];
  open: Deal[];
  pending: Quote[];
  tasks: Task[];
  done: string[];
  total: number;
  conversionRate: number;
  wonTotal: number;
  priorityConversations?: number;
  onToggleTask: (id: string) => void;
  onNavigate: (path: string) => void;
  empty: boolean;
}) {
  const stages = ['Qualification', 'Proposition', 'Négociation'];
  const priorityDeals = [...open].sort((a, b) => b.value - a.value).slice(0, 4);

  return (
    <div className="unified-dashboard-layout" data-layout="unified-evocrm">
      <div className="guided-actions" aria-label="Priorités du jour">
        <div className="guided-actions-heading">
          <div>
            <strong>Priorités du jour</strong>
            <span className="muted">Les actions qui méritent votre attention maintenant</span>
          </div>
        </div>
        <div className="guided-action-grid">
          <button className="guided-action-card" onClick={() => onNavigate('/crm/contacts')}>
            <span className="guided-action-icon orange">
              <CheckCircle size={19} />
            </span>
            <span>
              <strong>À traiter aujourd’hui</strong>
              <small>{tasks.length} suivi(s) et relance(s) à préparer.</small>
            </span>
            <ArrowRight size={15} />
          </button>
          <button
            className="guided-action-card"
            aria-label="Ouvrir l’Inbox · Conversations prioritaires"
            onClick={() => onNavigate('/inbox')}
          >
            <span className="guided-action-icon teal">
              <EnvelopeSimple size={19} />
            </span>
            <span>
              <strong>Conversations prioritaires</strong>
              <small>{priorityConversations} conversation(s) non lue(s) à traiter.</small>
            </span>
            <ArrowRight size={15} />
          </button>
          <button className="guided-action-card" onClick={() => onNavigate('/crm/deals/board')}>
            <span className="guided-action-icon violet">
              <TrendUp size={19} />
            </span>
            <span>
              <strong>Opportunités à suivre</strong>
              <small>{open.length} deal(s) ouverts dans le pipeline actuel.</small>
            </span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <div className="unified-kpi-grid" aria-label="Performance commerciale">
        <button className="unified-kpi" onClick={() => onNavigate('/crm/deals')}>
          <span>Pipeline ouvert</span>
          <strong className="money">{formatDzd(total)}</strong>
          <small>{open.length} opportunités actives</small>
        </button>
        <button className="unified-kpi" onClick={() => onNavigate('/crm/deals')}>
          <span>Ventes gagnées</span>
          <strong className="money">{formatDzd(wonTotal)}</strong>
          <small>Sur la période sélectionnée</small>
        </button>
        <button className="unified-kpi" onClick={() => onNavigate('/crm/quotes')}>
          <span>Devis en attente</span>
          <strong>{pending.length}</strong>
          <small>À relancer ou faire accepter</small>
        </button>
        <button className="unified-kpi" onClick={() => onNavigate('/reports')}>
          <span>Taux de conversion</span>
          <strong>{conversionRate} %</strong>
          <small>Deals clôturés de la période</small>
        </button>
      </div>

      <div className="unified-dashboard-grid">
        <Panel
          title="Intelligence du pipeline"
          action={
            <Button variant="ghost" onClick={() => onNavigate('/crm/deals/board')}>
              Ouvrir le pipeline <ArrowRight size={15} />
            </Button>
          }
        >
          <div className="pipeline-layout-summary">
            <div>
              <span className="muted">Valeur ouverte</span>
              <strong className="money">{formatDzd(total)}</strong>
            </div>
            <div>
              <span className="muted">Deals actifs</span>
              <strong>{open.length}</strong>
            </div>
            <div>
              <span className="muted">Devis à suivre</span>
              <strong>{pending.length}</strong>
            </div>
          </div>
          <div className="pipeline-mini-board">
            {stages.map((stage) => {
              const stageDeals = deals.filter((deal) => deal.stage === stage);
              const stageTotal = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
              return (
                <div className="pipeline-mini-column" key={stage}>
                  <div className="pipeline-mini-heading">
                    <span>{stage}</span>
                    <span>{stageDeals.length}</span>
                  </div>
                  <div className="pipeline-mini-total money">{formatDzd(stageTotal)}</div>
                  {stageDeals.slice(0, 3).map((deal) => (
                    <button
                      className="pipeline-mini-card"
                      key={deal.id}
                      onClick={() => onNavigate('/crm/deals')}
                    >
                      <strong>{deal.name}</strong>
                      <small>{deal.company}</small>
                      <span className="money">{formatDzd(deal.value)}</span>
                    </button>
                  ))}
                  {!stageDeals.length && <p className="pipeline-empty">Aucun deal</p>}
                  <button
                    className="pipeline-add"
                    onClick={() => onNavigate('/crm/deals?create=1')}
                  >
                    <Plus size={14} /> Ajouter
                  </button>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="Activité et prochaines actions"
          action={<span className="muted">Fil de travail</span>}
        >
          <div className="activity-feed">
            <div className="activity-feed-item">
              <span className="activity-feed-icon">
                <Lightning size={16} />
              </span>
              <div>
                <strong>Pipeline actualisé</strong>
                <p className="muted">Les montants et étapes sont prêts pour votre revue.</p>
                <small>Il y a 12 min</small>
              </div>
            </div>
            <div className="activity-feed-item">
              <span className="activity-feed-icon">
                <EnvelopeSimple size={16} />
              </span>
              <div>
                <strong>Conversation à traiter</strong>
                <p className="muted">Un échange client attend une réponse dans l’Inbox.</p>
                <small>Il y a 28 min</small>
              </div>
            </div>
            {tasks.slice(0, 2).map((task) => (
              <label className="activity-task" key={task.id}>
                <input
                  type="checkbox"
                  checked={done.includes(task.id)}
                  onChange={() => onToggleTask(task.id)}
                />
                <span>
                  <strong>{task.title}</strong>
                  <small>{task.company}</small>
                </span>
                <Clock size={15} className="muted" />
              </label>
            ))}
            {!tasks.length && <p className="empty-inline">Aucune action urgente détectée.</p>}
          </div>
        </Panel>
      </div>

      <Panel
        title="Opportunités prioritaires"
        action={
          <Button variant="ghost" onClick={() => onNavigate('/crm/deals')}>
            Voir tous les deals <ArrowRight size={15} />
          </Button>
        }
      >
        {priorityDeals.length ? (
          <DataTable
            caption="Opportunités prioritaires"
            data={priorityDeals}
            rowKey={(deal) => deal.id}
            columns={[
              {
                key: 'client',
                label: 'Client / deal',
                render: (deal) => (
                  <button
                    className="record-link priority-deal-link"
                    onClick={() => onNavigate('/crm/deals')}
                  >
                    <strong>{deal.name}</strong>
                    <small>{deal.company}</small>
                  </button>
                ),
              },
              {
                key: 'value',
                label: 'Valeur',
                render: (deal) => <span className="money">{formatDzd(deal.value)}</span>,
                sortValue: (deal) => deal.value,
              },
              {
                key: 'stage',
                label: 'Étape',
                render: (deal) => <StatusBadge status={deal.stage} />,
              },
              { key: 'owner', label: 'Responsable', render: (deal) => deal.owner },
              {
                key: 'next',
                label: 'Prochaine action',
                render: () => (
                  <span className="priority-next-action">
                    Faire le point <ArrowRight size={13} />
                  </span>
                ),
              },
            ]}
          />
        ) : (
          <p className="empty-inline">
            {empty ? 'Votre activité apparaîtra ici.' : 'Aucune opportunité prioritaire.'}
          </p>
        )}
      </Panel>
    </div>
  );
}
