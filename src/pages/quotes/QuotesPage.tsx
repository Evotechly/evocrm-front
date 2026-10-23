import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { EvoButton, EvoDialog, EvoInput, EvoSheet } from '@evotechly/ui';
import { useCrm, type QuoteRecord, type LineItem } from '@/app/providers/CrmProvider';
import { ScreenState, usePreviewState, NoResults } from '@/app/ScreenState';
import { QuoteLineItem, QuoteSummary } from '@/components/crm/Quotes';
import {
  DateField,
  FieldError,
  FieldSelect,
  FilterBar,
  ObjectViews,
  Panel,
  RecordActivityTimeline,
  SearchField,
  StatusBadge,
  WorkspaceHeader,
  WorkspaceToolbar,
} from '@/components/crm/ui';
import { formatDzd, formatDateDisplay } from '@/lib/format';
import { quoteTotal } from '@/lib/quotes';
import type { Quote } from '@/contracts/entities';

export function QuotesPage() {
  const { quotes, setQuotes, contacts, deals, notify, can } = useCrm();
  const state = usePreviewState();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(''),
    [status, setStatus] = useState(''),
    [editing, setEditing] = useState<QuoteRecord | null>(null),
    [creating, setCreating] = useState(false),
    [preview, setPreview] = useState<QuoteRecord | null>(null);
  const rows = (state === 'empty' ? [] : quotes).filter(
    (quote) =>
      `${quote.number} ${quote.customer}`.toLowerCase().includes(query.toLowerCase()) &&
      (!status || quote.status === status),
  );
  const close = () => {
    setEditing(null);
    setCreating(false);
    const next = new URLSearchParams(params);
    next.delete('create');
    setParams(next, { replace: true });
  };
  return (
    <ScreenState permission="quotes.view">
      <section className="page-stack" data-screen-id="SCR-QUOTE-001">
        <WorkspaceHeader
          title="Devis"
          description="Des propositions claires pour faire avancer vos projets."
          count={rows.length}
          actions={
            <EvoButton data-page-primary variant="primary" disabled={!can('crm.edit')} onClick={() => setCreating(true)}>
              <Plus size={17} /> Nouveau devis
            </EvoButton>
          }
        />
        <div className="stat-grid quote-stats">
          <div className="mini-stat">
            <span>Valeur affichée</span>
            <strong className="money">{formatDzd(rows.reduce((sum, quote) => sum + quote.amount, 0))}</strong>
            <small>{rows.length} devis</small>
          </div>
          <div className="mini-stat">
            <span>En attente</span>
            <strong>{rows.filter((quote) => quote.status === 'Envoyé').length}</strong>
            <small>Propositions en attente de réponse</small>
          </div>
          <div className="mini-stat">
            <span>Acceptés</span>
            <strong>{rows.filter((quote) => quote.status === 'Accepté').length}</strong>
            <small>Sans fonctionnalité de paiement</small>
          </div>
        </div>
        <Panel>
          <WorkspaceToolbar label="Filtres et vues des devis">
            <ObjectViews
              value={status}
              onChange={setStatus}
              options={[
                { value: '', label: 'Tous les devis', count: state === 'empty' ? 0 : quotes.length },
                {
                  value: 'Brouillon',
                  label: 'Brouillons',
                  count: state === 'empty' ? 0 : quotes.filter((quote) => quote.status === 'Brouillon').length,
                },
                {
                  value: 'Envoyé',
                  label: 'En attente',
                  count: state === 'empty' ? 0 : quotes.filter((quote) => quote.status === 'Envoyé').length,
                },
                {
                  value: 'Accepté',
                  label: 'Acceptés',
                  count: state === 'empty' ? 0 : quotes.filter((quote) => quote.status === 'Accepté').length,
                },
              ]}
            />
            <FilterBar>
              <SearchField label="Rechercher un devis" value={query} onChange={setQuery} />
              <FieldSelect label="Statut du devis" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="">Tous les statuts</option>
                {['Brouillon', 'Envoyé', 'Accepté'].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </FieldSelect>
            </FilterBar>
          </WorkspaceToolbar>
          {rows.length ? (
            <div className="table-wrap">
              <table>
                <caption className="sr-only">Devis du workspace</caption>
                <thead>
                  <tr>
                    {['Référence', 'Client', 'Montant', 'Statut', 'Expiration', 'Actions'].map((heading) => (
                      <th scope="col" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((quote) => (
                    <tr key={quote.id}>
                      <td>
                        <button className="record-link" onClick={() => setPreview(quote)}>
                          {quote.number}
                        </button>
                      </td>
                      <td>{quote.customer}</td>
                      <td className="money">{formatDzd(quote.amount)}</td>
                      <td>
                        <StatusBadge status={quote.status} />
                      </td>
                      <td>{formatDateDisplay(quote.expiresAt)}</td>
                      <td>
                        <EvoButton disabled={!can('crm.edit')} onClick={() => setEditing(quote)}>
                          Modifier
                        </EvoButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoResults
              title="Aucun devis à afficher"
              detail="Créez une proposition ou modifiez vos filtres."
              action={
                <EvoButton disabled={!can('crm.edit')} onClick={() => setCreating(true)}>
                  Créer un devis
                </EvoButton>
              }
            />
          )}
        </Panel>
        <EvoSheet
          open={can('crm.edit') && (creating || params.get('create') === '1' || !!editing)}
          onOpenChange={(next) => !next && close()}
          title={editing ? `Modifier ${editing.number}` : 'Nouveau devis'}
        >
          <QuoteForm
            key={editing?.id ?? 'new'}
            quote={editing}
            onSave={(quote) => {
              setQuotes((current) => (editing ? current.map((row) => (row.id === quote.id ? quote : row)) : [...current, quote]));
              close();
              notify('Devis enregistré dans cette session.');
            }}
          />
        </EvoSheet>
        <EvoDialog
          open={!!preview}
          onOpenChange={(next) => !next && setPreview(null)}
          title={preview?.number ?? 'Aperçu du devis'}
          description="Aperçu local · aucun envoi ou paiement"
        >
          <div className="print-quote">
            {preview ? (
              <>
                <div className="print-heading">
                  <strong>EvoCRM · Evotechly</strong>
                  <StatusBadge status={preview.status} />
                </div>
                <h2>{preview.number}</h2>
                <p>{preview.customer}</p>
                <p className="muted">
                  Contact : {contacts.find((contact) => contact.id === preview.contactId)?.name ?? 'Non associé'}
                  <br />
                  Deal : {deals.find((deal) => deal.id === preview.dealId)?.name ?? 'Non associé'}
                  <br />
                  Expiration : {formatDateDisplay(preview.expiresAt)}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Qté</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td className="money">{formatDzd(item.unitPrice)}</td>
                        <td className="money">{formatDzd(quoteTotal([item]))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <QuoteSummary items={preview.items} />
                <RecordActivityTimeline items={[]} empty="Aucun événement horodaté n’est fourni pour ce devis." />
              </>
            ) : null}
          </div>
          <EvoButton className="no-print" onClick={() => window.print()}>
            Imprimer le devis
          </EvoButton>
        </EvoDialog>
      </section>
    </ScreenState>
  );
}

function QuoteForm({
  quote,
  onSave,
}: {
  quote: QuoteRecord | null;
  onSave: (quote: QuoteRecord) => void;
}) {
  const { contacts, deals, quotes } = useCrm();
  const [number, setNumber] = useState(
      quote?.number ??
        `DEV-2026-${String(Math.max(14, ...quotes.map((row) => Number(row.number.split('-').at(-1)) || 0)) + 1).padStart(3, '0')}`,
    ),
    [contactId, setContact] = useState(quote?.contactId ?? contacts[0]?.id ?? ''),
    [dealId, setDeal] = useState(quote?.dealId ?? ''),
    [expiration, setExpiration] = useState(quote?.expiration ?? ''),
    [items, setItems] = useState<LineItem[]>(
      quote?.items ?? [{ id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 }],
    ),
    [error, setError] = useState('');
  const customer = contacts.find((contact) => contact.id === contactId)?.company ?? quote?.customer ?? '';
  return (
    <form
      className="form-stack"
      onSubmit={(event) => {
        event.preventDefault();
        if (!number.trim() || !items.length || items.some((item) => !item.description.trim())) {
          setError('Renseignez une référence et au moins une ligne complète.');
          return;
        }
        if (quotes.some((row) => row.number === number && row.id !== quote?.id)) {
          setError('Cette référence existe déjà.');
          return;
        }
        const linked = deals.find((deal) => deal.id === dealId);
        if (linked && linked.company !== customer) {
          setError('Le deal doit appartenir à l’entreprise du contact.');
          return;
        }
        let amount: number;
        try {
          amount = quoteTotal(items);
        } catch {
          setError('Montants invalides ou total trop élevé.');
          return;
        }
        onSave({
          id: quote?.id ?? crypto.randomUUID(),
          number: number.trim(),
          customer,
          contactId,
          dealId,
          expiration,
          expiresAt: expiration ? formatDateDisplay(expiration) : '—',
          status: quote?.status ?? ('Brouillon' as Quote['status']),
          items,
          amount,
        });
      }}
    >
      <EvoInput label="Référence" required value={number} onChange={(event) => setNumber(event.target.value)} />
      <FieldError>{error}</FieldError>
      <FieldSelect
        label="Contact associé"
        required
        value={contactId}
        onChange={(event) => {
          setContact(event.target.value);
          setDeal('');
        }}
      >
        <option value="">Choisir un contact</option>
        {contacts.map((contact) => (
          <option key={contact.id} value={contact.id}>
            {contact.name} · {contact.company}
          </option>
        ))}
      </FieldSelect>
      <FieldSelect label="Deal associé" value={dealId} onChange={(event) => setDeal(event.target.value)}>
        <option value="">Sans deal</option>
        {deals
          .filter((deal) => deal.company === customer)
          .map((deal) => (
            <option key={deal.id} value={deal.id}>
              {deal.name}
            </option>
          ))}
      </FieldSelect>
      <DateField label="Date d’expiration" value={expiration} onChange={(event) => setExpiration(event.target.value)} />
      <p className="muted">Statut : {quote?.status ?? 'Brouillon'} · conservé · aucun envoi externe.</p>
      {items.map((item, index) => (
        <QuoteLineItem
          key={item.id}
          item={item}
          index={index}
          onChange={(next) => setItems((current) => current.map((row) => (row.id === next.id ? next : row)))}
          onRemove={() => setItems((current) => current.filter((row) => row.id !== item.id))}
        />
      ))}
      <EvoButton
        onClick={() =>
          setItems((current) => [
            ...current,
            { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 },
          ])
        }
      >
        + Ajouter une ligne
      </EvoButton>
      <QuoteSummary items={items} />
      <EvoButton type="submit" variant="primary">
        Enregistrer le devis
      </EvoButton>
    </form>
  );
}
