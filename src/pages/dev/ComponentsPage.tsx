import { formatDzd } from '@/lib/format';
import { useState } from 'react';
import {
  EvoAvatar,
  EvoButton,
  EvoCheckbox,
  EvoCommandInput,
  EvoCommandItem,
  EvoCommandList,
  EvoCommandPalette,
  EvoDataTable,
  EvoDialog,
  EvoEmptyState,
  EvoInput,
  EvoKpiCard,
  EvoOrgSwitcher,
  EvoPopover,
  EvoSheet,
  EvoTooltip,
  toast,
} from '@evotechly/ui';
import { ContactCard, ContactDetailPanel } from '@/components/crm/Contacts';
import { KanbanBoard } from '@/components/crm/Deals';
import { ConversationList, MessageThread, MessageComposer } from '@/components/crm/Inbox';
import { QuoteLineItem, QuoteSummary } from '@/components/crm/Quotes';
import {
  DateField,
  FieldSelect,
  FilterBar,
  Panel,
  RecordActivityTimeline,
  SearchField,
  SortControl,
  StatusBadge,
  TablePagination,
  ViewSwitcher,
} from '@/components/crm/ui';
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
              {(['primary', 'secondary', 'ghost', 'outline', 'danger'] as const).map((variant) => (
                <EvoButton key={variant} variant={variant} onClick={() => toast(`Variante ${variant} activée`)}>
                  {variant}
                </EvoButton>
              ))}
            </div>
            <div className="inline">
              <EvoButton disabled>Désactivé</EvoButton>
              <EvoTooltip content="Créer une relation">
                <EvoButton onClick={() => toast('Info-bulle testée')}>Info-bulle</EvoButton>
              </EvoTooltip>
            </div>
            <div className="inline">
              {['Actif', 'Prospect', 'Inactif', 'Envoyé', 'Accepté', 'Perdu'].map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
              <EvoAvatar fallback="EV" alt="Evotechly" />
            </div>
          </div>
        </Panel>
        <Panel title="Champs">
          <div className="gallery-example">
            <EvoInput label="Nom" placeholder="Votre nom" />
            <EvoInput label="Email invalide" defaultValue="exemple" />
            <EvoInput label="Désactivé" disabled value="Lecture seule" />
            <FieldSelect label="Choix" defaultValue="a">
              <option value="a">Option A</option>
              <option value="b">Option B</option>
            </FieldSelect>
            <EvoCheckbox
              label="Recevoir les mises à jour"
              checked={checked}
              onCheckedChange={(value) => setChecked(value === true)}
            />
            <DateField label="Échéance" />
          </div>
        </Panel>
        <Panel title="Navigation et overlays">
          <div className="gallery-example">
            <EvoOrgSwitcher
              orgs={[
                { id: 'clinique', name: 'Clinique El Djazair', role: 'Espace principal' },
                { id: 'ibn', name: 'Hôpital Ibn Sina', role: 'Établissement' },
              ]}
            />
            <div className="inline">
              <EvoButton onClick={() => setOverlay('command')}>Commandes</EvoButton>
              <EvoButton onClick={() => setOverlay('dialog')}>Dialogue</EvoButton>
              <EvoButton onClick={() => setOverlay('drawer')}>Tiroir</EvoButton>
              <EvoPopover content={<EvoInput label="Note contextuelle" />}>
                <EvoButton>Popover</EvoButton>
              </EvoPopover>
            </div>
          </div>
        </Panel>
        <Panel title="Données et contrôles">
          <div className="gallery-example">
            <FilterBar>
              <SearchField value={query} onChange={setQuery} label="Filtrer la démo" />
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
            <EvoDataTable
              data={contacts.filter((contact) =>
                contact.name.toLowerCase().includes(query.toLowerCase()),
              )}
              columns={[
                { accessorKey: 'name', header: 'Nom' },
                { accessorKey: 'company', header: 'Entreprise' },
              ]}
            />
            <TablePagination page={page} total={contacts.length} pageSize={2} onChange={setPage} />
            <RecordActivityTimeline
              items={[{ title: 'Contact créé', detail: 'Exemple de timeline', time: 'À l’instant' }]}
            />
          </div>
        </Panel>
        <Panel title="Relations">
          <div className="gallery-example">
            <ContactCard contact={contacts[0]} onOpen={() => setOverlay('contact')} />
            <EvoKpiCard label="Pipeline" value={formatDzd(820000)} delta="Fixture de démonstration" />
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
            onMove={(id, stage) =>
              setDeals((rows) => rows.map((deal) => (deal.id === id ? { ...deal, stage } : deal)))
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
            onSelect={() => toast('Conversation sélectionnée')}
          />
          <MessageThread messages={messages} contact={threads[0].contact} />
          <MessageComposer
            onSend={(body) =>
              setMessages((rows) => [...rows, { id: crypto.randomUUID(), body, direction: 'sent', time: 'À l’instant' }])
            }
          />
        </div>
      </Panel>
      <EvoEmptyState
        title="Aucun résultat"
        description="Exemple de l’état vide"
        action={<EvoButton onClick={() => toast('Action de création')}>Créer</EvoButton>}
      />
      <EvoDialog open={overlay === 'dialog'} onOpenChange={(open) => !open && setOverlay('')} title="Confirmer une action">
        <EvoInput label="Note" />
        <EvoButton
          onClick={() => {
            setOverlay('');
            toast('Action confirmée');
          }}
        >
          Confirmer
        </EvoButton>
      </EvoDialog>
      <EvoSheet
        open={overlay === 'drawer' || overlay === 'contact'}
        onOpenChange={(open) => !open && setOverlay('')}
        title="Détail de contact"
      >
        <ContactDetailPanel
          contact={contacts[0]}
          onEdit={() => toast('Édition disponible dans Contacts')}
        />
      </EvoSheet>
      <EvoCommandPalette open={overlay === 'command'} onOpenChange={(open) => !open && setOverlay('')}>
        <EvoCommandInput />
        <EvoCommandList>
          <EvoCommandItem value="Accueil" onSelect={() => setOverlay('')}>
            Accueil
          </EvoCommandItem>
        </EvoCommandList>
      </EvoCommandPalette>
    </section>
  );
}
