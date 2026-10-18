import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from '@phosphor-icons/react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { Button, Panel } from '@/components/ui';
import { Drawer } from '@/components/ui/Overlays';
import { ScreenState, NoResults, usePreviewState } from '@/components/ui/ScreenState';
import { Input, Select } from '@/components/forms/Fields';
import {
  SearchInput,
  FilterBar,
  ViewSwitcher,
  SortControl,
} from '@/components/data-display/Controls';
import { KanbanBoard, stages, probabilities } from '@/components/crm/Deals';
import { StatusBadge } from '@/components/ui/StatusBadge';
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
      (d) =>
        `${d.name} ${d.company}`.toLowerCase().includes(query.toLowerCase()) &&
        (!owner || d.owner === owner) &&
        (!stage || d.stage === stage),
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
    setDeals((ds) =>
      ds.map((d) =>
        d.id === id
          ? { ...d, stage: next, probability: probabilities[next], updatedAt: 'À l’instant' }
          : d,
      ),
    );
    notify(`Deal déplacé vers ${next}. Totaux recalculés.`);
  };
  const create = (s = 'Qualification') => {
    setCreateStage(s);
    setCreating(true);
  };
  return (
    <ScreenState permission="crm.view">
      <section className="page-stack" data-screen-id={board ? 'SCR-DEAL-002' : 'SCR-DEAL-001'}>
        <div className="page-heading">
          <div>
            <div className="eyebrow">OPPORTUNITÉS / CRM</div>
            <h1>{board ? 'Pipeline' : 'Deals'}</h1>
            <p className="muted">De la première rencontre à la prochaine réussite.</p>
          </div>
          <Button
            data-page-primary
            variant="primary"
            disabled={!can('crm.edit')}
            onClick={() => create()}
          >
            <Plus size={17} /> Nouveau deal
          </Button>
        </div>
        <div className="forecast-strip">
          <div>
            <span>Pipeline ouvert</span>
            <strong>
              {formatDzd(
                rows
                  .filter((d) => !['Gagné', 'Perdu'].includes(d.stage))
                  .reduce((s, d) => s + d.value, 0),
              )}
            </strong>
          </div>
          <div>
            <span>Prévision pondérée ouverte</span>
            <strong>
              {formatDzd(
                rows
                  .filter((d) => !['Gagné', 'Perdu'].includes(d.stage))
                  .reduce((s, d) => s + (d.value * d.probability) / 100, 0),
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
            onChange={(v) =>
              navigate(
                `/crm/deals${v === 'board' ? '/board' : ''}${params.toString() ? `?${params}` : ''}`,
              )
            }
          />
          <span className="muted">Glissez une carte ou utilisez son sélecteur d’étape.</span>
        </div>
        <Panel>
          <FilterBar>
            <SearchInput label="Rechercher un deal" value={query} onChange={setQuery} />
            <Select label="Responsable" value={owner} onChange={(e) => setOwner(e.target.value)}>
              <option value="">Tous les responsables</option>
              {[...new Set(deals.map((d) => d.owner))].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
            <Select label="Étape" value={stage} onChange={(e) => setStage(e.target.value)}>
              <option value="">Toutes les étapes</option>
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <SortControl
              value={sort}
              onChange={setSort}
              options={[
                { value: 'name', label: 'Nom A–Z' },
                { value: 'value', label: 'Montant décroissant' },
              ]}
            />
          </FilterBar>
        </Panel>
        {!rows.length ? (
          <NoResults
            title="Aucun deal à afficher"
            detail="Ajoutez une opportunité ou modifiez vos filtres."
            action={
              <Button disabled={!can('crm.edit')} onClick={() => create()}>
                Créer un deal
              </Button>
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
                    {['Deal', 'Entreprise', 'Montant', 'Probabilité', 'Responsable', 'Étape'].map(
                      (h) => (
                        <th scope="col" key={h}>
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <button className="record-link" onClick={() => setEditing(d)}>
                          {d.name}
                        </button>
                        <small className="cell-meta">{d.updatedAt}</small>
                      </td>
                      <td>{d.company}</td>
                      <td className="money">{formatDzd(d.value)}</td>
                      <td>{d.probability}%</td>
                      <td>{d.owner}</td>
                      <td>
                        <StatusBadge status={d.stage} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )}
        <Drawer
          open={can('crm.edit') && (creating || params.get('create') === '1' || !!editing)}
          onClose={close}
          title={editing ? 'Détail du deal' : 'Nouveau deal'}
        >
          <DealForm
            key={editing?.id ?? createStage}
            deal={editing}
            stage={createStage}
            companies={[...new Set(contacts.map((c) => c.company))]}
            onSave={(d) => {
              setDeals((ds) => (editing ? ds.map((v) => (v.id === d.id ? d : v)) : [...ds, d]));
              close();
              notify('Deal enregistré dans cette session.');
            }}
          />
        </Drawer>
        {!can('crm.edit') && editing && (
          <Drawer
            open
            onClose={() => setEditing(null)}
            title={editing.name}
            description="Lecture seule"
          >
            <p>{editing.company}</p>
            <strong>{formatDzd(editing.value)}</strong>
            <StatusBadge status={editing.stage} />
          </Drawer>
        )}
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
  onSave: (d: Deal) => void;
}) {
  const [name, setName] = useState(deal?.name ?? ''),
    [company, setCompany] = useState(deal?.company ?? companies[0]),
    [value, setValue] = useState(deal?.value ?? 0),
    [nextStage, setStage] = useState(deal?.stage ?? stage),
    [owner, setOwner] = useState(deal?.owner ?? 'MB');
  return (
    <form
      className="form-stack"
      onSubmit={(e) => {
        e.preventDefault();
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
      <Input label="Nom du deal" required value={name} onChange={(e) => setName(e.target.value)} />
      <Select
        label="Entreprise associée"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      >
        {companies.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </Select>
      <Input
        label="Montant (DA)"
        required
        type="number"
        min="0"
        max="100000000000"
        step="0.01"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Select
        label="Étape du pipeline"
        value={nextStage}
        onChange={(e) => setStage(e.target.value)}
      >
        {stages.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </Select>
      <Select label="Responsable du deal" value={owner} onChange={(e) => setOwner(e.target.value)}>
        {['MB', 'SA', 'NS'].map((o) => (
          <option key={o}>{o}</option>
        ))}
      </Select>
      <Button type="submit" variant="primary">
        Enregistrer le deal
      </Button>
    </form>
  );
}
