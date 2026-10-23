import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, EmptyState, Skeleton } from '@evotechly/ui';
import { useCrm } from '@/app/providers/CrmProvider';
import type { Permission } from '@/contracts/permissions';

export function usePreviewState() {
  const [params] = useSearchParams();
  return import.meta.env.DEV ? (params.get('state') ?? 'populated') : 'populated';
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
        <p className="ev-muted">Contactez un administrateur du workspace.</p>
      </section>
    );
  if (state === 'loading')
    return (
      <section className="state-surface" role="status" aria-busy="true">
        <h1>Chargement en cours</h1>
        <p>Préparation de votre espace…</p>
        <Skeleton style={{ height: 48, marginBottom: 8 }} />
        <Skeleton style={{ height: 48, marginBottom: 8 }} />
        <Skeleton style={{ height: 48 }} />
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
  return <EmptyState title={title} description={detail} action={action} />;
}
