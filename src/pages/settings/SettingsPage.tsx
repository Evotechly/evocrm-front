import { Button, Card, Input, Select, Switch, WorkspaceHeader } from '@evotechly/ui';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { ScreenState } from '@/app/ScreenState';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { notify } = useCrm();
  return (
    <ScreenState permission="settings.manage">
      <section className="page-stack" data-screen-id="SCR-SETTINGS-001">
        <WorkspaceHeader
          title="Paramètres"
          description="Préférences de l’espace de travail, en français."
        />
        <Card title="Profil">
          <form
            className="form-stack"
            onSubmit={(event) => {
              event.preventDefault();
              notify('Préférences enregistrées dans cette session.');
            }}
          >
            <Input label="Nom affiché" defaultValue="Mohamed Beghanem" />
            <Input label="Email" type="email" defaultValue="mohamed@clinique-eldjazair.dz" />
            <Select label="Espace" defaultValue="clinique">
              <option value="clinique">Clinique El Djazair</option>
              <option value="ibn">Hôpital Ibn Sina</option>
              <option value="amrani">Cabinet Dr. Amrani</option>
              <option value="pharma">Pharmacie Centrale</option>
            </Select>
            <Switch
              label="Thème sombre"
              checked={theme === 'dark'}
              onCheckedChange={() => toggleTheme()}
            />
            <Button type="submit" variant="primary">
              Enregistrer
            </Button>
          </form>
        </Card>
      </section>
    </ScreenState>
  );
}
