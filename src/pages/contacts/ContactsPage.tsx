import { formatDateDisplay } from '@/lib/format';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ObjectViews } from '@/components/navigation/ObjectViews';
import { Plus } from '@phosphor-icons/react';
import { Button, Panel } from '@/components/ui';
import { Drawer, Popover } from '@/components/ui/Overlays';
import { ScreenState, NoResults, usePreviewState } from '@/components/ui/ScreenState';
import { Input, Select, Checkbox } from '@/components/forms/Fields';
import {
  FilterBar,
  SearchInput,
  Pagination,
  SortControl,
} from '@/components/data-display/Controls';
import { ContactCard, ContactDetailPanel } from '@/components/crm/Contacts';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useCrm } from '@/app/providers/CrmProvider';
import type { Contact, ContactStatus } from '@/contracts/entities';
export function ContactsPage() {
  const { contacts, setContacts, notify, can } = useCrm();
  const state = usePreviewState();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(''),
    [status, setStatus] = useState(''),
    [company, setCompany] = useState(''),
    [sort, setSort] = useState('name'),
    [page, setPage] = useState(1),
    [selected, setSelected] = useState<string[]>([]),
    [columns, setColumns] = useState(['company', 'email', 'status', 'activity']),
    [detail, setDetail] = useState<string | null>(null),
    [editing, setEditing] = useState<Contact | null>(null),
    [creating, setCreating] = useState(false);
  const records = state === 'empty' ? [] : contacts;
  const visible = records
    .filter(
      (c) =>
        `${c.name} ${c.email} ${c.company}`
          .toLocaleLowerCase('fr')
          .includes(query.toLocaleLowerCase('fr')) &&
        (!status || c.status === status) &&
        (!company || c.company === company),
    )
    .sort((a, b) =>
      sort === 'name-desc'
        ? b.name.localeCompare(a.name, 'fr')
        : sort === 'company'
          ? a.company.localeCompare(b.company, 'fr')
          : a.name.localeCompare(b.name, 'fr'),
    );
  const currentPage = Math.min(page, Math.max(1, Math.ceil(visible.length / 3)));
  const rows = visible.slice((currentPage - 1) * 3, currentPage * 3);
  const active = contacts.find((c) => c.id === detail);
  const open = can('crm.edit') && (creating || params.get('create') === '1' || !!editing);
  const close = () => {
    setCreating(false);
    setEditing(null);
    if (params.has('create')) {
      const next = new URLSearchParams(params);
      next.delete('create');
      setParams(next, { replace: true });
    }
  };
  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((v) => v !== id) : [...s, id]));
  return (
    <ScreenState permission="crm.view">
      <section className="page-stack" data-screen-id="SCR-CONTACT-001">
        <div className="page-heading">
          <div>
            <h1>
              Contacts <span className="heading-count">{records.length}</span>
            </h1>
            <p className="muted">Chaque relation commence par une conversation.</p>
          </div>
          <Button
            data-page-primary
            variant="primary"
            disabled={!can('crm.edit')}
            onClick={() => setCreating(true)}
          >
            <Plus size={17} /> Nouveau contact
          </Button>
        </div>
        <Panel>
          <ObjectViews
            value={status}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
            options={[
              { value: '', label: 'Tous les contacts', count: records.length },
              {
                value: 'Actif',
                label: 'Contacts actifs',
                count: records.filter((c) => c.status === 'Actif').length,
              },
              {
                value: 'Prospect',
                label: 'Prospects',
                count: records.filter((c) => c.status === 'Prospect').length,
              },
            ]}
            caption="Relations du workspace"
          />
          <FilterBar>
            <SearchInput
              label="Rechercher un contact"
              value={query}
              onChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
            />
            <Select
              label="Statut"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Tous les statuts</option>
              {['Actif', 'Prospect', 'Inactif'].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </Select>
            <Select
              label="Entreprise"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Toutes les entreprises</option>
              {[...new Set(contacts.map((c) => c.company))].filter(Boolean).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <SortControl
              value={sort}
              onChange={setSort}
              options={[
                { value: 'name', label: 'Nom A–Z' },
                { value: 'name-desc', label: 'Nom Z–A' },
                { value: 'company', label: 'Entreprise' },
              ]}
            />
            <Popover label="Colonnes visibles" trigger={<Button>Colonnes</Button>}>
              <div className="detail-stack">
                {[
                  ['company', 'Entreprise'],
                  ['email', 'Email'],
                  ['status', 'Statut'],
                  ['activity', 'Activité'],
                ].map(([id, label]) => (
                  <Checkbox
                    key={id}
                    label={label}
                    checked={columns.includes(id)}
                    onChange={() =>
                      setColumns((c) => (c.includes(id) ? c.filter((v) => v !== id) : [...c, id]))
                    }
                  />
                ))}
              </div>
            </Popover>
          </FilterBar>
          {selected.length > 0 && (
            <div className="selection-bar" role="status">
              {selected.length} sélectionné(s)
              <Button onClick={() => setSelected([])}>Désélectionner</Button>
            </div>
          )}
          {rows.length ? (
            <>
              <div className="contact-mobile-cards">
                {rows.map((c) => (
                  <article className="contact-mobile-card" key={c.id}>
                    <div className="inline spread">
                      <ContactCard contact={c} onOpen={() => setDetail(c.id)} />
                      {can('crm.bulk') && (
                        <Checkbox
                          label={`Sélectionner ${c.name}`}
                          checked={selected.includes(c.id)}
                          onChange={() => toggle(c.id)}
                        />
                      )}
                    </div>
                    {columns.includes('email') && <a href={`mailto:${c.email}`}>{c.email}</a>}
                    <div className="inline spread">
                      {columns.includes('status') && <StatusBadge status={c.status} />}
                      {columns.includes('activity') && (
                        <small className="muted">{formatDateDisplay(c.lastActivity)}</small>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              <div className="table-wrap contacts-desktop-table">
                <table>
                  <caption className="sr-only">Contacts du workspace</caption>
                  <thead>
                    <tr>
                      {can('crm.bulk') && (
                        <th scope="col">
                          <Checkbox
                            label="Sélectionner la page"
                            checked={rows.every((c) => selected.includes(c.id))}
                            onChange={() =>
                              setSelected((s) =>
                                rows.every((c) => s.includes(c.id))
                                  ? s.filter((id) => !rows.some((c) => c.id === id))
                                  : [...new Set([...s, ...rows.map((c) => c.id)])],
                              )
                            }
                          />
                        </th>
                      )}
                      <th scope="col">Contact</th>
                      {columns.includes('company') && <th scope="col">Entreprise</th>}
                      {columns.includes('email') && <th scope="col">Email</th>}
                      {columns.includes('status') && <th scope="col">Statut</th>}
                      {columns.includes('activity') && <th scope="col">Activité</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((c) => (
                      <tr key={c.id}>
                        {can('crm.bulk') && (
                          <td>
                            <Checkbox
                              label={`Sélectionner ${c.name}`}
                              checked={selected.includes(c.id)}
                              onChange={() => toggle(c.id)}
                            />
                          </td>
                        )}
                        <td>
                          <ContactCard contact={c} onOpen={() => setDetail(c.id)} />
                        </td>
                        {columns.includes('company') && <td>{c.company || '—'}</td>}
                        {columns.includes('email') && (
                          <td>
                            <a href={`mailto:${c.email}`}>{c.email}</a>
                          </td>
                        )}
                        {columns.includes('status') && (
                          <td>
                            <StatusBadge status={c.status} />
                          </td>
                        )}
                        {columns.includes('activity') && (
                          <td>{formatDateDisplay(c.lastActivity)}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <NoResults
              title={
                query || status || company
                  ? 'Aucun contact ne correspond'
                  : 'Votre réseau commence ici'
              }
              detail={
                query || status || company
                  ? 'Essayez un autre nom ou réinitialisez les filtres.'
                  : 'Ajoutez votre premier contact pour démarrer une relation.'
              }
              action={
                query || status || company ? (
                  <Button
                    onClick={() => {
                      setQuery('');
                      setStatus('');
                      setCompany('');
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                ) : (
                  <Button disabled={!can('crm.edit')} onClick={() => setCreating(true)}>
                    Créer un contact
                  </Button>
                )
              }
            />
          )}
          <Pagination page={currentPage} total={visible.length} pageSize={3} onChange={setPage} />
        </Panel>
        <Drawer
          open={!!active && !editing}
          onClose={() => setDetail(null)}
          title={active?.name ?? 'Contact'}
          description="Relation et activité dans le workspace"
        >
          {active && (
            <ContactDetailPanel
              contact={active}
              onEdit={
                can('crm.edit')
                  ? () => {
                      setEditing(active);
                      setDetail(null);
                    }
                  : undefined
              }
            />
          )}
        </Drawer>
        <Drawer
          open={open}
          onClose={close}
          title={editing ? 'Modifier le contact' : 'Nouveau contact'}
        >
          <ContactForm
            key={editing?.id ?? 'new'}
            contact={editing}
            companies={[...new Set(contacts.map((c) => c.company))]}
            onSave={(c) => {
              setContacts((prev) =>
                editing ? prev.map((v) => (v.id === c.id ? c : v)) : [...prev, c],
              );
              setQuery('');
              setStatus('');
              setCompany('');
              setPage(1);
              close();
              notify(
                editing
                  ? 'Contact modifié dans cette session.'
                  : 'Contact créé dans cette session.',
              );
            }}
            existing={contacts}
          />
        </Drawer>
      </section>
    </ScreenState>
  );
}
function ContactForm({
  contact,
  companies,
  existing,
  onSave,
}: {
  contact: Contact | null;
  companies: string[];
  existing: Contact[];
  onSave: (c: Contact) => void;
}) {
  const [name, setName] = useState(contact?.name ?? ''),
    [email, setEmail] = useState(contact?.email ?? ''),
    [company, setCompany] = useState(contact?.company ?? ''),
    [status, setStatus] = useState<ContactStatus>(contact?.status ?? 'Prospect'),
    [error, setError] = useState('');
  return (
    <form
      className="form-stack"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          existing.some(
            (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.id !== contact?.id,
          )
        ) {
          setError('Cette adresse email existe déjà.');
          return;
        }
        if (!name.trim()) {
          setError('Indiquez un nom.');
          return;
        }
        onSave({
          id: contact?.id ?? crypto.randomUUID(),
          name: name.trim(),
          email: email.trim(),
          company,
          status,
          initials: name
            .trim()
            .split(/\s+/)
            .map((v) => v[0])
            .slice(0, 2)
            .join('')
            .toUpperCase(),
          color: contact?.color ?? 'orange',
          lastActivity: 'À l’instant',
        });
      }}
    >
      <Input label="Nom complet" required value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        label="Email"
        required
        type="email"
        value={email}
        error={error}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
      />
      <Select
        label="Entreprise associée"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        <option value="">Sans entreprise</option>
        {companies.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </Select>
      <Select
        label="Statut du contact"
        value={status}
        onChange={(e) => setStatus(e.target.value as ContactStatus)}
      >
        {['Prospect', 'Actif', 'Inactif'].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </Select>
      <p className="muted">Les changements restent en mémoire jusqu’au rechargement.</p>
      <Button type="submit" variant="primary">
        Enregistrer le contact
      </Button>
    </form>
  );
}
