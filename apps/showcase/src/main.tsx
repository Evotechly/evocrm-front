import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono/400.css';
import '@evotechly/ui/styles.css';
import { EvotechlyUIProvider } from '@evotechly/ui';
import { App } from './App';
import './showcase.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EvotechlyUIProvider defaultProduct="evocrm">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EvotechlyUIProvider>
  </StrictMode>,
);
