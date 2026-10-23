import type { PropsWithChildren } from 'react';
import type { ColorMode, ProductTheme } from '../brand';
import { ThemeProvider } from './theme-provider';
import { TooltipProvider } from '../components/tooltip';
import { ToastViewport } from '../components/toast';

export function EvotechlyUIProvider({
  children,
  defaultMode,
  defaultProduct,
}: PropsWithChildren<{ defaultMode?: ColorMode; defaultProduct?: ProductTheme }>) {
  return (
    <ThemeProvider defaultMode={defaultMode} defaultProduct={defaultProduct}>
      <TooltipProvider>
        <div className="ev-ui">
          {children}
          <ToastViewport />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}
