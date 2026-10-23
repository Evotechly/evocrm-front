export type ContactStatus = 'Actif' | 'Prospect' | 'Inactif';
export interface Contact { id: string; name: string; email: string; company: string; status: ContactStatus; lastActivity: string; initials: string; color: string; }
export interface Deal { id: string; name: string; company: string; value: number; stage: string; probability: number; owner: string; updatedAt: string; }
export interface Quote { id: string; number: string; customer: string; amount: number; status: 'Brouillon' | 'Envoyé' | 'Accepté'; expiresAt: string; }
export interface InboxThread { id: string; contact: string; subject: string; preview: string; time: string; unread: boolean; channel: 'Email' | 'WhatsApp'; }
