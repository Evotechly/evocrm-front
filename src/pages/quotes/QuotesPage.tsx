import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { useCrm, type QuoteRecord, type LineItem } from '@/app/providers/CrmProvider';
import { Button, Panel } from '@/components/ui';
import { Drawer, Dialog } from '@/components/ui/Overlays';
import { ScreenState, usePreviewState, NoResults } from '@/components/ui/ScreenState';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Input, Select, DatePicker } from '@/components/forms/Fields';
import { FilterBar, SearchInput } from '@/components/data-display/Controls';
import { QuoteLineItem, QuoteSummary } from '@/components/crm/Quotes';
import { formatDzd } from '@/lib/format';
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
    (q) =>
      `${q.number} ${q.customer}`.toLowerCase().includes(query.toLowerCase()) &&
      (!status || q.status === status),
  );
  const close = () => {
    setEditing(null);
    setCreating(false);
    const n = new URLSearchParams(params);
    n.delete('create');
    setParams(n, { replace: true });
  };
  return (
    <ScreenState permission="quotes.view">
      <section className="page-stack" data-screen-id="SCR-QUOTE-001">
        <div className="page-heading">
          <div>
            <div className="eyebrow">PROPOSITIONS / CRM</div>
            <h1>Devis</h1>
            <p className="muted">Des propositions claires pour faire avancer vos projets.</p>
          </div>
          <Button
            data-page-primary
            variant="primary"
            disabled={!can('crm.edit')}
            onClick={() => setCreating(true)}
          >
            <Plus size={17} /> Nouveau devis
          </Button>
        </div>
        <div className="stat-grid quote-stats">
          <div className="mini-stat">
            <span>Valeur affichée</span>
            <strong>{formatDzd(rows.reduce((s, q) => s + q.amount, 0))}</strong>
            <small>{rows.length} devis</small>
          </div>
          <div className="mini-stat">
            <span>En attente</span>
            <strong>{rows.filter((q) => q.status === 'Envoyé').length}</strong>
            <small>Propositions en attente de réponse</small>
          </div>
          <div className="mini-stat">
            <span>Acceptés</span>
            <strong>{rows.filter((q) => q.status === 'Accepté').length}</strong>
            <small>Sans fonctionnalité de paiement</small>
          </div>
        </div>
        <Panel>
          <FilterBar>
            <SearchInput label="Rechercher un devis" value={query} onChange={setQuery} />
            <Select
              label="Statut du devis"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              {['Brouillon', 'Envoyé', 'Accepté'].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
          </FilterBar>
          {rows.length ? (
            <div className="table-wrap">
              <table>
                <caption className="sr-only">Devis du workspace</caption>
                <thead>
                  <tr>
                    {['Référence', 'Client', 'Montant', 'Statut', 'Expiration', 'Actions'].map(
                      (h) => (
                        <th scope="col" key={h}>
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((q) => (
                    <tr key={q.id}>
                      <td>
                        <button className="record-link" onClick={() => setPreview(q)}>
                          {q.number}
                        </button>
                      </td>
                      <td>{q.customer}</td>
                      <td className="money">{formatDzd(q.amount)}</td>
                      <td>
                        <StatusBadge status={q.status} />
                      </td>
                      <td>{q.expiresAt}</td>
                      <td>
                        <Button disabled={!can('crm.edit')} onClick={() => setEditing(q)}>
                          Modifier
                        </Button>
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
                <Button disabled={!can('crm.edit')} onClick={() => setCreating(true)}>
                  Créer un devis
                </Button>
              }
            />
          )}
        </Panel>
        <Drawer
          open={can('crm.edit') && (creating || params.get('create') === '1' || !!editing)}
          onClose={close}
          title={editing ? `Modifier ${editing.number}` : 'Nouveau devis'}
        >
          <QuoteForm
            key={editing?.id ?? 'new'}
            quote={editing}
            onSave={(q) => {
              setQuotes((qs) => (editing ? qs.map((v) => (v.id === q.id ? q : v)) : [...qs, q]));
              close();
              notify('Devis enregistré dans cette session.');
            }}
          />
        </Drawer>
        <Dialog
          open={!!preview}
          onClose={() => setPreview(null)}
          title={preview?.number ?? 'Aperçu du devis'}
          description="Aperçu local · aucun envoi ou paiement"
        >
          <div className="print-quote">
            {preview && (
              <>
                <div className="print-heading">
                  <strong>EvoCRM · Evotechly</strong>
                  <StatusBadge status={preview.status} />
                </div>
                <h2>{preview.number}</h2>
                <p>{preview.customer}</p>
                <p className="muted">
                  Contact :{' '}
                  {contacts.find((c) => c.id === preview.contactId)?.name ?? 'Non associé'}
                  <br />
                  Deal : {deals.find((d) => d.id === preview.dealId)?.name ?? 'Non associé'}
                  <br />
                  Expiration : {preview.expiresAt}
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
                    {preview.items.map((i) => (
                      <tr key={i.id}>
                        <td>{i.description}</td>
                        <td>{i.quantity}</td>
                        <td>{formatDzd(i.unitPrice)}</td>
                        <td>{formatDzd(quoteTotal([i]))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <QuoteSummary items={preview.items} />
              </>
            )}
          </div>
          <Button className="no-print" onClick={() => window.print()}>
            Imprimer le devis
          </Button>
        </Dialog>
      </section>
    </ScreenState>
  );
}
function QuoteForm({
  quote,
  onSave,
}: {
  quote: QuoteRecord | null;
  onSave: (q: QuoteRecord) => void;
}) {
  const { contacts, deals, quotes } = useCrm();
  const [number, setNumber] = useState(
      quote?.number ??
        `DEV-2026-${String(Math.max(14, ...quotes.map((q) => Number(q.number.split('-').at(-1)) || 0)) + 1).padStart(3, '0')}`,
    ),
    [contactId, setContact] = useState(quote?.contactId ?? contacts[0]?.id ?? ''),
    [dealId, setDeal] = useState(quote?.dealId ?? ''),
    [expiration, setExpiration] = useState(quote?.expiration ?? ''),
    [items, setItems] = useState<LineItem[]>(
      quote?.items ?? [{ id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 }],
    ),
    [error, setError] = useState('');
  const customer = contacts.find((c) => c.id === contactId)?.company ?? quote?.customer ?? '';
  return (
    <form
      className="form-stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (!number.trim() || !items.length || items.some((i) => !i.description.trim())) {
          setError('Renseignez une référence et au moins une ligne complète.');
          return;
        }
        if (quotes.some((q) => q.number === number && q.id !== quote?.id)) {
          setError('Cette référence existe déjà.');
          return;
        }
        const linked = deals.find((d) => d.id === dealId);
        if (linked && linked.company !== customer) {
          setError('Le deal doit appartenir à l’entreprise du contact.');
          return;
        }
        onSave({
          id: quote?.id ?? crypto.randomUUID(),
          number: number.trim(),
          customer,
          contactId,
          dealId,
          expiration,
          expiresAt: expiration
            ? new Intl.DateTimeFormat('fr-DZ', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(`${expiration}T12:00:00Z`))
            : '—',
          status: quote?.status ?? ('Brouillon' as Quote['status']),
          items,
          amount: quoteTotal(items),
        });
      }}
    >
      <Input
        label="Référence"
        required
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        error={error}
      />
      <Select
        label="Contact associé"
        required
        value={contactId}
        onChange={(e) => {
          setContact(e.target.value);
          setDeal('');
        }}
      >
        <option value="">Choisir un contact</option>
        {contacts.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} · {c.company}
          </option>
        ))}
      </Select>
      <Select label="Deal associé" value={dealId} onChange={(e) => setDeal(e.target.value)}>
        <option value="">Sans deal</option>
        {deals
          .filter((d) => d.company === customer)
          .map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
      </Select>
      <DatePicker
        label="Date d’expiration"
        value={expiration}
        onChange={(e) => setExpiration(e.target.value)}
      />
      <p className="muted">
        Statut : {quote?.status ?? 'Brouillon'} · conservé · aucun envoi externe.
      </p>
      {items.map((item, index) => (
        <QuoteLineItem
          key={item.id}
          item={item}
          index={index}
          onChange={(next) => setItems((is) => is.map((i) => (i.id === next.id ? next : i)))}
          onRemove={() => setItems((is) => is.filter((i) => i.id !== item.id))}
        />
      ))}
      <Button
        onClick={() =>
          setItems((is) => [
            ...is,
            { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 },
          ])
        }
      >
        + Ajouter une ligne
      </Button>
      <QuoteSummary items={items} />
      <Button type="submit" variant="primary">
        Enregistrer le devis
      </Button>
    </form>
  );
}
