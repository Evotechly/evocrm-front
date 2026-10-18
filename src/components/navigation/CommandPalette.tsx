import { Command, MagnifyingGlass, X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useNavigation } from '@/app/providers/NavigationProvider';

const commands = [{ label: 'Accueil', hint: 'Dashboard', path: '/dashboard' }, { label: 'Contacts', hint: 'CRM', path: '/crm/contacts' }, { label: 'Deals', hint: 'CRM', path: '/crm/deals' }, { label: 'Inbox', hint: 'Desk', path: '/inbox' }, { label: 'Devis', hint: 'CRM', path: '/crm/quotes' }];
export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const { navigate } = useNavigation();
  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return <div className="overlay" role="dialog" aria-label="Palette de commandes"><div className="command-modal"><div className="command-input"><MagnifyingGlass size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une page ou une action..." /><kbd>ESC</kbd><button onClick={onClose} aria-label="Fermer"><X size={18} /></button></div><div className="command-section-label">NAVIGATION</div>{filtered.map((command) => <button key={command.path} className="command-row" onClick={() => { navigate(command.path); onClose(); }}><span className="command-icon"><Command size={15} /></span><span><strong>{command.label}</strong><small>{command.hint}</small></span><span className="command-arrow">↵</span></button>)}{filtered.length === 0 ? <p className="command-empty">Aucun résultat pour « {query} »</p> : null}<div className="command-footer"><span>↑↓ naviguer</span><span>↵ ouvrir</span><span>esc fermer</span></div></div></div>;
}
