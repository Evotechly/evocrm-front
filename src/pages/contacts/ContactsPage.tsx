import { formatDateDisplay } from '@/lib/format';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { EvoButton, EvoCheckbox, EvoInput, EvoPopover, EvoSheet } from '@evotechly/ui';
import { ScreenState, NoResults, usePreviewState } from '@/app/ScreenState';
import { ContactCard, ContactDetailPanel } from '@/components/crm/Contacts';
import {
  BulkActionBar,
  FieldError,
  FieldSelect,
  FilterBar,
  ObjectViews,
  Panel,
  SearchField,
  SortControl,
  StatusBadge,
  TablePagination,
  WorkspaceHeader,
  WorkspaceToolbar,
} from '@/components/crm/ui';
import { useCrm } from '@/app/providers/CrmProvider';
import type { Contact, ContactStatus } from '@/contracts/entities';

export function ContactsPage() {
  const { contacts, setContacts, notify, can } = useCrm();
  const state = usePreviewState();
  const [params, setParams] = useSearchParams();
  const primaryRef = useRef<HTMLButtonElement>(null);
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
      (contact) =>
        `${contact.name} ${contact.email} ${contact.company}`
          .toLocaleLowerCase('fr')
          .includes(query.toLocaleLowerCase('fr')) &&
        (!status || contact.status === status) &&
        (!company || contact.company === company),
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
  const active = contacts.find((contact) => contact.id === detail);
  const open = can('crm.edit') && (creating || params.get('create') === '1' || !!editing);
  const close = () => {
    setCreating(false);
    setEditing(null);
    if (params.has('create')) {
      const next = new URLSearchParams(params);
      next.delete('create');
      setParams(next, { replace: true });
    }
    requestAnimationFrame(() => primaryRef.current?.focus());
  };
  const toggle = (id: string) =>
    setSelected((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));
  return (
    <ScreenState permission="crm.view">
      <section className="page-stack" data-screen-id="SCR-CONTACT-001">
        <WorkspaceHeader
          title="Contacts"
          description="Chaque relation commence par une conversation."
          count={records.length}
          actions={
            <EvoButton asChild variant="primary">
              <button
                ref={primaryRef}
                data-page-primary
                type="button"
                disabled={!can('crm.edit')}
                onClick={() => setCreating(true)}
              >
                <Plus size={17} /> Nouveau contact
              </button>
            </EvoButton>
          }
        />
        <Panel>
          <WorkspaceToolbar label="Filtres et vues des contacts">
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
                  count: records.filter((contact) => contact.status === 'Actif').length,
                },
                {
                  value: 'Prospect',
                  label: 'Prospects',
                  count: records.filter((contact) => contact.status === 'Prospect').length,
                },
              ]}
              caption="Relations du workspace"
            />
            <FilterBar>
              <SearchField
                label="Rechercher un contact"
                value={query}
                onChange={(value) => {
                  setQuery(value);
                  setPage(1);
                }}
              />
              <FieldSelect
                label="Statut"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">Tous les statuts</option>
                {['Actif', 'Prospect', 'Inactif'].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </FieldSelect>
              <FieldSelect
                label="Entreprise"
                value={company}
                onChange={(event) => {
                  setCompany(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">Toutes les entreprises</option>
                {[...new Set(contacts.map((contact) => contact.company))].filter(Boolean).map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </FieldSelect>
              <SortControl
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'name', label: 'Nom A–Z' },
                  { value: 'name-desc', label: 'Nom Z–A' },
                  { value: 'company', label: 'Entreprise' },
                ]}
              />
              <EvoPopover
                content={
                  <div className="detail-stack">
                    {[
                      ['company', 'Entreprise'],
                      ['email', 'Email'],
                      ['status', 'Statut'],
                      ['activity', 'Activité'],
                    ].map(([id, label]) => (
                      <EvoCheckbox
                        key={id}
                        label={label}
                        checked={columns.includes(id)}
                        onCheckedChange={() =>
                          setColumns((current) =>
                            current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
                          )
                        }
                      />
                    ))}
                  </div>
                }
              >
                <EvoButton variant="secondary">Colonnes</EvoButton>
              </EvoPopover>
            </FilterBar>
            <BulkActionBar selectedCount={selected.length} onClear={() => setSelected([])} />
          </WorkspaceToolbar>
          {rows.length ? (
            <>
              <div className="contact-mobile-cards">
                {rows.map((contact) => (
                  <article className="contact-mobile-card" key={contact.id}>
                    <div className="inline spread">
                      <ContactCard contact={contact} onOpen={() => setDetail(contact.id)} />
                      {can('crm.bulk') ? (
                        <EvoCheckbox
                          label={`Sélectionner ${contact.name}`}
                          checked={selected.includes(contact.id)}
                          onCheckedChange={() => toggle(contact.id)}
                        />
                      ) : null}
                    </div>
                    {columns.includes('email') ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : null}
                    <div className="inline spread">
                      {columns.includes('status') ? <StatusBadge status={contact.status} /> : null}
                      {columns.includes('activity') ? (
                        <small className="muted">{formatDateDisplay(contact.lastActivity)}</small>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
              <div className="table-wrap contacts-desktop-table">
                <table>
                  <caption className="sr-only">Contacts du workspace</caption>
                  <thead>
                    <tr>
                      {can('crm.bulk') ? (
                        <th scope="col">
                          <EvoCheckbox
                            label="Sélectionner la page"
                            checked={rows.every((contact) => selected.includes(contact.id))}
                            onCheckedChange={() =>
                              setSelected((current) =>
                                rows.every((contact) => current.includes(contact.id))
                                  ? current.filter((id) => !rows.some((contact) => contact.id === id))
                                  : [...new Set([...current, ...rows.map((contact) => contact.id)])],
                              )
                            }
                          />
                        </th>
                      ) : null}
                      <th scope="col">Contact</th>
                      {columns.includes('company') ? <th scope="col">Entreprise</th> : null}
                      {columns.includes('email') ? <th scope="col">Email</th> : null}
                      {columns.includes('status') ? <th scope="col">Statut</th> : null}
                      {columns.includes('activity') ? <th scope="col">Activité</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((contact) => (
                      <tr key={contact.id}>
                        {can('crm.bulk') ? (
                          <td>
                            <EvoCheckbox
                              label={`Sélectionner ${contact.name}`}
                              checked={selected.includes(contact.id)}
                              onCheckedChange={() => toggle(contact.id)}
                            />
                          </td>
                        ) : null}
                        <td>
                          <ContactCard contact={contact} onOpen={() => setDetail(contact.id)} />
                        </td>
                        {columns.includes('company') ? <td>{contact.company || '—'}</td> : null}
                        {columns.includes('email') ? (
                          <td>
                            <a href={`mailto:${contact.email}`}>{contact.email}</a>
                          </td>
                        ) : null}
                        {columns.includes('status') ? (
                          <td>
                            <StatusBadge status={contact.status} />
                          </td>
                        ) : null}
                        {columns.includes('activity') ? <td>{formatDateDisplay(contact.lastActivity)}</td> : null}
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
                  <EvoButton
                    onClick={() => {
                      setQuery('');
                      setStatus('');
                      setCompany('');
                    }}
                  >
                    Réinitialiser les filtres
                  </EvoButton>
                ) : (
                  <EvoButton disabled={!can('crm.edit')} onClick={() => setCreating(true)}>
                    Créer un contact
                  </EvoButton>
                )
              }
            />
          )}
          <TablePagination page={currentPage} total={visible.length} pageSize={3} onChange={setPage} />
        </Panel>
        <EvoSheet
          open={!!active && !editing}
          onOpenChange={(next) => {
            if (!next) setDetail(null);
          }}
          title={active?.name ?? 'Contact'}
        >
          {active ? (
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
          ) : null}
        </EvoSheet>
        <EvoSheet open={open} onOpenChange={(next) => !next && close()} title={editing ? 'Modifier le contact' : 'Nouveau contact'}>
          <ContactForm
            key={editing?.id ?? 'new'}
            contact={editing}
            companies={[...new Set(contacts.map((contact) => contact.company))]}
            onSave={(contact) => {
              setContacts((prev) =>
                editing ? prev.map((value) => (value.id === contact.id ? contact : value)) : [...prev, contact],
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
        </EvoSheet>
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
  onSave: (contact: Contact) => void;
}) {
  const [name, setName] = useState(contact?.name ?? ''),
    [email, setEmail] = useState(contact?.email ?? ''),
    [company, setCompany] = useState(contact?.company ?? ''),
    [status, setStatus] = useState<ContactStatus>(contact?.status ?? 'Prospect'),
    [error, setError] = useState('');
  return (
    <form
      className="form-stack"
      onSubmit={(event) => {
        event.preventDefault();
        if (
          existing.some(
            (row) => row.email.toLowerCase() === email.trim().toLowerCase() && row.id !== contact?.id,
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
            .map((value) => value[0])
            .slice(0, 2)
            .join('')
            .toUpperCase(),
          color: contact?.color ?? 'orange',
          lastActivity: 'À l’instant',
        });
      }}
    >
      <EvoInput label="Nom complet" required value={name} onChange={(event) => setName(event.target.value)} />
      <EvoInput
        label="Email"
        required
        type="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setError('');
        }}
      />
      <FieldError>{error}</FieldError>
      <FieldSelect label="Entreprise associée" value={company} onChange={(event) => setCompany(event.target.value)}>
        <option value="">Sans entreprise</option>
        {companies.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </FieldSelect>
      <FieldSelect
        label="Statut du contact"
        value={status}
        onChange={(event) => setStatus(event.target.value as ContactStatus)}
      >
        {['Prospect', 'Actif', 'Inactif'].map((value) => (
          <option key={value}>{value}</option>
        ))}
      </FieldSelect>
      <p className="muted">Les changements restent en mémoire jusqu’au rechargement.</p>
      <EvoButton type="submit" variant="primary">
        Enregistrer le contact
      </EvoButton>
    </form>
  );
}
