import { AddressBook, Buildings, ChartLineUp, GearSix, Handshake, House, Moon, PaperPlaneTilt, Quotes, SquaresFour, Sun, Tray, UsersThree } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/components/ui';

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

export function Sidebar({ advanced, onToggleAdvanced }: { advanced: boolean; onToggleAdvanced: () => void }) {
  const { pathname } = useLocation();
  const { navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const items = advanced ? [...simpleNav, ...advancedNav] : simpleNav;
  return <aside className="sidebar">
    <div className="brand-lockup"><span className="brand-mark">E</span><span><strong>EvoCRM</strong><small>Aurora workspace</small></span></div>
    <div className="workspace-switcher"><span className="workspace-dot" /><span><strong>Evotechly</strong><small>Workspace principal</small></span><span className="chevron">⌄</span></div>
    <div className="nav-label">ESPACE DE TRAVAIL</div>
    <nav aria-label="Navigation principale">
      {items.map(({ label, path, icon: Icon }) => <button key={path} className={`nav-item ${pathname === path || (path !== '/dashboard' && pathname.startsWith(path)) ? 'active' : ''}`} onClick={() => navigate(path)}><Icon size={18} weight={pathname.startsWith(path) ? 'fill' : 'regular'} /><span>{label}</span></button>)}
    </nav>
    <div className="sidebar-spacer" />
    <button className="mode-toggle" onClick={onToggleAdvanced}><span className="mode-pill">{advanced ? 'A' : 'S'}</span><span><strong>{advanced ? 'Mode avancé' : 'Mode simple'}</strong><small>{advanced ? 'Fonctions étendues' : 'Vue essentielle'}</small></span><span className="toggle-track"><span className={advanced ? 'toggle-thumb on' : 'toggle-thumb'} /></span></button>
    <button className="nav-item" onClick={() => navigate('/settings')}><GearSix size={18} /><span>Paramètres</span></button>
    <Button variant="ghost" className="theme-button" onClick={toggleTheme}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}<span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span></Button>
    <div className="sidebar-footnote">v0.1 · Aurora foundation</div>
  </aside>;
}
