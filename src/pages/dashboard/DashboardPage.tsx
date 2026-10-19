import { useState } from 'react';
import {
  ArrowUpRight,
  Handshake,
  UsersThree,
  CheckCircle,
  Sun,
  Plus,
  ArrowRight,
} from '@phosphor-icons/react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { StatCard, Panel, Button } from '@/components/ui';
import { Select, Checkbox } from '@/components/forms/Fields';
import { ScreenState, NoResults, usePreviewState } from '@/components/ui/ScreenState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatDzd } from '@/lib/format';
export { StatCard as KPICard } from '@/components/data-display/StatCard';
export function DashboardPage() {
  const { navigate } = useNavigation();
  const { contacts, deals, quotes } = useCrm();
  const state = usePreviewState();
  const [range, setRange] = useState('all'),
    [done, setDone] = useState<string[]>([]);
  const data = state === 'empty' ? [] : deals;
  const filtered =
    range === 'today'
      ? data.filter((d) => ['Aujourd’hui', 'À l’instant'].includes(d.updatedAt))
      : range === 'week'
        ? data.filter((d) => !d.updatedAt.includes('10 oct.'))
        : data;
  const open = filtered.filter((d) => !['Gagné', 'Perdu'].includes(d.stage));
  const won = filtered.filter((d) => d.stage === 'Gagné');
  const lost = filtered.filter((d) => d.stage === 'Perdu');
  const pending = state === 'empty' ? [] : quotes.filter((q) => q.status === 'Envoyé');
  const tasks = open.map((d) => ({
    id: d.id,
    title: `Faire le point · ${d.name}`,
    company: d.company,
  }));
  const total = open.reduce((s, d) => s + d.value, 0);
  return (
    <ScreenState permission="crm.view">
      <section className="page-stack" data-screen-id="SCR-HOME-001">
        <div className="page-heading">
          <div>
            <h1>
              Bonjour Mohamed <Sun size={24} className="wave" aria-hidden="true" />
            </h1>
            <p className="muted">Les relations qui avancent. Les actions qui comptent.</p>
          </div>
          <Select
            label="Période des deals"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="all">Toutes les données</option>
            <option value="week">7 derniers jours · démo</option>
            <option value="today">Aujourd’hui</option>
          </Select>
        </div>
        <div className="dashboard-topline">
          <p className="dashboard-subtitle">Vue commerciale · Evotechly</p>
          <div className="dashboard-shortcuts">
            <Button onClick={() => navigate('/crm/contacts?create=1')}>
              <Plus size={14} /> Ajouter un contact
            </Button>
            <Button onClick={() => navigate('/crm/deals/board')}>
              Ouvrir le pipeline <ArrowRight size={14} />
            </Button>
          </div>
        </div>
        <div className="stat-grid">
          <StatCard
            label="Contacts actifs"
            value={String(
              state === 'empty' ? 0 : contacts.filter((c) => c.status === 'Actif').length,
            )}
            change="Dans votre workspace"
            icon={<UsersThree size={20} />}
          />
          <StatCard
            label="Pipeline ouvert"
            value={formatDzd(total)}
            monetary
            change={`${open.length} opportunités sur la période`}
            icon={<Handshake size={20} />}
            tone="indigo"
          />
          <StatCard
            label="Actions à préparer"
            value={String(tasks.filter((t) => !done.includes(t.id)).length)}
            change="Suggestions liées aux deals"
            icon={<CheckCircle size={20} />}
            tone="teal"
          />
          <StatCard
            label="Deals gagnés"
            value={String(won.length)}
            change={`${lost.length} perdu(s) · ${filtered.length} au total`}
            icon={<ArrowUpRight size={20} />}
            tone="purple"
          />
        </div>
        {!data.length ? (
          <NoResults
            title="Votre activité apparaîtra ici"
            detail="Commencez par ajouter une opportunité."
            action={<Button onClick={() => navigate('/crm/deals?create=1')}>Créer un deal</Button>}
          />
        ) : (
          <>
            <div className="dashboard-grid">
              <Panel
                title="Répartition du pipeline ouvert"
                action={<span className="muted">{open.length} deals</span>}
              >
                <div className="pipeline-analysis">
                  <div
                    className="pipeline-donut"
                    role="img"
                    aria-label={`Répartition de ${open.length} opportunités ouvertes`}
                  >
                    <svg viewBox="0 0 180 180" aria-hidden="true">
                      <circle className="donut-track" cx="90" cy="90" r="70" />
                      {['Qualification', 'Proposition', 'Négociation'].map((stage, index, all) => {
                        const value = open
                          .filter((d) => d.stage === stage)
                          .reduce((sum, d) => sum + d.value, 0);
                        const before = open
                          .filter((d) => all.slice(0, index).includes(d.stage))
                          .reduce((sum, d) => sum + d.value, 0);
                        return (
                          <circle
                            key={stage}
                            cx="90"
                            cy="90"
                            r="70"
                            pathLength="100"
                            strokeDasharray={`${total ? (value / total) * 100 : 0} 100`}
                            strokeDashoffset={total ? (-before / total) * 100 : 0}
                          />
                        );
                      })}
                    </svg>
                    <div className="donut-center">
                      <strong>{open.length}</strong>
                      <span>deals ouverts</span>
                    </div>
                  </div>
                  <div>
                    {' '}
                    <div className="chart-summary">
                      <div>
                        <span>Valeur des opportunités</span>
                        <strong className="money">{formatDzd(total)}</strong>
                        <small className="muted">Répartition des opportunités affichées</small>
                      </div>
                    </div>
                    <div
                      className="sales-chart"
                      role="img"
                      aria-label={`Pipeline ouvert : ${formatDzd(total)}`}
                    >
                      {['Qualification', 'Proposition', 'Négociation'].map((stage) => {
                        const amount = open
                          .filter((d) => d.stage === stage)
                          .reduce((s, d) => s + d.value, 0);
                        return (
                          <div className="sales-bar-row" key={stage}>
                            <span>{stage}</span>
                            <div>
                              <i style={{ width: `${total ? (amount / total) * 100 : 0}%` }} />
                            </div>
                            <strong className="money">{formatDzd(amount)}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="performance-strip">
                  <div>
                    <span>Gagné</span>
                    <strong className="positive money">
                      {formatDzd(won.reduce((s, d) => s + d.value, 0))}
                    </strong>
                  </div>
                  <div>
                    <span>Perdu</span>
                    <strong className="money">
                      {formatDzd(lost.reduce((s, d) => s + d.value, 0))}
                    </strong>
                  </div>
                  <div>
                    <span>Taux de gain des deals clôturés</span>
                    <strong>
                      {won.length + lost.length
                        ? `${Math.round((won.length / (won.length + lost.length)) * 100)} %`
                        : 'Indisponible'}
                    </strong>
                  </div>
                </div>
              </Panel>
              <Panel title="Prochaines actions" action={<span className="muted">À planifier</span>}>
                <div className="task-list">
                  {tasks.length ? (
                    tasks.map((t) => (
                      <div key={t.id} className="task-row">
                        <Checkbox
                          label={t.title}
                          checked={done.includes(t.id)}
                          onChange={() =>
                            setDone((ds) =>
                              ds.includes(t.id) ? ds.filter((v) => v !== t.id) : [...ds, t.id],
                            )
                          }
                        />
                        <small className="muted">{t.company}</small>
                      </div>
                    ))
                  ) : (
                    <NoResults
                      title="Aucune action sur cette période"
                      detail="Vos opportunités ouvertes apparaîtront ici."
                    />
                  )}
                </div>
                <p className="panel-note">Suggestions locales : aucune échéance n’est inventée.</p>
              </Panel>
            </div>
            <div className="dashboard-grid">
              <Panel
                title="Opportunités prioritaires"
                action={
                  <Button variant="ghost" onClick={() => navigate('/crm/deals/board')}>
                    Voir le pipeline ↗
                  </Button>
                }
              >
                <div className="ranked-deals">
                  {[...open]
                    .sort((a, b) => b.value - a.value)
                    .map((d, i) => (
                      <div className="ranked-row" key={d.id}>
                        <span className="rank">{i + 1}</span>
                        <div>
                          <strong>{d.name}</strong>
                          <small className="cell-meta">{d.company}</small>
                        </div>
                        <strong className="money">{formatDzd(d.value)}</strong>
                        <StatusBadge status={d.stage} />
                      </div>
                    ))}
                </div>
              </Panel>
              <Panel
                title="Devis en attente"
                action={
                  <Button variant="ghost" onClick={() => navigate('/crm/quotes')}>
                    Voir les devis ↗
                  </Button>
                }
              >
                {pending.length ? (
                  <div className="detail-stack panel-padding">
                    {pending.map((q) => (
                      <div className="quote-preview" key={q.id}>
                        <div>
                          <strong>{q.number}</strong>
                          <p className="muted">{q.customer}</p>
                        </div>
                        <strong className="money">{formatDzd(q.amount)}</strong>
                        <StatusBadge status={q.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <NoResults
                    title="Aucun devis en attente"
                    detail="Toutes vos propositions sont à jour."
                  />
                )}
              </Panel>
            </div>
          </>
        )}
      </section>
    </ScreenState>
  );
}
