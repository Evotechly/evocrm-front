import { Command } from 'cmdk';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { Dialog } from '@/components/ui/Overlays';
const commands = [
  { label: 'Accueil', path: '/dashboard' },
  { label: 'Contacts', path: '/crm/contacts' },
  { label: 'Deals', path: '/crm/deals' },
  { label: 'Pipeline', path: '/crm/deals/board' },
  { label: 'Inbox', path: '/inbox' },
  { label: 'Devis', path: '/crm/quotes' },
  { label: 'Nouveau contact', path: '/crm/contacts?create=1' },
  { label: 'Nouveau deal', path: '/crm/deals?create=1' },
  { label: 'Nouveau devis', path: '/crm/quotes?create=1' },
];
export function CommandPalette({ onClose }: { onClose: () => void }) {
  const { navigate } = useNavigation();
  return (
    <Dialog
      open
      onClose={onClose}
      title="Palette de commandes"
      description="Rechercher, puis utiliser les flèches et Entrée."
    >
      <Command label="Navigation rapide">
        <Command.Input
          autoFocus
          placeholder="Rechercher une page ou une action…"
          aria-label="Rechercher une commande"
        />
        <Command.List>
          <Command.Empty>Aucun résultat.</Command.Empty>
          <Command.Group heading="NAVIGATION ET ACTIONS">
            {commands.map((c) => (
              <Command.Item
                key={c.path}
                value={c.label}
                onSelect={() => {
                  navigate(c.path);
                  onClose();
                }}
              >
                {c.label}
                <span>↵</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </Dialog>
  );
}
