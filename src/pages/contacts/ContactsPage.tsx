import { Funnel, MagnifyingGlass, Plus, SlidersHorizontal } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { Button, Panel, Avatar, Badge } from '@/components/ui';
import { DataTable } from '@/components/data-display/DataTable';
import { contacts } from '@/fixtures/crm';

export function ContactsPage() {
  const [query, setQuery] = useState('');
  const visible = useMemo(() => contacts.filter((contact) => `${contact.name} ${contact.email} ${contact.company}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <section className="page-stack" data-screen-id="SCR-CONTACT-001"><div className="page-heading"><div><div className="eyebrow">CRM / CONTACTS</div><h1>Contacts</h1><p className="muted">Gérez les personnes et les relations de votre workspace.</p></div><Button variant="primary"><Plus size={17} /> Nouveau contact</Button></div><Panel><div className="toolbar"><label className="search-field"><MagnifyingGlass size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un contact..." /></label><div className="toolbar-actions"><Button><Funnel size={16} /> Filtres <span className="filter-count">2</span></Button><Button><SlidersHorizontal size={16} /> Colonnes</Button></div></div><DataTable headers={['Contact', 'Entreprise', 'Statut', 'Dernière activité', '']} >{visible.map((contact) => <tr key={contact.id}><td><div className="person-cell"><Avatar initials={contact.initials} tone={contact.color} /><span><strong>{contact.name}</strong><small>{contact.email}</small></span></div></td><td>{contact.company}</td><td><Badge tone={contact.status === 'Actif' ? 'success' : contact.status === 'Prospect' ? 'warning' : 'neutral'}>{contact.status}</Badge></td><td className="muted">{contact.lastActivity}</td><td><button className="row-action" aria-label={`Actions pour ${contact.name}`}>•••</button></td></tr>)}</DataTable><div className="table-footer"><span>{visible.length} contacts affichés</span><span>1–{visible.length} sur 1 248 <button className="pagination-button">←</button><button className="pagination-button">→</button></span></div></Panel></section>;
}
