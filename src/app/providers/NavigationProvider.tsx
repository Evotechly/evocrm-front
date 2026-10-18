import { createContext, useContext, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NavigationAdapter } from '@/adapters/navigation';

const NavigationContext = createContext<NavigationAdapter | null>(null);

export function RouterNavigationProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const adapter: NavigationAdapter = { navigate, back: () => window.history.back() };
  return <NavigationContext.Provider value={adapter}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const value = useContext(NavigationContext);
  if (!value) throw new Error('useNavigation must be used inside a NavigationProvider');
  return value;
}
