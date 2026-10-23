import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
import { Select } from '@/components/forms/Fields';
import { useCrm } from '@/app/providers/CrmProvider';
import type { Permission } from '@/contracts/permissions';
export function usePreviewState() {
  const [params] = useSearchParams();
  return import.meta.env.DEV ? (params.get('state') ?? 'populated') : 'populated';
}
export function StatePreview() {
  const [params, setParams] = useSearchParams();
  if (!import.meta.env.DEV) return null;
  return (
    <details className="state-preview">
      <summary>Atelier · états de démonstration</summary>
      <Select
        label="État de l’écran"
        value={params.get('state') ?? 'populated'}
        onChange={(e) => {
          const next = new URLSearchParams(params);
          if (e.target.value === 'populated') next.delete('state');
          else next.set('state', e.target.value);
          next.delete('create');
          setParams(next);
        }}
      >
        {['populated', 'empty', 'loading', 'error', 'denied'].map((v, i) => (
          <option key={v} value={v}>
            {['Peuplé', 'Vide', 'Chargement', 'Erreur', 'Accès refusé'][i]}
          </option>
        ))}
      </Select>
      <a href="/dev/components">Galerie des composants</a>
    </details>
  );
}
export function ScreenState({
  children,
  permission,
}: {
  children: ReactNode;
  permission: Permission;
}) {
  const state = usePreviewState();
  const { can } = useCrm();
  const [params, setParams] = useSearchParams();
  const retry = () => {
    const next = new URLSearchParams(params);
    next.delete('state');
    setParams(next);
  };
  if (!can(permission) || state === 'denied')
    return (
      <section className="state-surface" role="alert">
        <h1>Accès refusé</h1>
        <p>Votre rôle ne permet pas de consulter cet espace.</p>
        <p className="muted">Contactez un administrateur du workspace.</p>
      </section>
    );
  if (state === 'loading')
    return (
      <section className="state-surface" role="status" aria-busy="true">
        <h1>Chargement en cours</h1>
        <p>Préparation de votre espace…</p>
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </section>
    );
  if (state === 'error')
    return (
      <section className="state-surface" role="alert">
        <h1>Impossible de charger cet espace</h1>
        <p>Les données sont temporairement indisponibles.</p>
        <Button onClick={retry}>Réessayer</Button>
      </section>
    );
  return children;
}
export function NoResults({
  title = 'Aucun résultat',
  detail = 'Modifiez votre recherche ou vos filtres.',
  action,
}: {
  title?: string;
  detail?: string;
  action?: ReactNode;
}) {
  return <EmptyState title={title} detail={detail} action={action} />;
}
