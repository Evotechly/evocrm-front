import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { Header } from '@/components/navigation/Header';
import { Sidebar } from '@/components/navigation/Sidebar';

export function AppLayout() {
  const [advanced, setAdvanced] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  return <div className="app-shell"><Sidebar advanced={advanced} onToggleAdvanced={() => setAdvanced((value) => !value)} /><main className="main-area"><Header onOpenCommand={() => setCommandOpen(true)} /><div className="content-area"><Outlet /></div></main>{commandOpen ? <CommandPalette onClose={() => setCommandOpen(false)} /> : null}</div>;
}
