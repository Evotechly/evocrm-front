import { AuthCard, Button, Input } from '@evotechly/ui';
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
        <Input label="Email" type="email" defaultValue="mohamed@clinique-eldjazair.dz" />
        <Input label="Mot de passe" type="password" defaultValue="demo" />
        <Button type="submit" variant="primary">
          Entrer dans l’espace
        </Button>
      </form>
    </AuthCard>
  );
}
