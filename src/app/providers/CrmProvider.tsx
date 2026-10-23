import { toast } from '@evotechly/ui';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { Contact, Deal, Quote, InboxThread } from '@/contracts/entities';
import type { Permission } from '@/contracts/permissions';
import * as fixtures from '@/fixtures/crm';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}
export interface QuoteRecord extends Quote {
  items: LineItem[];
  contactId: string;
  dealId: string;
  expiration: string;
}
export interface Message {
  id: string;
  body: string;
  direction: 'received' | 'sent';
  time: string;
}
export interface ThreadRecord extends InboxThread {
  messages: Message[];
  assignee: string;
  nextAction: string;
}
export interface SessionData {
  contacts: Contact[];
  deals: Deal[];
  quotes: QuoteRecord[];
  threads: ThreadRecord[];
}
export const initialData: SessionData = {
  contacts: fixtures.contacts,
  deals: fixtures.deals,
  quotes: fixtures.quotes.map((q) => ({
    ...q,
    items: [
      {
        id: `${q.id}-1`,
        description:
          q.number === 'DEV-2026-014'
            ? 'Déploiement CRM'
            : q.number === 'DEV-2026-013'
              ? 'Automatisation ventes'
              : 'Conseil',
        quantity: 1,
        unitPrice: q.amount,
      },
    ],
    contactId: fixtures.contacts.find((c) => c.company === q.customer)?.id ?? '',
    dealId: fixtures.deals.find((d) => d.company === q.customer)?.id ?? '',
    expiration: q.expiresAt.startsWith('31')
      ? '2026-10-31'
      : q.expiresAt.startsWith('24')
        ? '2026-10-24'
        : '',
  })),
  threads: fixtures.inboxThreads.map((t) => ({
    ...t,
    assignee: 'MB',
    nextAction: '',
    messages: [{ id: `${t.id}-1`, body: t.preview, direction: 'received', time: t.time }],
  })),
};
const defaultPermissions: Permission[] = [
  'crm.view',
  'crm.edit',
  'crm.bulk',
  'desk.view',
  'desk.manage',
  'quotes.view',
  'settings.manage',
];
function useSession(data: SessionData, permissions: Permission[]) {
  const [contacts, setContacts] = useState(data.contacts);
  const [deals, setDeals] = useState(data.deals);
  const [quotes, setQuotes] = useState(data.quotes);
  const [threads, setThreads] = useState(data.threads);
  const [notice, setNotice] = useState('');
  return {
    contacts,
    setContacts,
    deals,
    setDeals,
    quotes,
    setQuotes,
    threads,
    setThreads,
    notice,
    notify: (message: string) => {
      setNotice(message);
      if (message) toast.information(message);
    },
    can: (p: Permission) => permissions.includes(p),
  };
}
const Context = createContext<ReturnType<typeof useSession> | null>(null);
/** Inertia may supply page-prop data and capabilities here; all edits are session-only. */
export function CrmProvider({
  children,
  data = initialData,
  permissions = defaultPermissions,
}: PropsWithChildren<{ data?: SessionData; permissions?: Permission[] }>) {
  const value = useSession(data, permissions);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useCrm() {
  const value = useContext(Context);
  if (!value) throw new Error('CrmProvider required');
  return value;
}
