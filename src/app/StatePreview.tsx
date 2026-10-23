import { Select } from '@evotechly/ui';
import { useSearchParams } from 'react-router-dom';

export function StatePreview() {
  const [params, setParams] = useSearchParams();
  if (!import.meta.env.DEV) return null;
  return (
    <details className="state-preview">
      <summary>Atelier · états de démonstration</summary>
      <Select
        label="État de l’écran"
        value={params.get('state') ?? 'populated'}
        onChange={(event) => {
          const next = new URLSearchParams(params);
          if (event.target.value === 'populated') next.delete('state');
          else next.set('state', event.target.value);
          next.delete('create');
          setParams(next);
        }}
      >
        {['populated', 'empty', 'loading', 'error', 'denied'].map((value, index) => (
          <option key={value} value={value}>
            {['Peuplé', 'Vide', 'Chargement', 'Erreur', 'Accès refusé'][index]}
          </option>
        ))}
      </Select>
      <a href="/dev/components">Galerie des composants</a>
    </details>
  );
}
