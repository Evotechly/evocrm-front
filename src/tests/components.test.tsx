import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CrmProvider } from '@/app/providers/CrmProvider';
import { ContactsPage } from '@/pages/contacts/ContactsPage';
import { EvoButton, EvoDataTable } from '@evotechly/ui';
import { QuoteLineItem, QuoteSummary } from '@/components/crm/Quotes';
import { useState } from 'react';

afterEach(cleanup);

describe('Aurora interaction contracts', () => {
  it('blocks protected records for an injected role without view capability', () => {
    render(
      <MemoryRouter>
        <CrmProvider permissions={[]}>
          <ContactsPage />
        </CrmProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Accès refusé' })).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText('Sarah Benali')).not.toBeInTheDocument();
  });

  it('keeps denied and empty previews distinct', () => {
    render(
      <MemoryRouter initialEntries={['/crm/contacts?state=empty']}>
        <CrmProvider>
          <ContactsPage />
        </CrmProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Votre réseau commence ici')).toBeInTheDocument();
    expect(screen.queryByText('Sarah Benali')).not.toBeInTheDocument();
  });

  it('defaults EvoButton to a non-submit control', () => {
    render(<EvoButton>Enregistrer</EvoButton>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('recalculates a quote when quantity changes', async () => {
    function Example() {
      const [item, setItem] = useState({
        id: '1',
        description: 'Conseil',
        quantity: 1,
        unitPrice: 100,
      });
      return (
        <>
          <QuoteLineItem item={item} index={0} onChange={setItem} onRemove={() => {}} />
          <QuoteSummary items={[item]} />
        </>
      );
    }
    render(<Example />);
    const user = userEvent.setup();
    await user.clear(screen.getByLabelText('Quantité 1'));
    await user.type(screen.getByLabelText('Quantité 1'), '3');
    expect(screen.getAllByText(/300.*DA/)).toHaveLength(2);
  });
});

describe('Official EvoDataTable', () => {
  it('filters records through the catalog table API', async () => {
    const data = [
      { id: 'b', name: 'Beta' },
      { id: 'a', name: 'Alpha' },
      { id: 'c', name: 'Gamma' },
    ];
    render(
      <EvoDataTable
        data={data}
        columns={[
          { accessorKey: 'name', header: 'Nom' },
          { accessorKey: 'id', header: 'Id' },
        ]}
      />,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.type(screen.getByLabelText('Filter'), 'Beta');
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.queryByText('Gamma')).not.toBeInTheDocument();
  });
});

describe('Quote editor error states', () => {
  it('keeps invalid amounts editable without crashing', () => {
    const item = { id: 'invalid', description: 'Conseil', quantity: -1, unitPrice: 100 };
    render(
      <>
        <QuoteLineItem item={item} index={0} onChange={() => {}} onRemove={() => {}} />
        <QuoteSummary items={[item]} />
      </>,
    );
    expect(screen.getAllByRole('alert')).toHaveLength(2);
    expect(screen.getByLabelText('Quantité 1')).toBeInTheDocument();
  });
});
