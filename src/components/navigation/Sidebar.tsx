import {
  AddressBook,
  Buildings,
  ChartLineUp,
  GearSix,
  Handshake,
  House,
  MagnifyingGlass,
  Moon,
  PaperPlaneTilt,
  Quotes,
  SquaresFour,
  Sun,
  Tray,
  UsersThree,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Popover } from '@/components/ui/Overlays';

type NavItem = { label: string; path: string; icon: Icon; simple: boolean };
const simpleNav: NavItem[] = [
  { label: 'Accueil', path: '/dashboard', icon: House, simple: true },
  { label: 'Contacts', path: '/crm/contacts', icon: AddressBook, simple: true },
  { label: 'Deals', path: '/crm/deals', icon: Handshake, simple: true },
  { label: 'Inbox', path: '/inbox', icon: Tray, simple: true },
  { label: 'Devis', path: '/crm/quotes', icon: Quotes, simple: true },
];
const advancedNav: NavItem[] = [
  { label: 'Entreprises', path: '/crm/companies', icon: Buildings, simple: false },
  { label: 'Pipeline', path: '/crm/deals/board', icon: SquaresFour, simple: false },
  { label: 'Segments', path: '/crm/segments', icon: UsersThree, simple: false },
  { label: 'Rapports', path: '/reports', icon: ChartLineUp, simple: false },
  { label: 'Outbound', path: '/outbound', icon: PaperPlaneTilt, simple: false },
];

export function Sidebar({
  advanced,
  onToggleAdvanced,
  onOpenCommand,
}: {
  advanced: boolean;
  onToggleAdvanced: () => void;
  onOpenCommand?: () => void;
}) {
  const { pathname } = useLocation();
  const { navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useCrm();
  const groups = [
    {
      label: 'Workspace',
      items: simpleNav.filter(({ label }) => ['Accueil', 'Inbox'].includes(label)),
    },
    {
      label: 'CRM',
      items: simpleNav.filter(({ label }) => ['Contacts', 'Deals', 'Devis'].includes(label)),
    },
    ...(advanced ? [{ label: 'Analyse', items: advancedNav }] : []),
  ];
  return (
    <aside className="sidebar" aria-label="Navigation EvoCRM">
      <div className="sidebar-brand" title="EvoCRM">
        <img src="/evotechly.svg" alt="" aria-hidden="true" />
        <span>
          <strong>EvoCRM</strong>
          <small>EVOTECHLY</small>
        </span>
      </div>
      <WorkspaceSwitcher />
      {onOpenCommand && (
        <button className="sidebar-search" onClick={onOpenCommand}>
          <MagnifyingGlass size={16} />
          <span>Rechercher</span>
          <kbd>⌘ K</kbd>
        </button>
      )}
      <nav className="sidebar-navigation" aria-label="Navigation principale">
        {groups.map((group) => (
          <div className="sidebar-group" key={group.label}>
            <span className="sidebar-group-label">{group.label}</span>
            <div className="sidebar-group-items">
              {group.items.map(({ label, path, icon: Icon }) => {
                const active =
                  path === '/dashboard' ? pathname === path : pathname.startsWith(path);
                return (
                  <button
                    key={path}
                    aria-current={active ? 'page' : undefined}
                    className={`sidebar-item ${active ? 'active' : ''}`}
                    onClick={() => navigate(path)}
                  >
                    <Icon size={17} weight={active ? 'fill' : 'regular'} />
                    <span>{label}</span>
                    {label === 'Inbox' && <span className="sidebar-count">3</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-footer-item" onClick={() => navigate('/settings')}>
          <GearSix size={17} />
          <span>Paramètres</span>
        </button>
        <button className="sidebar-footer-item" onClick={onToggleAdvanced}>
          <SquaresFour size={17} />
          <span>{advanced ? 'Vue essentielle' : 'Mode avancé'}</span>
        </button>
        <button className="sidebar-footer-item" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>
        </button>
        <button className="sidebar-profile" aria-label={`Profil ${user.displayName}`}>
          <span>{user.initials}</span>
          <span>
            <strong>{user.displayName}</strong>
            <small>{user.role}</small>
          </span>
        </button>
      </div>
    </aside>
  );
}

export function WorkspaceSwitcher() {
  return (
    <Popover
      label="Espace de travail"
      trigger={
        <button
          className="workspace-switcher"
          aria-label="Changer d’espace de travail"
          title="Evotechly · Espace principal"
        >
          <span className="workspace-dot" />
          <span>
            <strong>Evotechly</strong>
            <small>Espace principal</small>
          </span>
          <span>⌄</span>
        </button>
      }
    >
      <strong>Evotechly</strong>
      <p className="muted">Un seul workspace est disponible dans cette démonstration.</p>
    </Popover>
  );
}
export { Sidebar as AppSidebar };
