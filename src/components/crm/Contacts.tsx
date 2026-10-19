import { formatDateDisplay } from '@/lib/format';
import type { Contact } from '@/contracts/entities';
import { Avatar, Button } from '@/components/ui';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ActivityTimeline } from '@/components/data-display/Controls';
export function ContactCard({ contact, onOpen }: { contact: Contact; onOpen: () => void }) {
  return (
    <div className="person-cell">
      <Avatar initials={contact.initials} tone={contact.color} />
      <span>
        <button className="record-link" onClick={onOpen}>
          {contact.name}
        </button>
        <small>{contact.company || 'Sans entreprise'}</small>
      </span>
    </div>
  );
}
export function ContactDetailPanel({ contact, onEdit }: { contact: Contact; onEdit?: () => void }) {
  return (
    <div className="detail-stack">
      <div className="record-hero">
        <Avatar initials={contact.initials} tone={contact.color} />
        <h3>{contact.name}</h3>
        <StatusBadge status={contact.status} />
      </div>
      <dl className="detail-list">
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </dd>
        <dt>Entreprise</dt>
        <dd>{contact.company || 'Non associée'}</dd>
        <dt>Dernière activité</dt>
        <dd>{formatDateDisplay(contact.lastActivity)}</dd>
      </dl>
      {onEdit && <Button onClick={onEdit}>Modifier le contact</Button>}
      <h3>Historique d’activité</h3>
      <ActivityTimeline
        items={[
          {
            title: 'Activité du contact',
            detail: `${contact.name} · ${contact.company || 'Sans entreprise'}`,
            time: formatDateDisplay(contact.lastActivity),
          },
        ]}
      />
    </div>
  );
}
