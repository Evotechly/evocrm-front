import { BrowserRouter } from 'react-router-dom';
import { RouterNavigationProvider } from './providers/NavigationProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { AppRouter } from './router';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <RouterNavigationProvider>
          <AppRouter />
        </RouterNavigationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
