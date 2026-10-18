export type Theme = 'light' | 'dark';
export type ScreenId = 'SCR-HOME-001' | 'SCR-CONTACT-001' | 'SCR-DEAL-001' | 'SCR-INBOX-001' | 'SCR-QUOTE-001';
export interface NavigationItem { id: string; label: string; path: string; icon: string; simple: boolean; }
