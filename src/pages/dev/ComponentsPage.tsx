import { formatDzd } from '@/lib/format';
import { useState } from 'react';
import {
  ActivityTimeline,
  Avatar,
  Button,
  Checkbox,
  CommandMenu,
  DataTable,
  DatePicker,
  Dialog,
  Drawer,
  EmptyState,
  FilterBar,
  Input,
  KpiCard,
  Panel,
  Popover,
  SearchInput,
  Select,
  SortControl,
  StatusBadge,
  TablePagination,
  TeamSwitcher,
  Tooltip,
  ViewSwitcher,
  toast,
} from '@evotechly/ui';
import { ContactCard, ContactDetailPanel } from '@/components/crm/Contacts';
import { KanbanBoard } from '@/components/crm/Deals';
import { ConversationList, MessageThread, MessageComposer } from '@/components/crm/Inbox';
import { QuoteLineItem, QuoteSummary } from '@/components/crm/Quotes';
import { useCrm, type LineItem } from '@/app/providers/CrmProvider';

export function ComponentsPage() {
  const { contacts, deals, threads } = useCrm();
  const [overlay, setOverlay] = useState(''),
    [query, setQuery] = useState(''),
    [page, setPage] = useState(1),
    [sort, setSort] = useState('name'),
    [view, setView] = useState('list'),
    [checked, setChecked] = useState(false),
    [item, setItem] = useState<LineItem>({
      id: 'gallery',
      description: 'Prestation',
      quantity: 2,
      unitPrice: 12500,
    }),
    [messages, setMessages] = useState(threads[0].messages),
    [stageDeals, setDeals] = useState(deals);
  return (
    <section className="page-stack">
      <div>
        <h1>Composants interactifs</h1>
        <p className="ev-muted">Galerie EvoUI 0.3.0 — hors production.</p>
      </div>
      <div className="gallery-grid">
        <Panel title="Actions et feedback">
          <div className="gallery-example">
            <div className="inline">
              {(['primary', 'secondary', 'ghost', 'soft', 'danger'] as const).map((variant) => (
                <Button key={variant} variant={variant} onClick={() => toast.information(`Variante ${variant} activée`)}>
                  {variant}
                </Button>
              ))}
            </div>
            <div className="inline">
              <Button loading>Chargement</Button>
              <Button disabled>Désactivé</Button>
              <Tooltip text="Créer une relation">
                <Button onClick={() => toast.information('Info-bulle testée')}>Info-bulle</Button>
              </Tooltip>
            </div>
            <div className="inline">
              {['Actif', 'Prospect', 'Inactif', 'Envoyé', 'Accepté', 'Perdu'].map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
              <Avatar initials="EV" />
            </div>
          </div>
        </Panel>
        <Panel title="Champs">
          <div className="gallery-example">
            <Input label="Nom" placeholder="Votre nom" />
            <Input label="Email invalide" error="Vérifiez cette adresse" defaultValue="exemple" />
            <Input label="Désactivé" disabled value="Lecture seule" />
            <Select label="Choix">
              <option>Option A</option>
              <option>Option B</option>
            </Select>
            <Checkbox label="Recevoir les mises à jour" checked={checked} onChange={() => setChecked((value) => !value)} />
            <DatePicker label="Échéance" />
          </div>
        </Panel>
        <Panel title="Navigation et overlays">
          <div className="gallery-example">
            <TeamSwitcher name="Clinique El Djazair" detail="Espace principal" />
            <div className="inline">
              <Button onClick={() => setOverlay('command')}>Commandes</Button>
              <Button onClick={() => setOverlay('dialog')}>Dialogue</Button>
              <Button onClick={() => setOverlay('drawer')}>Tiroir</Button>
              <Popover label="Exemple de popover" trigger={<Button>Popover</Button>}>
                <Input label="Note contextuelle" />
              </Popover>
            </div>
          </div>
        </Panel>
        <Panel title="Données et contrôles">
          <div className="gallery-example">
            <FilterBar>
              <SearchInput value={query} onChange={setQuery} label="Filtrer la démo" />
              <SortControl
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'name', label: 'Nom' },
                  { value: 'value', label: 'Montant' },
                ]}
              />
            </FilterBar>
            <ViewSwitcher
              value={view}
              onChange={setView}
              options={[
                { value: 'list', label: 'Liste' },
                { value: 'board', label: 'Board' },
              ]}
            />
            <DataTable
              data={contacts}
              caption="Contacts de démonstration"
              rowKey={(contact) => contact.id}
              query={query}
              matchesQuery={(contact, value) => contact.name.toLowerCase().includes(value.toLowerCase())}
              pageSize={2}
              selectable
              columns={[
                { key: 'name', label: 'Nom', render: (contact) => contact.name, sortValue: (contact) => contact.name },
                {
                  key: 'company',
                  label: 'Entreprise',
                  render: (contact) => contact.company,
                  sortValue: (contact) => contact.company,
                },
              ]}
            />
            <TablePagination page={page} total={contacts.length} pageSize={2} onChange={setPage} />
            <ActivityTimeline items={[{ title: 'Contact créé', detail: 'Exemple de timeline', time: 'À l’instant' }]} />
          </div>
        </Panel>
        <Panel title="Relations">
          <div className="gallery-example">
            <ContactCard contact={contacts[0]} onOpen={() => setOverlay('contact')} />
            <KpiCard label="Pipeline" value={formatDzd(820000)} monetary hint="Fixture de démonstration" />
          </div>
        </Panel>
        <Panel title="Devis">
          <div className="gallery-example">
            <QuoteLineItem item={item} index={0} onChange={setItem} onRemove={() => setItem({ ...item, quantity: 0 })} />
            <QuoteSummary items={[item]} />
          </div>
        </Panel>
      </div>
      <Panel title="Kanban · glisser ou sélectionner une étape">
        <div className="gallery-example">
          <KanbanBoard
            deals={stageDeals}
            onOpen={() => setOverlay('drawer')}
            onMove={(id, stage) => setDeals((rows) => rows.map((deal) => (deal.id === id ? { ...deal, stage } : deal)))}
            onCreate={() => setOverlay('drawer')}
          />
        </div>
      </Panel>
      <Panel title="Conversations">
        <div className="gallery-example">
          <ConversationList
            threads={threads}
            activeId={threads[0].id}
            onSelect={() => toast.information('Conversation sélectionnée')}
          />
          <MessageThread messages={messages} contact={threads[0].contact} />
          <MessageComposer
            onSend={(body) =>
              setMessages((rows) => [...rows, { id: crypto.randomUUID(), body, direction: 'sent', time: 'À l’instant' }])
            }
          />
        </div>
      </Panel>
      <EmptyState
        title="Aucun résultat"
        detail="Exemple de l’état vide"
        action={<Button onClick={() => toast.information('Action de création')}>Créer</Button>}
      />
      <Dialog open={overlay === 'dialog'} onClose={() => setOverlay('')} title="Confirmer une action">
        <Input label="Note" />
        <Button
          onClick={() => {
            setOverlay('');
            toast.information('Action confirmée');
          }}
        >
          Confirmer
        </Button>
      </Dialog>
      <Drawer
        open={overlay === 'drawer' || overlay === 'contact'}
        onClose={() => setOverlay('')}
        title="Détail de contact"
      >
        <ContactDetailPanel
          contact={contacts[0]}
          onEdit={() => toast.information('Édition disponible dans Contacts')}
        />
      </Drawer>
      <CommandMenu
        open={overlay === 'command'}
        onOpenChange={(open) => !open && setOverlay('')}
        title="Palette de commandes"
        items={[{ id: 'home', label: 'Accueil', onSelect: () => setOverlay('') }]}
      />
    </section>
  );
}
