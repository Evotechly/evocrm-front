import { useState } from 'react';
import { ArrowRight, Sun } from '@phosphor-icons/react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { Button } from '@/components/ui';
import { Select } from '@/components/forms/Fields';
import { ScreenState, usePreviewState } from '@/components/ui/ScreenState';
import { UnifiedDashboardLayout } from './UnifiedDashboardLayout';

export { StatCard as KPICard } from '@/components/data-display/StatCard';

export function DashboardPage() {
  const { navigate } = useNavigation();
  const { deals, quotes, threads, user } = useCrm();
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
        <div className="dashboard-command-header">
          <div>
            <h1>
              Bonjour {user.displayName} <Sun size={24} className="wave" aria-hidden="true" />
            </h1>
            <p className="muted">Voici ce qui mérite votre attention aujourd’hui.</p>
          </div>
          <div className="dashboard-command-actions">
            <Select
              label="Période des deals"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="all">Toutes les données</option>
              <option value="week">7 derniers jours · démo</option>
              <option value="today">Aujourd’hui</option>
            </Select>
            <Button onClick={() => navigate('/crm/deals/board')}>
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
          priorityConversations={threads.filter((thread) => thread.unread).length}
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
