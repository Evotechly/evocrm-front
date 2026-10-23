import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { EvoButton, EvoInput, EvoSheet } from '@evotechly/ui';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { ScreenState, NoResults, usePreviewState } from '@/app/ScreenState';
import { KanbanBoard, stages, probabilities } from '@/components/crm/Deals';
import {
  FieldSelect,
  FilterBar,
  Panel,
  RecordActivityTimeline,
  SearchField,
  SortControl,
  StatusBadge,
  ViewSwitcher,
  WorkspaceHeader,
  WorkspaceToolbar,
} from '@/components/crm/ui';
import type { Deal } from '@/contracts/entities';
import { formatDzd } from '@/lib/format';

export function DealsPage({ board = false }: { board?: boolean }) {
  const { navigate } = useNavigation();
  const { deals, setDeals, contacts, notify, can } = useCrm();
  const state = usePreviewState();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(''),
    [owner, setOwner] = useState(''),
    [stage, setStage] = useState(''),
    [sort, setSort] = useState('name'),
    [editing, setEditing] = useState<Deal | null>(null),
    [creating, setCreating] = useState(false),
    [createStage, setCreateStage] = useState('Qualification');
  const rows = (state === 'empty' ? [] : deals)
    .filter(
      (deal) =>
        `${deal.name} ${deal.company}`.toLowerCase().includes(query.toLowerCase()) &&
        (!owner || deal.owner === owner) &&
        (!stage || deal.stage === stage),
    )
    .sort((a, b) => (sort === 'value' ? b.value - a.value : a.name.localeCompare(b.name, 'fr')));
  const close = () => {
    setCreating(false);
    setEditing(null);
    const next = new URLSearchParams(params);
    next.delete('create');
    setParams(next, { replace: true });
  };
  const move = (id: string, next: string) => {
    if (!can('crm.edit') || !stages.includes(next)) return;
    setDeals((current) =>
      current.map((deal) =>
        deal.id === id
          ? { ...deal, stage: next, probability: probabilities[next], updatedAt: 'À l’instant' }
          : deal,
      ),
    );
    notify(`Deal déplacé vers ${next}. Totaux recalculés.`);
  };
  const create = (nextStage = 'Qualification') => {
    setCreateStage(nextStage);
    setCreating(true);
  };
  return (
    <ScreenState permission="crm.view">
      <section className="page-stack" data-screen-id={board ? 'SCR-DEAL-002' : 'SCR-DEAL-001'}>
        <WorkspaceHeader
          title={board ? 'Pipeline' : 'Deals'}
          description="De la première rencontre à la prochaine réussite."
          count={rows.length}
          actions={
            <EvoButton data-page-primary variant="primary" disabled={!can('crm.edit')} onClick={() => create()}>
              <Plus size={17} /> Nouveau deal
            </EvoButton>
          }
        />
        <div className="forecast-strip">
          <div>
            <span>Pipeline ouvert</span>
            <strong className="money">
              {formatDzd(
                rows
                  .filter((deal) => !['Gagné', 'Perdu'].includes(deal.stage))
                  .reduce((sum, deal) => sum + deal.value, 0),
              )}
            </strong>
          </div>
          <div>
            <span>Prévision pondérée ouverte</span>
            <strong className="money">
              {formatDzd(
                rows
                  .filter((deal) => !['Gagné', 'Perdu'].includes(deal.stage))
                  .reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0),
              )}
            </strong>
          </div>
          <div>
            <span>Opportunités affichées</span>
            <strong>{rows.length}</strong>
          </div>
        </div>
        <div className="inline spread">
          <ViewSwitcher
            value={board ? 'board' : 'list'}
            options={[
              { value: 'list', label: 'Liste' },
              { value: 'board', label: 'Pipeline' },
            ]}
            onChange={(value) =>
              navigate(`/crm/deals${value === 'board' ? '/board' : ''}${params.toString() ? `?${params}` : ''}`)
            }
          />
          <span className="muted">Glissez une carte ou utilisez son sélecteur d’étape.</span>
        </div>
        <Panel>
          <WorkspaceToolbar label="Filtres des deals">
            <FilterBar>
              <SearchField label="Rechercher un deal" value={query} onChange={setQuery} />
              <FieldSelect label="Responsable" value={owner} onChange={(event) => setOwner(event.target.value)}>
                <option value="">Tous les responsables</option>
                {[...new Set(deals.map((deal) => deal.owner))].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </FieldSelect>
              <FieldSelect label="Étape" value={stage} onChange={(event) => setStage(event.target.value)}>
                <option value="">Toutes les étapes</option>
                {stages.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </FieldSelect>
              <SortControl
                value={sort}
                onChange={setSort}
                options={[
                  { value: 'name', label: 'Nom A–Z' },
                  { value: 'value', label: 'Montant décroissant' },
                ]}
              />
            </FilterBar>
          </WorkspaceToolbar>
        </Panel>
        {!rows.length ? (
          <NoResults
            title="Aucun deal à afficher"
            detail="Ajoutez une opportunité ou modifiez vos filtres."
            action={
              <EvoButton disabled={!can('crm.edit')} onClick={() => create()}>
                Créer un deal
              </EvoButton>
            }
          />
        ) : board ? (
          <KanbanBoard
            deals={rows}
            onMove={move}
            onOpen={setEditing}
            onCreate={create}
            disabled={!can('crm.edit')}
          />
        ) : (
          <Panel>
            <div className="table-wrap">
              <table>
                <caption className="sr-only">Opportunités commerciales</caption>
                <thead>
                  <tr>
                    {['Deal', 'Entreprise', 'Montant', 'Probabilité', 'Responsable', 'Étape'].map((heading) => (
                      <th scope="col" key={heading}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((deal) => (
                    <tr key={deal.id}>
                      <td>
                        <button className="record-link" onClick={() => setEditing(deal)}>
                          {deal.name}
                        </button>
                        <small className="cell-meta">{deal.updatedAt}</small>
                      </td>
                      <td>{deal.company}</td>
                      <td className="money">{formatDzd(deal.value)}</td>
                      <td>{deal.probability}%</td>
                      <td>{deal.owner}</td>
                      <td>
                        <StatusBadge status={deal.stage} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}
        <EvoSheet
          open={can('crm.edit') && (creating || params.get('create') === '1' || !!editing)}
          onOpenChange={(next) => !next && close()}
          title={editing ? 'Détail du deal' : 'Nouveau deal'}
        >
          <DealForm
            key={editing?.id ?? createStage}
            deal={editing}
            stage={createStage}
            companies={[...new Set(contacts.map((contact) => contact.company))]}
            onSave={(deal) => {
              setDeals((current) => (editing ? current.map((value) => (value.id === deal.id ? deal : value)) : [...current, deal]));
              close();
              notify('Deal enregistré dans cette session.');
            }}
          />
        </EvoSheet>
        {!can('crm.edit') && editing ? (
          <EvoSheet open onOpenChange={(next) => !next && setEditing(null)} title={editing.name}>
            <p>{editing.company}</p>
            <strong className="money">{formatDzd(editing.value)}</strong>
            <StatusBadge status={editing.stage} />
          </EvoSheet>
        ) : null}
      </section>
    </ScreenState>
  );
}

function DealForm({
  deal,
  stage,
  companies,
  onSave,
}: {
  deal: Deal | null;
  stage: string;
  companies: string[];
  onSave: (deal: Deal) => void;
}) {
  const [name, setName] = useState(deal?.name ?? ''),
    [company, setCompany] = useState(deal?.company ?? companies[0]),
    [value, setValue] = useState(deal?.value ?? 0),
    [nextStage, setStage] = useState(deal?.stage ?? stage),
    [owner, setOwner] = useState(deal?.owner ?? 'MB');
  return (
    <form
      className="form-stack"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim()) return;
        onSave({
          id: deal?.id ?? crypto.randomUUID(),
          name: name.trim(),
          company,
          value,
          stage: nextStage,
          probability: probabilities[nextStage],
          owner,
          updatedAt: 'À l’instant',
        });
      }}
    >
      <EvoInput label="Nom du deal" required value={name} onChange={(event) => setName(event.target.value)} />
      <FieldSelect label="Entreprise associée" value={company} onChange={(event) => setCompany(event.target.value)}>
        {companies.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </FieldSelect>
      <EvoInput
        label="Montant (DA)"
        required
        type="number"
        min="0"
        max="100000000000"
        step="0.01"
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <FieldSelect label="Étape du pipeline" value={nextStage} onChange={(event) => setStage(event.target.value)}>
        {stages.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </FieldSelect>
      <FieldSelect label="Responsable du deal" value={owner} onChange={(event) => setOwner(event.target.value)}>
        {['MB', 'SA', 'NS'].map((value) => (
          <option key={value}>{value}</option>
        ))}
      </FieldSelect>
      {deal ? (
        <RecordActivityTimeline
          items={[
            {
              title: 'Deal mis à jour',
              detail: `${deal.name} · ${deal.stage}`,
              time: deal.updatedAt,
            },
          ]}
        />
      ) : null}
      <EvoButton type="submit" variant="primary">
        Enregistrer le deal
      </EvoButton>
    </form>
  );
}
