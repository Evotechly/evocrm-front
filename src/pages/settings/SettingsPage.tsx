import { EvoButton, EvoCard, EvoCardContent, EvoCardHeader, EvoCardTitle, EvoInput, EvoSwitch } from '@evotechly/ui';
import { FieldSelect, WorkspaceHeader } from '@/components/crm/ui';
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
        <EvoCard>
          <EvoCardHeader>
            <EvoCardTitle>Profil</EvoCardTitle>
          </EvoCardHeader>
          <EvoCardContent>
            <form
              className="form-stack"
              onSubmit={(event) => {
                event.preventDefault();
                notify('Préférences enregistrées dans cette session.');
              }}
            >
              <EvoInput label="Nom affiché" defaultValue="Mohamed Beghanem" />
              <EvoInput label="Email" type="email" defaultValue="mohamed@clinique-eldjazair.dz" />
              <FieldSelect label="Espace" defaultValue="clinique">
                <option value="clinique">Clinique El Djazair</option>
                <option value="ibn">Hôpital Ibn Sina</option>
                <option value="amrani">Cabinet Dr. Amrani</option>
                <option value="pharma">Pharmacie Centrale</option>
              </FieldSelect>
              <EvoSwitch
                label="Thème sombre"
                checked={theme === 'dark'}
                onCheckedChange={() => toggleTheme()}
              />
              <EvoButton type="submit" variant="primary">
                Enregistrer
              </EvoButton>
            </form>
          </EvoCardContent>
        </EvoCard>
      </section>
    </ScreenState>
  );
}
