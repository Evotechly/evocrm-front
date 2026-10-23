import { EvoButton, EvoInput } from '@evotechly/ui';
import { AuthCard } from '@/components/crm/ui';
import { useNavigation } from '@/app/providers/NavigationProvider';

export function LoginPage() {
  const { navigate } = useNavigation();
  return (
    <AuthCard title="Connexion EvoCRM">
      <p className="ev-muted">Démonstration locale — aucun compte n’est vérifié.</p>
      <form
        className="form-stack"
        onSubmit={(event) => {
          event.preventDefault();
          navigate('/dashboard');
        }}
      >
        <EvoInput label="Email" type="email" defaultValue="mohamed@clinique-eldjazair.dz" />
        <EvoInput label="Mot de passe" type="password" defaultValue="demo" />
        <EvoButton type="submit" variant="primary">
          Entrer dans l’espace
        </EvoButton>
      </form>
    </AuthCard>
  );
}
