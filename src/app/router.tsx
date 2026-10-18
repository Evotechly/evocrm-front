import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { ContactsPage } from '@/pages/contacts/ContactsPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { DealsPage } from '@/pages/deals/DealsPage';
import { InboxPage } from '@/pages/inbox/InboxPage';
import { QuotesPage } from '@/pages/quotes/QuotesPage';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/crm/contacts" element={<ContactsPage />} />
        <Route path="/crm/deals" element={<DealsPage />} />
        <Route path="/crm/deals/board" element={<DealsPage board />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/crm/quotes" element={<QuotesPage />} />
        <Route path="/settings" element={<PagePlaceholder title="Paramètres" detail="La navigation des réglages est prête pour la prochaine vague." />} />
        <Route path="*" element={<PagePlaceholder title="Écran introuvable" detail="Cette route n’est pas encore enregistrée dans le frontend." />} />
      </Route>
    </Routes>
  );
}

function PagePlaceholder({ title, detail }: { title: string; detail: string }) {
  return <section className="page-stack"><div className="eyebrow">EVOCRM / ROUTE</div><h1>{title}</h1><p className="muted">{detail}</p></section>;
}
