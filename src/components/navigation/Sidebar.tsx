import {
  AddressBook,
  Buildings,
  ChartLineUp,
  ClipboardText,
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
import { Popover } from '@/components/ui/Overlays';

type NavItem = { label: string; path: string; icon: Icon; simple: boolean };
type NavGroup = { label: string; items: NavItem[] };
const commandNav: NavItem[] = [
  { label: 'Accueil', path: '/dashboard', icon: House, simple: true },
  { label: 'Inbox', path: '/inbox', icon: Tray, simple: true },
];
const crmNav: NavItem[] = [
  { label: 'Contacts', path: '/crm/contacts', icon: AddressBook, simple: true },
  { label: 'Deals', path: '/crm/deals', icon: Handshake, simple: true },
  { label: 'Devis', path: '/crm/quotes', icon: Quotes, simple: true },
];
const advancedCrmNav: NavItem[] = [
  { label: 'Entreprises', path: '/crm/companies', icon: Buildings, simple: false },
  { label: 'Pipeline', path: '/crm/deals/board', icon: SquaresFour, simple: false },
  { label: 'Segments', path: '/crm/segments', icon: UsersThree, simple: false },
];
const insightNav: NavItem[] = [
  { label: 'Rapports', path: '/reports', icon: ChartLineUp, simple: false },
  { label: 'Outbound', path: '/outbound', icon: PaperPlaneTilt, simple: false },
];
const railNav: NavItem[] = [
  { label: 'Accueil', path: '/dashboard', icon: House, simple: true },
  { label: 'Inbox', path: '/inbox', icon: Tray, simple: true },
  { label: 'Deals', path: '/crm/deals', icon: Handshake, simple: true },
  { label: 'Contacts', path: '/crm/contacts', icon: AddressBook, simple: true },
  { label: 'Rapports', path: '/reports', icon: ChartLineUp, simple: false },
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
  const groups: NavGroup[] = [
    { label: 'Command center', items: commandNav },
    { label: 'CRM', items: advanced ? [...crmNav, ...advancedCrmNav] : crmNav },
    ...(advanced ? [{ label: 'Insights', items: insightNav }] : []),
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-rail" aria-label="Navigation rapide">
        <div className="rail-brand">
          <img src="/evotechly.svg" alt="Evotechly" />
        </div>
        <nav className="rail-nav" aria-label="Navigation rapide">
          {railNav.map(({ label, path, icon: Icon }) => {
            const active = path === '/dashboard' ? pathname === path : pathname.startsWith(path);
            return (
              <button
                key={path}
                className={`rail-item ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                aria-label={label}
                title={label}
                onClick={() => navigate(path)}
              >
                <Icon size={18} weight={active ? 'fill' : 'regular'} />
              </button>
            );
          })}
        </nav>
        <div className="rail-footer">
          <button className="rail-item" aria-label="Paramètres" title="Paramètres" onClick={() => navigate('/settings')}>
            <GearSix size={18} />
          </button>
          <button
            className="rail-item"
            aria-label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
      <div className="sidebar-panel">
        <div className="brand-lockup">
          <span>
            <strong>EvoCRM</strong>
            <small>EVOTECHLY / COMMAND CENTER</small>
          </span>
        </div>
        <WorkspaceSwitcher />
        <div className="sidebar-section-heading">
          <span>Workspace</span>
          <ClipboardText size={13} />
        </div>
        <nav aria-label="Navigation principale">
          {groups.map((group) => (
            <div className="sidebar-nav-group" key={group.label}>
              <div className="nav-label">{group.label}</div>
              {group.items.map(({ label, path, icon: Icon }) => {
                const active = path === '/dashboard' ? pathname === path : pathname.startsWith(path);
                return (
                  <button
                    key={path}
                    aria-current={active ? 'page' : undefined}
                    className={`nav-item ${active ? 'active' : ''}`}
                    onClick={() => navigate(path)}
                  >
                    <Icon size={17} weight={active ? 'fill' : 'regular'} />
                    <span>{label}</span>
                    {label === 'Inbox' && <span className="nav-count">3</span>}
                  </button>
                );
              })}
            </div>
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
        <div className="sidebar-profile">
          <span className="sidebar-profile-avatar">MB</span>
          <span><strong>Mohamed</strong><small>Propriétaire · Démo</small></span>
        </div>
        <div className="sidebar-footnote">v0.2 · Démonstration locale</div>
      </div>
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
