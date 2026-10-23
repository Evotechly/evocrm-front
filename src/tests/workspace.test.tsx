import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import {
  BulkActionBar,
  RecordActivityTimeline,
  WorkspaceHeader,
  WorkspaceToolbar,
} from '@evotechly/ui';

describe('shared workspace foundation', () => {
  it('exposes a consistent header, toolbar and bulk-action contract', async () => {
    const clear = vi.fn();
    render(
      <>
        <WorkspaceHeader
          title="Contacts"
          description="Relations du workspace"
          count={3}
          actions={<button type="button">Créer</button>}
        />
        <WorkspaceToolbar label="Filtres des contacts">
          <input aria-label="Recherche" />
        </WorkspaceToolbar>
        <BulkActionBar selectedCount={2} onClear={clear} />
      </>,
    );

    expect(screen.getByRole('heading', { name: /Contacts/ })).toHaveTextContent('3');
    expect(screen.getByRole('toolbar', { name: 'Filtres des contacts' })).toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole('button', { name: 'Désélectionner' }));
    expect(clear).toHaveBeenCalledOnce();
  });

  it('renders only supported activity evidence and a transparent empty state', () => {
    render(
      <>
        <RecordActivityTimeline
          items={[{ title: 'Contact créé', detail: 'Sarah Benali', time: 'À l’instant' }]}
        />
        <RecordActivityTimeline items={[]} empty="Aucune activité fournie." />
      </>,
    );

    expect(screen.getByText('Contact créé')).toBeInTheDocument();
    expect(screen.getByText('Aucune activité fournie.')).toBeInTheDocument();
  });
});
