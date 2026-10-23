import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { List, SidebarSimple, Flask } from '@phosphor-icons/react';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { Header } from '@/components/navigation/Header';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Toast, Drawer } from '@/components/ui/Overlays';
import { StatePreview } from '@/components/ui/ScreenState';
import { useCrm } from '@/app/providers/CrmProvider';
export function MobileNavigation({
  open,
  onClose,
  advanced,
  onToggleAdvanced,
  onOpenCommand,
}: {
  open: boolean;
  onClose: () => void;
  advanced: boolean;
  onToggleAdvanced: () => void;
  onOpenCommand: () => void;
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Navigation"
      description="Votre espace de travail EvoCRM"
    >
      <div
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('[aria-current],nav button')) onClose();
        }}
      >
        <Sidebar
          advanced={advanced}
          onToggleAdvanced={onToggleAdvanced}
          onOpenCommand={onOpenCommand}
        />
      </div>
    </Drawer>
  );
}
export function AppLayout() {
  const { pathname } = useLocation();
  const [advanced, setAdvanced] = useState(false),
    [commandOpen, setCommandOpen] = useState(false),
    [mobile, setMobile] = useState(false),
    [collapsed, setCollapsed] = useState(false);
  const { notice, notify } = useCrm();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <a href="#main-content" className="skip-link">
        Aller au contenu
      </a>
      <div className="desktop-sidebar">
        <Sidebar
          advanced={advanced}
          onToggleAdvanced={() => setAdvanced((v) => !v)}
          onOpenCommand={() => setCommandOpen(true)}
        />
      </div>
      <main className="main-area">
        <div className="shell-top">
          <button
            className="icon-button collapse-nav"
            aria-label={collapsed ? 'Développer la navigation' : 'Réduire la navigation'}
            onClick={() => setCollapsed((v) => !v)}
          >
            <SidebarSimple size={20} />
          </button>
          <button
            className="icon-button mobile-nav-trigger"
            aria-label="Ouvrir la navigation"
            onClick={() => setMobile(true)}
          >
            <List size={22} />
          </button>
          <Header pathname={pathname} onOpenCommand={() => setCommandOpen(true)} />
        </div>
        <div className="demo-banner">
          <Flask size={14} aria-hidden="true" />
          <strong>Démonstration</strong>
          <span>Les données restent dans cette session. Aucun envoi externe.</span>
        </div>
        <div className="content-area" id="main-content" tabIndex={-1}>
          <Outlet />
          <StatePreview />
        </div>
      </main>
      <MobileNavigation
        open={mobile}
        onClose={() => setMobile(false)}
        advanced={advanced}
        onToggleAdvanced={() => setAdvanced((v) => !v)}
        onOpenCommand={() => setCommandOpen(true)}
      />
      {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} />}
      <Toast message={notice} onClose={() => notify('')} />
    </div>
  );
}
