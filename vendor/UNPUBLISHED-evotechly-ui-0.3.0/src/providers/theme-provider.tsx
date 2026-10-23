import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { applyBrandTheme, isProductTheme, type ColorMode, type ProductTheme } from '../brand';

type ThemeContextValue = {
  mode: ColorMode;
  product: ProductTheme;
  setMode: (mode: ColorMode) => void;
  setProduct: (product: ProductTheme) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultMode = 'light',
  defaultProduct = 'crm',
  storageKey = 'evotechly-ui-theme',
}: PropsWithChildren<{
  defaultMode?: ColorMode;
  defaultProduct?: ProductTheme;
  storageKey?: string;
}>) {
  const [mode, setModeState] = useState<ColorMode>(defaultMode);
  const [product, setProductState] = useState<ProductTheme>(defaultProduct);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { mode?: string; product?: string };
      if (parsed.mode === 'light' || parsed.mode === 'dark') setModeState(parsed.mode);
      if (parsed.product && isProductTheme(parsed.product)) setProductState(parsed.product);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  useEffect(() => {
    applyBrandTheme(document.documentElement, { mode, product });
    localStorage.setItem(storageKey, JSON.stringify({ mode, product }));
  }, [mode, product, storageKey]);

  const setMode = useCallback((next: ColorMode) => setModeState(next), []);
  const setProduct = useCallback((next: ProductTheme) => setProductState(next), []);
  const toggleMode = useCallback(
    () => setModeState((current) => (current === 'light' ? 'dark' : 'light')),
    [],
  );

  const value = useMemo(
    () => ({ mode, product, setMode, setProduct, toggleMode }),
    [mode, product, setMode, setProduct, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
