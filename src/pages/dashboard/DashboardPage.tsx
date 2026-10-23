import { useState } from 'react';
import { ArrowRight, Plus, Sun } from '@phosphor-icons/react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { Button } from '@evotechly/ui';
import { Select } from '@evotechly/ui';
import { ScreenState, usePreviewState } from '@/app/ScreenState';
import { UnifiedDashboardLayout } from './UnifiedDashboardLayout';

export { KpiCard as KPICard } from '@evotechly/ui';

export function DashboardPage() {
  const { navigate } = useNavigation();
  const { deals, quotes } = useCrm();
  const state = usePreviewState();
  const [range, setRange] = useState('all');
  const [done, setDone] = useState<string[]>([]);
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
  const total = open.reduce((sum, deal) => sum + deal.value, 0);
  const conversionRate =
    won.length + lost.length ? Math.round((won.length / (won.length + lost.length)) * 100) : 0;

  return (
    <ScreenState permission="crm.view">
      <section className="page-stack" data-screen-id="SCR-HOME-001">
        <div className="page-heading">
          <div>
            <h1>
              Bonjour Mohamed <Sun size={24} className="wave" aria-hidden="true" />
            </h1>
            <p className="muted">Voici ce qui mérite votre attention aujourd’hui.</p>
          </div>
          <Select label="Période des deals" value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="all">Toutes les données</option>
            <option value="week">7 derniers jours · démo</option>
            <option value="today">Aujourd’hui</option>
          </Select>
        </div>
        <div className="dashboard-topline">
          <p className="dashboard-subtitle">Centre de commande · Evotechly</p>
          <div className="dashboard-shortcuts">
            <Button variant="secondary" onClick={() => navigate('/crm/contacts?create=1')}>
              <Plus size={14} /> Ajouter un contact
            </Button>
            <Button variant="secondary" onClick={() => navigate('/crm/deals/board')}>
              Ouvrir le pipeline <ArrowRight size={14} />
            </Button>
          </div>
        </div>
        <UnifiedDashboardLayout
          deals={data}
          open={open}
          pending={pending}
          tasks={tasks}
          done={done}
          total={total}
          conversionRate={conversionRate}
          wonTotal={won.reduce((sum, deal) => sum + deal.value, 0)}
          onToggleTask={(id) =>
            setDone((items) =>
              items.includes(id) ? items.filter((value) => value !== id) : [...items, id],
            )
          }
          onNavigate={navigate}
          empty={state === 'empty'}
        />
      </section>
    </ScreenState>
  );
}
