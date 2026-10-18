import { Bell, CaretDown, Command, MagnifyingGlass, Plus, Sparkle } from '@phosphor-icons/react';
import { useState } from 'react';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { Avatar, Button } from '@/components/ui';

export function Header({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { navigate } = useNavigation();
  const [createOpen, setCreateOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  return <header className="app-header">
    <button className="command-trigger" onClick={onOpenCommand}><MagnifyingGlass size={18} /><span>Rechercher dans EvoCRM...</span><kbd><Command size={12} /> K</kbd></button>
    <div className="header-actions">
      <div className="menu-wrap"><Button variant="primary" onClick={() => setCreateOpen((open) => !open)}><Plus size={17} weight="bold" /> Créer <CaretDown size={14} /></Button>{createOpen ? <div className="popover create-popover"><button onClick={() => navigate('/crm/contacts?create=1')}>Nouveau contact</button><button onClick={() => navigate('/crm/deals?create=1')}>Nouveau deal</button><button onClick={() => navigate('/crm/quotes?create=1')}>Nouveau devis</button></div> : null}</div>
      <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><span className="notification-dot" /></button>
      <div className="menu-wrap"><button className="profile-trigger" onClick={() => setUserOpen((open) => !open)}><Avatar initials="MB" tone="ink" /><span><strong>Mohamed</strong><small>Owner</small></span><CaretDown size={14} /></button>{userOpen ? <div className="popover user-popover"><div className="popover-intro"><Sparkle size={15} /><span>Evotechly workspace</span></div><button onClick={() => navigate('/settings')}>Paramètres</button><button>Se déconnecter</button></div> : null}</div>
    </div>
  </header>;
}
