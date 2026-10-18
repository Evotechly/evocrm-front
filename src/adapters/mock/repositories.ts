import type { Contact, Deal, InboxThread, Quote } from '@/contracts/entities';
import { contacts, deals, inboxThreads, quotes } from '@/fixtures/crm';

export interface ContactRepository { list(): Promise<Contact[]>; get(id: string): Promise<Contact | undefined>; }
export interface DealRepository { list(): Promise<Deal[]>; }
export interface InboxRepository { list(): Promise<InboxThread[]>; }
export interface QuoteRepository { list(): Promise<Quote[]>; }

const asyncValue = <T,>(value: T): Promise<T> => Promise.resolve(value);
export const mockRepositories = { contacts: { list: () => asyncValue(contacts), get: (id: string) => asyncValue(contacts.find((contact) => contact.id === id)) }, deals: { list: () => asyncValue(deals) }, inbox: { list: () => asyncValue(inboxThreads) }, quotes: { list: () => asyncValue(quotes) } } satisfies { contacts: ContactRepository; deals: DealRepository; inbox: InboxRepository; quotes: QuoteRepository };
