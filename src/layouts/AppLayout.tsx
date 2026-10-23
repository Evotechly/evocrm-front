import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  AddressBook,
  Buildings,
  CaretDown,
  ChartLineUp,
  Command as CommandIcon,
  Flask,
  GearSix,
  Handshake,
  House,
  List,
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
  EvoAccountButton,
  EvoButton,
  EvoCommandInput,
  EvoCommandItem,
  EvoCommandList,
  EvoCommandPalette,
  EvoDropdownMenu,
  EvoIconButton,
  EvoNotificationCenter,
  EvoOrgSwitcher,
  EvoSheet,
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

const orgs = [
  { id: 'clinique', name: 'Clinique El Djazair', role: 'Espace principal' },
  { id: 'ibn', name: 'Hôpital Ibn Sina', role: 'Établissement' },
  { id: 'amrani', name: 'Cabinet Dr. Amrani', role: 'Cabinet' },
  { id: 'pharma', name: 'Pharmacie Centrale', role: 'Pharmacie' },
];

export function AppLayout() {
  const { pathname } = useLocation();
  const { navigate } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const { notify } = useCrm();
  const [advanced, setAdvanced] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = (advanced ? [...simpleNav, ...advancedNav] : simpleNav).concat([
    { id: 'settings', label: 'Paramètres', path: '/settings', icon: GearSix },
  ]);
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

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (path: string) => {
    setMobileOpen(false);
    setCommandOpen(false);
    navigate(path);
  };

  const navList = (
    <ul className="evo-sidebar-menu">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.path;
        return (
          <li key={item.id}>
            <a
              className="evo-sidebar-menu-button"
              data-active={active}
              href={item.path}
              onClick={(event) => {
                event.preventDefault();
                go(item.path);
              }}
            >
              <Icon size={18} weight={active ? 'fill' : 'regular'} />
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="ev-app-shell">
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>
      <aside className="ev-sidebar-desktop evo-sidebar ev-sidebar" aria-label="Navigation principale">
        <div className="evo-sidebar-header brand-lockup">
          <img className="brand-logo" src="/evotechly.svg" alt="Evotechly" />
          <span>
            <strong>EvoCRM</strong>
            <small>EVOTECHLY</small>
          </span>
        </div>
        {navList}
        <div className="evo-sidebar-footer">
          <EvoOrgSwitcher orgs={orgs} />
          <button type="button" className="mode-toggle" onClick={() => setAdvanced((value) => !value)}>
            <span className="mode-pill">{advanced ? 'A' : 'S'}</span>
            <span>
              <strong>{advanced ? 'Mode avancé' : 'Mode simple'}</strong>
              <small>{advanced ? 'Fonctions étendues' : 'Vue essentielle'}</small>
            </span>
          </button>
          <EvoButton
            variant="ghost"
            className="theme-button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Thème sombre dans la barre latérale' : 'Thème clair dans la barre latérale'}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            <span>{theme === 'light' ? 'Mode sombre' : 'Mode clair'}</span>
          </EvoButton>
        </div>
      </aside>
      <main className="ev-workspace">
        <div className="ev-top-strip">
          <EvoIconButton
            className="ev-sidebar-mobile-trigger"
            label="Ouvrir la navigation"
            onClick={() => setMobileOpen(true)}
          >
            <List size={18} />
          </EvoIconButton>
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
            <EvoDropdownMenu
              items={[
                { label: 'Nouveau contact', onSelect: () => go('/crm/contacts?create=1') },
                { label: 'Nouveau deal', onSelect: () => go('/crm/deals?create=1') },
                { label: 'Nouveau devis', onSelect: () => go('/crm/quotes?create=1') },
              ]}
            >
              <EvoButton variant="primary">
                <Plus size={17} /> Créer <CaretDown size={14} />
              </EvoButton>
            </EvoDropdownMenu>
            <EvoIconButton
              label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
            </EvoIconButton>
            <EvoNotificationCenter
              items={[{ id: 'demo', title: 'Session locale — aucune notification serveur.' }]}
            />
            <EvoAccountButton name="Mohamed" email="Propriétaire · Démo" />
            <EvoButton
              variant="ghost"
              onClick={() => notify('Session de démonstration : aucune connexion serveur active.')}
            >
              Informations de session
            </EvoButton>
            <EvoButton variant="ghost" onClick={() => go('/login')}>
              Écran de connexion
            </EvoButton>
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
      <EvoSheet title="Navigation" open={mobileOpen} onOpenChange={setMobileOpen} side="left">
        <nav aria-label="Navigation mobile">
          {items.map((item) => (
            <EvoButton key={item.id} variant="ghost" onClick={() => go(item.path)}>
              {item.label}
            </EvoButton>
          ))}
        </nav>
      </EvoSheet>
      <EvoCommandPalette open={commandOpen} onOpenChange={setCommandOpen}>
        <EvoCommandInput placeholder="Rechercher une commande…" />
        <EvoCommandList>
          {[
            { id: 'home', label: 'Accueil', path: '/dashboard' },
            { id: 'contacts', label: 'Contacts', path: '/crm/contacts' },
            { id: 'deals', label: 'Deals', path: '/crm/deals' },
            { id: 'pipeline', label: 'Pipeline', path: '/crm/deals/board' },
            { id: 'inbox', label: 'Inbox', path: '/inbox' },
            { id: 'quotes', label: 'Devis', path: '/crm/quotes' },
            { id: 'settings', label: 'Paramètres', path: '/settings' },
            { id: 'new-contact', label: 'Nouveau contact', path: '/crm/contacts?create=1' },
            { id: 'new-deal', label: 'Nouveau deal', path: '/crm/deals?create=1' },
            { id: 'new-quote', label: 'Nouveau devis', path: '/crm/quotes?create=1' },
          ].map((item) => (
            <EvoCommandItem key={item.id} value={item.label} onSelect={() => go(item.path)}>
              {item.label}
            </EvoCommandItem>
          ))}
        </EvoCommandList>
      </EvoCommandPalette>
    </div>
  );
}
