import { Bell, CaretDown, Command, MagnifyingGlass, Plus, Moon, Sun } from '@phosphor-icons/react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { Avatar, Button } from '@/components/ui';
import { Popover, Tooltip } from '@/components/ui/Overlays';
export function GlobalCreateMenu() {
  const { navigate } = useNavigation();
  return (
    <Popover
      closeOnAction
      label="Créer un enregistrement"
      trigger={
        <Button variant="primary">
          <Plus size={17} /> Créer <CaretDown size={14} />
        </Button>
      }
    >
      <div className="menu-list">
        {[
          ['contact', 'contacts'],
          ['deal', 'deals'],
          ['devis', 'quotes'],
        ].map(([label, path]) => (
          <Button key={path} variant="ghost" onClick={() => navigate(`/crm/${path}?create=1`)}>
            Nouveau {label}
          </Button>
        ))}
      </div>
    </Popover>
  );
}
export function UserMenu() {
  const { notify, user } = useCrm();
  return (
    <Popover
      label="Compte utilisateur"
      trigger={
        <button className="profile-trigger" aria-label={`Compte de ${user.displayName}`}>
          <Avatar initials={user.initials} tone="ink" />
          <span>
            <strong>{user.displayName}</strong>
            <small>{user.role}</small>
          </span>
          <CaretDown size={14} />
        </button>
      }
    >
      <div className="menu-list">
        <strong>
          {user.displayName} · {user.workspace}
        </strong>
        <p className="muted">Session locale, sans compte connecté.</p>
        <Button
          onClick={() => notify('Session de démonstration : aucune connexion serveur active.')}
        >
          Informations de session
        </Button>
      </div>
    </Popover>
  );
}
export function Header({
  onOpenCommand,
  pathname = '/dashboard',
}: {
  onOpenCommand: () => void;
  pathname?: string;
}) {
  const { theme, toggleTheme } = useTheme();
  const destination = pathname.includes('contacts')
    ? 'Contacts'
    : pathname.includes('deals')
      ? 'Opportunités'
      : pathname.includes('quotes')
        ? 'Devis'
        : pathname.includes('inbox')
          ? 'Conversations'
          : 'Vue d’ensemble';
  return (
    <header className="app-header">
      <div className="header-context">
        <strong>Espace de travail</strong>
        <span>/</span>
        {destination}
      </div>
      <button
        className="command-trigger"
        onClick={onOpenCommand}
        aria-label="Rechercher dans le CRM"
      >
        <MagnifyingGlass size={18} />
        <span>Rechercher dans le CRM…</span>
        <kbd>
          <Command size={12} /> K
        </kbd>
      </button>
      <div className="header-actions">
        <GlobalCreateMenu />
        <Tooltip text={theme === 'light' ? 'Mode sombre' : 'Mode clair'}>
          <button
            className="icon-button"
            aria-label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </Tooltip>
        <Popover
          label="Notifications"
          trigger={
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
          }
        >
          <strong>Vous êtes à jour</strong>
          <p className="muted">Aucune nouvelle notification dans cette démonstration.</p>
        </Popover>
        <UserMenu />
      </div>
    </header>
  );
}
export { Header as AppHeader };
