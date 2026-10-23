import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { ContactsPage } from '@/pages/contacts/ContactsPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { DealsPage } from '@/pages/deals/DealsPage';
import { InboxPage } from '@/pages/inbox/InboxPage';
import { QuotesPage } from '@/pages/quotes/QuotesPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { LoginPage } from '@/pages/auth/LoginPage';

const Gallery = import.meta.env.DEV
  ? lazy(() => import('@/pages/dev/ComponentsPage').then((m) => ({ default: m.ComponentsPage })))
  : null;

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/crm/contacts" element={<ContactsPage />} />
        <Route path="/crm/deals" element={<DealsPage />} />
        <Route path="/crm/deals/board" element={<DealsPage board />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/crm/quotes" element={<QuotesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {Gallery && (
          <Route
            path="/dev/components"
            element={
              <Suspense fallback={<p>Chargement…</p>}>
                <Gallery />
              </Suspense>
            }
          />
        )}
        <Route
          path="*"
          element={
            <section className="page-stack">
              <h1>Écran introuvable</h1>
              <p className="ev-muted">Cette route n’est pas encore enregistrée dans le frontend.</p>
            </section>
          }
        />
      </Route>
    </Routes>
  );
}
