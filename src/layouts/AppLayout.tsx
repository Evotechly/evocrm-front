import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  AddressBook,
  Bell,
  Buildings,
  CaretDown,
  ChartLineUp,
  Command as CommandIcon,
  Flask,
  GearSix,
  Handshake,
  House,
  MagnifyingGlass,
  Moon,
  PaperPlaneTilt,
  Plus,
  Quotes,
  SquaresFour,
  Sun,
  Tray,
  UsersThree,
} from '@phosphor-icons/react';
import {
  Button,
  CommandMenu,
  IconButton,
  NotificationCenter,
  Popover,
  ProfileMenu,
  Sidebar,
  TeamSwitcher,
  Tooltip,
} from '@evotechly/ui';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useCrm } from '@/app/providers/CrmProvider';
import { StatePreview } from '@/app/StatePreview';

const simpleNav = [
  { id: 'home', label: 'Accueil', path: '/dashboard', icon: House },
  { id: 'contacts', label: 'Contacts', path: '/crm/contacts', icon: AddressBook },
  { id: 'deals', label: 'Deals', path: '/crm/deals', icon: Handshake },
  { id: 'inbox', label: 'Inbox', path: '/inbox', icon: Tray },
  { id: 'quotes', label: 'Devis', path: '/crm/quotes', icon: Quotes },
];
const advancedNav = [
  { id: 'companies', label: 'Entreprises', path: '/crm/companies', icon: Buildings },
  { id: 'pipeline', label: 'Pipeline', path: '/crm/deals/board', icon: SquaresFour },
  { id: 'segments', label: 'Segments', path: '/crm/segments', icon: UsersThree },
  { id: 'reports', label: 'Rapports', path: '/reports', icon: ChartLineUp },
  { id: 'outbound', label: 'Outbound', path: '/outbound', icon: PaperPlaneTilt },
];

export function AppLayout() {
  const { pathname } = useLocation();
  const { navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { notify } = useCrm();
  const [advanced, setAdvanced] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const items = (advanced ? [...simpleNav, ...advancedNav] : simpleNav).map((item) => ({
    id: item.id,
    label: item.label,
    icon: <item.icon size={18} weight={pathname === item.path ? 'fill' : 'regular'} />,
    active: pathname === item.path,
    onSelect: () => navigate(item.path),
  }));
  const destination = pathname.includes('contacts')
    ? 'Contacts'
    : pathname.includes('deals')
      ? 'Opportunités'
      : pathname.includes('quotes')
        ? 'Devis'
        : pathname.includes('inbox')
          ? 'Conversations'
          : pathname.includes('settings')
            ? 'Paramètres'
            : 'Vue d’ensemble';

  return (
    <div className={`ev-app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>
      <Sidebar
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        items={[
          ...items,
          {
            id: 'settings',
            label: 'Paramètres',
            icon: <GearSix size={18} />,
            active: pathname === '/settings',
            onSelect: () => navigate('/settings'),
          },
        ]}
        header={
          <div className="brand-lockup">
            <img className="brand-logo" src="/evotechly.svg" alt="Evotechly" />
            <span>
              <strong>EvoCRM</strong>
              <small>EVOTECHLY</small>
            </span>
          </div>
        }
        footer={
          <>
            <TeamSwitcher
              name="Clinique El Djazair"
              detail="Espace principal"
              options={[
                { name: 'Clinique El Djazair', detail: 'Espace principal' },
                { name: 'Hôpital Ibn Sina', detail: 'Établissement' },
                { name: 'Cabinet Dr. Amrani', detail: 'Cabinet' },
                { name: 'Pharmacie Centrale', detail: 'Pharmacie' },
              ]}
            />
            <button type="button" className="mode-toggle" onClick={() => setAdvanced((value) => !value)}>
              <span className="mode-pill">{advanced ? 'A' : 'S'}</span>
              <span>
                <strong>{advanced ? 'Mode avancé' : 'Mode simple'}</strong>
                <small>{advanced ? 'Fonctions étendues' : 'Vue essentielle'}</small>
              </span>
            </button>
            <Button
              variant="ghost"
              className="theme-button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Thème sombre dans la barre latérale' : 'Thème clair dans la barre latérale'}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
              <span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>
            </Button>
          </>
        }
      />
      <main className="ev-workspace">
        <div className="ev-top-strip">
          <button
            type="button"
            className="command-trigger"
            onClick={() => setCommandOpen(true)}
            aria-label="Rechercher dans EvoCRM"
          >
            <MagnifyingGlass size={18} />
            <span>Rechercher dans EvoCRM…</span>
            <kbd>
              <CommandIcon size={12} /> K
            </kbd>
          </button>
          <div className="header-context">
            <strong>Espace commercial</strong>
            <span>/</span>
            {destination}
          </div>
          <div className="header-actions">
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
            <Tooltip text={theme === 'light' ? 'Mode sombre' : 'Mode clair'}>
              <IconButton
                label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
                icon={theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
                variant="ghost"
                tooltip={false}
                onClick={toggleTheme}
              />
            </Tooltip>
            <NotificationCenter
              trigger={
                <button type="button" className="icon-button notification-button" aria-label="Notifications">
                  <Bell size={19} />
                </button>
              }
            />
            <ProfileMenu name="Mohamed" detail="Propriétaire · Démo" initials="MB">
              <p className="ev-muted">Session locale, sans compte connecté.</p>
              <Button onClick={() => notify('Session de démonstration : aucune connexion serveur active.')}>
                Informations de session
              </Button>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Écran de connexion
              </Button>
            </ProfileMenu>
          </div>
        </div>
        <div className="ev-demo-banner">
          <Flask size={14} aria-hidden="true" />
          <strong>Démonstration</strong>
          <span>Les données restent dans cette session. Aucun envoi externe.</span>
        </div>
        <div className="ev-content" id="main-content" tabIndex={-1}>
          <Outlet />
          <StatePreview />
        </div>
      </main>
      <CommandMenu
        open={commandOpen}
        onOpenChange={setCommandOpen}
        title="Palette de commandes"
        items={[
          { id: 'home', label: 'Accueil', group: 'Navigation', onSelect: () => navigate('/dashboard') },
          { id: 'contacts', label: 'Contacts', group: 'Navigation', onSelect: () => navigate('/crm/contacts') },
          { id: 'deals', label: 'Deals', group: 'Navigation', onSelect: () => navigate('/crm/deals') },
          { id: 'pipeline', label: 'Pipeline', group: 'Navigation', onSelect: () => navigate('/crm/deals/board') },
          { id: 'inbox', label: 'Inbox', group: 'Navigation', onSelect: () => navigate('/inbox') },
          { id: 'quotes', label: 'Devis', group: 'Navigation', onSelect: () => navigate('/crm/quotes') },
          { id: 'settings', label: 'Paramètres', group: 'Navigation', onSelect: () => navigate('/settings') },
          { id: 'new-contact', label: 'Nouveau contact', group: 'Actions', onSelect: () => navigate('/crm/contacts?create=1') },
          { id: 'new-deal', label: 'Nouveau deal', group: 'Actions', onSelect: () => navigate('/crm/deals?create=1') },
          { id: 'new-quote', label: 'Nouveau devis', group: 'Actions', onSelect: () => navigate('/crm/quotes?create=1') },
        ]}
      />
    </div>
  );
}
