import type { Contact, Deal, InboxThread, Quote } from '@/contracts/entities';

export const contacts: Contact[] = [
  { id: 'c-001', name: 'Sarah Benali', email: 'sarah.benali@atlas-logistics.dz', company: 'Atlas Logistics', status: 'Actif', lastActivity: 'Il y a 2 h', initials: 'SB', color: 'orange' },
  { id: 'c-002', name: 'Yacine Haddad', email: 'yacine@numidia.tech', company: 'Numidia Tech', status: 'Prospect', lastActivity: 'Hier', initials: 'YH', color: 'indigo' },
  { id: 'c-003', name: 'Lina Mansouri', email: 'lina@kasbah-studio.com', company: 'Kasbah Studio', status: 'Actif', lastActivity: '12 oct. 2026', initials: 'LM', color: 'teal' },
  { id: 'c-004', name: 'Karim Touati', email: 'karim@horizon-retail.dz', company: 'Horizon Retail', status: 'Inactif', lastActivity: '08 oct. 2026', initials: 'KT', color: 'purple' },
  { id: 'c-005', name: 'Nadia Saïdi', email: 'nadia@elmouradia.dz', company: 'El Mouradia Conseil', status: 'Actif', lastActivity: '05 oct. 2026', initials: 'NS', color: 'blue' },
];

export const deals: Deal[] = [
  { id: 'd-001', name: 'Déploiement CRM', company: 'Atlas Logistics', value: 820000, stage: 'Proposition', probability: 65, owner: 'MB', updatedAt: 'Aujourd’hui' },
  { id: 'd-002', name: 'Portail client', company: 'Numidia Tech', value: 460000, stage: 'Qualification', probability: 35, owner: 'SA', updatedAt: 'Hier' },
  { id: 'd-003', name: 'Automatisation ventes', company: 'Kasbah Studio', value: 1250000, stage: 'Négociation', probability: 80, owner: 'MB', updatedAt: '12 oct.' },
  { id: 'd-004', name: 'Support annuel', company: 'Horizon Retail', value: 280000, stage: 'Gagné', probability: 100, owner: 'NS', updatedAt: '10 oct.' },
];

export const quotes: Quote[] = [
  { id: 'q-001', number: 'DEV-2026-014', customer: 'Atlas Logistics', amount: 820000, status: 'Envoyé', expiresAt: '31 oct. 2026' },
  { id: 'q-002', number: 'DEV-2026-013', customer: 'Kasbah Studio', amount: 1250000, status: 'Accepté', expiresAt: '24 oct. 2026' },
  { id: 'q-003', number: 'DEV-2026-012', customer: 'El Mouradia Conseil', amount: 320000, status: 'Brouillon', expiresAt: '—' },
];

export const inboxThreads: InboxThread[] = [
  { id: 't-001', contact: 'Sarah Benali', subject: 'Re: Proposition EvoCRM', preview: 'Merci pour la proposition. Peut-on revoir le calendrier...', time: '09:42', unread: true, channel: 'Email' },
  { id: 't-002', contact: 'Yacine Haddad', subject: 'Questions sur l’intégration', preview: 'Bonjour, notre équipe technique souhaite valider...', time: 'Hier', unread: true, channel: 'WhatsApp' },
  { id: 't-003', contact: 'Lina Mansouri', subject: 'Point de suivi', preview: 'Tout est bon de notre côté pour la prochaine étape.', time: '12 oct.', unread: false, channel: 'Email' },
];
