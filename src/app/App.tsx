import { BrowserRouter } from 'react-router-dom';
import { RouterNavigationProvider } from './providers/NavigationProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { CrmProvider } from './providers/CrmProvider';
import { AppRouter } from './router';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <RouterNavigationProvider>
          <CrmProvider>
            <AppRouter />
          </CrmProvider>
        </RouterNavigationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
