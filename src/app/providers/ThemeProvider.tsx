import { useEffect, type PropsWithChildren } from 'react';
import { EvotechlyUIProvider, useTheme as useBrandTheme } from '@evotechly/ui';
import type { Theme } from '@/contracts/pages';

function readInitialMode(): Theme {
  if (typeof window === 'undefined') return 'light';
  const legacy = window.localStorage.getItem('evocrm-theme');
  if (legacy === 'dark' || legacy === 'light') return legacy;
  try {
    const stored = window.localStorage.getItem('evotechly-ui-theme');
    if (stored) {
      const parsed = JSON.parse(stored) as { mode?: string };
      if (parsed.mode === 'dark' || parsed.mode === 'light') return parsed.mode;
    }
  } catch {
    /* ignore */
  }
  return 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <EvotechlyUIProvider defaultProduct="crm" defaultMode={readInitialMode()}>
      {children}
    </EvotechlyUIProvider>
  );
}

export function useTheme() {
  const { mode, toggleMode } = useBrandTheme();
  useEffect(() => {
    window.localStorage.setItem('evocrm-theme', mode);
  }, [mode]);
  return { theme: mode as Theme, toggleTheme: toggleMode };
}
