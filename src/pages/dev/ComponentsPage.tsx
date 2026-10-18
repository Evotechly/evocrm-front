import { useState } from 'react';
import { Button, Avatar, Panel, EmptyState, StatCard } from '@/components/ui';
import { Dialog, Drawer, Popover, Tooltip, Toast } from '@/components/ui/Overlays';
import { Input, Select, Checkbox, DatePicker } from '@/components/forms/Fields';
import {
  SearchInput,
  FilterBar,
  Pagination,
  SortControl,
  ViewSwitcher,
  ActivityTimeline,
} from '@/components/data-display/Controls';
import { DataTable } from '@/components/data-display/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ContactCard, ContactDetailPanel } from '@/components/crm/Contacts';
import { KanbanBoard } from '@/components/crm/Deals';
import { ConversationList, MessageThread, MessageComposer } from '@/components/crm/Inbox';
import { QuoteLineItem, QuoteSummary } from '@/components/crm/Quotes';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { WorkspaceSwitcher } from '@/components/navigation/Sidebar';
import { GlobalCreateMenu, UserMenu } from '@/components/navigation/Header';
import { useCrm, type LineItem } from '@/app/providers/CrmProvider';
export function ComponentsPage() {
  const { contacts, deals, threads } = useCrm();
  const [overlay, setOverlay] = useState(''),
    [query, setQuery] = useState(''),
    [page, setPage] = useState(1),
    [sort, setSort] = useState('name'),
    [view, setView] = useState('list'),
    [checked, setChecked] = useState(false),
    [notice, setNotice] = useState(''),
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
        <div className="eyebrow">AURORA NEXT / ATELIER</div>
        <h1>Composants interactifs</h1>
        <p className="muted">
          Contrats et variantes : docs/design-system/components.md. Route exclue en production.
        </p>
      </div>
      <div className="gallery-grid">
        <Panel title="Actions et feedback">
          <div className="gallery-example">
            <div className="inline">
              {(['primary', 'secondary', 'ghost', 'soft', 'danger'] as const).map((v) => (
                <Button key={v} variant={v} onClick={() => setNotice(`Variante ${v} activée`)}>
                  {v}
                </Button>
              ))}
            </div>
            <div className="inline">
              <Button loading>Chargement</Button>
              <Button disabled>Désactivé</Button>
              <Tooltip text="Créer une relation">
                <Button onClick={() => setNotice('Info-bulle testée')}>Info-bulle</Button>
              </Tooltip>
            </div>
            <div className="inline">
              {['Actif', 'Prospect', 'Inactif', 'Envoyé', 'Accepté', 'Perdu'].map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
              {['orange', 'indigo', 'teal', 'purple', 'blue', 'ink'].map((t) => (
                <Avatar key={t} initials="EV" tone={t} />
              ))}
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
            <Checkbox
              label="Recevoir les mises à jour"
              checked={checked}
              onChange={() => setChecked((v) => !v)}
            />
            <DatePicker label="Échéance" />
          </div>
        </Panel>
        <Panel title="Navigation et overlays">
          <div className="gallery-example">
            <WorkspaceSwitcher />
            <div className="inline">
              <GlobalCreateMenu />
              <UserMenu />
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
              rowKey={(c) => c.id}
              query={query}
              matchesQuery={(c, q) => c.name.toLowerCase().includes(q.toLowerCase())}
              pageSize={2}
              selectable
              columns={[
                { key: 'name', label: 'Nom', render: (c) => c.name, sortValue: (c) => c.name },
                {
                  key: 'company',
                  label: 'Entreprise',
                  render: (c) => c.company,
                  sortValue: (c) => c.company,
                },
              ]}
            />
            <Pagination page={page} total={contacts.length} pageSize={2} onChange={setPage} />
            <ActivityTimeline
              items={[
                { title: 'Contact créé', detail: 'Exemple de timeline', time: 'À l’instant' },
              ]}
            />
          </div>
        </Panel>
        <Panel title="Relations">
          <div className="gallery-example">
            <ContactCard contact={contacts[0]} onOpen={() => setOverlay('contact')} />
            <StatCard
              label="Pipeline"
              value="820 000 DA"
              change="Fixture de démonstration"
              icon={<span>↗</span>}
            />
          </div>
        </Panel>
        <Panel title="Devis">
          <div className="gallery-example">
            <QuoteLineItem
              item={item}
              index={0}
              onChange={setItem}
              onRemove={() => setItem({ ...item, quantity: 0 })}
            />
            <QuoteSummary items={[item]} />
          </div>
        </Panel>
      </div>
      <Panel title="Kanban · glisser ou sélectionner une étape">
        <div className="gallery-example">
          <KanbanBoard
            deals={stageDeals}
            onOpen={() => setOverlay('drawer')}
            onMove={(id, stage) =>
              setDeals((ds) => ds.map((d) => (d.id === id ? { ...d, stage } : d)))
            }
            onCreate={() => setOverlay('drawer')}
          />
        </div>
      </Panel>
      <Panel title="Conversations">
        <div className="gallery-example">
          <ConversationList
            threads={threads}
            activeId={threads[0].id}
            onSelect={() => setNotice('Conversation sélectionnée')}
          />
          <MessageThread messages={messages} contact={threads[0].contact} />
          <MessageComposer
            onSend={(body) =>
              setMessages((ms) => [
                ...ms,
                { id: crypto.randomUUID(), body, direction: 'sent', time: 'À l’instant' },
              ])
            }
          />
        </div>
      </Panel>
      <EmptyState
        title="Aucun résultat"
        detail="Exemple de l’état vide"
        action={<Button onClick={() => setNotice('Action de création')}>Créer</Button>}
      />
      <Dialog
        open={overlay === 'dialog'}
        onClose={() => setOverlay('')}
        title="Confirmer une action"
      >
        <Input label="Note" />
        <Button
          onClick={() => {
            setOverlay('');
            setNotice('Action confirmée');
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
          onEdit={() => setNotice('Édition disponible dans Contacts')}
        />
      </Drawer>
      {overlay === 'command' && <CommandPalette onClose={() => setOverlay('')} />}
      <Toast message={notice} onClose={() => setNotice('')} />
    </section>
  );
}
