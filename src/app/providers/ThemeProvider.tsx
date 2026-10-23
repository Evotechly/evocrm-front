import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { EvoToaster } from '@evotechly/ui';
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
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => undefined,
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(readInitialMode);
  useEffect(() => {
    document.documentElement.setAttribute('data-product', 'crm');
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('evocrm-theme', theme);
  }, [theme]);
  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>
      <div className="evo-root evo-ui ev-ui" data-product="crm" data-theme={theme}>
        {children}
      </div>
      <EvoToaster />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
