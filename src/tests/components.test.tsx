import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CrmProvider } from '@/app/providers/CrmProvider';
import { ContactsPage } from '@/pages/contacts/ContactsPage';
import { Button } from '@evotechly/ui';
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
  it('disables loading buttons and defaults to non-submit', () => {
    render(<Button loading>Enregistrer</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
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
    const u = userEvent.setup();
    await u.clear(screen.getByLabelText('Quantité 1'));
    await u.type(screen.getByLabelText('Quantité 1'), '3');
    expect(screen.getAllByText(/300.*DA/)).toHaveLength(2);
  });
});

describe('Reusable DataTable', () => {
  it('sorts, paginates, filters and selects real records', async () => {
    const { DataTable } = await import('@evotechly/ui');
    const data = [
      { id: 'b', name: 'Beta' },
      { id: 'a', name: 'Alpha' },
      { id: 'c', name: 'Gamma' },
    ];
    const props = {
      data,
      rowKey: (r: (typeof data)[number]) => r.id,
      pageSize: 2,
      selectable: true,
      columns: [
        {
          key: 'name',
          label: 'Nom',
          render: (r: (typeof data)[number]) => r.name,
          sortValue: (r: (typeof data)[number]) => r.name,
        },
      ],
    };
    const { rerender } = render(<DataTable {...props} />);
    const u = userEvent.setup();
    await u.click(screen.getByRole('button', { name: /Nom/ }));
    expect(screen.getByRole('columnheader', { name: /Nom/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    await u.click(screen.getByLabelText('Sélectionner la page'));
    expect(screen.getByLabelText('Sélectionner a')).toBeChecked();
    await u.click(screen.getByRole('button', { name: 'Page suivante' }));
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    rerender(<DataTable {...props} query="Beta" matchesQuery={(r, q) => r.name.includes(q)} />);
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
