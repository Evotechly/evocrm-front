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
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/components/ui';
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
  const items = advanced ? [...simpleNav, ...advancedNav] : simpleNav;
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <span className="brand-mark">E</span>
        <span>
          <strong>EvoCRM</strong>
          <small>EVOTECHLY</small>
        </span>
      </div>
      <WorkspaceSwitcher />
      <div className="nav-label">Espace commercial</div>
      <nav aria-label="Navigation principale">
        {items.map(({ label, path, icon: Icon }) => (
          <button
            key={path}
            aria-current={pathname === path ? 'page' : undefined}
            className={`nav-item ${pathname === path ? 'active' : ''}`}
            onClick={() => navigate(path)}
          >
            <Icon size={18} weight={pathname.startsWith(path) ? 'fill' : 'regular'} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <button className="mode-toggle" onClick={onToggleAdvanced}>
        <span className="mode-pill">{advanced ? 'A' : 'S'}</span>
        <span>
          <strong>{advanced ? 'Mode avancé' : 'Mode simple'}</strong>
          <small>{advanced ? 'Fonctions étendues' : 'Vue essentielle'}</small>
        </span>
        <span className="toggle-track">
          <span className={advanced ? 'toggle-thumb on' : 'toggle-thumb'} />
        </span>
      </button>
      <button className="nav-item" onClick={() => navigate('/settings')}>
        <GearSix size={18} />
        <span>Paramètres</span>
      </button>
      <Button
        variant="ghost"
        className="theme-button"
        onClick={toggleTheme}
        aria-label={
          theme === 'light'
            ? 'Thème sombre dans la barre latérale'
            : 'Thème clair dans la barre latérale'
        }
      >
        {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
        <span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>
      </Button>
      <div className="sidebar-footnote">v0.2 · Démonstration locale</div>
    </aside>
  );
}

export function WorkspaceSwitcher() {
  return (
    <Popover
      label="Espace de travail"
      trigger={
        <button className="workspace-switcher">
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
