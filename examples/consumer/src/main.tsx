import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/geist-sans/600.css';
import '@evotechly/ui/styles.css';
import {
  Button,
  DataTable,
  DatePicker,
  Dialog,
  EvotechlyUIProvider,
  Input,
  Sidebar,
  Switch,
  Topbar,
  toast,
  useTheme,
} from '@evotechly/ui';
import { House, Users } from '@phosphor-icons/react';

function Shell() {
  const { toggleMode, mode } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '212px 1fr', minHeight: '100vh' }}>
      <Sidebar
        items={[
          { id: 'home', label: 'Home', icon: <House />, active: true },
          { id: 'people', label: 'People', icon: <Users /> },
        ]}
      />
      <div>
        <Topbar
          title="Consumer app"
          actions={
            <>
              <Button size="sm" variant="secondary" onClick={toggleMode}>
                {mode === 'light' ? 'Dark' : 'Light'}
              </Button>
              <Button size="sm" onClick={() => setOpen(true)}>
                New
              </Button>
            </>
          }
        />
        <main style={{ padding: 24, display: 'grid', gap: 16 }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              toast.success('Contact stored locally');
            }}
          >
            <Input label="Name" name="name" required />
            <DatePicker label="Follow up" name="followUp" />
            <Switch label="Notify owner" defaultChecked />
            <Button type="submit">Save</Button>
          </form>
          <DataTable
            data={[
              { name: 'Ada', stage: 'Open' },
              { name: 'Grace', stage: 'Won' },
            ]}
            columns={[
              { accessorKey: 'name', header: 'Name' },
              { accessorKey: 'stage', header: 'Stage' },
            ]}
          />
        </main>
        <Dialog open={open} onOpenChange={setOpen} title="New contact">
          <Input label="Email" type="email" />
        </Dialog>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EvotechlyUIProvider defaultProduct="evocrm">
      <Shell />
    </EvotechlyUIProvider>
  </StrictMode>,
);
