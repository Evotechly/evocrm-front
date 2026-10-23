import {
  AddressBook,
  Buildings,
  ChartLineUp,
  GearSix,
  Handshake,
  House,
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
}: {
  advanced: boolean;
  onToggleAdvanced: () => void;
}) {
  const { pathname } = useLocation();
  const { navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useCrm();
  const items = advanced ? [...simpleNav, ...advancedNav] : simpleNav;
  return (
    <aside className="sidebar" aria-label="Navigation EvoCRM">
      <div className="rail-brand" title="EvoCRM">
        <img src="/evotechly.svg" alt="EvoCRM" />
      </div>
      <WorkspaceSwitcher />
      <nav className="rail-nav" aria-label="Navigation principale">
        {items.map(({ label, path, icon: Icon }) => {
          const active = path === '/dashboard' ? pathname === path : pathname.startsWith(path);
          return (
            <button
              key={path}
              aria-current={active ? 'page' : undefined}
              aria-label={label}
              title={label}
              className={`rail-item ${active ? 'active' : ''}`}
              onClick={() => navigate(path)}
            >
              <Icon size={19} weight={active ? 'fill' : 'regular'} />
              {label === 'Inbox' && <span className="rail-count">3</span>}
            </button>
          );
        })}
      </nav>
      <div className="rail-footer">
        <button
          className={`rail-item ${advanced ? 'active' : ''}`}
          aria-label={advanced ? 'Mode simple' : 'Mode avancé'}
          title={advanced ? 'Mode simple' : 'Mode avancé'}
          onClick={onToggleAdvanced}
        >
          <SquaresFour size={19} />
        </button>
        <button
          className="rail-item"
          aria-label="Paramètres"
          title="Paramètres"
          onClick={() => navigate('/settings')}
        >
          <GearSix size={19} />
        </button>
        <button
          className="rail-item"
          aria-label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>
        <button
          className="rail-profile"
          aria-label={`Profil ${user.displayName}`}
          title={`${user.displayName} · ${user.role}`}
        >
          {user.initials}
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
