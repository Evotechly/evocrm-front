import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { UnifiedDashboardLayout } from './UnifiedDashboardLayout';

const deals = [
  {
    id: 'deal-1',
    name: 'Déploiement CRM',
    company: 'Atlas Logistics',
    value: 820000,
    stage: 'Proposition',
    probability: 60,
    owner: 'MB',
    updatedAt: 'À l’instant',
  },
];

const quote = {
  id: 'quote-1',
  number: 'DEV-2026-014',
  customer: 'Atlas Logistics',
  amount: 820000,
  status: 'Envoyé' as const,
  expiresAt: '31 oct. 2026',
};

describe('UnifiedDashboardLayout', () => {
  it('exposes the main workflow actions and routes them to the correct workspace', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const onToggleTask = vi.fn();

    render(
      <UnifiedDashboardLayout
        deals={deals}
        open={deals}
        pending={[quote]}
        tasks={[{ id: 'task-1', title: 'Faire le point · Déploiement CRM', company: 'Atlas Logistics' }]}
        done={[]}
        total={820000}
        conversionRate={100}
        wonTotal={280000}
        onToggleTask={onToggleTask}
        onNavigate={onNavigate}
        empty={false}
      />,
    );

    expect(screen.getByText('Pipeline ouvert')).toBeInTheDocument();
    expect(screen.getAllByText('820 000,00 DA').length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: /Ouvrir l’Inbox/i }));
    expect(onNavigate).toHaveBeenCalledWith('/inbox');

    await user.click(screen.getByRole('checkbox', { name: /Faire le point/i }));
    expect(onToggleTask).toHaveBeenCalledWith('task-1');
  });

  it('renders an honest empty opportunity state without fabricating a deal', () => {
    render(
      <UnifiedDashboardLayout
        deals={[]}
        open={[]}
        pending={[]}
        tasks={[]}
        done={[]}
        total={0}
        conversionRate={0}
        wonTotal={0}
        onToggleTask={() => undefined}
        onNavigate={() => undefined}
        empty
      />,
    );

    expect(screen.getAllByText('Aucun deal').length).toBe(3);
    expect(screen.getByText('Votre activité apparaîtra ici.')).toBeInTheDocument();
    expect(screen.queryByText(/820 000/)).not.toBeInTheDocument();
  });
});
