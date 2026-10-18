import { ArrowRight, ChartBar, Funnel, Kanban, List, Plus } from '@phosphor-icons/react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { Badge, Button, Panel } from '@/components/ui';
import { deals } from '@/fixtures/crm';
import { formatDzd } from '@/lib/format';

const stages = ['Qualification', 'Proposition', 'Négociation', 'Gagné'];
export function DealsPage({ board = false }: { board?: boolean }) {
  const { navigate } = useNavigation();
  return <section className="page-stack" data-screen-id="SCR-DEAL-001"><div className="page-heading"><div><div className="eyebrow">CRM / DEALS</div><h1>{board ? 'Pipeline' : 'Deals'}</h1><p className="muted">Suivez les opportunités et faites avancer votre revenu.</p></div><Button variant="primary"><Plus size={17} /> Nouveau deal</Button></div><div className="view-toolbar"><div className="segmented"><button className={!board ? 'selected' : ''} onClick={() => navigate('/crm/deals')}><List size={16} /> Liste</button><button className={board ? 'selected' : ''} onClick={() => navigate('/crm/deals/board')}><Kanban size={16} /> Pipeline</button></div><div className="toolbar-actions"><Button><Funnel size={16} /> Filtres</Button><Button><ChartBar size={16} /> Prévisions</Button></div></div>{board ? <div className="kanban-board">{stages.map((stage) => <div className="kanban-column" key={stage}><div className="kanban-heading"><span>{stage}</span><span className="column-count">{deals.filter((deal) => deal.stage === stage).length}</span></div>{deals.filter((deal) => deal.stage === stage).map((deal) => <DealCard key={deal.id} deal={deal} />)}<button className="add-card"><Plus size={15} /> Ajouter un deal</button></div>)}</div> : <Panel><div className="deal-list-header"><span>Deal</span><span>Entreprise</span><span>Montant</span><span>Probabilité</span><span>Étape</span><span /></div>{deals.map((deal) => <div className="deal-list-row" key={deal.id}><span><strong>{deal.name}</strong><small>Mis à jour {deal.updatedAt}</small></span><span>{deal.company}</span><span className="money">{formatDzd(deal.value)}</span><span><div className="progress"><i style={{ width: `${deal.probability}%` }} /></div><small>{deal.probability}%</small></span><span><Badge tone={deal.stage === 'Gagné' ? 'success' : deal.stage === 'Négociation' ? 'info' : 'neutral'}>{deal.stage}</Badge></span><ArrowRight size={16} className="muted" /></div>)}</Panel>}</section>;
}

function DealCard({ deal }: { deal: (typeof deals)[number] }) {
  return <article className="deal-card"><div className="deal-card-top"><Badge tone="info">{deal.probability}%</Badge><button className="row-action">•••</button></div><strong>{deal.name}</strong><small>{deal.company}</small><div className="deal-card-bottom"><span className="money">{formatDzd(deal.value)}</span><span className="owner-avatar">{deal.owner}</span></div></article>;
}
